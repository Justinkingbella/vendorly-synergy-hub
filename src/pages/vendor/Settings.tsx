
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function VendorSettings() {
  return (
    <DashboardLayout type="vendor">
      <Tabs defaultValue="store" className="space-y-6">
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Manage your store details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://placehold.co/100x100" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Logo</Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" defaultValue="Tech Gadgets Shop" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="store-description">Store Description</Label>
                    <Textarea 
                      id="store-description" 
                      placeholder="Describe your store"
                      defaultValue="We sell the latest tech gadgets and accessories at competitive prices."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Contact Email</Label>
                    <Input id="store-email" type="email" defaultValue="contact@techgadgets.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Contact Phone</Label>
                    <Input id="store-phone" type="tel" defaultValue="+1 (555) 987-6543" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-address">Store Address</Label>
                <Input id="store-address" defaultValue="123 Tech Street" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-city">City</Label>
                  <Input id="store-city" defaultValue="San Francisco" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="store-state">State</Label>
                  <Input id="store-state" defaultValue="California" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="store-zip">ZIP Code</Label>
                  <Input id="store-zip" defaultValue="94105" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-country">Country</Label>
                <Input id="store-country" defaultValue="United States" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your vendor account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-email">Email Address</Label>
                <Input id="account-email" type="email" defaultValue="owner@techgadgets.com" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account-password">New Password</Label>
                  <Input id="account-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="account-confirm-password">Confirm Password</Label>
                  <Input id="account-confirm-password" type="password" />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <div>
                  <h3 className="font-medium">Vacation Mode</h3>
                  <p className="text-sm text-muted-foreground">Temporarily disable your store</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive order and account updates</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Manage how you receive payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input id="bank-name" defaultValue="National Bank" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input id="account-number" defaultValue="XXXX-XXXX-XXXX-1234" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="routing-number">Routing Number</Label>
                <Input id="routing-number" defaultValue="XXX-XXX-XXX" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="paypal-email">PayPal Email (Optional)</Label>
                <Input id="paypal-email" type="email" defaultValue="payments@techgadgets.com" />
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <div>
                  <h3 className="font-medium">Automatic Payouts</h3>
                  <p className="text-sm text-muted-foreground">Receive payments automatically</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>Manage your shipping options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">Orders over $50</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="pt-4 pb-2">
                <h3 className="font-medium mb-2">Shipping Rates</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h4>Standard Shipping</h4>
                      <p className="text-sm text-muted-foreground">3-5 business days</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">$5.99</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h4>Express Shipping</h4>
                      <p className="text-sm text-muted-foreground">1-2 business days</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">$12.99</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-3">
                    <div>
                      <h4>International Shipping</h4>
                      <p className="text-sm text-muted-foreground">7-14 business days</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">$24.99</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">Add Shipping Option</Button>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>Manage tax rates and configurations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Collect Tax</h3>
                  <p className="text-sm text-muted-foreground">Enable tax collection</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
                <Input id="tax-id" defaultValue="US-12345678" />
              </div>
              
              <div className="pt-4 pb-2">
                <h3 className="font-medium mb-2">Tax Rates</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h4>California</h4>
                      <p className="text-sm text-muted-foreground">United States</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">8.25%</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h4>New York</h4>
                      <p className="text-sm text-muted-foreground">United States</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">8.875%</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-3">
                    <div>
                      <h4>Default Rate</h4>
                      <p className="text-sm text-muted-foreground">All other locations</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">6.5%</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">Add Tax Rate</Button>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
