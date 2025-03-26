
import React from 'react';
import { Link } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { useStoreSettings } from '@/context/StoreSettingsContext';

const NotFound = () => {
  const { storeInfo } = useStoreSettings();

  return (
    <StoreLayout 
      title="Page Not Found" 
      description="We couldn't find the page you were looking for."
    >
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
        </div>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          We're sorry, but the page you requested could not be found. It seems that the page you were 
          trying to reach doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products">
              <Search className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
          </Button>
          <Button variant="ghost" onClick={() => history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </StoreLayout>
  );
};

export default NotFound;
