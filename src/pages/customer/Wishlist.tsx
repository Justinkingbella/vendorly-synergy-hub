
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
};

// Mock data for wishlist
const wishlistItems: WishlistItem[] = [
  {
    id: 'prod-001',
    name: 'Wireless Noise Cancelling Headphones',
    price: 129.99,
    originalPrice: 169.99,
    image: 'https://placehold.co/100x100',
    inStock: true
  },
  {
    id: 'prod-002',
    name: 'Smart Fitness Watch',
    price: 89.99,
    image: 'https://placehold.co/100x100',
    inStock: true
  },
  {
    id: 'prod-003',
    name: 'Ultra HD Smart TV 55"',
    price: 499.99,
    originalPrice: 649.99,
    image: 'https://placehold.co/100x100',
    inStock: false
  },
  {
    id: 'prod-004',
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    image: 'https://placehold.co/100x100',
    inStock: true
  },
  {
    id: 'prod-005',
    name: 'Ergonomic Gaming Chair',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://placehold.co/100x100',
    inStock: true
  }
];

export default function CustomerWishlist() {
  return (
    <DashboardLayout type="customer">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Your Wishlist</h2>
            <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
          </div>
          <Button variant="outline" size="sm">Clear All</Button>
        </div>
        
        <div className="grid gap-4">
          {wishlistItems.map((item) => (
            <WishlistItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function WishlistItemCard({ item }: { item: WishlistItem }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img src={item.image} alt={item.name} className="h-20 w-20 rounded-md object-cover" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium truncate">{item.name}</h3>
            
            <div className="flex items-center mt-1">
              <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
              {item.originalPrice && (
                <span className="ml-2 text-sm text-muted-foreground line-through">
                  ${item.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="mt-1">
              {item.inStock ? (
                <span className="text-sm text-green-600">In Stock</span>
              ) : (
                <span className="text-sm text-red-500">Out of Stock</span>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8" 
              disabled={!item.inStock}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 text-red-500"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
