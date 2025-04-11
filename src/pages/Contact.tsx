
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MailIcon, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // In a real application, this would send an email to help@openfund.online
    toast.success('Your message has been sent! We\'ll get back to you shortly.');
    
    // Reset form fields
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We're here to help with any questions you may have
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <MailIcon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-4">Our support team is ready to help</p>
                <a 
                  href="mailto:help@openfund.online" 
                  className="text-primary hover:underline"
                >
                  help@openfund.online
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Office</h3>
                <p className="text-muted-foreground mb-4">Visit our headquarters</p>
                <address className="text-primary not-italic">
                  7125 Missisauga Rd.<br />
                  Ontario Canada
                </address>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="What can we help you with?"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[150px]" 
                        placeholder="Tell us how we can help..."
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full"
                    >
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>FAQ</CardTitle>
                  <CardDescription>
                    Quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-2">How do I create an account?</h3>
                    <p className="text-muted-foreground text-sm">
                      Click on the "Connect" button in the top right corner to connect your wallet and create an account.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">What assets can I trade?</h3>
                    <p className="text-muted-foreground text-sm">
                      OpenFund supports trading of cryptocurrencies, stocks, and commodities all in one platform.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">How do I start a fund?</h3>
                    <p className="text-muted-foreground text-sm">
                      Navigate to the "Start a Fund" page and follow the instructions to set up your decentralized hedge fund.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">What are the fees?</h3>
                    <p className="text-muted-foreground text-sm">
                      OpenFund charges a one-time fee of $750 to create a fund, which gives users access to trade Crypto, Stocks, and Commodities all from one platform. This comprehensive solution enables fund managers to diversify their portfolios across multiple asset classes.
                    </p>
                  </div>
                  <div className="text-center mt-8">
                    <p className="text-muted-foreground mb-2">Still have questions?</p>
                    <Button 
                      asChild
                      variant="outline" 
                    >
                      <a href="mailto:help@openfund.online">
                        Contact Support
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
