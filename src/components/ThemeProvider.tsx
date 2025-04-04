import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useStoreSettings } from '@/context/StoreSettingsContext';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark'; // Always resolves to either light or dark
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeSettings } = useStoreSettings();
  const [theme, setTheme] = useState<Theme>(themeSettings.mode);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'light';
      // If system, toggle based on current resolved theme
      return resolvedTheme === 'dark' ? 'light' : 'dark';
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Function to detect system preference
    const detectSystemTheme = () => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    };

    // Function to apply theme to document
    const applyTheme = (newTheme: 'light' | 'dark') => {
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      setResolvedTheme(newTheme);
      
      // Apply custom CSS variables based on theme settings
      applyThemeStyles(themeSettings, newTheme);
    };

    // Apply theme based on current setting
    if (theme === 'system') {
      const systemTheme = detectSystemTheme();
      applyTheme(systemTheme);
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        if (theme === 'system') {
          applyTheme(detectSystemTheme());
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme as 'light' | 'dark');
    }
  }, [theme, themeSettings]);

  // Update theme when theme settings change
  useEffect(() => {
    setTheme(themeSettings.mode);
  }, [themeSettings.mode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, toggleTheme }}>
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
  
  // Apply custom color overrides based on theme
  if (currentTheme === 'light') {
    // Light mode - black main text, grey secondary text
    root.style.setProperty('--foreground-color-override', 'hsl(0, 0%, 0%)');
    root.style.setProperty('--muted-foreground-color-override', 'hsl(0, 0%, 70%)');
  } else {
    // Dark mode - keep default dark mode colors
    root.style.removeProperty('--foreground-color-override');
    root.style.removeProperty('--muted-foreground-color-override');
  }
  
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
