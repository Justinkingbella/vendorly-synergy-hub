import React from 'react';
import { 
  CreditCard, Users, Store, Plus, Settings, 
  TrendingUp, ArrowUpRight, Calendar, DollarSign,
  Check, X
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock subscription data
const subscriptionPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 29.99,
    billing: 'monthly',
    features: [
      'Standard commission rates',
      'Basic analytics',
      'Email support',
      'Up to 50 products',
    ],
    notIncluded: [
      'Priority support',
      'Featured placement',
      'Advanced analytics',
      'Reduced commission rates',
    ]
  },
  {
    id: 2,
    name: 'Premium',
    price: 99.99,
    billing: 'monthly',
    popular: true,
    features: [
      'Reduced commission rates',
      'Advanced analytics',
      'Priority support',
      'Featured placement',
      'Unlimited products',
      'Promotional banners',
    ],
    notIncluded: []
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 299.99,
    billing: 'monthly',
    features: [
      'Lowest commission rates',
      'Full analytics suite',
      'Dedicated account manager',
      'Custom integrations',
      'Unlimited products',
      'Priority placement',
      'Marketing support',
    ],
    notIncluded: []
  }
];

const subscriptionStats = [
  { plan: 'Basic', count: 85, revenue: 2549.15 },
  { plan: 'Premium', count: 35, revenue: 3499.65 },
  { plan: 'Enterprise', count: 7, revenue: 2099.93 },
];

const monthlySubscriptionData = [
  { month: 'Jan', Basic: 70, Premium: 20, Enterprise: 5 },
  { month: 'Feb', Basic: 72, Premium: 22, Enterprise: 5 },
  { month: 'Mar', Basic: 75, Premium: 25, Enterprise: 5 },
  { month: 'Apr', Basic: 78, Premium: 28, Enterprise: 6 },
  { month: 'May', Basic: 80, Premium: 30, Enterprise: 6 },
  { month: 'Jun', Basic: 82, Premium: 32, Enterprise: 6 },
  { month: 'Jul', Basic: 85, Premium: 35, Enterprise: 7 },
];

const recentSubscriptions = [
  { id: 'SUB-10521', vendor: 'TechGadgets', plan: 'Premium', date: '2023-12-01', status: 'Active', nextBilling: '2024-01-01', amount: 99.99 },
  { id: 'SUB-10520', vendor: 'HomeDecor', plan: 'Basic', date: '2023-11-28', status: 'Active', nextBilling: '2023-12-28', amount: 29.99 },
  { id: 'SUB-10519', vendor: 'FashionHub', plan: 'Enterprise', date: '2023-11-25', status: 'Active', nextBilling: '2023-12-25', amount: 299.99 },
  { id: 'SUB-10518', vendor: 'GadgetWorld', plan: 'Premium', date: '2023-11-20', status: 'Active', nextBilling: '2023-12-20', amount: 99.99 },
  { id: 'SUB-10517', vendor: 'BookCorner', plan: 'Basic', date: '2023-11-15', status: 'Expired', nextBilling: '-', amount: 29.99 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const totalVendors = 127;
const totalSubscriptionRevenue = subscriptionStats.reduce((sum, item) => sum + item.revenue, 0);
const totalSubscribers = subscriptionStats.reduce((sum, item) => sum + item.count, 0);
const subscriptionRate = Math.round((totalSubscribers / totalVendors) * 100);

const AdminSubscriptions = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Subscription Management</h1>
          <div className="space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Plan
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Subscription Settings
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Subscription Revenue</p>
                  <h3 className="text-3xl font-bold mt-1">${totalSubscriptionRevenue.toLocaleString()}</h3>
                  <p className="flex items-center text-sm text-green-500 mt-1">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +8.2% from last month
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
                  <p className="text-sm font-medium text-muted-foreground">Subscribed Vendors</p>
                  <h3 className="text-3xl font-bold mt-1">{totalSubscribers} / {totalVendors}</h3>
                  <p className="flex items-center text-sm text-muted-foreground mt-1">
                    <span className="font-medium">{subscriptionRate}%</span> subscription rate
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Store className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Premium Subscribers</p>
                  <h3 className="text-3xl font-bold mt-1">{subscriptionStats[1].count}</h3>
                  <p className="flex items-center text-sm text-green-500 mt-1">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +15.3% from last month
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Distribution</CardTitle>
                  <CardDescription>Distribution of vendors across subscription plans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subscriptionStats}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="plan"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {subscriptionStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [value, props.payload.plan]} />
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
                      <CardTitle>Subscription Growth</CardTitle>
                      <CardDescription>Monthly subscription trends by plan</CardDescription>
                    </div>
                    <Select defaultValue="6months">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Time Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3months">Last 3 Months</SelectItem>
                        <SelectItem value="6months">Last 6 Months</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlySubscriptionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Basic" stackId="a" fill="#0088FE" />
                        <Bar dataKey="Premium" stackId="a" fill="#00C49F" />
                        <Bar dataKey="Enterprise" stackId="a" fill="#FFBB28" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Subscription Activity</CardTitle>
                <CardDescription>Latest subscription purchases and renewals</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subscription ID</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell className="font-medium">{subscription.id}</TableCell>
                        <TableCell>{subscription.vendor}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            subscription.plan === 'Premium' ? 'bg-purple-100 text-purple-800' : 
                            subscription.plan === 'Enterprise' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }>
                            {subscription.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>{subscription.date}</TableCell>
                        <TableCell>
                          <Badge className={
                            subscription.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'
                          }>
                            {subscription.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{subscription.nextBilling}</TableCell>
                        <TableCell>${subscription.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card key={plan.id} className={plan.popular ? 'border-primary' : ''}>
                  {plan.popular && (
                    <Badge className="absolute top-4 right-4 bg-primary">Popular</Badge>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      ${plan.price}/month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm font-medium">Features:</p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                        {plan.notIncluded.map((feature, i) => (
                          <li key={i} className="flex items-start text-muted-foreground">
                            <X className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between w-full text-sm">
                      <span>Active subscribers:</span>
                      <Badge variant="outline">
                        {subscriptionStats.find(s => s.plan === plan.name)?.count}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between w-full text-sm">
                      <span>Monthly revenue:</span>
                      <span className="font-medium">
                        ${subscriptionStats.find(s => s.plan === plan.name)?.revenue.toLocaleString()}
                      </span>
                    </div>
                    <Button className="w-full mt-4">Edit Plan</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <CardTitle>Subscriber List</CardTitle>
                <CardDescription>All vendors with active subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Subscriber list would be displayed here, showing all vendors with their subscription details, status, and history.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Analytics</CardTitle>
                <CardDescription>Detailed analytics for subscription performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Advanced subscription analytics would be displayed here, including metrics like churn rate, lifetime value, conversion rate from free to paid, etc.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSubscriptions;
