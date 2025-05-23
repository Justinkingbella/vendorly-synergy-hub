
import React, { useState, useEffect } from 'react';
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
import { Paintbrush, Loader2 } from 'lucide-react';
import { 
  storeThemeSettingsTable,
  type StoreThemeSettingsInsert
} from '@/integrations/supabase/client';

const AppEditorTheme = () => {
  const { toast } = useToast();
  const { themeSettings, updateThemeSettings } = useStoreSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [storeThemeId, setStoreThemeId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchThemeSettings = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await storeThemeSettingsTable()
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
          
        if (error) {
          if (error.code !== 'PGRST116') {
            console.error('Error fetching theme settings:', error);
          }
          return;
        }
        
        if (data && typeof data === 'object') {
          const themeData = data as Record<string, any>;
          
          // Safely check if the required properties exist
          if ('id' in themeData && 
              'primary_color' in themeData && 
              'secondary_color' in themeData && 
              'accent_color' in themeData && 
              'font_family' in themeData && 
              'border_radius' in themeData) {
            
            setStoreThemeId(themeData.id as string);
            // If there are settings in the database, update the context
            updateThemeSettings({
              // Fixed: Cast string to specific literal type "light"
              mode: 'light' as 'light', // Always set to light mode
              primaryColor: (themeData.primary_color as string) || '#1a6d40', // Deep green default
              secondaryColor: (themeData.secondary_color as string) || '#e6f4ea', // Light green default
              accentColor: (themeData.accent_color as string) || '#3b82f6',
              fontFamily: (themeData.font_family as string) || 'Inter, sans-serif',
              borderRadius: (themeData.border_radius as string) || '0.5rem',
              customCss: ('custom_css' in themeData ? (themeData.custom_css as string) : '') || '',
            });
          } else {
            console.error('Theme settings data missing expected properties:', themeData);
          }
        } else {
          // If no settings exist, create a default record
          await createDefaultThemeSettings();
        }
      } catch (err) {
        console.error('Failed to fetch theme settings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const createDefaultThemeSettings = async () => {
      try {
        // Define professional default colors
        const defaultSettings = {
          mode: 'light' as 'light',
          primaryColor: '#1a6d40', // Deep green
          secondaryColor: '#e6f4ea', // Light green
          accentColor: '#3b82f6',
          fontFamily: 'Inter, sans-serif',
          borderRadius: '0.5rem',
          customCss: '',
        };
        
        // Update the context with professional defaults
        updateThemeSettings(defaultSettings);
        
        const themeData: StoreThemeSettingsInsert = {
          mode: defaultSettings.mode,
          primary_color: defaultSettings.primaryColor,
          secondary_color: defaultSettings.secondaryColor,
          accent_color: defaultSettings.accentColor,
          font_family: defaultSettings.fontFamily,
          border_radius: defaultSettings.borderRadius,
          custom_css: defaultSettings.customCss,
        };
        
        const { data, error } = await storeThemeSettingsTable()
          .insert(themeData)
          .select();
          
        if (error) {
          console.error('Error creating default theme settings:', error);
        } else if (data && Array.isArray(data) && data.length > 0) {
          const createdData = data[0] as Record<string, any>;
          if ('id' in createdData) {
            setStoreThemeId(createdData.id as string);
          }
        }
      } catch (err) {
        console.error('Failed to create default theme settings:', err);
      }
    };

    fetchThemeSettings();
  }, []);
  
  const handleColorChange = (colorType: 'primaryColor' | 'secondaryColor' | 'accentColor', value: string) => {
    updateThemeSettings({ [colorType]: value });
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      
      const themeData: StoreThemeSettingsInsert = {
        mode: 'light', // Always light mode
        primary_color: themeSettings.primaryColor,
        secondary_color: themeSettings.secondaryColor,
        accent_color: themeSettings.accentColor,
        font_family: themeSettings.fontFamily,
        border_radius: themeSettings.borderRadius,
        custom_css: themeSettings.customCss,
        updated_at: new Date().toISOString(),
      };
      
      if (storeThemeId) {
        // Update existing record
        const { error } = await storeThemeSettingsTable()
          .update(themeData)
          .eq('id', storeThemeId);
          
        if (error) throw error;
      } else {
        // Create new record if ID is not available
        const { data, error } = await storeThemeSettingsTable()
          .insert(themeData)
          .select();
          
        if (error) throw error;
        
        if (data && Array.isArray(data) && data.length > 0) {
          const createdData = data[0] as Record<string, any>;
          if ('id' in createdData) {
            setStoreThemeId(createdData.id as string);
          }
        }
      }
      
      toast({
        title: "Theme settings saved",
        description: "Your theme settings have been updated.",
      });
    } catch (err) {
      console.error('Failed to save theme settings:', err);
      toast({
        title: "Error",
        description: "Failed to save theme settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="hover:border-primary transition-colors">
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Loading theme settings...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:border-primary transition-colors">
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
        <CardDescription>
          Customize your store's appearance with professional theme options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color (Deep Green)</Label>
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
                className="focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color (Light Green)</Label>
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
                className="focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                className="focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
            <SelectTrigger id="fontFamily" className="focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <SelectValue placeholder="Select a font family" />
            </SelectTrigger>
            <SelectContent className="focus:bg-secondary">
              <SelectItem value="Inter, sans-serif" className="focus:bg-secondary focus:text-secondary-foreground">Inter</SelectItem>
              <SelectItem value="'Roboto', sans-serif" className="focus:bg-secondary focus:text-secondary-foreground">Roboto</SelectItem>
              <SelectItem value="'Open Sans', sans-serif" className="focus:bg-secondary focus:text-secondary-foreground">Open Sans</SelectItem>
              <SelectItem value="'Lato', sans-serif" className="focus:bg-secondary focus:text-secondary-foreground">Lato</SelectItem>
              <SelectItem value="'Poppins', sans-serif" className="focus:bg-secondary focus:text-secondary-foreground">Poppins</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="borderRadius">Border Radius</Label>
          <Select 
            value={themeSettings.borderRadius}
            onValueChange={(value) => updateThemeSettings({ borderRadius: value })}
          >
            <SelectTrigger id="borderRadius" className="focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <SelectValue placeholder="Select border radius" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0" className="focus:bg-secondary focus:text-secondary-foreground">None</SelectItem>
              <SelectItem value="0.25rem" className="focus:bg-secondary focus:text-secondary-foreground">Small (0.25rem)</SelectItem>
              <SelectItem value="0.5rem" className="focus:bg-secondary focus:text-secondary-foreground">Medium (0.5rem)</SelectItem>
              <SelectItem value="0.75rem" className="focus:bg-secondary focus:text-secondary-foreground">Large (0.75rem)</SelectItem>
              <SelectItem value="1rem" className="focus:bg-secondary focus:text-secondary-foreground">Extra Large (1rem)</SelectItem>
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
            className="focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
          />
          <p className="text-sm text-muted-foreground">
            Advanced: Add custom CSS rules to further customize your store's appearance.
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Paintbrush className="h-4 w-4 mr-2" />
                Save Theme Settings
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppEditorTheme;
