
import { useStoreSettings } from '@/context/StoreSettingsContext';

/**
 * A hook that provides access to app settings with
 * convenient methods for specific components
 */
export const useAppSettings = () => {
  const storeSettings = useStoreSettings();
  
  // Get active navigation links
  const getActiveNavLinks = () => {
    return storeSettings.navLinks.filter(link => link.isActive);
  };
  
  // Get store icon by name (for features, etc.)
  const getIconByName = (iconName: string) => {
    // This is a placeholder. In a real app, you would dynamically import icons
    return iconName;
  };
  
  // Get page content by ID
  const getPageContent = (pageId: string) => {
    if (storeSettings.pages[pageId]) {
      return storeSettings.pages[pageId];
    }
    return null;
  };
  
  // Get store info
  const getStoreInfo = () => {
    return storeSettings.storeInfo;
  };
  
  // Get banner images
  const getBanners = () => {
    return storeSettings.banners;
  };
  
  // Get features
  const getFeatures = () => {
    return storeSettings.features;
  };
  
  // Get footer columns
  const getFooterColumns = () => {
    return storeSettings.footerColumns;
  };
  
  // Get contact info
  const getContactInfo = () => {
    return storeSettings.contactInfo;
  };
  
  return {
    getActiveNavLinks,
    getIconByName,
    getPageContent,
    getStoreInfo,
    getBanners,
    getFeatures,
    getFooterColumns,
    getContactInfo,
    ...storeSettings,
  };
};
