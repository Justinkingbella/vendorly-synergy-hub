
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, Store, Package, ShoppingCart, Settings, DollarSign, 
  LogOut, Menu, Bell, Search, ChevronDown, BarChart2, Percent,
  CreditCard, FolderPlus, Tag, Plus
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

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const sidebarLinks = [
    { icon: BarChart2, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Store, label: 'Vendors', path: '/admin/vendors' },
    { icon: Package, label: 'Products', path: '/admin/products', subMenu: [
      { label: 'All Products', path: '/admin/products' },
      { label: 'Add Product', path: '/admin/products/create' },
      { label: 'Categories', path: '/admin/categories' }
    ]},
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Percent, label: 'Commissions', path: '/admin/commissions' },
    { icon: DollarSign, label: 'Subscriptions', path: '/admin/subscriptions', subMenu: [
      { label: 'All Plans', path: '/admin/subscriptions' },
      { label: 'Create Plan', path: '/admin/subscriptions/create' },
    ]},
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    // Simulate logout - in a real app this would clear auth state
    navigate('/auth');
  };

  // Function to login as vendor
  const loginAsVendor = (vendorId: number) => {
    // In a real app, this would set temporary vendor auth credentials
    navigate(`/vendor/dashboard?admin_view=true&vendor_id=${vendorId}`);
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
              <h2 className="text-lg font-bold">Admin Panel</h2>
            </div>
            <nav className="grid gap-2">
              {sidebarLinks.map((link, i) => {
                const isActive = location.pathname === link.path || 
                                (link.subMenu && link.subMenu.some(subItem => location.pathname === subItem.path));
                return (
                  <div key={i}>
                    {link.subMenu ? (
                      <div className="space-y-1">
                        <Link
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                            isActive 
                              ? "bg-primary text-primary-foreground font-medium" 
                              : "hover:bg-muted"
                          }`}
                        >
                          <link.icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                        <div className="ml-8 space-y-1">
                          {link.subMenu.map((subItem, j) => (
                            <Link
                              key={j}
                              to={subItem.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all ${
                                location.pathname === subItem.path 
                                  ? "bg-primary/80 text-primary-foreground font-medium" 
                                  : "hover:bg-muted"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                          isActive 
                            ? "bg-primary text-primary-foreground font-medium" 
                            : "hover:bg-muted"
                        }`}
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    )}
                  </div>
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
            <h2 className="text-lg font-bold">Admin Panel</h2>
          </div>
          <nav className="grid gap-2 px-4 overflow-y-auto">
            {sidebarLinks.map((link, i) => {
              const isActive = location.pathname === link.path ||
                              (link.subMenu && link.subMenu.some(subItem => location.pathname === subItem.path));
              return (
                <div key={i} className="mb-1">
                  {link.subMenu ? (
                    <div className="space-y-1">
                      <Link
                        to={link.path}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                          isActive 
                            ? "bg-primary text-primary-foreground font-medium" 
                            : "hover:bg-muted"
                        }`}
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                      <div className="ml-8 space-y-1">
                        {link.subMenu.map((subItem, j) => (
                          <Link
                            key={j}
                            to={subItem.path}
                            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all ${
                              location.pathname === subItem.path 
                                ? "bg-primary/80 text-primary-foreground font-medium" 
                                : "hover:bg-muted"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive 
                          ? "bg-primary text-primary-foreground font-medium" 
                          : "hover:bg-muted"
                      }`}
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  )}
                </div>
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
                  placeholder="Search..."
                  className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background"
                />
              </div>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span>New</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/admin/products/create')}>
                      <Package className="mr-2 h-4 w-4" />
                      Add Product
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/admin/categories')}>
                      <Tag className="mr-2 h-4 w-4" />
                      Add Category
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/admin/subscriptions/create')}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Create Subscription
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="icon" className="relative h-8 w-8">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    4
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatar.png" alt="Admin" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-sm font-medium">
                        Admin User
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
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

export default AdminLayout;
