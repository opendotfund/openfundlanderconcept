import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Twitter } from 'lucide-react';

declare global {
  interface Window {
    turnstile: any;
    onloadTurnstileCallback: () => void;
  }
}

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [isSendingMagicLink, setIsSendingMagicLink] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileInitialized = useRef(false);
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    // Only load the script once
    if (!document.getElementById('turnstile-script')) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
      script.id = 'turnstile-script';
      script.async = true;
      script.defer = true;

      window.onloadTurnstileCallback = () => {
        renderTurnstile();
      };

      document.body.appendChild(script);

      return () => {
        // Clean up script on unmount
        if (document.getElementById('turnstile-script')) {
          document.body.removeChild(document.getElementById('turnstile-script')!);
        }
        delete window.onloadTurnstileCallback;
        
        // Ensure we clean up the widget if it exists
        if (turnstileWidgetId.current && window.turnstile) {
          window.turnstile.remove(turnstileWidgetId.current);
          turnstileWidgetId.current = null;
        }
      };
    }
  }, []);

  // Function to render Turnstile
  const renderTurnstile = () => {
    if (
      window.turnstile && 
      turnstileContainerRef.current && 
      !turnstileInitialized.current
    ) {
      // Clear any existing content in the container
      turnstileContainerRef.current.innerHTML = '';
      
      // Remove any existing widget
      if (turnstileWidgetId.current) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
      
      turnstileInitialized.current = true;
      turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: '0x4AAAAAABNqU1wLDs8CpOQt',
        callback: function(token: string) {
          setToken(token);
        },
      });
    }
  };

  // Re-render Turnstile when tab changes
  useEffect(() => {
    // Reset initialization flag when tab changes
    turnstileInitialized.current = false;
    
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      if (window.turnstile) {
        renderTurnstile();
      }
    }, 100);
  }, [activeTab]);

  const handleEmailAuth = async (e: React.FormEvent) => {
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
      const options = {
        emailRedirectTo: `${window.location.origin}/account`,
        captchaToken: token,
        data: {
          turnstileToken: token
        }
      };

      console.log("Authenticating with token:", token);

      if (activeTab === 'login') {
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
      // Reset turnstile
      turnstileInitialized.current = false;
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
      setToken(null);
      setTimeout(() => renderTurnstile(), 100);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'twitter') => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: 'https://wtmolxwkfzyeixducsdy.supabase.co/auth/v1/callback',
          queryParams: provider === 'google' ? {
            access_type: 'offline',
            prompt: 'consent',
          } : undefined,
        }
      });
      
      if (error) {
        console.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication error:`, error);
        toast({
          title: "Authentication Error",
          description: `${error.message}. Please make sure ${provider} authentication is enabled in your Supabase project.`,
          variant: "destructive",
        });
        setIsLoading(false);
      }
      
    } catch (error: any) {
      console.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication error:`, error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!magicLinkEmail) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSendingMagicLink(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        email: magicLinkEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/account`
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Magic link sent!",
        description: "Please check your email for a login link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSendingMagicLink(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{activeTab === 'login' ? 'Login' : 'Sign Up'} | OpenFund</title>
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome to OpenFund
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === 'login'
                ? 'Login to your account to access your portfolio'
                : 'Create an account to start investing'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email-login" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email-login"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password-login" className="text-sm font-medium">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => navigate('/reset-password')}
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="password-login"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="flex justify-center">
                    <div ref={turnstileContainerRef} id="turnstile-container"></div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading || !token}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-2 text-muted-foreground text-sm">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handleOAuthSignIn('google')} 
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                    </svg>
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleOAuthSignIn('twitter')} 
                    disabled={isLoading}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                </div>

                <div className="mt-6">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-background px-2 text-muted-foreground text-sm">
                        Or with magic link
                      </span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleMagicLinkSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="magic-link-email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="magic-link-email"
                        type="email"
                        value={magicLinkEmail}
                        onChange={(e) => setMagicLinkEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="outline"
                      className="w-full"
                      disabled={isSendingMagicLink}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {isSendingMagicLink ? 'Sending...' : 'Send Magic Link'}
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email-signup" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email-signup"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password-signup" className="text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id="password-signup"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div ref={turnstileContainerRef} id="turnstile-container"></div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading || !token}>
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </Button>
                </form>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-2 text-muted-foreground text-sm">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handleOAuthSignIn('google')} 
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                    </svg>
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleOAuthSignIn('twitter')} 
                    disabled={isLoading}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                </div>
                
                <p className="text-sm text-center text-muted-foreground mt-4">
                  By creating an account, you agree to our
                  <a href="/legal" className="text-primary hover:underline"> Terms of Service</a>
                  {' '}and{' '}
                  <a href="/legal" className="text-primary hover:underline">Privacy Policy</a>
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
