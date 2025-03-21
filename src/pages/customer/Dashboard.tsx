
import { Link } from 'react-router-dom';
import { 
  User, Package, Heart, Settings, Bell, Search, ShoppingBag,
  Menu, TrendingUp, Star, HelpCircle, LogOut, ChevronDown,
  Clock, FileText, CreditCard, Home, MapPin, ChevronRight,
  ChevronsRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

// Sidebar navigation items
const sidebarItems = [
  { icon: User, label: 'Dashboard', href: '/customer/dashboard', active: true },
  { icon: Package, label: 'Orders', href: '/customer/orders' },
  { icon: Heart, label: 'Wishlist', href: '/customer/wishlist' },
  { icon: Settings, label: 'Settings', href: '/customer/settings' },
];

// Mock data for recent orders
const recentOrders = [
  { 
    id: '#ORD-498',
    vendor: 'AudioTech',
    date: '12 Jun 2023',
    status: 'Shipped',
    total: '$129.99',
    statusColor: 'bg-blue-500',
    items: 2,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
  },
  { 
    id: '#ORD-497',
    vendor: 'FashionTrend',
    date: '11 Jun 2023',
    status: 'Delivered',
    total: '$89.99',
    statusColor: 'bg-green-500',
    items: 1,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop',
  },
  { 
    id: '#ORD-496',
    vendor: 'TechWorld',
    date: '10 Jun 2023',
    status: 'Processing',
    total: '$249.99',
    statusColor: 'bg-yellow-500',
    items: 3,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
  },
];

// Mock data for wishlist
const wishlistItems = [
  { 
    id: 1, 
    name: 'Premium Wireless Headphones', 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    price: '$249.99',
    originalPrice: '$299.99',
    vendor: 'AudioTech',
    inStock: true,
  },
  { 
    id: 2, 
    name: 'Smart Watch Series 5', 
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
    price: '$399.99',
    vendor: 'TechWorld',
    inStock: true,
  },
  { 
    id: 3, 
    name: 'Designer Leather Handbag', 
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop',
    price: '$159.99',
    originalPrice: '$199.99',
    vendor: 'FashionTrend',
    inStock: false,
  },
];

// Mock data for recent activity
const recentActivity = [
  { 
    id: 1, 
    type: 'order_placed',
    content: 'You placed order #ORD-498',
    time: '2 days ago',
  },
  { 
    id: 2, 
    type: 'order_delivered',
    content: 'Order #ORD-497 has been delivered',
    time: '3 days ago',
  },
  { 
    id: 3, 
    type: 'review_added',
    content: 'You left a review on Smart Watch Series 5',
    time: '5 days ago',
  },
  { 
    id: 4, 
    type: 'account_updated',
    content: 'You updated your shipping address',
    time: '1 week ago',
  },
];

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/customer/dashboard" className="flex items-center justify-center">
            <h2 className="text-xl font-bold">My Account</h2>
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
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Jane Doe</p>
              <Badge variant="outline" className="text-xs">Customer</Badge>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-4 h-16">
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
              <Link to="/products" className="flex items-center gap-1">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden md:inline-block">Continue Shopping</span>
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
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">Jane Doe</span>
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
                  <Package className="mr-2 h-4 w-4" />
                  <span>Orders</span>
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
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, Jane!</h1>
            
            {/* Quick actions and cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Shipping address card */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Shipping Address</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">Edit</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-muted-foreground">123 Main Street</p>
                        <p className="text-muted-foreground">New York, NY 10001</p>
                        <p className="text-muted-foreground">United States</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Rewards card */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Rewards Points</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">View History</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-bold">540</span>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        +25 this month
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Earn 100 more points to unlock free shipping
                    </div>
                    <Progress value={75} className="h-2 mt-1" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Payment methods card */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Payment Methods</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">Manage</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 04/25</p>
                        </div>
                      </div>
                      <Badge>Default</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Tabs section */}
            <Tabs defaultValue="orders" className="space-y-4">
              <TabsList>
                <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="h-32 w-full relative">
                          <img 
                            src={order.image} 
                            alt={`Order ${order.id}`}
                            className="h-full w-full object-cover" 
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className={`${order.statusColor} text-white`}>{order.status}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <p className="font-medium">{order.total}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <p className="text-muted-foreground">{order.vendor}</p>
                          <p className="text-muted-foreground">{order.items} items</p>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between">
                        <Button variant="ghost" size="sm">Track Order</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-4">
                  <Button variant="outline" asChild>
                    <Link to="/customer/orders" className="flex items-center">
                      View All Orders
                      <ChevronsRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="wishlist" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistItems.map((item) => (
                    <Card key={item.id}>
                      <CardHeader className="p-0">
                        <div className="h-40 w-full relative overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-base">{item.name}</h3>
                            <div className="flex flex-col items-end">
                              <span className="font-medium">{item.price}</span>
                              {item.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  {item.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{item.vendor}</span>
                            {item.inStock ? (
                              <span className="text-green-600">In Stock</span>
                            ) : (
                              <span className="text-red-600">Out of Stock</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">Remove</Button>
                        <Button size="sm" className="flex-1" disabled={!item.inStock}>
                          {item.inStock ? 'Add to Cart' : 'Notify Me'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-4">
                  <Button variant="outline" asChild>
                    <Link to="/customer/wishlist" className="flex items-center">
                      View All Wishlist Items
                      <ChevronsRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent interactions with VendorHub</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4">
                          <div className="mt-0.5">
                            {activity.type === 'order_placed' && <Package className="h-5 w-5 text-blue-500" />}
                            {activity.type === 'order_delivered' && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {activity.type === 'review_added' && <Star className="h-5 w-5 text-yellow-500" />}
                            {activity.type === 'account_updated' && <Settings className="h-5 w-5 text-gray-500" />}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{activity.content}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
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
