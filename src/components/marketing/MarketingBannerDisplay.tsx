
import React, { useState, useEffect } from 'react';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import MarketingBanner from './MarketingBanner';

const MarketingBannerDisplay: React.FC = () => {
  const { getActiveMarketingBanners } = useStoreSettings();
  const [topBanner, setTopBanner] = useState<any | null>(null);
  const [bottomBanner, setBottomBanner] = useState<any | null>(null);
  const [dismissedBanners, setDismissedBanners] = useState<string[]>([]);

  useEffect(() => {
    // Get dismissed banners from local storage
    const storedDismissed = localStorage.getItem('dismissedMarketingBanners');
    if (storedDismissed) {
      setDismissedBanners(JSON.parse(storedDismissed));
    }
    
    // Load active banners that haven't been dismissed
    const activeBanners = getActiveMarketingBanners().filter(
      banner => !dismissedBanners.includes(banner.id)
    );
    
    // Set top banner if available
    const topBannerItem = activeBanners.find(banner => banner.position === 'top');
    if (topBannerItem) {
      setTopBanner(topBannerItem);
    }
    
    // Set bottom banner if available
    const bottomBannerItem = activeBanners.find(banner => banner.position === 'bottom');
    if (bottomBannerItem) {
      setBottomBanner(bottomBannerItem);
    }
  }, [getActiveMarketingBanners, dismissedBanners]);

  const handleDismiss = (bannerId: string) => {
    const updatedDismissed = [...dismissedBanners, bannerId];
    setDismissedBanners(updatedDismissed);
    localStorage.setItem('dismissedMarketingBanners', JSON.stringify(updatedDismissed));
    
    if (topBanner && topBanner.id === bannerId) {
      setTopBanner(null);
    }
    if (bottomBanner && bottomBanner.id === bannerId) {
      setBottomBanner(null);
    }
  };

  return (
    <>
      {topBanner && (
        <div className="sticky top-0 z-50 w-full">
          <MarketingBanner
            title={topBanner.title}
            content={topBanner.content}
            backgroundColor={topBanner.backgroundColor}
            textColor={topBanner.textColor}
            buttonText={topBanner.buttonText}
            buttonLink={topBanner.buttonLink}
            buttonColor={topBanner.buttonColor}
            onClose={() => handleDismiss(topBanner.id)}
          />
        </div>
      )}
      
      {bottomBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <MarketingBanner
            title={bottomBanner.title}
            content={bottomBanner.content}
            backgroundColor={bottomBanner.backgroundColor}
            textColor={bottomBanner.textColor}
            buttonText={bottomBanner.buttonText}
            buttonLink={bottomBanner.buttonLink}
            buttonColor={bottomBanner.buttonColor}
            onClose={() => handleDismiss(bottomBanner.id)}
          />
        </div>
      )}
    </>
  );
};

export default MarketingBannerDisplay;
