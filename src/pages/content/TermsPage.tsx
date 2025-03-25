
import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { useStoreSettings } from '@/context/StoreSettingsContext';

const TermsPage = () => {
  const { pages } = useStoreSettings();
  const pageData = pages.terms;

  return (
    <StoreLayout pageId="terms">
      <div className="container mx-auto px-4 py-8">
        {pageData.bannerImage && (
          <div className="w-full aspect-[3/1] overflow-hidden rounded-lg mb-8">
            <img 
              src={pageData.bannerImage} 
              alt={pageData.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{pageData.title}</h1>
            <p className="text-lg text-muted-foreground">{pageData.subtitle}</p>
          </div>
          
          <div className="bg-card border rounded-lg p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

export default TermsPage;
