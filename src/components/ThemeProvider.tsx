
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useStoreSettings } from '@/context/StoreSettingsContext';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeSettings } = useStoreSettings();
  const [theme, setTheme] = useState<Theme>(themeSettings.mode);

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
      
      // Apply custom CSS variables based on theme settings
      applyThemeStyles(themeSettings, systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      
      // Apply custom CSS variables based on theme settings
      applyThemeStyles(themeSettings, theme);
    }
  }, [theme, themeSettings]);

  // Update theme when theme settings change
  useEffect(() => {
    setTheme(themeSettings.mode);
  }, [themeSettings.mode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyThemeStyles(themeSettings: any, currentTheme: 'light' | 'dark') {
  const root = document.documentElement;
  
  // Set the primary color
  root.style.setProperty('--primary', themeSettings.primaryColor);
  
  // Set the secondary color
  root.style.setProperty('--secondary', themeSettings.secondaryColor);
  
  // Set the accent color
  root.style.setProperty('--accent', themeSettings.accentColor);
  
  // Set the border radius
  root.style.setProperty('--radius', themeSettings.borderRadius);
  
  // Set the font family
  root.style.setProperty('--font-family', themeSettings.fontFamily);
  
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
