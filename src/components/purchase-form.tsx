'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldErrors } from 'react-hook-form';
import { CalendarIcon, Loader2, UploadCloud, X } from 'lucide-react';
import { format } from 'date-fns';
import emailjs from '@emailjs/browser';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
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
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';
import { branches } from './branches';
import TermsPrivacy from './TermsPrivacy';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILES = 4;

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
    .number({
      required_error: 'Purchase amount must be at least ₱750.',
      invalid_type_error: 'Purchase amount must be at least ₱750.',
    })
    .min(750, { message: 'Purchase amount must be at least ₱750.' }),
  receiptNumber: z
    .string({
      required_error: 'Receipt/Invoice number is required.',
      invalid_type_error: 'Receipt/Invoice number must be a string.',
    })
    .min(1, { message: 'Receipt/Invoice number is required.' }),
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
  const [isEmailFocused, setIsEmailFocused] = React.useState(false);
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
      receiptNumber: undefined,
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
      // Check for duplicate receipt/invoice number
      const existing = localStorage.getItem('duplicateInvoiceNumbers');
      let duplicates = existing ? JSON.parse(existing) : [];
      if (duplicates.includes(values.receiptNumber)) {
        setIsSubmitting(false);
        toast({
          variant: 'destructive',
          title: 'Duplicate Invoice Number',
          description:
            'This receipt/invoice number has already been used. Please check your entry.',
        });
        return;
      }

      let querySnapshot;
      try {
        if (!navigator.onLine) {
          throw new Error('offline');
        }
        const submissionsRef = collection(db, 'submissions');
        const q = query(
          submissionsRef,
          where('receiptNumber', '==', values.receiptNumber)
        );
        querySnapshot = await getDocs(q);
      } catch (err) {
        setIsSubmitting(false);
        toast({
          variant: 'destructive',
          title: 'Network Error',
          description:
            "We couldn't submit your entry. Please check your internet connection and try again.",
        });
        return;
      }
      if (!querySnapshot.empty) {
        if (!duplicates.includes(values.receiptNumber)) {
          duplicates.push(values.receiptNumber);
          localStorage.setItem(
            'duplicateInvoiceNumbers',
            JSON.stringify(duplicates)
          );
        }
        setIsSubmitting(false);
        toast({
          variant: 'destructive',
          title: 'Duplicate Invoice Number',
          description:
            'This receipt/invoice number has already been used. Please check your entry.',
        });
        return;
      }

      // Upload images to Firebase Storage
      let receiptUploadUrls: string[] = [];
      const files = values.receiptUpload as FileList | undefined;
      if (files && files.length > 0) {
        const storageRef = (await import('firebase/storage')).getStorage(
          db.app
        );
        const { ref, uploadBytes, getDownloadURL } = await import(
          'firebase/storage'
        );
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileRef = ref(
            storageRef,
            `receipts/${values.receiptNumber}_${Date.now()}_${i}_${file.name}`
          );
          await uploadBytes(fileRef, file);
          const url = await getDownloadURL(fileRef);
          receiptUploadUrls.push(url);
        }
      }

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
        receiptUpload: receiptUploadUrls,
        raffleEntries: raffleEntries,
        submittedAt: serverTimestamp(),
      });

      console.log('Data saved to Firestore successfully!');

      sendEmail({ ...userData, email: values.email });
      router.push(`/success`);
    } catch (error) {
      console.error('Error submitting form: ', error);
      setIsSubmitting(false);
      const err: any = error;
      if (
        !navigator.onLine ||
        (typeof err === 'object' &&
          err !== null &&
          (err.code === 'unavailable' ||
            err.code === 'network-request-failed')) ||
        (typeof err === 'string' && err.toLowerCase().includes('network'))
      ) {
        toast({
          variant: 'destructive',
          title: 'Network Error',
          description:
            "We couldn't submit your entry. Please check your internet connection and try again.",
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description:
            'There was a problem with your submission. Please try again.',
        });
      }
    }
  }

  function onError(errors: FieldErrors<z.infer<typeof formSchema>>) {
    console.log('Form errors', errors);
    const errorKeys = Object.keys(errors);
    // Map field names to refs or selectors
    const fieldRefs: Record<string, React.RefObject<any> | string> = {
      birthdate: birthdateTriggerRef,
      dateOfPurchase: purchaseDateTriggerRef,
      receiptUpload: receiptUploadRef,
      fullName: 'input[name="fullName"]',
      mobileNumber: 'input[name="mobileNumber"]',
      email: 'input[name="email"]',
      residentialAddress: 'textarea[name="residentialAddress"]',
      purchaseAmount: 'input[name="purchaseAmount"]',
      receiptNumber: 'input[name="receiptNumber"]',
      branch: '[data-field-branch]',
      agreeToTerms: '[data-field-agree-to-terms]',
    };
    for (const key of errorKeys) {
      const refOrSelector = fieldRefs[key];
      if (refOrSelector) {
        if (typeof refOrSelector === 'string') {
          const el = document.querySelector(
            refOrSelector
          ) as HTMLElement | null;
          if (el) {
            el.focus();
            setTimeout(() => {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
          }
        } else if (refOrSelector.current) {
          refOrSelector.current.focus();
          setTimeout(() => {
            refOrSelector.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }, 100);
        }
        break; // Only scroll to the first error
      }
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
    <>
      <div className="flex h-[100px] w-full items-center justify-center bg-[#d14124]">
        <Image
          src="/imgs/tk-white.png"
          alt="Tapa King Logo"
          width={200}
          height={50}
          className="h-[50px] w-[200px]"
          priority
        />
      </div>
      <Card className="w-full max-w-4xl bg-transparent">
        <CardHeader>
          <CardTitle className="text-center font-headline text-[28px] font-bold leading-[32px] text-[#8a2a2b]">
            Join Tapa King Royal Escape 38th Anniversary Vacation Raffle
          </CardTitle>
          <CardDescription className="text-center text-sm text-[#8a2b2b]">
            Enjoy your Tapa Favorites and get a chance to win your dream
            vacation!
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
                        <FormLabel>Full Name*</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            maxLength={60}
                            className={cn(
                              form.formState.errors.fullName
                                ? 'border-destructive focus-visible:ring-destructive'
                                : 'border-[#b47e00]',
                              'focus-visible:ring-2 focus-visible:ring-offset-1'
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
                        <FormLabel>Mobile Number*</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
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
                              'focus-visible:ring-2 focus-visible:ring-offset-1'
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
                          <FormLabel>Email Address*</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                maxLength={40}
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                                className={cn(
                                  form.formState.errors.email
                                    ? 'border-destructive focus-visible:ring-destructive'
                                    : 'border-[#b47e00]',
                                  'focus-visible:ring-2 focus-visible:ring-offset-1'
                                )}
                              />
                            </FormControl>
                            {showGmailSuggestion && isEmailFocused && (
                              <button
                                type="button"
                                className="absolute left-0 right-0 z-10 w-full truncate rounded-md border border-[#b47e00] bg-white px-3 py-2 text-left text-base font-medium text-muted-foreground shadow-lg"
                                style={{ top: 'calc(100% + 5px)' }}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  field.onChange(suggestedEmail);
                                }}
                                title={suggestedEmail}
                              >
                                <span className="block truncate">
                                  {suggestedEmail}
                                </span>
                              </button>
                            )}
                          </div>
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
                        <FormLabel>Birthdate*</FormLabel>
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
                                  'flex h-10 w-full justify-start border bg-white/50 text-left text-base font-normal text-[rgb(138,42,43)] placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                  !field.value && 'text-muted-foreground',
                                  form.formState.errors.birthdate
                                    ? 'border-destructive focus-visible:ring-destructive'
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
                          <FormLabel>Residential Address*</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              maxLength={100}
                              className={cn(
                                form.formState.errors.residentialAddress
                                  ? 'border-destructive focus-visible:ring-destructive'
                                  : 'border-[#b47e00]',
                                'focus-visible:ring-2 focus-visible:ring-offset-1'
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
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          data-field-branch
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                form.formState.errors.branch
                                  ? 'border-destructive focus-visible:ring-destructive'
                                  : 'border-[#b47e00]',
                                'focus-visible:ring-2 focus-visible:ring-offset-1'
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
                  <FormField
                    control={form.control}
                    name="dateOfPurchase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Purchase*</FormLabel>
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
                                  'flex h-10 w-full justify-start border bg-white/50 text-left text-base font-normal text-[rgb(138,42,43)] placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                  !field.value && 'text-muted-foreground',
                                  form.formState.errors.dateOfPurchase
                                    ? 'border-destructive focus-visible:ring-destructive'
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
                        <FormLabel>Purchase Amount*</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            {...field}
                            maxLength={10}
                            value={field.value ?? ''}
                            onChange={(e) => {
                              let value = e.target.value;
                              // Remove any non-digit characters (including '-')
                              value = value.replace(/[^0-9]/g, '');
                              // Limit to 10 digits
                              value = value.slice(0, 10);
                              // If input is '0' or starts with 0, clear the field
                              if (value === '0' || /^0+/.test(value)) {
                                field.onChange(undefined);
                                return;
                              }
                              field.onChange(
                                value === '' ? undefined : Number(value)
                              );
                            }}
                            className={cn(
                              form.formState.errors.purchaseAmount
                                ? 'border-destructive focus-visible:ring-destructive'
                                : 'border-[#b47e00]',
                              'focus-visible:ring-2 focus-visible:ring-offset-1'
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
                        <FormLabel>Receipt/Invoice Number*</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9\-]*"
                            {...field}
                            maxLength={20}
                            value={field.value ?? ''}
                            onChange={(e) => {
                              let value = e.target.value;

                              // Allow only numbers and dashes
                              const regex = value.replace(/[^0-9\-]/g, '');

                              field.onChange(regex);
                            }}
                            className={cn(
                              form.formState.errors.receiptNumber
                                ? 'border-destructive focus-visible:ring-destructive'
                                : 'border-[#b47e00]',
                              'focus-visible:ring-2 focus-visible:ring-offset-1'
                            )}
                          />
                        </FormControl>
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
                      render={({
                        field: { onChange, value, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormLabel>Upload Receipt*</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <label
                                htmlFor="receipt-upload"
                                ref={receiptUploadRef}
                                tabIndex={0}
                                className={cn(
                                  'flex h-10 w-full cursor-pointer items-center justify-between rounded border bg-white/50 px-3 py-2 text-base text-[rgb(138,42,43)] placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                  form.formState.errors.receiptUpload
                                    ? 'border-destructive focus-visible:ring-destructive'
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
                        className="object-cover"
                        data-ai-hint="receipt"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                <TermsPrivacy />
              </div>

              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem
                    className="flex flex-row items-center justify-center space-x-3 space-y-0"
                    data-field-agree-to-terms
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer font-normal text-black">
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
                    Submitting...
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
