
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Package, Heart, UserCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Order {
  id: string;
  date: string;
  status: string;
  items: number;
  total: number;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

const CustomerDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // If no session, redirect to login
          window.location.href = '/auth';
          return;
        }
        
        // Fetch user data
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (userError) throw userError;
        
        setUser(userData);
        
        // In a real app, we would fetch real orders and wishlist data
        // For this implementation, we'll still use mock data but would make real queries
        // to 'orders' and 'wishlist' tables
        
        // Mock recent orders - in production this would be real data
        setRecentOrders([
          { id: '38927', date: '2023-11-15', status: 'Delivered', items: 3, total: 159.99 },
          { id: '38765', date: '2023-11-05', status: 'Shipped', items: 1, total: 79.99 },
          { id: '38611', date: '2023-10-25', status: 'Processing', items: 2, total: 124.50 },
        ]);
        
        // Mock wishlist items - in production this would be real data
        setWishlistItems([
          { id: '1', name: 'Wireless Noise-Cancelling Headphones', price: 249.99, inStock: true },
          { id: '2', name: 'Smartphone Gimbal Stabilizer', price: 119.99, inStock: true },
          { id: '3', name: '4K Ultra HD Smart TV - 55"', price: 599.99, inStock: false },
        ]);
        
      } catch (err) {
        console.error('Error fetching user data:', err);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <CustomerLayout>
        <div className="p-6 flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <UserCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Welcome back, {user?.name || 'Customer'}!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Member since {new Date(user?.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/customer/settings">Edit Profile</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/products">Browse Products</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-full mr-3">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">My Orders</h3>
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-bold">{recentOrders.length}</p>
                  <p className="text-sm text-muted-foreground">total orders placed</p>
                </div>
                <Button variant="ghost" className="mt-4 w-full justify-start" asChild>
                  <Link to="/customer/orders">
                    <span>View Order History</span>
                    <span className="ml-auto">→</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary/10 rounded-full mr-3">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">My Wishlist</h3>
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-bold">{wishlistItems.length}</p>
                  <p className="text-sm text-muted-foreground">items saved for later</p>
                </div>
                <Button variant="ghost" className="mt-4 w-full justify-start" asChild>
                  <Link to="/customer/wishlist">
                    <span>View Wishlist</span>
                    <span className="ml-auto">→</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="text-center py-6">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                  <Button className="mt-4" asChild>
                    <Link to="/products">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date} • {order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <Badge variant="outline" className={
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                          'bg-amber-100 text-amber-800'
                        }>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to="/customer/orders">View All Orders</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-6">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Your wishlist is empty.</p>
                  <Button className="mt-4" asChild>
                    <Link to="/products">Discover Products</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={
                          item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }>
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to="/customer/wishlist">View Wishlist</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
