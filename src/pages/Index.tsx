
import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';

export default function Index() {
  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Welcome to VendorHub</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your premium multi-vendor marketplace for quality products
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-secondary/20 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Shop Products</h3>
              <p className="mb-4">Discover thousands of products from verified vendors</p>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Sell With Us</h3>
              <p className="mb-4">Become a vendor and grow your business globally</p>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Exclusive Deals</h3>
              <p className="mb-4">Get access to special discounts and promotions</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-md mb-3"></div>
                <h3 className="font-medium">Product Name</h3>
                <p className="text-sm text-muted-foreground">$99.99</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Toys'].map((category) => (
              <div key={category} className="border rounded-lg p-4 text-center hover:bg-secondary/10 transition-colors">
                <h3 className="font-medium">{category}</h3>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Vendors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full mb-3"></div>
                <h3 className="font-medium text-center">Vendor Name</h3>
                <p className="text-sm text-muted-foreground text-center">100+ products</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </StoreLayout>
  );
}
