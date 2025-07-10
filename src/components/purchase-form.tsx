
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, UploadCloud } from "lucide-react";
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
import { Separator } from "./ui/separator";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  mobileNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, { message: "Please enter a valid mobile number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  birthdate: z.date({ required_error: "A date of birth is required." }),
  residentialAddress: z.string().min(10, { message: "Address must be at least 10 characters." }),
  dateOfPurchase: z.date({ required_error: "A date of purchase is required." }),
  purchaseAmount: z.coerce.number().positive({ message: "Purchase amount must be a positive number." }),
  receiptNumber: z.string().min(1, { message: "Receipt number is required." }),
  branch: z.string({ required_error: "Please select a branch." }),
  receiptUpload: z.any()
    .refine((files) => files?.length >= 1, "At least one receipt image is required.")
    .refine((files) => files?.length <= 5, "You can upload a maximum of 5 files.")
    .refine((files) => Array.from(files).every((file: any) => file.size <= MAX_FILE_SIZE), `Max file size is 10MB per file.`)
    .refine(
      (files) => Array.from(files).every((file: any) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export function PurchaseForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      residentialAddress: "",
      purchaseAmount: undefined,
      receiptNumber: "",
      branch: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Form Submitted!",
      description: "Your details have been successfully recorded.",
    });
    form.reset();
  }
  
  const receiptFileRef = form.watch("receiptUpload");
  const receiptFileNames = receiptFileRef ? Array.from(receiptFileRef).map((file: any) => file.name).join(', ') : '';

  return (
    <Card className="w-full max-w-4xl bg-[#ede5d2] !border-none">
      <CardHeader>
        <CardTitle className="font-headline font-bold text-[26px] text-left text-[#8a2a2b]">Sample Form</CardTitle>
        <CardDescription>Please fill out the form below to register your purchase.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#8a2a2b] text-24px text-center">Contact Details</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-[#8a2a2b] font-bold">Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel className="text-lg text-[#8a2a2b] font-bold">Mobile Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel className="text-lg text-[#8a2a2b] font-bold">Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel className="text-lg text-[#8a2a2b] font-bold">Birthdate</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "flex h-10 w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                              {field.value ? format(field.value, "PPP") : <span></span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
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
                          <FormLabel className="text-lg text-[#8a2a2b] font-bold">Residential Address</FormLabel>
                          <FormControl>
                              <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                </div>
              </div>
            </div>

            <Separator />
            
            <div className="space-y-4">
               <h3 className="text-2xl font-bold text-[#8a2a2b] text-24px text-center">Purchase Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                    control={form.control}
                    name="dateOfPurchase"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-lg text-[#8a2a2b] font-bold">Date of Purchase</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "flex h-10 w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                                {field.value ? format(field.value, "PPP") : <span></span>}
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
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
                        <FormLabel className="text-lg text-[#8a2a2b] font-bold">Purchase Amount</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} value={field.value ?? ""} />
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
                        <FormLabel className="text-lg text-[#8a2a2b] font-bold">Receipt/Invoice Number</FormLabel>
                        <FormControl>
                            <Input {...field} />
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
                            <FormLabel className="text-lg text-[#8a2a2b] font-bold">Branch</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            <Separator />

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                      control={form.control}
                      name="receiptUpload"
                      render={({ field: { onChange, value, ...fieldProps } }) => (
                          <FormItem>
                              <FormLabel className="text-lg text-[#8a2a2b] font-bold">Upload Receipt</FormLabel>
                              <FormControl>
                                  <div className="relative">
                                      <label htmlFor="receipt-upload" className={cn(
                                          "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-[#b47e00] bg-white/50 px-3 py-2 text-base text-[rgb(138,42,43)] ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-[#e5b9a5] focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                      )}>
                                          <span className="truncate text-muted-foreground">
                                              {receiptFileNames || ""}
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
                  <div>
                    <p className="text-lg text-[#8a2a2b] font-bold mb-2">Sample Receipt</p>
                    <Image
                        src="https://placehold.co/400x200.png"
                        alt="Sample Receipt"
                        width={400}
                        height={200}
                        className="rounded-md object-cover"
                        data-ai-hint="receipt"
                    />
                  </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full text-lg py-6">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
