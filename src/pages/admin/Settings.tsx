
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Settings, Mail, Bell, Shield, CreditCard, Wrench, AlertCircle } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettings() {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'MarketHub',
    siteDescription: 'Multi-vendor marketplace for all your shopping needs',
    adminEmail: 'admin@markethub.com',
    enableMaintenanceMode: false,
    allowNewVendorRegistrations: true,
    defaultCommissionRate: 10,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'notifications@markethub.com',
    smtpPassword: '********',
    fromEmail: 'no-reply@markethub.com',
    enableEmailNotifications: true,
  });

  const handleGeneralSettingChange = (key: string, value: any) => {
    setGeneralSettings({
      ...generalSettings,
      [key]: value,
    });
  };

  const handleEmailSettingChange = (key: string, value: any) => {
    setEmailSettings({
      ...emailSettings,
      [key]: value,
    });
  };

  const handleSaveSettings = (settingType: string) => {
    // In a real app, this would save to backend
    toast({
      title: "Settings saved",
      description: `${settingType} settings have been updated successfully.`,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-muted-foreground">Manage platform settings and configurations</p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="md:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="md:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              <span className="md:inline">Maintenance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure the basic settings for your marketplace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      id="siteName" 
                      value={generalSettings.siteName}
                      onChange={(e) => handleGeneralSettingChange('siteName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input 
                      id="adminEmail" 
                      type="email"
                      value={generalSettings.adminEmail}
                      onChange={(e) => handleGeneralSettingChange('adminEmail', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input 
                    id="siteDescription" 
                    value={generalSettings.siteDescription}
                    onChange={(e) => handleGeneralSettingChange('siteDescription', e.target.value)}
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowVendorRegistrations">Vendor Registrations</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new vendors to register on the platform
                      </p>
                    </div>
                    <Switch 
                      id="allowVendorRegistrations"
                      checked={generalSettings.allowNewVendorRegistrations}
                      onCheckedChange={(checked) => handleGeneralSettingChange('allowNewVendorRegistrations', checked)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultCommissionRate">Default Commission Rate (%)</Label>
                    <Input 
                      id="defaultCommissionRate" 
                      type="number"
                      min="0"
                      max="100"
                      value={generalSettings.defaultCommissionRate}
                      onChange={(e) => handleGeneralSettingChange('defaultCommissionRate', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSaveSettings('General')}
                  className="mt-4"
                >
                  Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>
                  Configure email server and notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">SMTP Server</Label>
                    <Input 
                      id="smtpServer" 
                      value={emailSettings.smtpServer}
                      onChange={(e) => handleEmailSettingChange('smtpServer', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input 
                      id="smtpPort" 
                      value={emailSettings.smtpPort}
                      onChange={(e) => handleEmailSettingChange('smtpPort', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input 
                      id="smtpUsername" 
                      value={emailSettings.smtpUsername}
                      onChange={(e) => handleEmailSettingChange('smtpUsername', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input 
                      id="smtpPassword" 
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => handleEmailSettingChange('smtpPassword', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input 
                    id="fromEmail" 
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => handleEmailSettingChange('fromEmail', e.target.value)}
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableEmailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable automated email notifications for orders, accounts, etc.
                    </p>
                  </div>
                  <Switch 
                    id="enableEmailNotifications"
                    checked={emailSettings.enableEmailNotifications}
                    onCheckedChange={(checked) => handleEmailSettingChange('enableEmailNotifications', checked)}
                  />
                </div>
                
                <Button 
                  onClick={() => handleSaveSettings('Email')}
                  className="mt-4"
                >
                  Save Email Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security options for your marketplace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-5 w-5" />
                  <AlertTitle>Security Settings</AlertTitle>
                  <AlertDescription>
                    Security settings are managed through a dedicated security console.
                    Contact your system administrator for access.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactorAuth">Two-factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require admin users to use 2FA
                      </p>
                    </div>
                    <Switch 
                      id="twoFactorAuth"
                      defaultChecked={true}
                      disabled
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="passwordPolicy">Enhanced Password Policy</Label>
                      <p className="text-sm text-muted-foreground">
                        Enforce strong password requirements
                      </p>
                    </div>
                    <Switch 
                      id="passwordPolicy"
                      defaultChecked={true}
                      disabled
                    />
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  className="mt-4"
                >
                  Access Security Console
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Settings</CardTitle>
                <CardDescription>
                  Configure maintenance and system settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Put the site in maintenance mode to perform updates
                    </p>
                  </div>
                  <Switch 
                    id="maintenanceMode"
                    checked={generalSettings.enableMaintenanceMode}
                    onCheckedChange={(checked) => handleGeneralSettingChange('enableMaintenanceMode', checked)}
                  />
                </div>
                
                {generalSettings.enableMaintenanceMode && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      Enabling maintenance mode will make the site inaccessible to regular users.
                      Only administrators will be able to access the site.
                    </AlertDescription>
                  </Alert>
                )}
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Information</h3>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2">
                      <span className="text-sm text-muted-foreground">System Version:</span>
                      <span className="text-sm font-medium">v1.5.2</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-sm text-muted-foreground">Last Update:</span>
                      <span className="text-sm font-medium">2023-11-12</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-sm text-muted-foreground">Database:</span>
                      <span className="text-sm font-medium">PostgreSQL 14.5</span>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="text-sm text-muted-foreground">Storage:</span>
                      <span className="text-sm font-medium">78% used (234 GB / 300 GB)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline">Run System Diagnostics</Button>
                  <Button variant="outline">Clear Cache</Button>
                  <Button 
                    onClick={() => handleSaveSettings('Maintenance')}
                  >
                    Save Maintenance Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
