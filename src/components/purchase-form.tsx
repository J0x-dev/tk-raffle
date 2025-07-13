'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldErrors } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILES = 6;

const formSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required.' }),
  mobileNumber: z.string().regex(/^09\d{9}$/, {
    message: 'Please enter a valid mobile number starting with 09.',
  }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' }),
  birthdate: z.date({ required_error: 'A date of birth is required.' }),
  residentialAddress: z
    .string()
    .min(1, { message: 'Residential address is required.' }),
  dateOfPurchase: z.date({ required_error: 'A date of purchase is required.' }),
  purchaseAmount: z.coerce
    .number({ required_error: 'Purchase amount is required.' })
    .positive({ message: 'Purchase amount must be a positive number.' })
    .min(750, { message: 'Purchase amount must be at least ₱750.' }),
  receiptNumber: z.string().min(1, { message: 'Receipt number is required.' }),
  branch: z
    .string({ required_error: 'Please select a branch.' })
    .min(1, { message: 'Please select a branch.' }),
  receiptUpload: z
    .any()
    .refine(
      (files) => files && files?.length > 0,
      'At least one receipt image is required.'
    )
    .refine(
      (files) => files?.length <= MAX_FILES,
      `You can upload a maximum of ${MAX_FILES} files.`
    )
    .refine(
      (files) =>
        !files ||
        Array.from(files).every((file: any) => file.size <= MAX_FILE_SIZE),
      `Max file size is 10MB per file.`
    )
    .refine(
      (files) =>
        !files ||
        Array.from(files).every((file: any) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  agreeToTerms: z.boolean(),
});

const branches = [
  'A.T. Yuchengco Centre',
  'Aseana Parañaque',
  'Avida Paco',
  'Avire Tower',
  'Ayala Harbor Point',
  'Ayala Malls Serin',
  'Ayala Malls Vermosa',
  'BF Aguirre',
  'Boni Ave. Mandaluyong',
  'Boracay',
  'California Garden Square',
  'Caloocan Commercial Complex',
  'Caltex Balintawak',
  'Caltex SLEX',
  'Cardinal Santos Medical Center',
  'Chinese General Hospital and Medical Center',
  'Clean Fuel',
  'E. Rodriguez',
  'Eton Centris',
  'Ilagan',
  'Jupiter Makati',
  'L&Y Plaza Pasig',
  'Lakeshore',
  'Lucena',
  'MCU Monumento',
  'Market! Market!',
  'NAIA Terminal 3',
  'PITX',
  'Petron Katipunan',
  'Petron NLEX Marilao',
  'Pio Del Pilar Makati',
  'Pioneer Pasig',
  'Quiapo',
  'RCBC Plaza - Makati',
  'Robinsons Galleria South',
  'San Lorenzo Place Makati',
  'Santana Grove Parañaque',
  'Starmall EDSA Shaw',
  'Taft',
  'The Outlets at LIMA',
  'Tomas Morato',
  'Total NLEX',
  'Total SLEX',
  'UST',
  'Ulticare Medical Center',
  'Versailles Town Plaza',
  'WalterMart Antipolo',
];

const MemoizedBirthdateCalendar = React.memo(
  ({
    field,
    setIsBirthdateOpen,
    toYear,
  }: {
    field: any;
    setIsBirthdateOpen: (isOpen: boolean) => void;
    toYear: number;
  }) => (
    <Calendar
      mode="single"
      captionLayout="dropdown-buttons"
      fromYear={1900}
      toYear={toYear}
      selected={field.value}
      onSelect={(date) => {
        field.onChange(date);
        setIsBirthdateOpen(false);
      }}
      disabled={(date) => date > new Date() || date < new Date('1940-01-01')}
      initialFocus
      required
      defaultMonth={new Date(1995, 0)}
    />
  )
);
MemoizedBirthdateCalendar.displayName = 'MemoizedBirthdateCalendar';

export function PurchaseForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isBirthdateOpen, setIsBirthdateOpen] = React.useState(false);
  const [isPurchaseDateOpen, setIsPurchaseDateOpen] = React.useState(false);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [imageLoadStates, setImageLoadStates] = React.useState<
    Record<number, 'loading' | 'loaded' | 'error'>
  >({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);
  const [fileInputKey, setFileInputKey] = React.useState(0);

  const birthdateTriggerRef = React.useRef<HTMLButtonElement>(null);
  const purchaseDateTriggerRef = React.useRef<HTMLButtonElement>(null);
  const receiptUploadRef = React.useRef<HTMLLabelElement>(null);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      mobileNumber: '09',
      email: '',
      residentialAddress: '',
      purchaseAmount: undefined,
      receiptNumber: '',
      branch: '',
      receiptUpload: undefined,
      agreeToTerms: false,
    },
    // defaultValues: {
    //   fullName: 'mark',
    //   mobileNumber: '09123123123',
    //   email: 'mm@gmai.co',
    //   residentialAddress: '123',
    //   purchaseAmount: 1234,
    //   receiptNumber: '1235',
    //   branch: 'Avida Paco',
    //   receiptUpload: undefined,
    //   agreeToTerms: !false,
    //   birthdate: new Date('2000-01-01'),
    //   dateOfPurchase: new Date('2025-07-01'),
    // },
  });

  const receiptFileRef = form.watch('receiptUpload');
  const agreeToTermsValue = form.watch('agreeToTerms');

  React.useEffect(() => {
    if (receiptFileRef && receiptFileRef.length > 0) {
      const fileArray = Array.from(receiptFileRef as FileList).slice(0, 6);
      const newPreviews = fileArray.map((file) =>
        URL.createObjectURL(file as Blob)
      );

      const newLoadStates: Record<number, 'loading' | 'loaded' | 'error'> = {};
      newPreviews.forEach((_, index) => {
        newLoadStates[index] = 'loading';
      });

      setImagePreviews(newPreviews);
      setImageLoadStates((prev) => ({ ...prev, ...newLoadStates }));

      return () => {
        newPreviews.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setImagePreviews([]);
      setImageLoadStates({});
    }
  }, [receiptFileRef]);

  const handleImageLoad = (index: number) => {
    setImageLoadStates((prev) => ({ ...prev, [index]: 'loaded' }));
  };

  const handleImageError = (index: number) => {
    setImageLoadStates((prev) => ({ ...prev, [index]: 'error' }));
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const currentFiles = form.getValues('receiptUpload');
    if (currentFiles) {
      const updatedFiles = Array.from(currentFiles as FileList).filter(
        (_, index) => index !== indexToRemove
      );

      if (updatedFiles.length === 0) {
        setImagePreviews([]);
        setImageLoadStates({});
        form.setValue('receiptUpload', undefined, { shouldValidate: true });
        setFileInputKey((prev) => prev + 1); // force input remount
      } else {
        const dataTransfer = new DataTransfer();
        updatedFiles.forEach((file) => dataTransfer.items.add(file as File));
        form.setValue('receiptUpload', dataTransfer.files, {
          shouldValidate: true,
        });
        setFileInputKey((prev) => prev + 1); // force input remount
      }
    }
  };

  const sendEmail = (params: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      emailjs
        .send(serviceID, templateID, params, { publicKey })
        .then(() => {
          console.log('Email sent successfully!');
          resolve();
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          reject(error);
        });
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const fullName =
        values.fullName.charAt(0).toUpperCase() + values.fullName.slice(1);
      const formattedAmount = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
      }).format(values.purchaseAmount);
      const raffleEntries = Math.floor(values.purchaseAmount / 750);

      const userData = {
        fullName: fullName,
        purchaseAmount: formattedAmount,
        raffleEntries: raffleEntries,
      };

      sessionStorage.setItem('submissionData', JSON.stringify(userData));

      await addDoc(collection(db, 'submissions'), {
        fullName: fullName,
        mobileNumber: values.mobileNumber,
        email: values.email,
        birthdate: format(values.birthdate, 'MM-dd-yyyy'),
        residentialAddress: values.residentialAddress,
        dateOfPurchase: format(values.dateOfPurchase, 'MM-dd-yyyy'),
        purchaseAmount: values.purchaseAmount,
        receiptNumber: values.receiptNumber,
        branch: values.branch,
        receiptUpload: 'Upload pending',
        raffleEntries: raffleEntries,
        submittedAt: serverTimestamp(),
      });

      console.log('Data saved to Firestore successfully!');

      // sendEmail({ ...userData, email: values.email });
      setIsSubmitting(false);
      router.push(`/success`);
    } catch (error) {
      console.error('Error submitting form: ', error);
      setIsSubmitting(false);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem with your submission. Please try again.',
      });
    }
  }

  function onError(errors: FieldErrors<z.infer<typeof formSchema>>) {
    console.log('Form errors', errors);
    const errorKeys = Object.keys(errors);

    if (errorKeys.includes('birthdate')) {
      birthdateTriggerRef.current?.focus();
    } else if (errorKeys.includes('dateOfPurchase')) {
      purchaseDateTriggerRef.current?.focus();
    } else if (errorKeys.includes('receiptUpload')) {
      receiptUploadRef.current?.focus();
      receiptUploadRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];
    if (newFiles.length === 0) return;

    const currentFiles = form.getValues('receiptUpload')
      ? Array.from(form.getValues('receiptUpload') as FileList)
      : [];

    let combinedFiles = [...currentFiles];

    for (const file of newFiles) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: `"${file.name}" exceeds the 10MB limit.`,
        });
      } else if (combinedFiles.length < MAX_FILES) {
        combinedFiles.push(file);
      } else {
        toast({
          variant: 'destructive',
          title: 'Maximum files reached',
          description: `You can only upload a maximum of ${MAX_FILES} files.`,
        });
        break;
      }
    }

    const dataTransfer = new DataTransfer();
    combinedFiles.forEach((file) => dataTransfer.items.add(file as File));

    form.setValue('receiptUpload', dataTransfer.files, {
      shouldValidate: true,
    });
  };

  const receiptFileNames = receiptFileRef
    ? Array.from(receiptFileRef as FileList)
        .map((file: any) => file.name)
        .join(', ')
    : '';

  if (currentYear === null) {
    return null; // Or a loading spinner
  }

  return (
    <Card className="w-full max-w-4xl bg-transparent">
      <CardHeader>
        <div className="mb-4 flex justify-center">
          <Image
            src="/imgs/tk-logo.png"
            alt="Tapa King Logo"
            width={200}
            height={50}
            className="h-[50px] w-[200px]"
            priority
          />
        </div>
        <CardTitle className="text-center font-headline text-[28px] font-bold leading-[32px] text-[#8a2a2b]">
          Join Tapa King Royal Escape 38th Anniversary Vacation Raffle
        </CardTitle>
        <CardDescription className="text-center text-sm text-[#8a2b2b]">
          Enjoy your Tapa Favorites and get a chance to win your dream vacation!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-center text-[20px] font-bold text-[#8a2a2b]">
                Contact Details
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-[#8a2a2b]">
                        Full Name*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                          className={cn(
                            form.formState.errors.fullName
                              ? 'border-destructive focus-visible:ring-destructive'
                              : 'border-[#b47e00]',
                            'focus-visible:ring-2 focus-visible:ring-offset-2'
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-[#8a2a2b]">
                        Mobile Number*
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          required
                          maxLength={11}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!value.startsWith('09')) {
                              field.onChange('09');
                            } else if (value.length <= 11) {
                              field.onChange(value);
                            }
                          }}
                          className={cn(
                            form.formState.errors.mobileNumber
                              ? 'border-destructive focus-visible:ring-destructive'
                              : 'border-[#b47e00]',
                            'focus-visible:ring-2 focus-visible:ring-offset-2'
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    const showGmailSuggestion =
                      field.value &&
                      !field.value.includes('@') &&
                      !field.value.endsWith('@gmail.com');
                    const suggestedEmail = field.value + '@gmail.com';
                    return (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-[#8a2a2b]">
                          Email Address*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            required
                            className={cn(
                              form.formState.errors.email
                                ? 'border-destructive focus-visible:ring-destructive'
                                : 'border-[#b47e00]',
                              'focus-visible:ring-2 focus-visible:ring-offset-2'
                            )}
                          />
                        </FormControl>
                        {showGmailSuggestion && (
                          <button
                            type="button"
                            className="mt-1 block w-full rounded-md border border-[#b47e00] bg-white/70 px-3 py-2 text-left text-base font-medium text-muted-foreground transition-colors hover:bg-[#f9f5f2] focus:outline-none focus:ring-2 focus:ring-[#e5b9a5] focus:ring-offset-2"
                            onClick={() => {
                              field.onChange(suggestedEmail);
                            }}
                          >
                            {suggestedEmail}
                          </button>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-[#8a2a2b]">
                        Birthdate*
                      </FormLabel>
                      <Popover
                        open={isBirthdateOpen}
                        onOpenChange={setIsBirthdateOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              ref={birthdateTriggerRef}
                              variant={'outline'}
                              className={cn(
                                'flex h-10 w-full justify-start border bg-white/50 text-left text-base font-normal text-[rgb(138,42,43)] ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                !field.value && 'text-muted-foreground',
                                form.formState.errors.birthdate
                                  ? 'border-destructive focus:ring-destructive focus-visible:ring-destructive'
                                  : 'border-[#b47e00]'
                              )}
                            >
                              <CalendarIcon className="mr-1 h-4 w-4 opacity-50" />
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <MemoizedBirthdateCalendar
                            field={field}
                            setIsBirthdateOpen={setIsBirthdateOpen}
                            toYear={currentYear!}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="residentialAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-[#8a2a2b]">
                          Residential Address*
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            required
                            className={cn(
                              form.formState.errors.residentialAddress
                                ? 'border-destructive focus-visible:ring-destructive'
                                : 'border-[#b47e00]'
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Separator className="bg-[#b47e00]" />
              <h3 className="pt-2 text-center text-[20px] font-bold text-[#8a2b2b]">
                Purchase Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="dateOfPurchase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-[#8a2a2b]">
                        Date of Purchase*
                      </FormLabel>
                      <Popover
                        open={isPurchaseDateOpen}
                        onOpenChange={setIsPurchaseDateOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              ref={purchaseDateTriggerRef}
                              variant={'outline'}
                              className={cn(
                                'flex h-10 w-full justify-start border border-[#b47e00] bg-white/50 text-left text-base font-normal text-[rgb(138,42,43)] ring-offset-background placeholder:text-muted-foreground focus-within:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-[#e5b9a5] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-1 h-4 w-4 opacity-50" />
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            fromYear={currentYear! - 10}
                            toYear={currentYear!}
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setIsPurchaseDateOpen(false);
                            }}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            required
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="purchaseAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-[#8a2a2b]">
                        Purchase Amount*
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value ?? ''}
                          required
                          className={cn(
                            form.formState.errors.purchaseAmount
                              ? 'border-destructive focus-visible:ring-destructive'
                              : 'border-[#b47e00]'
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receiptNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-[#8a2a2b]">
                        Receipt/Invoice Number*
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          required
                          className={cn(
                            form.formState.errors.receiptNumber
                              ? 'border-destructive focus-visible:ring-destructive'
                              : 'border-[#b47e00]'
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-[#8a2a2b]">
                        Branch*
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              form.formState.errors.branch
                                ? 'border-destructive focus-visible:ring-destructive'
                                : 'border-[#b47e00]'
                            )}
                          >
                            <SelectValue placeholder="Select Branch" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>
                              {branch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <FormField
                    control={form.control}
                    name="receiptUpload"
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel className="text-base font-bold text-[#8a2a2b]">
                          Upload Receipt*
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <label
                              htmlFor="receipt-upload"
                              ref={receiptUploadRef}
                              tabIndex={0}
                              className={cn(
                                'flex h-10 w-full cursor-pointer items-center justify-between rounded-md border bg-white/50 px-3 py-2 text-base text-[rgb(138,42,43)] ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                form.formState.errors.receiptUpload
                                  ? 'border-destructive focus-within:ring-destructive focus-visible:ring-destructive'
                                  : 'border-[#b47e00]'
                              )}
                            >
                              <span className="truncate text-muted-foreground">
                                {receiptFileNames || 'Select file(s)'}
                              </span>
                              <UploadCloud className="ml-2 h-5 w-5 text-muted-foreground" />
                            </label>
                            <Input
                              id="receipt-upload"
                              type="file"
                              className="sr-only"
                              key={fileInputKey}
                              {...fieldProps}
                              multiple
                              onChange={handleFileChange}
                              accept="image/png, image/jpeg, image/jpg, image/webp"
                              required
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Max {MAX_FILES} files. Max file size: 10MB. Accepted
                          formats: JPG, PNG, WEBP.
                        </FormDescription>
                        <FormMessage />
                        {imagePreviews.length > 0 && (
                          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
                            {imagePreviews.map((src, index) => (
                              <div
                                key={index}
                                className="relative aspect-[2/3]"
                              >
                                {imageLoadStates[index] === 'loading' && (
                                  <Skeleton className="h-full w-full rounded-md" />
                                )}
                                <Image
                                  src={src}
                                  alt={`Receipt preview ${index + 1}`}
                                  fill
                                  sizes="(max-width: 768px) 50vw, 33vw"
                                  className={cn(
                                    'rounded-md object-cover',
                                    imageLoadStates[index] !== 'loading'
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                  onLoad={() => handleImageLoad(index)}
                                  onError={() => handleImageError(index)}
                                />
                                {imageLoadStates[index] === 'loaded' && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute right-1 top-1 h-6 w-6 rounded-full"
                                    onClick={() => handleRemoveImage(index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                                {imageLoadStates[index] === 'error' && (
                                  <div className="absolute inset-0 flex items-center justify-center rounded-md bg-destructive/20 p-2 text-center text-xs text-destructive">
                                    Error loading image
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-bold text-[#8a2b2b]">
                    Sample Receipt
                  </p>
                  <div className="relative aspect-[2/3]">
                    <Image
                      src="/imgs/sample-receipt.jpg"
                      alt="Sample Receipt"
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="rounded-md object-cover"
                      data-ai-hint="receipt"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              Read our{' '}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-[#8a2a2b] underline"
                  >
                    Privacy Policy
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex h-full max-h-[90vh] max-w-4xl flex-col border-none p-6 sm:p-8">
                  <DialogHeader>
                    <DialogTitle>Privacy Policy</DialogTitle>
                    <DialogDescription>
                      Our Privacy commitment
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="-mx-6 h-full pr-4 sm:-mx-8">
                    <div className="space-y-4 px-6 pb-6 text-left text-sm sm:px-8">
                      <p>
                        TAPA KING, INC. (Tapa King) is committed to protecting
                        and safeguarding your privacy when you visit and access
                        our website using any electronic device. This Privacy
                        Policy set forth how we collect, use, and store your
                        information.
                      </p>
                      <p>
                        This Policy applies to information shared and collected
                        from visitors of Tapa King’s official website. It is not
                        applicable to any information collected offline or via
                        channels other than this website.
                      </p>

                      <h3 className="mb-2 font-bold">Information we collect</h3>
                      <p>
                        In order to facilitate your transaction, request, or
                        access to our products or services, there will be
                        instances when we will be requesting you to provide
                        Personal Data, such as your:
                      </p>
                      <ul className="list-disc space-y-1 pl-6">
                        <li>Full name;</li>
                        <li>Age;</li>
                        <li>Residential, postal, or billing addresses;</li>
                        <li>Email addresses;</li>
                        <li>Mobile and/or landline numbers;</li>
                        <li>Gender;</li>
                        <li>Marital status;</li>
                        <li>Proof of identification;</li>
                        <li>
                          Contents of a message and/or attachments (documents or
                          pictures) voluntarily submitted by you;
                        </li>
                        <li>
                          Information you choose to voluntarily provide; and
                        </li>
                        <li>
                          Any other information material to the product/s or
                          service/s that you are availing or when it is
                          necessary under the laws.
                        </li>
                      </ul>

                      <h3 className="mb-2 font-bold">Consent</h3>
                      <p>
                        By using our website and providing us your Personal Data
                        to avail our products and services or in any transaction
                        with us where your Personal Data is required, you are
                        consenting to the collection, use, access, transfer,
                        storage, and processing of your Personal Data as
                        described in this Privacy Policy. Thus, we encourage you
                        to READ our Privacy Policy.
                      </p>

                      <h3 className="mb-2 font-bold">
                        How we collect information
                      </h3>
                      <p>
                        We collect Personal Data and other information through
                        (i) automated means; (ii) by providing it to us, and
                        those that we gathered from other sources.
                      </p>

                      <h3 className="mb-2 font-bold">
                        Use and sharing of information
                      </h3>
                      <p>
                        We use the information we collect in various ways,
                        including the following purposes:
                      </p>
                      <ul className="list-disc space-y-1 pl-6">
                        <li>
                          Carry out your requests, fulfilling orders, processing
                          payments, and providing delivery services;
                        </li>
                        <li>
                          Allow you access to our online services that require
                          your Personal Data;
                        </li>
                        <li>Improve our services;</li>
                        <li>
                          Any other purposes for which you have permitted; and
                        </li>
                        <li>
                          Comply with any applicable laws or rules and
                          regulations or investigative proceedings.
                        </li>
                      </ul>
                      <p>
                        We do not sell your Personal Data and only share your
                        information as described in this Privacy Policy.
                      </p>
                      <p>
                        Tapa King may share Personal Data to its subsidiaries,
                        affiliates, and franchisees, which may be situated
                        outside of the Philippines, on a need-to-know basis. Use
                        of your information by these entities will comply with
                        this Privacy Policy.
                      </p>
                      <p>
                        We may also share your Personal Data and other
                        information to trusted third-party entities engaged by
                        Tapa King to undertake variety of tasks, which includes
                        but not limited to, accomplishing orders, assist in
                        marketing, technical support for our online services on
                        various online platforms, and similar functions. These
                        entities may have access to your Personal Data in order
                        to perform their tasks. While we endeavor to require
                        these entities to conform with appropriate privacy
                        policies, you agree that we are not responsible for any
                        violations, nor for actions, omissions or negligence of
                        any such entities in violation of this Privacy Policy.
                      </p>
                      <p>
                        Tapa King may ask you to receive marketing materials
                        from our business partners. If you agree to receive such
                        materials, Tapa King will send you mail or e-mail on
                        behalf of the partners.
                      </p>
                      <p>
                        Tapa King reserves the right to use or disclose any
                        information to comply with any law, regulation or legal
                        request, or to cooperate in any law enforcement
                        investigation.
                      </p>

                      <h3 className="mb-2 font-bold">
                        Protection and Security of Personal Data
                      </h3>
                      <p>
                        To ensure the security of your Personal Data, Tapa King
                        utilizes industry standard encryption software and
                        technologies in the processing of visitors’ data. We
                        implement appropriate security measures that protect
                        against loss, misuse, or alteration of your Personal
                        Data. Despite these measures, you understand that there
                        may be circumstances beyond Tapa King’s reasonable
                        control that may render these security measures
                        insufficient and under such circumstance, you agree
                        that, Tapa King shall not be responsible or liable for
                        any unauthorized use, transfer, alteration, loss, or
                        damage to any information that Tapa King may have
                        gathered from you.
                      </p>

                      <h3 className="mb-2 font-bold">Retention of data</h3>
                      <p>
                        Unless otherwise required by law or other lawful orders,
                        Tapa King will only retain Personal Data for such period
                        necessary to serve the purpose/s for which they were
                        collected, or a period no longer than 13 months after
                        the purposes for which the Personal Data was collected
                        have ceased.
                      </p>

                      <h3 className="mb-2 font-bold">Access</h3>
                      <p>
                        You are in control of the Personal Data you provide us.
                        You can access, modify, correct, update, or withdraw
                        your Personal Data by contacting us through the Contact
                        information provided below.
                      </p>

                      <h3 className="mb-2 font-bold">Cookies</h3>
                      <p>
                        Tapa King uses ‘cookies'. Cookies are used to store
                        information including visitors' preference, and the
                        pages on the website that the visitor accessed or
                        visited. The information are used to optimize your
                        experience by customizing our web page content based on
                        visitors' browser type and/or other information.
                      </p>

                      <h4 className="mb-2 font-semibold">Cookie description</h4>
                      <p>
                        Tapa King uses analytics cookie, a first party
                        browser-based cookie which allows the site to measure
                        audience behavior. There is no personally identifiable
                        information, including your IP address stored in these
                        cookies.
                      </p>

                      <h3 className="mb-2 font-bold">Links to other sites</h3>
                      <p>
                        Our website may contain links to other sites of
                        interest, including a third-party online ordering
                        service that you may be directed to. These sites are
                        outside Tapa King’s domain and they have their own
                        privacy policy. Once you used these links to leave our
                        site, we do not have any control over your information.
                        We will not be responsible for the protection and
                        privacy of any information which you provide whilst
                        visiting such sites.
                      </p>

                      <h3 className="mb-2 font-bold">
                        Updates to our Privacy Policy
                      </h3>
                      <p>
                        This Privacy Policy is effective as of January 1, 2021.
                        It may be necessary for TKI to update this Privacy
                        Policy periodically. Revised policy will be posted here.
                        ‍
                      </p>

                      <h3 className="mb-2 font-bold">How to Contact Us</h3>
                      <p>
                        For questions or more information about our Privacy
                        Policy, you may contact us through our email:
                        mktg@tapakinginc.com.
                      </p>
                    </div>
                  </ScrollArea>
                  <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </DialogContent>
              </Dialog>
              . Tap &quot;Agree &amp; Continue&quot; to accept the{' '}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-[#8a2a2b] underline"
                  >
                    Terms and Conditions
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex h-full max-h-[90vh] max-w-4xl flex-col border-none p-6 sm:p-8">
                  <DialogHeader>
                    <DialogTitle>
                      TAPA KING’S ROYAL ESCAPE RAFFLE PROMO
                    </DialogTitle>
                    <DialogDescription>
                      Terms of Use for E-Raffle System Participation
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="-mx-6 h-full pr-4 sm:-mx-8">
                    <div className="space-y-4 px-6 pb-6 text-left text-sm sm:px-8">
                      <p>
                        <strong>Promo Period:</strong> July 23, 2025 to October
                        31, 2025
                        <br />
                        <strong>DTI Fair Trade Permit No.:</strong> XXXX XXXX
                        XXXX
                      </p>

                      <p>
                        These Terms of Use (&quot;Terms&quot;) govern your
                        access and participation in Tapa King&apos;s Royal
                        Escape Raffle Promo (&quot;Promo&quot;) through the
                        official E-Raffle Management System
                        (&quot;System&quot;). By joining the promo and
                        submitting an entry via the System, you agree to abide
                        by these Terms.
                      </p>

                      <h3 className="mb-2 font-bold">1. Eligibility</h3>
                      <p>
                        1.1 The Promo is open to all customers of Tapa King
                        nationwide who meet the minimum purchase requirement as
                        stated in the official mechanics.
                      </p>
                      <p>
                        1.2 Employees of Tapa King, its affiliates, advertising
                        and promo agencies, and their relatives up to the second
                        degree of consanguinity or affinity are not eligible to
                        join.
                      </p>
                      <p>
                        1.3 Participants must be at least 18 years old and
                        residents of the Philippines.
                      </p>

                      <h3 className="mb-2 font-bold">2. Promo Mechanics</h3>
                      <p>
                        2.1 For every P750 dine-in purchase on a single receipt
                        from any participating Tapa King branch, the customer is
                        entitled to one (1) raffle entry.
                      </p>
                      <p>
                        2.2 Entries must be submitted via the official E-Raffle
                        System at tk38royalescaperaffle.com.
                      </p>
                      <p>
                        2.3 All entries must be submitted on or before October
                        31, 2025. Late or incomplete entries will not be
                        accepted.
                      </p>

                      <h3 className="mb-2 font-bold">3. Prizes</h3>
                      <ul className="list-disc space-y-1 pl-6">
                        <li>
                          <strong>
                            Major Prizes – One (1) Winner per Destination:
                          </strong>
                          <ul className="list-circle pl-6">
                            <li>Discovery Samal Package for two (2)</li>
                            <li>Discovery Coron Package for two (2)</li>
                            <li>Discovery Boracay Package for two (2)</li>
                          </ul>
                        </li>
                        <li>
                          <strong>
                            Consolation Prizes – Thirty-Eight (38) Winners:
                          </strong>
                          <ul className="list-circle pl-6">
                            <li>10 winners of Gift Box #9</li>
                            <li>10 winners of P1,000 Gift Certificates</li>
                            <li>10 winners of P1,500 Gift Certificates</li>
                            <li>8 winners of P2,000 Gift Certificates</li>
                          </ul>
                        </li>
                      </ul>

                      <h3 className="mb-2 font-bold">4. Winner Selection</h3>
                      <p>
                        4.1 Winners will be drawn electronically via the System
                        on November 7, 2025 under the supervision of a DTI
                        representative.
                      </p>
                      <p>
                        4.2 All winners will be notified via registered email,
                        phone call, and/or official social media pages.
                      </p>
                      <p>
                        4.3 A valid ID must be presented when claiming prizes.
                      </p>
                      <p>
                        4.4 The list of winners will be posted on the official
                        Tapa King social media pages.
                      </p>

                      <h3 className="mb-2 font-bold">5. Claiming of Prizes</h3>
                      <p>
                        <strong>Requirements:</strong>
                      </p>
                      <ul className="list-disc space-y-1 pl-6">
                        <li>Letter of notification from Tapa King</li>
                        <li>
                          Two (2) valid government-issued IDs with a photo
                          (e.g., Passport, Driver’s License, SSS or GSIS ID,
                          Postal ID, Voter’s ID, NBI Clearance, or Company ID)
                        </li>
                        <li>
                          Original receipt and the registered mobile number used
                          during entry registration (Note: Duplicated receipts
                          will not be accepted)
                        </li>
                        <li>
                          Winners below 18 years old must be accompanied by a
                          parent or guardian with valid IDs
                        </li>
                      </ul>
                      <p>
                        <strong>Claim Locations:</strong>
                      </p>
                      <ul className="list-disc space-y-1 pl-6">
                        <li>
                          Tapa King Head Office: 16 Armal Compound, Francisco
                          Legaspi St., Maybunga, Pasig City
                        </li>
                        <li>
                          Provincial winners may claim their prize at a Tapa
                          King branch within their area
                        </li>
                      </ul>

                      <h3 className="mb-2 font-bold">
                        6. Data Privacy & Consent
                      </h3>
                      <p>
                        6.1 By entering the Promo, participants consent to the
                        collection and processing of personal information
                        including name, mobile number, email, and purchase
                        details.
                      </p>
                      <p>
                        6.2 All data collected will be used solely for raffle
                        administration, winner verification, and DTI audit
                        purposes.
                      </p>
                      <p>
                        6.3 Tapa King adheres to the Data Privacy Act of 2012
                        and ensures the protection of personal data.
                      </p>

                      <h3 className="mb-2 font-bold">
                        7. System Usage & Limitations
                      </h3>
                      <p>
                        7.1 The E-Raffle System is the only official channel for
                        entry submissions.
                      </p>
                      <p>
                        7.2 Participants agree not to tamper, hack, or abuse the
                        system.
                      </p>
                      <p>
                        7.3 Tapa King is not liable for system outages, entry
                        errors, or internet connectivity issues that may affect
                        submission.
                      </p>

                      <h3 className="mb-2 font-bold">
                        8. Disqualification & Forfeiture
                      </h3>
                      <p>
                        8.1 Tapa King reserves the right to disqualify entries
                        that are fraudulent, incomplete, duplicated, or violate
                        any promo rules.
                      </p>
                      <p>
                        8.2 Prizes unclaimed after 60 days from receipt of
                        notification will be forfeited in favor of Tapa King
                        with prior DTI approval.
                      </p>

                      <h3 className="mb-2 font-bold">
                        9. Liability Limitation
                      </h3>
                      <p>
                        Tapa King and its partners will not be held liable for
                        any damages, loss, or injury incurred during
                        participation in the promo or the use of prizes awarded.
                      </p>

                      <h3 className="mb-2 font-bold">10. Governing Law</h3>
                      <p>
                        These Terms are governed by the laws of the Republic of
                        the Philippines, and disputes arising in connection with
                        the promo shall be resolved under Philippine
                        jurisdiction.
                      </p>
                    </div>
                  </ScrollArea>
                  <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </DialogContent>
              </Dialog>
              .
            </div>

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">
                      Agree and Continue
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-6 text-lg"
              disabled={!agreeToTermsValue || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
