
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Package, ShoppingCart, Wallet, Settings, LogOut, Menu, 
  Bell, Search, ChevronDown, BarChart2, Store, CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const VendorLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  // Check if we're in admin view mode
  const searchParams = new URLSearchParams(location.search);
  const isAdminView = searchParams.get('admin_view') === 'true';
  const vendorId = searchParams.get('vendor_id');

  const sidebarLinks = [
    { icon: BarChart2, label: 'Dashboard', path: '/vendor/dashboard' },
    { icon: Package, label: 'Products', path: '/vendor/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/vendor/orders' },
    { icon: Wallet, label: 'Earnings', path: '/vendor/earnings' },
    { icon: CreditCard, label: 'Subscription', path: '/vendor/subscription' },
    { icon: Settings, label: 'Settings', path: '/vendor/settings' },
  ];

  const handleLogout = () => {
    // If admin is viewing vendor account, return to admin panel
    if (isAdminView) {
      navigate('/admin/vendors');
    } else {
      // Regular vendor logout
      navigate('/auth');
    }
  };

  // Add query parameters to preserve admin view mode when navigating
  const getNavPath = (path: string) => {
    if (isAdminView && vendorId) {
      return `${path}?admin_view=true&vendor_id=${vendorId}`;
    }
    return path;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin View Banner */}
      {isAdminView && (
        <div className="bg-yellow-500 text-black py-2 px-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <span>You are viewing this vendor account as an administrator</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 bg-white" 
              onClick={() => navigate('/admin/vendors')}
            >
              Return to Admin Panel
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0 sm:max-w-xs">
          <div className="px-7 py-4">
            <div className="mb-8 flex items-center">
              <h2 className="text-lg font-bold">Vendor Panel</h2>
            </div>
            <nav className="grid gap-2">
              {sidebarLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={i}
                    to={getNavPath(link.path)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="fixed hidden h-screen w-64 flex-col border-r bg-background md:flex">
          <div className="p-6">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">Vendor Panel</h2>
              <div className="flex items-center space-x-2 mt-2">
                <Store className="h-4 w-4" />
                <span className="text-sm">Premium Electronics</span>
              </div>
            </div>
          </div>
          <nav className="grid gap-2 px-4">
            {sidebarLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={i}
                  to={getNavPath(link.path)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  {link.label === 'Subscription' && (
                    <Badge className="ml-auto" variant="outline">Premium</Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 md:ml-64">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            <Button variant="ghost" size="icon" className="md:hidden h-8 w-8" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="w-full flex justify-between items-center">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search orders, products..."
                  className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background"
                />
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="relative h-8 w-8">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    2
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatar.png" alt="Vendor" />
                        <AvatarFallback>VE</AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-sm font-medium">
                        Vendor User
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(getNavPath('/vendor/settings'))}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {isAdminView ? 'Return to Admin' : 'Logout'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;
