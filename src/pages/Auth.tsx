
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'login';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { id } = useParams();
  
  const isVendorRegister = window.location.pathname.includes('/vendor/register');

  return (
    <StoreLayout>
      <div className="container max-w-md mx-auto px-4 py-12">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">
              {isVendorRegister ? 'Vendor Registration' : 'Welcome Back'}
            </CardTitle>
            <CardDescription>
              {isVendorRegister 
                ? 'Create a vendor account to start selling on our platform'
                : 'Enter your credentials to access your account'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {isVendorRegister ? (
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Your business name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-confirm">Confirm Password</Label>
                  <Input id="password-confirm" type="password" />
                </div>
                <Button type="submit" className="w-full">Register as a Vendor</Button>
              </form>
            ) : (
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input id="password" type="password" />
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                </TabsContent>
                <TabsContent value="register">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Name</Label>
                      <Input id="register-name" placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input id="register-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password-confirm">Confirm Password</Label>
                      <Input id="register-password-confirm" type="password" />
                    </div>
                    <Button type="submit" className="w-full">Register</Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">Google</Button>
              <Button variant="outline">Facebook</Button>
            </div>
            {isVendorRegister && (
              <div className="text-center text-sm">
                Already have an account? <a href="/auth" className="text-primary hover:underline">Sign in</a>
              </div>
            )}
            {!isVendorRegister && (
              <div className="text-center text-sm">
                Want to sell on our platform? <a href="/vendor/register" className="text-primary hover:underline">Register as a vendor</a>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </StoreLayout>
  );
}
