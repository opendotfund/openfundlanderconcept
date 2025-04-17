import React from 'react';
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
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

  const onSubmit = async (values: z.infer<typeof fundFormSchema>) => {
    try {
      const { error } = await supabase
        .from('fund_submissions')
        .insert([{
          fund_name: values.fundName,
          description: values.description,
          strategy: values.strategy,
          target_amount: parseFloat(values.target),
          min_investment: parseFloat(values.minInvestment),
          management_fee: parseFloat(values.managementFee),
          performance_fee: parseFloat(values.performanceFee)
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Fund creation request submitted successfully.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit fund creation request. Please try again.",
        variant: "destructive",
      });
    }
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
                <Input placeholder="Alpha Seekers" {...field} />
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
                  className="min-h-[120px]"
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
                    <SelectTrigger>
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
          className="w-full"
        >
          Create Fund
        </Button>
      </form>
    </Form>
  );
};
