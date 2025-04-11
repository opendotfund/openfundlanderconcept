
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Hexagon, Clock, Bell, ArrowRight } from 'lucide-react';

const ComingSoon = () => {
  const [email, setEmail] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally send the email to a server
    alert('Thank you! We\'ll notify you when tokenization launches.');
    setEmail('');
  };
  
  return (
    <div className="min-h-screen bg-openfund-gray-dark text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-openfund-green/20 rounded-full flex items-center justify-center">
              <Hexagon size={48} className="text-openfund-green" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tokenization Platform <span className="text-openfund-green">Coming Soon</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Our revolutionary asset tokenization platform is currently under development. 
            Join the waitlist to be notified when we launch.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-openfund-gray-medium p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-openfund-green/20 flex items-center justify-center mb-4 mx-auto">
                <Hexagon className="text-openfund-green" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Tokenize Any Asset</h3>
              <p className="text-gray-400">Convert real-world assets into tradable digital tokens on the blockchain</p>
            </div>
            
            <div className="bg-openfund-gray-medium p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-openfund-green/20 flex items-center justify-center mb-4 mx-auto">
                <Clock className="text-openfund-green" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">24/7 Liquidity</h3>
              <p className="text-gray-400">Trade tokenized assets anytime, anywhere with global market access</p>
            </div>
            
            <div className="bg-openfund-gray-medium p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-openfund-green/20 flex items-center justify-center mb-4 mx-auto">
                <Bell className="text-openfund-green" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Early Access</h3>
              <p className="text-gray-400">Join the waitlist to get exclusive early access and special perks</p>
            </div>
          </div>
          
          <div className="bg-openfund-gray-medium p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Be First to Know When We Launch</h2>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-openfund-gray-dark flex-grow"
                required
              />
              <Button type="submit" className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark whitespace-nowrap">
                Join Waitlist <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>
          </div>
          
          <div className="mt-12">
            <p className="text-gray-400 mb-6">
              While you wait, check out our existing products:
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="outline" className="border-openfund-green text-openfund-green">
                <Link to="/trade">Trade Assets</Link>
              </Button>
              <Button asChild variant="outline" className="border-openfund-green text-openfund-green">
                <Link to="/fund">Manage Funds</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComingSoon;
