
import { Link } from 'react-router-dom';
import { 
  Users, ShoppingBag, BarChart3, Settings, Bell, Search,
  Menu, Package, TrendingUp, CreditCard, HelpCircle, LogOut,
  User, ChevronDown, Star, DollarSign, ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Sidebar navigation items
const sidebarItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/admin/dashboard', active: true },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: ShoppingBag, label: 'Vendors', href: '/admin/vendors' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

// Mock data for dashboard stats
const stats = [
  { label: 'Total Revenue', value: '$53,281.90', change: '+12.4%', trend: 'up' },
  { label: 'New Users', value: '3,254', change: '+8.2%', trend: 'up' },
  { label: 'Active Vendors', value: '342', change: '+4.7%', trend: 'up' },
  { label: 'Pending Orders', value: '156', change: '-2.3%', trend: 'down' },
];

// Mock data for recent activities
const recentActivities = [
  { 
    id: 1, 
    type: 'new_vendor', 
    content: 'New vendor "TechWorld" has registered', 
    time: '2 minutes ago',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop'
  },
  { 
    id: 2, 
    type: 'product_approved', 
    content: 'You approved "Premium Wireless Headphones"', 
    time: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 3, 
    type: 'order_disputed', 
    content: 'Order #12473 has been disputed by customer', 
    time: '3 hours ago',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop'
  },
  { 
    id: 4, 
    type: 'vendor_payout', 
    content: 'Processed payout of $1,234 to vendor "AudioTech"', 
    time: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop'
  },
  { 
    id: 5, 
    type: 'payment_failed', 
    content: 'Payment failed for order #12489', 
    time: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
  },
];

// Mock data for top vendors
const topVendors = [
  { id: 1, name: 'AudioTech', sales: 342, orders: 287, rating: 4.8 },
  { id: 2, name: 'TechWorld', sales: 278, orders: 245, rating: 4.9 },
  { id: 3, name: 'FashionTrend', sales: 213, orders: 186, rating: 4.5 },
  { id: 4, name: 'HomeDecor', sales: 187, orders: 154, rating: 4.6 },
  { id: 5, name: 'PhotoPro', sales: 142, orders: 118, rating: 4.7 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <h2 className="text-xl font-bold">VendorHub Admin</h2>
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
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-5 h-16">
          {sidebarItems.slice(0, 5).map((item, index) => (
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
                placeholder="Search..." 
                className="pl-10 w-64" 
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1770&auto=format&fit=crop" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">Admin User</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
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
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            
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
            
            {/* Tabs section */}
            <Tabs defaultValue="activities" className="space-y-4">
              <TabsList>
                <TabsTrigger value="activities">Recent Activities</TabsTrigger>
                <TabsTrigger value="vendors">Top Vendors</TabsTrigger>
                <TabsTrigger value="orders">Recent Orders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={activity.image} />
                            <AvatarFallback>AC</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{activity.content}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="vendors" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Vendors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th scope="col" className="px-4 py-3">Vendor</th>
                            <th scope="col" className="px-4 py-3">Sales</th>
                            <th scope="col" className="px-4 py-3">Orders</th>
                            <th scope="col" className="px-4 py-3">Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topVendors.map((vendor) => (
                            <tr key={vendor.id} className="border-b dark:border-gray-700">
                              <td className="px-4 py-3 font-medium">{vendor.name}</td>
                              <td className="px-4 py-3">${vendor.sales * 10}.00</td>
                              <td className="px-4 py-3">{vendor.orders}</td>
                              <td className="px-4 py-3 flex items-center">
                                {vendor.rating}
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
              
              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-muted-foreground">
                      <Package className="mx-auto h-10 w-10 mb-3" />
                      <p>Loading recent orders...</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
