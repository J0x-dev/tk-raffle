
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, UploadCloud, X } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  mobileNumber: z.string().regex(/^09\d{9}$/, { message: "Please enter a valid mobile number starting with 09." }),
  email: z.string().min(1, { message: "Email is required." }).email({ message: "Please enter a valid email address." }),
  birthdate: z.date({ required_error: "A date of birth is required." }),
  residentialAddress: z.string().min(1, { message: "Residential address is required." }),
  dateOfPurchase: z.date({ required_error: "A date of purchase is required." }),
  purchaseAmount: z.coerce.number({required_error: "Purchase amount is required."}).positive({ message: "Purchase amount must be a positive number." }).min(750, { message: "Purchase amount must be at least ₱750." }),
  receiptNumber: z.string().min(1, { message: "Receipt number is required." }),
  branch: z.string({ required_error: "Please select a branch." }).min(1, {message: "Please select a branch."}),
  receiptUpload: z.any()
    .refine((files) => files?.length >= 1, "At least one receipt image is required.")
    .refine((files) => files?.length <= 5, "You can upload a maximum of 5 files.")
    .refine((files) => Array.from(files).every((file: any) => file.size <= MAX_FILE_SIZE), `Max file size is 10MB per file.`)
    .refine(
      (files) => Array.from(files).every((file: any) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

export function PurchaseForm() {
  const { toast } = useToast();
  const [isBirthdateOpen, setIsBirthdateOpen] = React.useState(false);
  const [isPurchaseDateOpen, setIsPurchaseDateOpen] = React.useState(false);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "09",
      email: "",
      residentialAddress: "",
      purchaseAmount: undefined,
      receiptNumber: "",
      branch: "",
      agreeToTerms: false,
    },
  });

  const receiptFileRef = form.watch("receiptUpload");
  const agreeToTermsValue = form.watch("agreeToTerms");

  React.useEffect(() => {
    if (receiptFileRef && receiptFileRef.length > 0) {
      const fileArray = Array.from(receiptFileRef);
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file as Blob));
      setImagePreviews(newPreviews);

      return () => {
        newPreviews.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setImagePreviews([]);
    }
  }, [receiptFileRef]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Form Submitted!",
      description: "Your details have been successfully recorded.",
    });
    form.reset();
  }
  
  const receiptFileNames = receiptFileRef ? Array.from(receiptFileRef).map((file: any) => file.name).join(', ') : '';

  return (
    <Card className="w-full max-w-4xl bg-transparent !border-none shadow-none">
      <CardHeader>
        <CardTitle className="font-headline font-bold text-[28px] text-left text-[#8a2a2b]">1</CardTitle>
        <CardDescription className="text-[#8a2a2b]">1</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <div className="space-y-4">
              <h3 className="font-bold text-[#8a2a2b] text-[20px] text-center">Contact Details</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-[#8a2a2b] font-bold">Full Name*</FormLabel>
                      <FormControl>
                        <Input {...field} required/>
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
                      <FormLabel className="text-lg text-[#8a2a2b] font-bold">Mobile Number*</FormLabel>
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-[#8a2a2b] font-bold">Email Address*</FormLabel>
                      <FormControl>
                        <Input {...field} required/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-[#8a2a2b] font-bold">Birthdate*</FormLabel>
                      <Popover open={isBirthdateOpen} onOpenChange={setIsBirthdateOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "flex h-10 w-full justify-start text-left font-normal border border-[#b47e00] bg-white/50 text-base text-[rgb(138,42,43)] ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#e5b9a5] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setIsBirthdateOpen(false);
                            }}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                            required
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
                          <FormLabel className="text-lg text-[#8a2a2b] font-bold">Residential Address*</FormLabel>
                          <FormControl>
                              <Textarea {...field} required/>
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                </div>
              </div>
            </div>

            
            <div className="space-y-4 pt-6">
               <Separator className="bg-[#b47e00]"/>
               <h3 className="font-bold text-[#8a2a2b] text-[20px] text-center">Purchase Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                    control={form.control}
                    name="dateOfPurchase"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-lg text-[#8a2a2b] font-bold">Date of Purchase*</FormLabel>
                        <Popover open={isPurchaseDateOpen} onOpenChange={setIsPurchaseDateOpen}>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "flex h-10 w-full justify-start text-left font-normal border border-[#b47e00] bg-white/50 text-base text-[rgb(138,42,43)] ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#e5b9a5] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                fromYear={new Date().getFullYear() - 10}
                                toYear={new Date().getFullYear()}
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
                        <FormLabel className="text-lg text-[#8a2a2b] font-bold">Purchase Amount*</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} value={field.value ?? ""} required/>
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
                        <FormLabel className="text-lg text-[#8a2a2b] font-bold">Receipt/Invoice Number*</FormLabel>
                        <FormControl>
                            <Input
                              type="text"
                              {...field}
                              required
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
                            <FormLabel className="text-lg text-[#8a2a2b] font-bold">Branch*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} required>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Branch" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Branch A">Branch A</SelectItem>
                                <SelectItem value="Branch B">Branch B</SelectItem>
                                <SelectItem value="Branch C">Branch C</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                </div>
            </div>


            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="receiptUpload"
                        render={({ field: { onChange, value, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel className="text-lg text-[#8a2a2b] font-bold">Upload Receipt*</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <label htmlFor="receipt-upload" className={cn(
                                            "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-[#b47e00] bg-white/50 px-3 py-2 text-base text-[rgb(138,42,43)] ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-[#e5b9a5] focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        )}>
                                            <span className="truncate text-muted-foreground">
                                                {receiptFileNames || "Select file(s)"}
                                            </span>
                                            <UploadCloud className="h-5 w-5 ml-2 text-muted-foreground" />
                                        </label>
                                        <Input
                                            id="receipt-upload"
                                            type="file"
                                            className="sr-only"
                                            {...fieldProps}
                                            multiple
                                            onChange={(event) => onChange(event.target.files)}
                                            accept="image/png, image/jpeg, image/jpg, image/webp"
                                            required
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Max 5 files. Max file size: 10MB. Accepted formats: JPG, PNG, WEBP.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                      {imagePreviews.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                              {imagePreviews.map((src, index) => (
                                  <div key={index} className="relative aspect-video">
                                      <Image
                                          src={src}
                                          alt={`Receipt preview ${index + 1}`}
                                          fill
                                          className="rounded-md object-cover"
                                      />
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg text-[#8a2a2b] font-bold">Sample Receipt</p>
                    <div className="relative aspect-video">
                      <Image
                          src="https://placehold.co/600x400.png"
                          alt="Sample Receipt"
                          fill
                          className="rounded-md object-cover"
                          data-ai-hint="receipt"
                      />
                    </div>
                  </div>
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              Read our{" "}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="p-0 h-auto text-[#8a2a2b] underline">Privacy Policy</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] h-full flex flex-col p-6 sm:p-8 border-none">
                  <DialogHeader>
                    <DialogTitle>Privacy Policy</DialogTitle>
                    <DialogDescription>
                      This is where the privacy policy content will go.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-full -mx-6 sm:-mx-8 pr-4">
                    <div className="px-6 sm:px-8 pb-6">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
                    </div>
                  </ScrollArea>
                   <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </DialogContent>
              </Dialog>
              . Tap "Agree & Continue" to accept the{" "}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="p-0 h-auto text-[#8a2a2b] underline">Terms and Conditions</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] h-full flex flex-col p-6 sm:p-8 border-none">
                   <DialogHeader>
                    <DialogTitle>Terms and Conditions</DialogTitle>
                    <DialogDescription>
                      This is where the terms and conditions content will go.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-full -mx-6 sm:-mx-8 pr-4">
                    <div className="px-6 sm:px-8 pb-6">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
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
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Agree and Continue
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-lg py-6" disabled={!agreeToTermsValue}>Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
