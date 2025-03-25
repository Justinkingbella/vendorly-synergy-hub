
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import StoreFrontFooter from '@/components/StoreFrontFooter';

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <StoreFrontFooter />
    </div>
  );
};

export default StoreLayout;
