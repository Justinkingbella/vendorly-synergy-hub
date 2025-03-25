
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Premium Bluetooth Headphones",
    price: 899.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300",
    vendor: "AudioTech"
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 249.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=300",
    vendor: "EcoWear"
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 159.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=300",
    vendor: "EcoLiving"
  }
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);
  
  const handleQuantityChange = (id: number, change: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };
  
  const handleRemoveItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 79.99;
  const total = subtotal + shipping;
  
  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-24 h-24 bg-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">Vendor: {item.vendor}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 text-right">
                              <p className="font-medium">N${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handleQuantityChange(item.id, -1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-10 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
                <Button onClick={() => setItems([])}>Clear Cart</Button>
              </div>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>N${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>N${shipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="pt-3">
                      <div className="relative">
                        <Input 
                          placeholder="Enter coupon code" 
                          className="pr-20"
                        />
                        <Button 
                          className="absolute right-0 top-0 rounded-l-none"
                          size="sm"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>N${total.toFixed(2)}</span>
                    </div>
                    
                    <Button className="w-full" size="lg" asChild>
                      <Link to="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <div className="text-xs text-muted-foreground text-center mt-2">
                      Secure payments provided via PayGate
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild size="lg">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </StoreLayout>
  );
};

export default Cart;
