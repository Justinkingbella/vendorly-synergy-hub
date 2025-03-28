
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import StoreLayout from '@/components/layout/StoreLayout';
import SEO from '@/components/layout/SEO';

type UserRole = 'customer' | 'vendor';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [userRole, setUserRole] = useState<UserRole>('customer');
  
  // Check if we're at the vendor registration path
  useEffect(() => {
    if (location.pathname === '/vendor/register') {
      setActiveTab('register');
      setUserRole('vendor');
    }
  }, [location.pathname]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate successful login
    toast.success('Logged in successfully!');
    
    // Redirect based on role
    if (userRole === 'vendor') {
      navigate('/vendor/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userRole === 'vendor') {
      // For vendors, first redirect them to subscription choice if registering
      navigate('/vendor/subscription');
      toast.success('Account created successfully! Choose your subscription plan.');
    } else {
      // For customers, just show success and go to login
      toast.success('Account created successfully!');
      setActiveTab('login');
    }
  };

  // Set page title based on context
  const pageTitle = location.pathname === '/vendor/register' 
    ? 'Vendor Registration' 
    : (activeTab === 'login' ? 'Login' : 'Register');
  
  return (
    <StoreLayout>
      <SEO 
        title={pageTitle} 
        description={
          location.pathname === '/vendor/register'
            ? 'Register as a vendor on MarketHub and start selling your products.'
            : 'Login or create an account to shop on MarketHub.'
        }
      />
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <div className="flex justify-between items-center p-6">
            <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Store
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/admin/auth')}>
                Admin Login
              </Button>
            </div>
          </div>
          
          <CardDescription className="px-6">
            {activeTab === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Create an account to get started'}
          </CardDescription>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
            <div className="px-6 pt-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
            </div>
            
            <CardContent className="pt-6">
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                        Forgot password?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Login as</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        type="button" 
                        variant={userRole === 'customer' ? 'default' : 'outline'} 
                        onClick={() => setUserRole('customer')}
                      >
                        Customer
                      </Button>
                      <Button 
                        type="button" 
                        variant={userRole === 'vendor' ? 'default' : 'outline'} 
                        onClick={() => setUserRole('vendor')}
                      >
                        Vendor
                      </Button>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Register as</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        type="button" 
                        variant={userRole === 'customer' ? 'default' : 'outline'} 
                        onClick={() => setUserRole('customer')}
                      >
                        Customer
                      </Button>
                      <Button 
                        type="button" 
                        variant={userRole === 'vendor' ? 'default' : 'outline'} 
                        onClick={() => setUserRole('vendor')}
                      >
                        Vendor
                      </Button>
                    </div>
                  </div>
                  
                  {userRole === 'vendor' && (
                    <div className="p-3 border rounded bg-amber-50 text-amber-800 text-sm">
                      After registration, you'll need to select a subscription plan and set up your store details.
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full">Create Account</Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="#" className="underline">Terms of Service</a> and{" "}
              <a href="#" className="underline">Privacy Policy</a>.
            </div>
          </CardFooter>
        </Card>
      </div>
    </StoreLayout>
  );
}
