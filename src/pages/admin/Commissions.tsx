
import React from 'react';
import { 
  DollarSign, Percent, Settings, TrendingUp, 
  Download, ArrowUpRight, Store, PieChart
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  PieChart as ReChartsPie,
  Pie,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock commission data
const commissionByCategory = [
  { name: 'Electronics', value: 45000, rate: 15 },
  { name: 'Fashion', value: 28000, rate: 20 },
  { name: 'Home', value: 15000, rate: 18 },
  { name: 'Beauty', value: 9000, rate: 22 },
  { name: 'Books', value: 7000, rate: 12 },
  { name: 'Other', value: 6000, rate: 20 },
];

const commissionHistory = [
  { month: 'Jan', earnings: 20000 },
  { month: 'Feb', earnings: 22000 },
  { month: 'Mar', earnings: 25000 },
  { month: 'Apr', earnings: 27000 },
  { month: 'May', earnings: 30000 },
  { month: 'Jun', earnings: 28000 },
  { month: 'Jul', earnings: 32000 },
  { month: 'Aug', earnings: 35000 },
  { month: 'Sep', earnings: 38000 },
  { month: 'Oct', earnings: 42000 },
  { month: 'Nov', earnings: 45000 },
  { month: 'Dec', earnings: 50000 },
];

const topVendors = [
  { id: 1, name: 'TechGadgets', totalSales: 150000, commission: 15000, rate: 10 },
  { id: 2, name: 'FashionHub', totalSales: 120000, commission: 24000, rate: 20 },
  { id: 3, name: 'HomeDecor', totalSales: 90000, commission: 16200, rate: 18 },
  { id: 4, name: 'BeautyStore', totalSales: 85000, commission: 17000, rate: 20 },
  { id: 5, name: 'GadgetWorld', totalSales: 80000, commission: 12000, rate: 15 },
  { id: 6, name: 'SportsFit', totalSales: 75000, commission: 15000, rate: 20 },
  { id: 7, name: 'KitchenPlus', totalSales: 70000, commission: 12600, rate: 18 },
  { id: 8, name: 'BookCorner', totalSales: 65000, commission: 7800, rate: 12 },
];

const commissionRates = [
  { category: 'Electronics', standardRate: 15, premiumRate: 10, description: 'All electronic devices and gadgets' },
  { category: 'Fashion', standardRate: 20, premiumRate: 15, description: 'Clothing, shoes, and accessories' },
  { category: 'Home & Garden', standardRate: 18, premiumRate: 12, description: 'Home decor, furniture, and garden supplies' },
  { category: 'Beauty', standardRate: 22, premiumRate: 18, description: 'Cosmetics, skincare, and beauty products' },
  { category: 'Books & Media', standardRate: 12, premiumRate: 8, description: 'Books, e-books, and media content' },
  { category: 'Sports & Outdoors', standardRate: 20, premiumRate: 15, description: 'Sporting goods and outdoor equipment' },
  { category: 'Toys & Games', standardRate: 20, premiumRate: 15, description: 'Toys, games, and entertainment' },
  { category: 'Food & Grocery', standardRate: 15, premiumRate: 10, description: 'Food products and groceries' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AdminCommissions = () => {
  const [timeRange, setTimeRange] = React.useState('year');
  
  // Calculate total commission
  const totalCommission = commissionByCategory.reduce((sum, item) => sum + item.value, 0);
  const averageRate = Math.round(
    commissionByCategory.reduce((sum, item) => sum + (item.value * item.rate), 0) / totalCommission
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Commission Management</h1>
          <div className="space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              Commission Settings
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Commission Earnings</p>
                  <h3 className="text-3xl font-bold mt-1">${totalCommission.toLocaleString()}</h3>
                  <p className="flex items-center text-sm text-green-500 mt-1">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +12.5% from last year
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
                  <p className="text-sm font-medium text-muted-foreground">Average Commission Rate</p>
                  <h3 className="text-3xl font-bold mt-1">{averageRate}%</h3>
                  <p className="flex items-center text-sm text-green-500 mt-1">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +2.3% from last year
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Percent className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Vendors</p>
                  <h3 className="text-3xl font-bold mt-1">127</h3>
                  <p className="flex items-center text-sm text-green-500 mt-1">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +8 new vendors this month
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Store className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rates">Commission Rates</TabsTrigger>
            <TabsTrigger value="vendors">Vendor Commissions</TabsTrigger>
            <TabsTrigger value="history">Commission History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Commission Distribution</CardTitle>
                  <CardDescription>Commission distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={commissionByCategory}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {commissionByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Commission']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Commission Earnings</CardTitle>
                      <CardDescription>Monthly commission earnings</CardDescription>
                    </div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                        <SelectItem value="all">All Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={commissionHistory}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Commission']} />
                        <Area 
                          type="monotone" 
                          dataKey="earnings" 
                          stroke="#8884d8" 
                          fillOpacity={1} 
                          fill="url(#colorEarnings)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Top Performing Vendors by Commission</CardTitle>
                <CardDescription>Vendors generating the highest commission revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Total Sales</TableHead>
                      <TableHead>Commission Rate</TableHead>
                      <TableHead>Commission Earned</TableHead>
                      <TableHead>Vendor Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topVendors.slice(0, 5).map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>${vendor.totalSales.toLocaleString()}</TableCell>
                        <TableCell>{vendor.rate}%</TableCell>
                        <TableCell>${vendor.commission.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            vendor.rate < 15 ? 'bg-purple-100 text-purple-800' : 
                            vendor.rate < 18 ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }>
                            {vendor.rate < 15 ? 'Premium' : vendor.rate < 18 ? 'Standard' : 'Basic'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rates">
            <Card>
              <CardHeader>
                <CardTitle>Commission Rate Structure</CardTitle>
                <CardDescription>Current commission rates by category</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Standard Rate</TableHead>
                      <TableHead>Premium Vendor Rate</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissionRates.map((category, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{category.category}</TableCell>
                        <TableCell>{category.standardRate}%</TableCell>
                        <TableCell>{category.premiumRate}%</TableCell>
                        <TableCell className="max-w-md truncate">{category.description}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vendors">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Vendor Commission Analytics</CardTitle>
                  <Button variant="outline" size="sm">
                    View All Vendors
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topVendors}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                      <Legend />
                      <Bar dataKey="totalSales" name="Total Sales" fill="#8884d8" />
                      <Bar dataKey="commission" name="Commission" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Commission History</CardTitle>
                <CardDescription>Historical data of commission earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={commissionHistory}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Commission']} />
                      <Legend />
                      <Bar dataKey="earnings" name="Commission Earnings" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminCommissions;
