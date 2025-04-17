
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

declare global {
  interface Window {
    turnstile: any;
    onloadTurnstileCallback: () => void;
  }
}

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Initialize Turnstile
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
    script.async = true;
    script.defer = true;

    // Define the callback
    window.onloadTurnstileCallback = () => {
      window.turnstile.render('#turnstile-container', {
        sitekey: '0x4AAAAAABNqU1wLDs8CpOQt',
        callback: function(token: string) {
          setToken(token);
        },
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.onloadTurnstileCallback;
    };
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast({
        title: "Error",
        description: "Please complete the CAPTCHA verification",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Correctly format the captcha token for Supabase
      const options = {
        emailRedirectTo: window.location.origin,
        captchaToken: token,
        data: {
          turnstileToken: token
        }
      };

      console.log("Authenticating with token:", token);

      if (isLogin) {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
          options
        });
        
        console.log("Login response:", error ? "Error" : "Success", error || data);
        
        if (error) throw error;
        
        toast({
          title: "Success!",
          description: "You have been logged in successfully.",
        });
        navigate('/account');
      } else {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options
        });
        
        console.log("Signup response:", error ? "Error" : "Success", error || data);
        
        if (error) throw error;
        
        toast({
          title: "Success!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      // Reset the CAPTCHA after submission
      if (window.turnstile) {
        window.turnstile.reset();
      }
      setToken(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{isLogin ? 'Login' : 'Sign Up'} | OpenFund</title>
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>{isLogin ? 'Login' : 'Create account'}</CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Welcome back! Enter your credentials to access your account.'
                : 'Get started with OpenFund by creating your account.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Turnstile CAPTCHA container */}
              <div id="turnstile-container" className="flex justify-center"></div>
              
              <Button type="submit" className="w-full" disabled={isLoading || !token}>
                {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Create account'}
              </Button>
              
              <p className="text-center text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
