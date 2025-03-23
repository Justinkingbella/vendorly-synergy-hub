
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, DollarSign, ShoppingBag, TrendingUp, 
  TrendingDown, Users, Package, ShoppingCart, Star
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for sales chart
const salesData = [
  { name: 'Jan', total: 1800 },
  { name: 'Feb', total: 2200 },
  { name: 'Mar', total: 2700 },
  { name: 'Apr', total: 2400 },
  { name: 'May', total: 2900 },
  { name: 'Jun', total: 3200 },
  { name: 'Jul', total: 3700 },
];

// Mock data for recent orders
const recentOrders = [
  { id: 'ORD-007', product: 'Wireless Headphones', customer: 'John D.', date: '2023-08-15', status: 'shipped', total: 89.99 },
  { id: 'ORD-006', product: 'Smart Watch', customer: 'Sarah T.', date: '2023-08-14', status: 'processing', total: 199.99 },
  { id: 'ORD-005', product: 'Bluetooth Speaker', customer: 'Mike R.', date: '2023-08-13', status: 'delivered', total: 59.99 },
  { id: 'ORD-004', product: 'Ergonomic Keyboard', customer: 'Emily L.', date: '2023-08-12', status: 'processing', total: 129.99 },
];

// Mock data for top products
const topProducts = [
  { id: 1, name: 'Wireless Headphones', sales: 342, revenue: 30749.58, rating: 4.8 },
  { id: 2, name: 'Smart Watch', sales: 278, revenue: 55557.22, rating: 4.9 },
  { id: 3, name: 'Bluetooth Speaker', sales: 213, revenue: 12777.87, rating: 4.5 },
  { id: 4, name: 'Ergonomic Keyboard', sales: 187, revenue: 24308.13, rating: 4.6 },
];

export default function VendorDashboard() {
  return (
    <DashboardLayout type="vendor">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$14,532.89</div>
              <p className="text-xs text-green-600 flex items-center font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-green-600 flex items-center font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">27</div>
              <p className="text-xs text-green-600 flex items-center font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3 new this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">254</div>
              <p className="text-xs text-green-600 flex items-center font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18 new this month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Sales Overview Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Your sales performance for the last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for Orders and Products */}
        <Tabs defaultValue="recent-orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="top-products">Top Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent-orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your most recent orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-4 py-3">Order ID</th>
                        <th scope="col" className="px-4 py-3">Product</th>
                        <th scope="col" className="px-4 py-3">Customer</th>
                        <th scope="col" className="px-4 py-3">Date</th>
                        <th scope="col" className="px-4 py-3">Status</th>
                        <th scope="col" className="px-4 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b dark:border-gray-700">
                          <td className="px-4 py-3 font-medium">{order.id}</td>
                          <td className="px-4 py-3">{order.product}</td>
                          <td className="px-4 py-3">{order.customer}</td>
                          <td className="px-4 py-3">{order.date}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">${order.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="top-products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Your best-selling products by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-4 py-3">Product</th>
                        <th scope="col" className="px-4 py-3">Sales</th>
                        <th scope="col" className="px-4 py-3">Revenue</th>
                        <th scope="col" className="px-4 py-3">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product) => (
                        <tr key={product.id} className="border-b dark:border-gray-700">
                          <td className="px-4 py-3 font-medium">{product.name}</td>
                          <td className="px-4 py-3">{product.sales}</td>
                          <td className="px-4 py-3">${product.revenue.toFixed(2)}</td>
                          <td className="px-4 py-3 flex items-center">
                            {product.rating}
                            <Star className="ml-1 h-3 w-3 text-yellow-400 fill-yellow-400" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
