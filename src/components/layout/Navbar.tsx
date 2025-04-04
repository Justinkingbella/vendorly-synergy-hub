
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ShoppingCart, User, Menu, X, ChevronDown, 
  Heart, LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { useTheme } from '@/components/ThemeProvider';
import { Toggle } from '@/components/ui/toggle';

const categories = [
  { name: 'Electronics', href: '/category/electronics' },
  { name: 'Fashion', href: '/category/fashion' },
  { name: 'Home & Garden', href: '/category/home' },
  { name: 'Beauty', href: '/category/beauty' },
  { name: 'Sports', href: '/category/sports' },
  { name: 'Toys', href: '/category/toys' },
];

export default function Navbar() {
  const { storeInfo, getActiveNavLinks } = useStoreSettings();
  const { setCustomStyles } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const activeNavLinks = getActiveNavLinks();
  
  // Dummy cart count for demonstration
  const cartItemCount = 3;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItem = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <Link
      to={href}
      className="relative text-sm font-medium transition-colors hover:text-primary text-muted-foreground px-1 py-1.5"
    >
      {children}
    </Link>
  );

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-3' : 'bg-background py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {storeInfo.logo ? (
              <img src={storeInfo.logo} alt={storeInfo.storeName} className="h-8" />
            ) : (
              <span className="text-xl font-bold">{storeInfo.storeName}</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {activeNavLinks.map(link => (
              link.text.toLowerCase() === 'categories' ? (
                <DropdownMenu key={link.id}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-1 py-1.5">
                      Categories <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-56">
                    <DropdownMenuLabel>Browse Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categories.map((category) => (
                      <DropdownMenuItem key={category.name} asChild>
                        <Link to={category.href}>{category.name}</Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/categories">View All Categories</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavItem key={link.id} href={link.url}>{link.text}</NavItem>
              )
            ))}
          </nav>

          {/* Search, Cart, User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex relative items-center">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="w-48 lg:w-64 pl-10 h-9 rounded-full" 
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild>
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* User Profile / Login */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/customer/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/customer/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/customer/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/customer/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" className="gap-1" asChild>
                <Link to="/auth">
                  <LogIn className="h-4 w-4 mr-1" />
                  Sign In
                </Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 bg-background shadow-lg p-4 z-50 border-t">
            <div className="flex flex-col space-y-3">
              <div className="relative mb-3">
                <Input 
                  type="search" 
                  placeholder="Search products..." 
                  className="w-full pl-10 h-9 rounded-full" 
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              
              {activeNavLinks.map(link => (
                <Link 
                  key={link.id} 
                  to={link.url} 
                  className="py-2 px-3 hover:bg-secondary rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
              
              <div className="py-2 px-3 border-b border-gray-100 dark:border-gray-800">
                <span className="font-medium mb-2 block">Categories</span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {categories.map((category) => (
                    <Link 
                      key={category.name} 
                      to={category.href} 
                      className="text-sm text-muted-foreground hover:text-primary py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/customer/dashboard" 
                      className="py-2 px-3 hover:bg-secondary rounded-md flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      My Account
                    </Link>
                    <Link 
                      to="/customer/orders" 
                      className="py-2 px-3 hover:bg-secondary rounded-md block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <button className="w-full text-left py-2 px-3 hover:bg-secondary rounded-md">Sign Out</button>
                  </>
                ) : (
                  <Button 
                    className="w-full" 
                    asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/auth">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
