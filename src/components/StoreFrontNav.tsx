
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, Search, User, Package, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const categories = [
  {
    title: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories"]
  },
  {
    title: "Clothing",
    subcategories: ["Men's Fashion", "Women's Fashion", "Kids", "Shoes"]
  },
  {
    title: "Home & Kitchen",
    subcategories: ["Furniture", "Appliances", "Cookware", "Decor"]
  },
  {
    title: "Beauty",
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances"]
  },
];

const StoreFrontNav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-2 text-sm">
          <div className="flex items-center space-x-4">
            <p>Customer Service: +264 61 123 4567</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/track-order" className="hover:underline">Track Order</Link>
            <Link to="/about" className="hover:underline">About Us</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
        
        {/* Main Navigation */}
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold">MarketHub</Link>
            
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname === '/' && "bg-accent text-accent-foreground"
                      )}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                        {categories.map((category) => (
                          <div key={category.title} className="space-y-2">
                            <Link
                              to={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                              className="font-medium"
                            >
                              {category.title}
                            </Link>
                            <ul className="space-y-1 text-sm">
                              {category.subcategories.map((subcategory) => (
                                <li key={subcategory}>
                                  <Link
                                    to={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    {subcategory}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/products">
                      <NavigationMenuLink className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname === '/products' && "bg-accent text-accent-foreground"
                      )}>
                        Shop
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/deals">
                      <NavigationMenuLink className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname === '/deals' && "bg-accent text-accent-foreground"
                      )}>
                        Deals
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/vendors">
                      <NavigationMenuLink className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname === '/vendors' && "bg-accent text-accent-foreground"
                      )}>
                        Vendors
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            {isSearchOpen ? (
              <div className="fixed inset-0 bg-background p-4 z-50 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Search Products</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search for products..."
                    className="w-full border rounded-md pl-10 pr-4 py-2"
                    autoFocus
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Smartphones</Badge>
                    <Badge variant="outline">Laptops</Badge>
                    <Badge variant="outline">Headphones</Badge>
                    <Badge variant="outline">Watches</Badge>
                  </div>
                </div>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            {/* User Menu */}
            <Link to="/auth">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">3</Badge>
              </Button>
            </Link>
            
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">2</Badge>
              </Button>
            </Link>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  <SheetClose asChild>
                    <Link to="/" className={cn("py-2 hover:text-primary", location.pathname === '/' && "text-primary font-medium")}>Home</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/categories" className={cn("py-2 hover:text-primary", location.pathname === '/categories' && "text-primary font-medium")}>Categories</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/products" className={cn("py-2 hover:text-primary", location.pathname === '/products' && "text-primary font-medium")}>Shop</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/deals" className={cn("py-2 hover:text-primary", location.pathname === '/deals' && "text-primary font-medium")}>Deals</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/vendors" className={cn("py-2 hover:text-primary", location.pathname === '/vendors' && "text-primary font-medium")}>Vendors</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/account" className={cn("py-2 hover:text-primary", location.pathname === '/account' && "text-primary font-medium")}>My Account</Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StoreFrontNav;
