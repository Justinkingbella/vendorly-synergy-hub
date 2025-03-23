
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

type UserRole = 'customer' | 'vendor' | 'admin';

export default function Auth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [userRole, setUserRole] = useState<UserRole>('customer');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate successful login
    toast.success('Logged in successfully!');
    
    // Redirect based on role
    if (userRole === 'admin') {
      navigate('/admin/dashboard');
    } else if (userRole === 'vendor') {
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
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <CardDescription>
            {activeTab === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Create an account to get started'}
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
          <div className="px-6">
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
                  <div className="grid grid-cols-3 gap-2">
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
                    <Button 
                      type="button" 
                      variant={userRole === 'admin' ? 'default' : 'outline'} 
                      onClick={() => setUserRole('admin')}
                    >
                      Admin
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
  );
}
