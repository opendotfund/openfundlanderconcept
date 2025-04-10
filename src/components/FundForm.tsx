
import React, { useState } from 'react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const fundFormSchema = z.object({
  fundName: z.string().min(3, { message: "Fund name must be at least 3 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  strategy: z.string().min(3, { message: "Please select a strategy" }),
  target: z.string().min(1, { message: "Please enter a target amount" }),
  minInvestment: z.string().min(1, { message: "Please enter a minimum investment" }),
  managementFee: z.string().min(1, { message: "Please enter a management fee" }),
  performanceFee: z.string().min(1, { message: "Please enter a performance fee" }),
});

export const FundForm = () => {
  const form = useForm<z.infer<typeof fundFormSchema>>({
    resolver: zodResolver(fundFormSchema),
    defaultValues: {
      fundName: '',
      description: '',
      strategy: '',
      target: '',
      minInvestment: '',
      managementFee: '2',
      performanceFee: '20',
    },
  });

  const onSubmit = (values: z.infer<typeof fundFormSchema>) => {
    console.log(values);
    // In a real app, this would submit to an API
    alert("Fund creation initiated! This would connect to your wallet in a real app.");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fundName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fund Name</FormLabel>
              <FormControl>
                <Input placeholder="Alpha Seekers" {...field} className="bg-openfund-gray-dark" />
              </FormControl>
              <FormDescription>
                Choose a unique name for your fund
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your fund strategy, goals, and value proposition..."
                  className="min-h-[120px] bg-openfund-gray-dark"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="strategy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investment Strategy</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-openfund-gray-dark">
                      <SelectValue placeholder="Select a strategy" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="defi">DeFi Focus</SelectItem>
                    <SelectItem value="layer1">Layer 1 Blockchains</SelectItem>
                    <SelectItem value="nft">NFT & Metaverse</SelectItem>
                    <SelectItem value="stocks">Tech Stocks</SelectItem>
                    <SelectItem value="commodities">Digital Commodities</SelectItem>
                    <SelectItem value="mixed">Mixed Portfolio</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Fund Size (USD)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="100000"
                    className="bg-openfund-gray-dark"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="minInvestment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Investment (USD)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="1000"
                    className="bg-openfund-gray-dark"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="managementFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Management Fee (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="2"
                    className="bg-openfund-gray-dark"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="performanceFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Performance Fee (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="20"
                    className="bg-openfund-gray-dark"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark"
        >
          Create Fund
        </Button>
      </form>
    </Form>
  );
};
