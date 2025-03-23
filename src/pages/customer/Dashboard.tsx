
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, CreditCard, Clock, CheckCircle, Package,
  TrendingUp, Heart, Bell
} from 'lucide-react';

// Mock data for recent orders
const recentOrders = [
  { id: 'ORD-001', product: 'Wireless Headphones', date: '2023-08-15', status: 'delivered', price: 89.99 },
  { id: 'ORD-002', product: 'Smart Watch', date: '2023-08-10', status: 'shipped', price: 199.99 },
  { id: 'ORD-003', product: 'Bluetooth Speaker', date: '2023-08-05', status: 'processing', price: 59.99 },
];

export default function CustomerDashboard() {
  return (
    <DashboardLayout type="customer">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 in the last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">2 items back in stock</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">1 arriving tomorrow</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,234.56</div>
              <p className="text-xs text-muted-foreground">+$349.99 this month</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for quick actions */}
        <Tabs defaultValue="recent-orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="saved-items">Saved Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent-orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your last 3 orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center space-x-4">
                        <div className={`rounded-full p-2 ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {order.status === 'delivered' ? <CheckCircle className="h-4 w-4" /> :
                           order.status === 'shipped' ? <TrendingUp className="h-4 w-4" /> :
                           <Clock className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{order.product}</p>
                          <p className="text-sm text-muted-foreground">{order.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.price}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Stay updated with your orders and wishlist</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Bell className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Your order ORD-002 has been shipped!</p>
                      <p className="text-sm text-muted-foreground">10 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Heart className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">The Bluetooth Speaker you liked is now back in stock</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Your order ORD-001 has been delivered</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="saved-items">
            <Card>
              <CardHeader>
                <CardTitle>Saved Items</CardTitle>
                <CardDescription>Products you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">Noise Cancelling Headphones</p>
                        <p className="text-sm text-muted-foreground">$129.99</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <ShoppingBag className="h-5 w-5 cursor-pointer text-primary" />
                      <Heart className="h-5 w-5 cursor-pointer text-red-500 fill-red-500" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">Portable Power Bank</p>
                        <p className="text-sm text-muted-foreground">$49.99</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <ShoppingBag className="h-5 w-5 cursor-pointer text-primary" />
                      <Heart className="h-5 w-5 cursor-pointer text-red-500 fill-red-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
