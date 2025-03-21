
import { Link } from 'react-router-dom';
import { 
  BarChart3, Package, ShoppingCart, DollarSign, Settings, Bell, Search,
  Menu, Store, TrendingUp, Star, HelpCircle, LogOut, User, ChevronDown,
  PlusCircle, Clock, CheckCircle, XCircle, AlertCircle, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

// Sidebar navigation items
const sidebarItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/vendor/dashboard', active: true },
  { icon: Package, label: 'Products', href: '/vendor/products' },
  { icon: ShoppingCart, label: 'Orders', href: '/vendor/orders' },
  { icon: DollarSign, label: 'Earnings', href: '/vendor/earnings' },
  { icon: Settings, label: 'Settings', href: '/vendor/settings' },
];

// Mock data for dashboard stats
const stats = [
  { label: 'Total Sales', value: '$12,835.00', change: '+8.2%', trend: 'up' },
  { label: 'Orders', value: '184', change: '+5.1%', trend: 'up' },
  { label: 'Customers', value: '129', change: '+12.4%', trend: 'up' },
  { label: 'Product Views', value: '5,342', change: '+3.8%', trend: 'up' },
];

// Mock data for recent orders
const recentOrders = [
  { 
    id: '#ORD-498',
    customer: 'John Doe',
    date: '12 Jun 2023',
    status: 'Shipped',
    total: '$129.99',
    statusColor: 'bg-blue-500',
  },
  { 
    id: '#ORD-497',
    customer: 'Jane Smith',
    date: '11 Jun 2023',
    status: 'Delivered',
    total: '$89.99',
    statusColor: 'bg-green-500',
  },
  { 
    id: '#ORD-496',
    customer: 'Robert Johnson',
    date: '10 Jun 2023',
    status: 'Processing',
    total: '$249.99',
    statusColor: 'bg-yellow-500',
  },
  { 
    id: '#ORD-495',
    customer: 'Emily Davis',
    date: '09 Jun 2023',
    status: 'Cancelled',
    total: '$75.00',
    statusColor: 'bg-red-500',
  },
  { 
    id: '#ORD-494',
    customer: 'Michael Brown',
    date: '08 Jun 2023',
    status: 'Delivered',
    total: '$189.99',
    statusColor: 'bg-green-500',
  },
];

// Mock data for top products
const topProducts = [
  { 
    id: 1, 
    name: 'Premium Wireless Headphones', 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    price: '$249.99',
    sold: 42,
    rating: 4.7,
  },
  { 
    id: 2, 
    name: 'Smart Watch Series 5', 
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
    price: '$399.99',
    sold: 38,
    rating: 4.9,
  },
  { 
    id: 3, 
    name: 'Noise-Cancelling Earbuds', 
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1770&auto=format&fit=crop',
    price: '$129.99',
    sold: 35,
    rating: 4.5,
  },
];

// Mock data for inventory alerts
const inventoryAlerts = [
  { 
    id: 1, 
    name: 'Premium Wireless Headphones', 
    status: 'Low Stock',
    remaining: 3,
    type: 'warning',
  },
  { 
    id: 2, 
    name: 'Smart Watch Series 5', 
    status: 'Out of Stock',
    remaining: 0,
    type: 'error',
  },
  { 
    id: 3, 
    name: 'Bluetooth Speaker Pro', 
    status: 'Low Stock',
    remaining: 2,
    type: 'warning',
  },
];

export default function VendorDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/vendor/dashboard" className="flex items-center justify-center">
            <h2 className="text-xl font-bold">AudioTech Store</h2>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                item.active 
                  ? 'bg-gray-100 dark:bg-gray-700 text-primary dark:text-primary-foreground font-medium' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1770&auto=format&fit=crop" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">AudioTech</p>
              <Badge variant="outline" className="text-xs">Premium Vendor</Badge>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-5 h-16">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`flex flex-col items-center justify-center space-y-1 ${
                item.active 
                  ? 'text-primary dark:text-primary-foreground font-medium' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-bold ml-2">Dashboard</h2>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pl-10 w-64" 
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/vendor/products/new" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden md:inline-block">Add Product</span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1770&auto=format&fit=crop" />
                    <AvatarFallback>AT</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">AudioTech</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Store</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Store className="mr-2 h-4 w-4" />
                  <span>Store Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help Center</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <h1 className="text-2xl font-bold tracking-tight">Vendor Dashboard</h1>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  Last 30 Days
                </Button>
                <Button size="sm">Download Report</Button>
              </div>
            </div>
            
            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                    <div className={`rounded-full p-1 ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingUp className="h-4 w-4 transform rotate-180" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Subscription status */}
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div className="flex-1">
                  <CardTitle>Subscription Status</CardTitle>
                </div>
                <Button variant="outline" size="sm">Upgrade Plan</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-blue-500 hover:bg-blue-600">Premium</Badge>
                      <span className="text-sm">Your subscription renews in 15 days</span>
                    </div>
                    <span className="text-sm font-medium">$49.99/month</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Usage this month</span>
                      <span>75% (75/100 products)</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Unlimited orders</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">100 product listings</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">3% transaction fee</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Tabs section */}
            <Tabs defaultValue="orders" className="space-y-4">
              <TabsList>
                <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                <TabsTrigger value="products">Top Products</TabsTrigger>
                <TabsTrigger value="inventory">Inventory Alerts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Orders</CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/vendor/orders" className="flex items-center gap-1">
                          View All
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th scope="col" className="px-4 py-3">Order ID</th>
                            <th scope="col" className="px-4 py-3">Customer</th>
                            <th scope="col" className="px-4 py-3">Date</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                            <th scope="col" className="px-4 py-3">Total</th>
                            <th scope="col" className="px-4 py-3">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order, index) => (
                            <tr key={order.id} className="border-b dark:border-gray-700">
                              <td className="px-4 py-3 font-medium">{order.id}</td>
                              <td className="px-4 py-3">{order.customer}</td>
                              <td className="px-4 py-3">{order.date}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center">
                                  <div className={`h-2.5 w-2.5 rounded-full ${order.statusColor} mr-2`}></div>
                                  {order.status}
                                </div>
                              </td>
                              <td className="px-4 py-3">{order.total}</td>
                              <td className="px-4 py-3">
                                <Button variant="ghost" size="sm">Details</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="products" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Top Selling Products</CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/vendor/products" className="flex items-center gap-1">
                          View All
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProducts.map((product) => (
                        <div key={product.id} className="flex items-start space-x-4">
                          <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium truncate">{product.name}</p>
                              <p className="text-sm font-medium">{product.price}</p>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                                <span>{product.rating} Rating</span>
                              </div>
                              <span>{product.sold} sold this month</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="inventory" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Inventory Alerts</CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/vendor/products" className="flex items-center gap-1">
                          Manage Inventory
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {inventoryAlerts.map((alert) => (
                        <div 
                          key={alert.id} 
                          className={`flex items-center justify-between p-3 rounded-md ${
                            alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'
                          }`}
                        >
                          <div className="flex items-center">
                            {alert.type === 'warning' ? (
                              <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            <span className="text-sm font-medium">{alert.name}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`text-xs font-medium ${
                              alert.type === 'warning' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {alert.status} ({alert.remaining} left)
                            </span>
                            <Button size="sm" variant="outline">Update</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Store Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Store Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">
                      Store analytics will be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
