
import React, { useState } from 'react';
import VendorLayout from '@/components/layout/VendorLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  User, Lock, CreditCard, BellRing, MessageSquare, 
  Store, CirclePercent, Bell, ChevronRight
} from 'lucide-react';

export default function VendorSettings() {
  const { toast } = useToast();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [vendor, setVendor] = useState({
    name: 'Premium Electronics',
    email: 'contact@premiumelectronics.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Lane, Silicon Valley, CA',
    description: 'We offer the latest electronics and gadgets at competitive prices with excellent customer service.',
    commission: {
      rate: 10,
      category: 'Electronics',
      nextTier: {
        rate: 8,
        threshold: 100000
      }
    },
    notifications: {
      email: {
        orders: true,
        marketing: false,
        system: true,
      },
      push: {
        orders: true,
        marketing: true,
        system: true,
      }
    },
    paymentMethods: [
      {
        id: 1,
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiry: '12/2024',
        isDefault: true
      }
    ]
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification settings have been updated.",
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords don't match.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate password change
    setPasswordDialogOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <VendorLayout>
      <div className="container mx-auto py-10 px-4 sm:px-6">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Store Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your store profile, preferences, and account settings.
            </p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 md:w-[600px]">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="commissions">Commissions</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Store Profile</CardTitle>
                  <CardDescription>
                    Update your store information visible to customers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input 
                      id="store-name" 
                      value={vendor.name} 
                      onChange={(e) => setVendor({...vendor, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Contact Email</Label>
                    <Input 
                      id="store-email" 
                      type="email" 
                      value={vendor.email}
                      onChange={(e) => setVendor({...vendor, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Contact Phone</Label>
                    <Input 
                      id="store-phone" 
                      value={vendor.phone}
                      onChange={(e) => setVendor({...vendor, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-address">Business Address</Label>
                    <Input 
                      id="store-address" 
                      value={vendor.address}
                      onChange={(e) => setVendor({...vendor, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-description">Store Description</Label>
                    <Textarea 
                      id="store-description" 
                      rows={4}
                      value={vendor.description}
                      onChange={(e) => setVendor({...vendor, description: e.target.value})}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Account Security</h3>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email Address</p>
                          <p className="text-sm text-muted-foreground">{vendor.email}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <Lock className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Password</p>
                          <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setPasswordDialogOpen(true)}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Commissions Tab */}
            <TabsContent value="commissions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Commission Rates</CardTitle>
                  <CardDescription>
                    View your current commission rates and eligibility for reduced rates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between bg-muted p-4 rounded-lg items-center">
                    <div className="flex items-center">
                      <CirclePercent className="h-10 w-10 text-primary mr-4" />
                      <div>
                        <h3 className="font-medium">Current Commission Rate</h3>
                        <p className="text-3xl font-bold">{vendor.commission.rate}%</p>
                        <p className="text-sm text-muted-foreground">Category: {vendor.commission.category}</p>
                      </div>
                    </div>
                    <Badge className="text-lg h-8 px-3 bg-primary">
                      Professional Plan
                    </Badge>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-2">Commission Tiers</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Increase your sales to qualify for lower commission rates.
                    </p>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tier</TableHead>
                          <TableHead>Commission Rate</TableHead>
                          <TableHead>Requirement</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Standard</TableCell>
                          <TableCell>15%</TableCell>
                          <TableCell>Basic Plan</TableCell>
                          <TableCell>
                            <Badge variant="outline">Upgraded</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Professional</TableCell>
                          <TableCell>10%</TableCell>
                          <TableCell>Professional Plan</TableCell>
                          <TableCell>
                            <Badge>Current</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Premium</TableCell>
                          <TableCell>8%</TableCell>
                          <TableCell>${vendor.commission.nextTier.threshold.toLocaleString()} Sales</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-muted">
                              60% Progress
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Elite</TableCell>
                          <TableCell>7%</TableCell>
                          <TableCell>Business Plan</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Badge variant="outline" className="bg-muted text-muted-foreground">
                                Not Eligible
                              </Badge>
                              <Button variant="link" className="p-0 h-auto ml-2">
                                Upgrade
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="bg-muted p-4 rounded-md text-sm">
                    <h4 className="font-medium mb-1">Note:</h4>
                    <p>
                      Commission rates are based on your subscription plan and sales volume. 
                      Additional reductions may be available for specific product categories or promotions.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => window.location.href = '/vendor/subscription'}>
                    View Subscription Options
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage payment methods for subscription fees.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    {vendor.paymentMethods.map((method) => (
                      <div 
                        key={method.id} 
                        className="flex items-center justify-between p-4 border rounded-md"
                      >
                        <div className="flex items-center">
                          <CreditCard className="h-6 w-6 mr-3 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{method.brand} ending in {method.last4}</p>
                            <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {method.isDefault && (
                            <Badge variant="outline" className="mr-2">Default</Badge>
                          )}
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 items-start">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Payment Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Auto-renew subscription</p>
                          <p className="text-sm text-muted-foreground">Automatically renew your subscription when it expires</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Invoice by email</p>
                          <p className="text-sm text-muted-foreground">Receive invoice copies by email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications and alerts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-muted-foreground" />
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">Order notifications</p>
                          <p className="text-sm text-muted-foreground">Receive notifications about new orders, cancellations, and returns</p>
                        </div>
                        <Switch 
                          checked={vendor.notifications.email.orders}
                          onCheckedChange={(checked) => 
                            setVendor({
                              ...vendor, 
                              notifications: {
                                ...vendor.notifications,
                                email: {
                                  ...vendor.notifications.email,
                                  orders: checked
                                }
                              }
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">Marketing updates</p>
                          <p className="text-sm text-muted-foreground">Receive promotional offers, tips, and platform updates</p>
                        </div>
                        <Switch 
                          checked={vendor.notifications.email.marketing}
                          onCheckedChange={(checked) => 
                            setVendor({
                              ...vendor, 
                              notifications: {
                                ...vendor.notifications,
                                email: {
                                  ...vendor.notifications.email,
                                  marketing: checked
                                }
                              }
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">System notifications</p>
                          <p className="text-sm text-muted-foreground">Important account updates, policy changes, and security alerts</p>
                        </div>
                        <Switch 
                          checked={vendor.notifications.email.system}
                          onCheckedChange={(checked) => 
                            setVendor({
                              ...vendor, 
                              notifications: {
                                ...vendor.notifications,
                                email: {
                                  ...vendor.notifications.email,
                                  system: checked
                                }
                              }
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <BellRing className="h-5 w-5 mr-2 text-muted-foreground" />
                      Push Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">Order notifications</p>
                          <p className="text-sm text-muted-foreground">Receive real-time alerts for new orders and updates</p>
                        </div>
                        <Switch 
                          checked={vendor.notifications.push.orders}
                          onCheckedChange={(checked) => 
                            setVendor({
                              ...vendor, 
                              notifications: {
                                ...vendor.notifications,
                                push: {
                                  ...vendor.notifications.push,
                                  orders: checked
                                }
                              }
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">Marketing updates</p>
                          <p className="text-sm text-muted-foreground">Promotional alerts and limited-time offers</p>
                        </div>
                        <Switch 
                          checked={vendor.notifications.push.marketing}
                          onCheckedChange={(checked) => 
                            setVendor({
                              ...vendor, 
                              notifications: {
                                ...vendor.notifications,
                                push: {
                                  ...vendor.notifications.push,
                                  marketing: checked
                                }
                              }
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">System notifications</p>
                          <p className="text-sm text-muted-foreground">Important system updates and alerts</p>
                        </div>
                        <Switch 
                          checked={vendor.notifications.push.system}
                          onCheckedChange={(checked) => 
                            setVendor({
                              ...vendor, 
                              notifications: {
                                ...vendor.notifications,
                                push: {
                                  ...vendor.notifications.push,
                                  system: checked
                                }
                              }
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center">
                        <MessageSquare className="h-6 w-6 mr-3 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Message Center Preferences</p>
                          <p className="text-sm text-muted-foreground">Manage notification settings for customer messages</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password to update your account security.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleChangePassword} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={() => setPasswordDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Change Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
}
