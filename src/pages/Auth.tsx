
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ArrowLeft, Lock, Mail, User } from 'lucide-react';
import StoreLayout from '@/components/layout/StoreLayout';

export default function Auth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Successfully logged in!');
    navigate('/customer/dashboard');
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Account created successfully!');
    navigate('/customer/dashboard');
  };
  
  return (
    <StoreLayout title="Login or Register" description="Create an account or sign in to access your account">
      <div className="container max-w-md mx-auto py-10 px-4">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2 hover:bg-gray-100" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Store
        </Button>
        
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input id="password" type="password" required className="pl-10" />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">Sign In</Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input id="name" placeholder="John Doe" required className="pl-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="registerEmail" 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input id="registerPassword" type="password" required className="pl-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input id="confirmPassword" type="password" required className="pl-10" />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">Create Account</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 border-t p-4">
            <div className="text-center text-sm text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Are you a vendor?{" "}
            <a href="/become-vendor" className="text-primary hover:underline font-medium">
              Join as a vendor
            </a>
          </p>
        </div>
      </div>
    </StoreLayout>
  );
}
