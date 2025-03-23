
import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { useParams } from 'react-router-dom';

export default function Products() {
  const { id } = useParams();
  const pageType = id ? `Category: ${id}` : 'All Products';

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{pageType}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar filters */}
          <div className="hidden md:block space-y-6">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <ul className="space-y-1">
                {['Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports'].map((cat) => (
                  <li key={cat} className="text-sm hover:text-primary cursor-pointer">{cat}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="flex items-center">
                <input type="range" className="w-full" />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Vendor</h3>
              <ul className="space-y-1">
                {['Vendor A', 'Vendor B', 'Vendor C'].map((vendor) => (
                  <li key={vendor} className="text-sm hover:text-primary cursor-pointer">{vendor}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="col-span-1 md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">Showing 1-12 of 120 products</div>
              <select className="text-sm border rounded-md p-1">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100 rounded-md mb-3"></div>
                  <h3 className="font-medium">Product Name</h3>
                  <p className="text-sm text-muted-foreground mb-2">$99.99</p>
                  <div className="flex items-center text-sm">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="ml-1 text-muted-foreground">(24)</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <nav className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 rounded ${
                      page === 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
