
import React from 'react';
import StoreFrontNav from '../StoreFrontNav';
import StoreFrontFooter from '../StoreFrontFooter';

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <StoreFrontNav />
      <main className="flex-1">{children}</main>
      <StoreFrontFooter />
    </div>
  );
};

export default StoreLayout;
