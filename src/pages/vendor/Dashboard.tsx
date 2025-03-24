
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, DollarSign, ShoppingBag, Package, TrendingUp, 
  ArrowUpRight, ArrowDownRight, AlertCircle 
} from 'lucide-react';
import VendorLayout from '@/components/layout/VendorLayout';
import { AreaChart, Area, LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'react-router-dom';

// Mock data for the dashboard
const revenueData = [
  { name: 'Jan', revenue: 2000 },
  { name: 'Feb', revenue: 1500 },
  { name: 'Mar', revenue: 2500 },
  { name: 'Apr', revenue: 3000 },
  { name: 'May', revenue: 2800 },
  { name: 'Jun', revenue: 3200 },
  { name: 'Jul', revenue: 3500 },
];

const orderData = [
  { name: 'Jan', orders: 25 },
  { name: 'Feb', orders: 20 },
  { name: 'Mar', orders: 30 },
  { name: 'Apr', orders: 35 },
  { name: 'May', orders: 32 },
  { name: 'Jun', orders: 40 },
  { name: 'Jul', orders: 45 },
];

const VendorDashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAdminView = searchParams.get('admin_view') === 'true';
  const vendorId = searchParams.get('vendor_id');

  return (
    <VendorLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">$23,856.40</h3>
                  <p className="flex items-center text-sm text-green-500 mt-1">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +15.3% from last month
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">548</h3>
                  <p className="flex items-center text-sm text-green-500 mt-1">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +8.7% from last month
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Products</p>
                  <h3 className="text-2xl font-bold mt-1">72</h3>
                  <p className="flex items-center text-sm text-green-500 mt-1">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +3 new this month
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Commission Rate</p>
                  <h3 className="text-2xl font-bold mt-1">8.5%</h3>
                  <div className="mt-1">
                    <Badge variant="outline" className="bg-primary/10 text-primary">Premium Vendor</Badge>
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#0ea5e9" 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={orderData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#8884d8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
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
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">Order #{200000 + i}</p>
                      <p className="text-sm text-muted-foreground">
                        {['Smartphone XS', 'Wireless Earbuds', 'Smart Watch', 'Bluetooth Speaker', 'Tablet Pro'][i]}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(Math.random() * 200 + 50).toFixed(2)}</p>
                      <Badge variant={['success', 'success', 'processing', 'processing', 'delivered'][i]} className={
                        i < 2 ? 'bg-green-100 text-green-800' : 
                        i < 4 ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }>
                        {['Shipped', 'Shipped', 'Processing', 'Processing', 'Delivered'][i]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Subscription Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">Premium Plan</p>
                    <p className="text-sm text-muted-foreground">Active until Dec 31, 2023</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Plan Benefits:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                      Reduced commission rate (8.5%)
                    </li>
                    <li className="flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                      Priority customer support
                    </li>
                    <li className="flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                      Featured in marketplace
                    </li>
                    <li className="flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                      Advanced analytics
                    </li>
                  </ul>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="flex items-center text-sm">
                    <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                    Your plan will auto-renew on Dec 31, 2023
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;
