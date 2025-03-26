
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/hooks/use-toast';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { Copyright } from 'lucide-react';

const AppEditorCopyright = () => {
  const { toast } = useToast();
  const { copyrightSettings, updateCopyrightSettings } = useStoreSettings();
  
  const handleSwitchChange = (checked: boolean) => {
    updateCopyrightSettings({ showYear: checked });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCopyrightSettings({ [name]: value });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Copyright settings saved",
      description: "Your copyright settings have been updated.",
    });
  };

  const currentYear = new Date().getFullYear();
  const previewText = copyrightSettings.showYear 
    ? `© ${currentYear} ${copyrightSettings.companyName}. ${copyrightSettings.rightsText}`
    : `© ${copyrightSettings.companyName}. ${copyrightSettings.rightsText}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Copyright Settings</CardTitle>
        <CardDescription>
          Customize the copyright text displayed in your store's footer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input 
            id="companyName" 
            name="companyName"
            value={copyrightSettings.companyName}
            onChange={handleInputChange}
            placeholder="Your Company Name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rightsText">Rights Text</Label>
          <Input 
            id="rightsText" 
            name="rightsText"
            value={copyrightSettings.rightsText}
            onChange={handleInputChange}
            placeholder="All rights reserved."
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="showYear" 
            checked={copyrightSettings.showYear}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="showYear">Show Current Year</Label>
        </div>
        
        <div className="bg-muted p-4 rounded-md">
          <Label className="text-sm text-muted-foreground mb-2 block">Preview</Label>
          <p className="text-sm font-medium">{previewText}</p>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveChanges}>
            <Copyright className="h-4 w-4 mr-2" />
            Save Copyright Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppEditorCopyright;
