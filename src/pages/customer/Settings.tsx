import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Camera, LogOut, Key, Bell, CreditCard, Mail, User, Shield } from 'lucide-react';

const CustomerSettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <CustomerLayout>
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="w-full md:w-auto justify-start overflow-x-auto p-0 h-auto">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Key className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" defaultValue="Sarah" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" defaultValue="Connor" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" type="email" defaultValue="sarah.connor@example.com" />
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="us">
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="pst">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                            <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                            <SelectItem value="cst">Central Time (CST)</SelectItem>
                            <SelectItem value="est">Eastern Time (EST)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        rows={3}
                        defaultValue="I'm a tech enthusiast and avid online shopper. I love finding great deals on electronics and home goods."
                      />
                    </div>
                    
                    <Button type="submit" className="mt-4" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save changes'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <div className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Avatar</CardTitle>
                    <CardDescription>
                      Click on the avatar to upload a custom one from your files.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <Avatar className="h-32 w-32">
                        <AvatarImage alt="Sarah Connor" src="/avatar.png" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-1.5 cursor-pointer">
                        <Camera className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="w-full text-xs" size="sm">Remove</Button>
                      <Button className="w-full text-xs" size="sm">Upload</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Delete Account</CardTitle>
                    <CardDescription>
                      Permanently delete your account and all data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground">Delete Account</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSavePassword}>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="currentPassword">Current password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="newPassword">New password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="confirmPassword">Confirm password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    
                    <Button type="submit" className="mt-4" disabled={isLoading}>
                      {isLoading ? 'Updating...' : 'Update password'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Authentication</p>
                      <p className="text-sm text-muted-foreground">Receive authentication codes via SMS.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">Use an authenticator app for 2FA.</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <Button variant="outline" className="w-full">
                    Configure 2FA
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle>Login Sessions</CardTitle>
                  <CardDescription>
                    Manage your active sessions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        device: 'MacBook Pro',
                        location: 'San Francisco, CA',
                        ip: '192.168.1.1',
                        date: 'Currently active',
                        current: true
                      },
                      {
                        device: 'iPhone 13',
                        location: 'San Francisco, CA',
                        ip: '192.168.1.2',
                        date: 'Last accessed 2 hours ago',
                        current: false
                      },
                      {
                        device: 'Windows PC',
                        location: 'Los Angeles, CA',
                        ip: '192.168.1.3',
                        date: 'Last accessed 3 days ago',
                        current: false
                      }
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium flex items-center">
                            {session.device}
                            {session.current && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Current</span>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">{session.location} • {session.ip}</p>
                          <p className="text-xs text-muted-foreground">{session.date}</p>
                        </div>
                        {!session.current && (
                          <Button variant="outline" size="sm">Logout</Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4" disabled={isLoading}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout from all devices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Other tabs would be implemented similarly */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what types of notifications you receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order Updates</p>
                    <p className="text-sm text-muted-foreground">Receive notifications about your orders.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotional Emails</p>
                    <p className="text-sm text-muted-foreground">Receive emails about sales and promotions.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Price Drop Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when items in your wishlist drop in price.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Product Announcements</p>
                    <p className="text-sm text-muted-foreground">Be the first to know about new products.</p>
                  </div>
                  <Switch />
                </div>
                <Button className="mt-4">Save preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your saved payment methods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Payment methods would go here */}
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You don't have any payment methods saved yet.</p>
                    <Button>Add Payment Method</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Manage your privacy preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Public Profile</p>
                    <p className="text-sm text-muted-foreground">Allow other users to see your profile information.</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Activity Tracking</p>
                    <p className="text-sm text-muted-foreground">Allow us to track your activity to improve your shopping experience.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Sharing</p>
                    <p className="text-sm text-muted-foreground">Allow us to share anonymous usage data with our partners.</p>
                  </div>
                  <Switch />
                </div>
                <Button className="mt-4">Save preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default CustomerSettings;
