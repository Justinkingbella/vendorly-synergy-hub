
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';

export default function AdminSettings() {
  return (
    <DashboardLayout type="admin">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Manage general platform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="VendorHub" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Input id="site-description" defaultValue="A premium multi-vendor marketplace" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="admin@vendorhub.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="support-phone">Support Phone</Label>
                <Input id="support-phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Maintenance Mode</h3>
                  <p className="text-sm text-muted-foreground">Take the site offline for maintenance</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage platform security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Password Expiry</h3>
                  <p className="text-sm text-muted-foreground">Force password reset every 90 days</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Login Attempts</h3>
                  <p className="text-sm text-muted-foreground">Lock accounts after 5 failed attempts</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex space-x-2">
                  <Input id="api-key" type="password" value="sk_live_51HG6k5L..." disabled />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the marketplace looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-2 cursor-pointer bg-white">
                    <div className="h-12 bg-blue-500 rounded-md mb-2"></div>
                    <p className="text-sm text-center">Default</p>
                  </div>
                  <div className="border rounded-md p-2 cursor-pointer">
                    <div className="h-12 bg-purple-500 rounded-md mb-2"></div>
                    <p className="text-sm text-center">Purple</p>
                  </div>
                  <div className="border rounded-md p-2 cursor-pointer">
                    <div className="h-12 bg-green-500 rounded-md mb-2"></div>
                    <p className="text-sm text-center">Green</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="border rounded-md p-6 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-medium mb-2">Upload Site Logo</p>
                    <Button variant="outline" size="sm">Upload</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">Enable dark mode option</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect with third-party services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-800 font-bold">
                    PS
                  </div>
                  <div>
                    <h3 className="font-medium">Payment Service</h3>
                    <p className="text-sm text-muted-foreground">Manage payment gateways</p>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="border rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-green-100 rounded-md flex items-center justify-center text-green-800 font-bold">
                    ES
                  </div>
                  <div>
                    <h3 className="font-medium">Email Service</h3>
                    <p className="text-sm text-muted-foreground">Configure email notifications</p>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="border rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-yellow-100 rounded-md flex items-center justify-center text-yellow-800 font-bold">
                    GA
                  </div>
                  <div>
                    <h3 className="font-medium">Analytics</h3>
                    <p className="text-sm text-muted-foreground">Track site performance</p>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="border rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-md flex items-center justify-center text-purple-800 font-bold">
                    SM
                  </div>
                  <div>
                    <h3 className="font-medium">Social Media</h3>
                    <p className="text-sm text-muted-foreground">Connect social accounts</p>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
