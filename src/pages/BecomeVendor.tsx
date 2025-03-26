
import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BecomeVendor = () => {
  const { pages } = useStoreSettings();
  const vendorPage = pages.vendor;
  
  return (
    <StoreLayout 
      title={vendorPage.seoTitle} 
      description={vendorPage.seoDescription}
      pageId="vendor"
    >
      {/* Banner Section */}
      {vendorPage.bannerImage && (
        <div className="relative w-full h-80 overflow-hidden">
          <img 
            src={vendorPage.bannerImage} 
            alt="Become a vendor" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold text-white mb-4">{vendorPage.title}</h1>
            <p className="text-xl text-white/90 max-w-2xl">{vendorPage.subtitle}</p>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="container mx-auto py-12 px-4 md:px-6">
        {!vendorPage.bannerImage && (
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{vendorPage.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{vendorPage.subtitle}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-3xl mx-auto prose dark:prose-invert prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground">
          <div dangerouslySetInnerHTML={{ __html: vendorPage.content }} />
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link to="/vendor/register">Apply to become a vendor</Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Already a vendor? <Link to="/vendor/dashboard" className="text-primary hover:underline">Sign in to your dashboard</Link>
          </p>
        </div>
      </div>
    </StoreLayout>
  );
};

export default BecomeVendor;
