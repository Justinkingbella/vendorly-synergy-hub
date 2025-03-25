
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';

interface StoreLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const StoreLayout = ({ 
  children,
  title,
  description
}: StoreLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO title={title} description={description} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default StoreLayout;
