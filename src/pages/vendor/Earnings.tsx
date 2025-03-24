
import React, { useState } from 'react';
import { 
  DollarSign, Calendar, Download, Filter, 
  TrendingUp, TrendingDown, CheckCircle, AlertCircle,
  ArrowUpRight, ArrowDownRight, CreditCard
} from 'lucide-react';
import VendorLayout from '@/components/layout/VendorLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'react-router-dom';

// Mock data for charts
const monthlyEarningsData = [
  { name: 'Jan', earnings: 4000, orders: 24 },
  { name: 'Feb', earnings: 3000, orders: 18 },
  { name: 'Mar', earnings: 5000, orders: 30 },
  { name: 'Apr', earnings: 4500, orders: 27 },
  { name: 'May', earnings: 6000, orders: 36 },
  { name: 'Jun', earnings: 5500, orders: 33 },
  { name: 'Jul', earnings: 7000, orders: 42 },
  { name: 'Aug', earnings: 8500, orders: 51 },
  { name: 'Sep', earnings: 7800, orders: 47 },
  { name: 'Oct', earnings: 9000, orders: 54 },
  { name: 'Nov', earnings: 10500, orders: 63 },
  { name: 'Dec', earnings: 11200, orders: 67 },
];

const categoryData = [
  { name: 'Electronics', value: 40 },
  { name: 'Audio', value: 30 },
  { name: 'Wearables', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Mock transaction data
const transactions = [
  { id: 'T-1001', date: '2023-12-01', type: 'Order Payment', amount: 245.99, status: 'Completed' },
  { id: 'T-1002', date: '2023-11-28', type: 'Order Payment', amount: 125.50, status: 'Completed' },
  { id: 'T-1003', date: '2023-11-25', type: 'Commission Fee', amount: -32.75, status: 'Completed' },
  { id: 'T-1004', date: '2023-11-20', type: 'Withdrawal', amount: -500.00, status: 'Completed' },
  { id: 'T-1005', date: '2023-11-15', type: 'Order Payment', amount: 189.99, status: 'Completed' },
  { id: 'T-1006', date: '2023-11-10', type: 'Order Payment', amount: 74.50, status: 'Completed' },
  { id: 'T-1007', date: '2023-11-05', type: 'Commission Fee', amount: -28.60, status: 'Completed' },
  { id: 'T-1008', date: '2023-11-01', type: 'Withdrawal', amount: -400.00, status: 'Completed' },
];

// Mock pending payouts
const pendingPayouts = [
  { id: 'P-1001', dueDate: '2023-12-15', amount: 1245.75, ordersCount: 12, status: 'Pending' },
];

const VendorEarnings = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAdminView = searchParams.get('admin_view') === 'true';
  
  const [timeRange, setTimeRange] = useState('year');
  const [payoutStatus, setPayoutStatus] = useState('all');
  
  // Calculate total earnings
  const totalEarnings = monthlyEarningsData.reduce((sum, item) => sum + item.earnings, 0);
  const totalCommission = Math.floor(totalEarnings * 0.085); // Assuming 8.5% commission rate
  const netEarnings = totalEarnings - totalCommission;
  
  // Filter transactions based on payout status
  const filteredTransactions = payoutStatus === 'all' 
    ? transactions 
    : transactions.filter(t => 
        (payoutStatus === 'payouts' && t.amount < 0) || 
        (payoutStatus === 'earnings' && t.amount > 0)
      );

  return (
    <VendorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Earnings & Payouts</h1>
          <div className="space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Request Payout
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
          <Card className="md:col-span-3">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <h3 className="text-3xl font-bold">${totalEarnings.toLocaleString()}</h3>
                  <p className="flex items-center text-sm text-green-500">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +15.3% from last period
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Commission Fees (8.5%)</p>
                  <h3 className="text-3xl font-bold">${totalCommission.toLocaleString()}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Badge variant="outline" className="mr-2">Premium Vendor</Badge>
                    <span>Reduced rate</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Net Earnings</p>
                  <h3 className="text-3xl font-bold">${netEarnings.toLocaleString()}</h3>
                  <p className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                    Available for withdrawal
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Earnings Over Time</CardTitle>
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
                        data={monthlyEarningsData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                        <Area 
                          type="monotone" 
                          dataKey="earnings" 
                          stroke="#0ea5e9" 
                          fillOpacity={1} 
                          fill="url(#colorEarnings)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.slice(0, 5).map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell className={transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                          {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" size="sm">View All Transactions</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Transaction History</CardTitle>
                  <div className="flex space-x-2">
                    <Select value={payoutStatus} onValueChange={setPayoutStatus}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Transactions</SelectItem>
                        <SelectItem value="earnings">Earnings Only</SelectItem>
                        <SelectItem value="payouts">Payouts Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell className={transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                          {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredTransactions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          No transactions found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payouts">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Available for Payout</p>
                    <h3 className="text-3xl font-bold">${netEarnings.toLocaleString()}</h3>
                    <Button className="w-full">Request Payout</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Pending Payouts</p>
                    <h3 className="text-3xl font-bold">${pendingPayouts.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</h3>
                    <p className="text-sm text-muted-foreground">Expected on Dec 15, 2023</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Paid Out</p>
                    <h3 className="text-3xl font-bold">$5,400.00</h3>
                    <p className="text-sm text-muted-foreground">Across 6 payouts</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Payout History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expected Arrival</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">P-1001</TableCell>
                      <TableCell>Dec 5, 2023</TableCell>
                      <TableCell>$1,245.75</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800">Processing</Badge>
                      </TableCell>
                      <TableCell>Dec 15, 2023</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">P-1000</TableCell>
                      <TableCell>Nov 5, 2023</TableCell>
                      <TableCell>$900.00</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </TableCell>
                      <TableCell>Nov 15, 2023</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">P-999</TableCell>
                      <TableCell>Oct 3, 2023</TableCell>
                      <TableCell>$850.50</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </TableCell>
                      <TableCell>Oct 13, 2023</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Analytics</CardTitle>
                <CardDescription>View detailed analytics of your sales and earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyEarningsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip formatter={(value, name) => [
                        name === 'earnings' ? `$${value}` : value,
                        name === 'earnings' ? 'Earnings' : 'Orders'
                      ]} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="earnings" fill="#8884d8" name="Earnings ($)" />
                      <Bar yAxisId="right" dataKey="orders" fill="#82ca9d" name="Orders" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
};

export default VendorEarnings;
