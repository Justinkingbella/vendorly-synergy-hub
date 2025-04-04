
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useStoreSettings } from '@/context/StoreSettingsContext';

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  setCustomStyles: (styles: Record<string, string>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeSettings } = useStoreSettings();
  const [customStyles, setCustomStyles] = useState<Record<string, string>>({});

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Always apply light theme
    root.classList.remove('dark');
    root.classList.add('light');
    
    // Apply theme styles based on theme settings
    applyThemeStyles(themeSettings);
  }, [themeSettings]);

  // Apply custom styles when they change
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply each style in the customStyles object
    Object.entries(customStyles).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    return () => {
      // Clean up custom styles when component unmounts
      Object.keys(customStyles).forEach(property => {
        root.style.removeProperty(property);
      });
    };
  }, [customStyles]);

  return (
    <ThemeContext.Provider value={{ setCustomStyles }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyThemeStyles(themeSettings: any) {
  const root = document.documentElement;
  
  // Set the primary color (deep green)
  root.style.setProperty('--primary', themeSettings.primaryColor);
  
  // Set the secondary color (light green)
  root.style.setProperty('--secondary', themeSettings.secondaryColor);
  
  // Set the accent color
  root.style.setProperty('--accent', themeSettings.accentColor);
  
  // Set the border radius
  root.style.setProperty('--radius', themeSettings.borderRadius);
  
  // Set the font family
  root.style.setProperty('--font-family', themeSettings.fontFamily);
  
  // Set text colors
  root.style.setProperty('--foreground-color', 'hsl(0, 0%, 0%)');
  root.style.setProperty('--muted-foreground-color', 'hsl(0, 0%, 45%)');
  
  // Apply custom CSS if available
  if (themeSettings.customCss) {
    let style = document.getElementById('custom-theme-styles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'custom-theme-styles';
      document.head.appendChild(style);
    }
    style.textContent = themeSettings.customCss;
  }
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
