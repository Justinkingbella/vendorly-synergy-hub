
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Heart, Settings, LogOut, Menu, 
  Bell, Search, ChevronDown, User, Home
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

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const sidebarLinks = [
    { icon: Home, label: 'Dashboard', path: '/customer/dashboard' },
    { icon: ShoppingBag, label: 'My Orders', path: '/customer/orders' },
    { icon: Heart, label: 'Wishlist', path: '/customer/wishlist' },
    { icon: Settings, label: 'Account Settings', path: '/customer/settings' },
  ];

  const handleLogout = () => {
    // Simulate logout - in a real app this would clear auth state
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
              <h2 className="text-lg font-bold">My Account</h2>
            </div>
            <nav className="grid gap-2">
              {sidebarLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={i}
                    to={link.path}
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
            <h2 className="text-lg font-bold">My Account</h2>
          </div>
          <nav className="grid gap-2 px-4">
            {sidebarLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={i}
                  to={link.path}
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
                  placeholder="Search products..."
                  className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background"
                />
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="relative h-8 w-8"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    3
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="relative h-8 w-8"
                  onClick={() => navigate('/customer/wishlist')}
                >
                  <Heart className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    5
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatar.png" alt="Customer" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-sm font-medium">
                        Sarah Connor
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/customer/dashboard')}>
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/customer/orders')}>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/customer/wishlist')}>
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/customer/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
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

export default CustomerLayout;
