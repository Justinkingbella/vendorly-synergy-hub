
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { 
  appSettingsTable, 
  type AppSetting,
  type InsertAppSetting
} from '@/integrations/supabase/client';

interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  isLoading: boolean;
}

const defaultSettings: AppSettings = {
  theme: 'light',
  notifications: true,
  fontSize: 'medium',
};

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        
        // Try to get settings from Supabase
        const { data, error } = await appSettingsTable()
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          // PGRST116 means no rows returned, which is fine for a new app
          console.error('Error fetching app settings:', error);
          throw error;
        }
        
        if (data) {
          setSettings({
            theme: data.theme as 'light' | 'dark' | 'system',
            notifications: !!data.notifications,
            fontSize: data.font_size as 'small' | 'medium' | 'large',
          });
        } else {
          // If no settings found, create default settings
          const appData: InsertAppSetting = {
            theme: defaultSettings.theme,
            notifications: defaultSettings.notifications,
            font_size: defaultSettings.fontSize,
          };
          
          const { error: insertError } = await appSettingsTable()
            .insert([appData]);
            
          if (insertError) {
            console.error('Error creating default app settings:', insertError);
            // Fall back to default settings if insert fails
          }
        }
      } catch (err) {
        console.error('Failed to fetch app settings:', err);
        // Fall back to localStorage if Supabase fails
        const savedSettings = localStorage.getItem('app-settings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);
      
      // Try to save to local storage as backup
      localStorage.setItem('app-settings', JSON.stringify(updatedSettings));
      
      // Get the latest settings record
      const { data } = await appSettingsTable()
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      if (data?.id) {
        // Update existing settings
        const updateData: InsertAppSetting = {
          theme: updatedSettings.theme,
          notifications: updatedSettings.notifications,
          font_size: updatedSettings.fontSize,
          updated_at: new Date().toISOString(),
        };
        
        const { error } = await appSettingsTable()
          .update(updateData)
          .eq('id', data.id);
          
        if (error) {
          throw error;
        }
      }
    } catch (err) {
      console.error('Failed to update app settings:', err);
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AppSettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  
  if (context === undefined) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  
  return context;
};

export default useAppSettings;
