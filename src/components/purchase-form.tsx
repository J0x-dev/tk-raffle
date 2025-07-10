"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
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
  receiptUpload: z.any()
    .refine((files) => files?.length === 1, "Receipt image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
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

  return (
    <Card className="w-full max-w-4xl shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-center text-primary">FormFlow</CardTitle>
        <CardDescription className="text-center">Please fill out the form below to register your purchase.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary/80">Contact Details</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-white" />
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
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} className="bg-white" />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                      <FormItem className="flex flex-col">
                      <FormLabel>Birthdate</FormLabel>
                      <Popover>
                          <PopoverTrigger asChild>
                          <FormControl>
                              <Button
                              variant={"outline"}
                              className={cn(
                                  "w-full pl-3 text-left font-normal bg-white",
                                  !field.value && "text-muted-foreground"
                              )}
                              >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
              </div>
            </div>

            <Separator />
            
            <div className="space-y-4">
               <h3 className="text-lg font-semibold text-primary/80">Purchase Information</h3>
                <FormField
                    control={form.control}
                    name="residentialAddress"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Residential Address</FormLabel>
                        <FormControl>
                            <Textarea placeholder="123 Main St, Anytown, USA" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                    control={form.control}
                    name="dateOfPurchase"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Date of Purchase</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal bg-white",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                        <FormLabel>Purchase Amount</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="100.00" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                    control={form.control}
                    name="receiptNumber"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Receipt/Invoice Number</FormLabel>
                        <FormControl>
                            <Input placeholder="INV-12345" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                        control={form.control}
                        name="receiptUpload"
                        render={({ field: { onChange, ...fieldProps } }) => (
                            <FormItem>
                            <FormLabel>Upload Receipt</FormLabel>
                            <FormControl>
                                <Input 
                                type="file" 
                                {...fieldProps} 
                                onChange={(event) => onChange(event.target.files)} 
                                className="bg-white file:text-primary file:font-semibold"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                />
                            </FormControl>
                            <FormDescription>
                                Max file size: 5MB. Accepted formats: JPG, PNG, WEBP.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>
            </div>
            
            <Button type="submit" className="w-full text-lg py-6">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
