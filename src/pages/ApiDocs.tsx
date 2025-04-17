
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  walletName: z.string().min(2, {
    message: "Wallet name must be at least 2 characters.",
  }),
  walletAddress: z.string().min(32, {
    message: "Please enter a valid wallet address.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  useCase: z.string().min(2, {
    message: "Please provide a use case.",
  }),
});

const whitelistSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  useCase: z.string().min(10, {
    message: "Please provide more details about your use case.",
  }),
});

const ApiDocs = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      useCase: "",
      walletName: "",
      walletAddress: "",
    }
  });

  const whitelistForm = useForm<z.infer<typeof whitelistSchema>>({
    resolver: zodResolver(whitelistSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase
        .from('api_access_requests')
        .insert({
          email: values.email,
          use_case: values.useCase,
          wallet_name: values.walletName,
          wallet_address: values.walletAddress
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "API wallet authorized successfully.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to authorize API wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onWhitelistSubmit = async (values: z.infer<typeof whitelistSchema>) => {
    try {
      const { error } = await supabase
        .from('api_access_requests')
        .insert({
          email: values.email,
          use_case: values.useCase
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "API access request submitted successfully.",
      });
      
      whitelistForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit API access request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">API Documentation</h1>
            <Card>
              <CardHeader>
                <CardTitle>API Wallets</CardTitle>
                <CardDescription>
                  API wallets function as agent wallets that can execute operations on your account's behalf, 
                  without having withdrawal access. For information requests, you'll still need to use your 
                  account's public address. This provides a secure way to interact with our API while 
                  maintaining control over sensitive operations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="walletName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Wallet Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter wallet name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="walletAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Wallet Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter wallet address" {...field} />
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
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="useCase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Use Case</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe how you plan to use this API wallet"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Authorize API Wallet</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request API Access</CardTitle>
                <CardDescription>
                  Please fill out this form to request API access for your use case.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...whitelistForm}>
                  <form onSubmit={whitelistForm.handleSubmit(onWhitelistSubmit)} className="space-y-4">
                    <FormField
                      control={whitelistForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={whitelistForm.control}
                      name="useCase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Use Case</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe how you plan to use our API"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit Request</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocs;
