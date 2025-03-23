
import React from 'react';
import { useParams } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg mb-4"></div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded cursor-pointer"></div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Name (ID: {id})</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500">★★★★☆</span>
              <span className="ml-1 text-sm text-muted-foreground">(24 reviews)</span>
            </div>
            
            <div className="text-2xl font-bold mb-4">$99.99</div>
            
            <p className="text-muted-foreground mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex">
                <button className="px-3 py-2 border rounded-l-md bg-secondary">-</button>
                <input 
                  type="number" 
                  className="w-16 px-3 py-2 border-y text-center" 
                  value="1" 
                  readOnly
                />
                <button className="px-3 py-2 border rounded-r-md bg-secondary">+</button>
              </div>
            </div>
            
            <div className="flex space-x-4 mb-6">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md">
                Add to Cart
              </button>
              <button className="px-6 py-2 border border-primary rounded-md">
                Add to Wishlist
              </button>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium w-24">Vendor:</span>
                <span>Vendor Name</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium w-24">Category:</span>
                <span>Electronics</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium w-24">Tags:</span>
                <span>Gadget, Tech, New</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-md mb-3"></div>
                <h3 className="font-medium">Product Name</h3>
                <p className="text-sm text-muted-foreground">$99.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
