
import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface ContentPageProps {
  pageId: string;
}

const ContentPage: React.FC<ContentPageProps> = ({ pageId }) => {
  const { pages } = useStoreSettings();
  const navigate = useNavigate();
  const pageContent = pages[pageId];

  useEffect(() => {
    // If page doesn't exist or is not active, redirect to 404
    if (!pageContent || !pageContent.isActive) {
      navigate('/not-found');
    }
  }, [pageContent, navigate]);

  if (!pageContent || !pageContent.isActive) {
    return null;
  }

  return (
    <StoreLayout title={pageContent.seoTitle} description={pageContent.seoDescription} pageId={pageId}>
      {/* Page Banner */}
      {pageContent.bannerImage && (
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-black">
          <img 
            src={pageContent.bannerImage} 
            alt={pageContent.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {pageContent.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              {pageContent.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* If no banner, display the title and subtitle here */}
        {!pageContent.bannerImage && (
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {pageContent.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {pageContent.subtitle}
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-3xl mx-auto prose dark:prose-invert prose-lg prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary">
          <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
        </div>
      </div>
    </StoreLayout>
  );
};

export default ContentPage;
