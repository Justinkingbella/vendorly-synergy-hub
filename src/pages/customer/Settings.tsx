
import React, { useState } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, CreditCard, Key, LocateIcon, Mail, User } from 'lucide-react';

const CustomerSettings = () => {
  // Personal details form state
  const [personalDetails, setPersonalDetails] = useState({
    firstName: 'Sarah',
    lastName: 'Connor',
    email: 'sarah.connor@example.com',
    phone: '+1 (555) 123-4567'
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Addresses state
  const [addresses, setAddresses] = useState([
    { 
      id: 1,
      type: 'Home',
      default: true,
      fullName: 'Sarah Connor',
      address: '123 Resistance St',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    {
      id: 2,
      type: 'Work',
      default: false,
      fullName: 'Sarah Connor',
      address: '456 Judgment Ave',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    }
  ]);

  // Notification preferences
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newProducts: false,
    newsletters: true
  });

  // Handle personal details changes
  const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle notification changes
  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  // Update personal details
  const updatePersonalDetails = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Personal details updated successfully!');
  };

  // Update password
  const updatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    // Reset password form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    toast.success('Password updated successfully!');
  };

  // Set default address
  const setDefaultAddress = (id: number) => {
    setAddresses(addresses.map(address => ({
      ...address,
      default: address.id === id
    })));
    toast.success('Default address updated!');
  };

  // Update notification settings
  const saveNotificationSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification preferences updated!');
  };

  return (
    <CustomerLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <LocateIcon className="h-4 w-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/avatar.png" alt="Sarah Connor" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Change Picture</Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, GIF or PNG. Max size of 2MB
                    </p>
                  </div>
                </div>
                
                <form onSubmit={updatePersonalDetails}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        value={personalDetails.firstName} 
                        onChange={handlePersonalDetailsChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        value={personalDetails.lastName} 
                        onChange={handlePersonalDetailsChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={personalDetails.email} 
                        onChange={handlePersonalDetailsChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={personalDetails.phone} 
                        onChange={handlePersonalDetailsChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="bio">About</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us a little about yourself..." 
                      className="resize-none" 
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This information may be visible to other users.
                    </p>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={updatePersonalDetails}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Addresses */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Shipping & Billing Addresses</CardTitle>
                <CardDescription>
                  Manage your shipping and billing addresses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {addresses.map((address) => (
                    <Card key={address.id} className={address.default ? 'border-primary' : ''}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{address.type}</CardTitle>
                            {address.default && (
                              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm">
                          <p className="font-medium">{address.fullName}</p>
                          <p>{address.address}</p>
                          <p>{address.city}, {address.state} {address.zip}</p>
                          <p>{address.country}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0">
                        <Button variant="outline" size="sm">Edit</Button>
                        {!address.default && (
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => setDefaultAddress(address.id)}
                          >
                            Set as Default
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                  
                  <Card className="border-dashed flex items-center justify-center h-full min-h-[180px]">
                    <Button variant="outline">
                      Add New Address
                    </Button>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password for better security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={updatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      name="currentPassword" 
                      type="password" 
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      name="newPassword" 
                      type="password" 
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password" 
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={updatePassword}>Update Password</Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-factor authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Secure your account with two-factor authentication
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={saveNotificationSettings} className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Order Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your order status
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.orderUpdates} 
                      onCheckedChange={(checked) => handleNotificationChange('orderUpdates', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Promotions & Discounts</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about sales and promotions
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.promotions} 
                      onCheckedChange={(checked) => handleNotificationChange('promotions', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">New Products</p>
                      <p className="text-sm text-muted-foreground">
                        Be the first to know about new products
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.newProducts} 
                      onCheckedChange={(checked) => handleNotificationChange('newProducts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Newsletters</p>
                      <p className="text-sm text-muted-foreground">
                        Receive our weekly newsletter
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.newsletters} 
                      onCheckedChange={(checked) => handleNotificationChange('newsletters', checked)}
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button onClick={saveNotificationSettings}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Payment Methods */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods and billing information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-md">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                  
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-md">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Mastercard ending in 5432</p>
                        <p className="text-sm text-muted-foreground">Expires 08/2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                  
                  <Button variant="outline" className="w-full">Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default CustomerSettings;
