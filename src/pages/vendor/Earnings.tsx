
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, TrendingUp, CreditCard, Download,
  Calendar, Clock, CheckCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Badge } from '@/components/ui/badge';

// Mock data for earnings chart
const monthlyEarnings = [
  { name: 'Jan', earnings: 1200 },
  { name: 'Feb', earnings: 1800 },
  { name: 'Mar', earnings: 1600 },
  { name: 'Apr', earnings: 2100 },
  { name: 'May', earnings: 1900 },
  { name: 'Jun', earnings: 2400 },
  { name: 'Jul', earnings: 2800 },
  { name: 'Aug', earnings: 3200 },
];

// Mock data for category distribution
const categoryEarnings = [
  { name: 'Electronics', value: 4200 },
  { name: 'Accessories', value: 2100 },
  { name: 'Home', value: 1300 },
  { name: 'Other', value: 900 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Mock data for top-selling products
const topProducts = [
  { name: 'Wireless Headphones', revenue: 1450, units: 29 },
  { name: 'Smart Watch', revenue: 1280, units: 16 },
  { name: 'Bluetooth Speaker', revenue: 950, units: 19 },
  { name: 'Gaming Mouse', revenue: 720, units: 18 },
  { name: 'USB-C Hub', revenue: 510, units: 17 },
];

// Mock data for payouts
const payouts = [
  { 
    id: 'PAY-001',
    amount: 1245.67,
    date: '2023-08-02',
    status: 'completed',
    method: 'Bank Transfer',
    reference: 'REF123456'
  },
  { 
    id: 'PAY-002',
    amount: 987.32,
    date: '2023-07-02',
    status: 'completed',
    method: 'PayPal',
    reference: 'REF789012'
  },
  { 
    id: 'PAY-003',
    amount: 1542.89,
    date: '2023-06-02',
    status: 'completed',
    method: 'Bank Transfer',
    reference: 'REF345678'
  },
  { 
    id: 'PAY-004',
    amount: 2187.45,
    date: '2023-05-02',
    status: 'processing',
    method: 'Bank Transfer',
    reference: 'REF901234'
  },
];

export default function VendorEarnings() {
  return (
    <DashboardLayout type="vendor">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
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
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,542.50</div>
              <Button variant="link" className="px-0 h-auto text-xs">Request Payout</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Balance</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,897.32</div>
              <p className="text-xs text-muted-foreground">Available in 7 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Payout</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,187.45</div>
              <p className="text-xs text-muted-foreground">Aug 2, 2023</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Chart and Data Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Product Performance</TabsTrigger>
            <TabsTrigger value="payouts">Payout History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Earnings Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Earnings</CardTitle>
                  <CardDescription>Your earnings over the last 8 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={monthlyEarnings}
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
                        <Tooltip 
                          formatter={(value) => [`$${value}`, 'Earnings']}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Area type="monotone" dataKey="earnings" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Earnings by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryEarnings}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryEarnings.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Your best-selling products by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topProducts}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === 'revenue') return [`$${value}`, 'Revenue'];
                          return [value, 'Units Sold'];
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue" />
                      <Bar yAxisId="right" dataKey="units" fill="#82ca9d" name="Units Sold" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-2">Product</th>
                        <th className="pb-2 text-right">Revenue</th>
                        <th className="pb-2 text-right">Units Sold</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3">{product.name}</td>
                          <td className="py-3 text-right">${product.revenue.toFixed(2)}</td>
                          <td className="py-3 text-right">{product.units}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payouts" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Payout History</CardTitle>
                  <CardDescription>Your recent payouts</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payouts.map((payout) => (
                    <div key={payout.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-full p-2 bg-green-100 text-green-600">
                          <DollarSign className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{payout.id}</h3>
                            <PayoutStatusBadge status={payout.status} className="ml-2" />
                          </div>
                          <div className="text-sm text-muted-foreground">{payout.date} • {payout.method}</div>
                          <div className="text-xs text-muted-foreground">Ref: {payout.reference}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${payout.amount.toFixed(2)}</p>
                        <Button variant="ghost" size="sm" className="text-primary h-auto px-0 py-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline">View All Transactions</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Payout Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Settings</CardTitle>
            <CardDescription>Manage your payout methods and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full p-2 bg-blue-100 text-blue-600">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Bank Account (Primary)</h3>
                      <p className="text-sm text-muted-foreground">•••• 4567 | Chase Bank</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Payout Schedule</h3>
                  <div className="flex items-center space-x-3 border rounded-lg p-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Monthly</p>
                      <p className="text-xs text-muted-foreground">Payouts processed on the 1st of each month</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Minimum Payout Amount</h3>
                  <div className="flex items-center space-x-3 border rounded-lg p-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">$50.00</p>
                      <p className="text-xs text-muted-foreground">Payouts held until minimum is reached</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>Update Settings</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function PayoutStatusBadge({ status, className }: { status: string; className?: string }) {
  switch (status) {
    case 'completed':
      return (
        <Badge className={`bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1 ${className}`}>
          <CheckCircle className="h-3 w-3" />
          Completed
        </Badge>
      );
    case 'processing':
      return (
        <Badge className={`bg-yellow-100 text-yellow-800 hover:bg-yellow-200 flex items-center gap-1 ${className}`}>
          <Clock className="h-3 w-3" />
          Processing
        </Badge>
      );
    default:
      return null;
  }
}
