
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { useStoreSettings } from '@/context/StoreSettingsContext';

interface StoreLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  pageId?: string; // For dynamic content pages
}

const StoreLayout = ({ 
  children,
  title,
  description,
  pageId
}: StoreLayoutProps) => {
  const { storeInfo, pages } = useStoreSettings();
  
  // If a pageId is provided, use the SEO data from the page content
  let seoTitle = title;
  let seoDescription = description;
  
  if (pageId && pages[pageId]) {
    seoTitle = pages[pageId].seoTitle;
    seoDescription = pages[pageId].seoDescription;
  }
  
  // If no title is provided, use the store name as default
  if (!seoTitle) {
    seoTitle = storeInfo.storeName;
  }
  
  // If no description is provided, use the store description as default
  if (!seoDescription) {
    seoDescription = storeInfo.storeDescription;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title={seoTitle} 
        description={seoDescription} 
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default StoreLayout;
