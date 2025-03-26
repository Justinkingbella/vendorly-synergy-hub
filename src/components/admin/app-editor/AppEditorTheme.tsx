
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { Paintbrush, Moon, Sun, Monitor } from 'lucide-react';

const AppEditorTheme = () => {
  const { toast } = useToast();
  const { themeSettings, updateThemeSettings } = useStoreSettings();
  
  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    updateThemeSettings({ mode });
    toast({
      title: "Theme updated",
      description: `Theme mode set to ${mode}.`,
    });
  };
  
  const handleColorChange = (colorType: 'primaryColor' | 'secondaryColor' | 'accentColor', value: string) => {
    updateThemeSettings({ [colorType]: value });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Theme settings saved",
      description: "Your theme settings have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
        <CardDescription>
          Customize your store's appearance with theme options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Theme Mode</Label>
          <div className="flex items-center space-x-2">
            <Button 
              variant={themeSettings.mode === 'light' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleThemeChange('light')}
              className="flex items-center"
            >
              <Sun className="h-4 w-4 mr-2" />
              Light
            </Button>
            <Button 
              variant={themeSettings.mode === 'dark' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleThemeChange('dark')}
              className="flex items-center"
            >
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </Button>
            <Button 
              variant={themeSettings.mode === 'system' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleThemeChange('system')}
              className="flex items-center"
            >
              <Monitor className="h-4 w-4 mr-2" />
              System
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: themeSettings.primaryColor }}
              />
              <Input 
                type="text" 
                id="primaryColor" 
                value={themeSettings.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: themeSettings.secondaryColor }}
              />
              <Input 
                type="text" 
                id="secondaryColor" 
                value={themeSettings.secondaryColor}
                onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accentColor">Accent Color</Label>
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: themeSettings.accentColor }}
              />
              <Input 
                type="text" 
                id="accentColor" 
                value={themeSettings.accentColor}
                onChange={(e) => handleColorChange('accentColor', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fontFamily">Font Family</Label>
          <Select 
            value={themeSettings.fontFamily}
            onValueChange={(value) => updateThemeSettings({ fontFamily: value })}
          >
            <SelectTrigger id="fontFamily">
              <SelectValue placeholder="Select a font family" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter, sans-serif">Inter</SelectItem>
              <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
              <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
              <SelectItem value="'Lato', sans-serif">Lato</SelectItem>
              <SelectItem value="'Poppins', sans-serif">Poppins</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="borderRadius">Border Radius</Label>
          <Select 
            value={themeSettings.borderRadius}
            onValueChange={(value) => updateThemeSettings({ borderRadius: value })}
          >
            <SelectTrigger id="borderRadius">
              <SelectValue placeholder="Select border radius" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">None</SelectItem>
              <SelectItem value="0.25rem">Small (0.25rem)</SelectItem>
              <SelectItem value="0.5rem">Medium (0.5rem)</SelectItem>
              <SelectItem value="0.75rem">Large (0.75rem)</SelectItem>
              <SelectItem value="1rem">Extra Large (1rem)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="customCss">Custom CSS</Label>
          <Textarea 
            id="customCss" 
            placeholder="Add custom CSS rules here"
            value={themeSettings.customCss}
            onChange={(e) => updateThemeSettings({ customCss: e.target.value })}
            rows={5}
          />
          <p className="text-sm text-muted-foreground">
            Advanced: Add custom CSS rules to further customize your store's appearance.
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveChanges}>
            <Paintbrush className="h-4 w-4 mr-2" />
            Save Theme Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppEditorTheme;
