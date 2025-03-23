
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Footer from './Footer';
import Navbar from './Navbar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart3, ShoppingBag, Users, Settings, Package, 
  ShoppingCart, CreditCard, Heart, User, LogOut, Home,
  DollarSign, Store, Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

type DashboardLayoutProps = {
  children: React.ReactNode;
  type: 'customer' | 'vendor' | 'admin';
};

export default function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const location = useLocation();
  
  // Define navigation items based on type
  const getNavItems = (): NavItem[] => {
    switch (type) {
      case 'customer':
        return [
          { icon: BarChart3, label: 'Dashboard', href: '/customer/dashboard' },
          { icon: ShoppingCart, label: 'Orders', href: '/customer/orders' },
          { icon: Heart, label: 'Wishlist', href: '/customer/wishlist' },
          { icon: Settings, label: 'Settings', href: '/customer/settings' },
        ];
      case 'vendor':
        return [
          { icon: BarChart3, label: 'Dashboard', href: '/vendor/dashboard' },
          { icon: Package, label: 'Products', href: '/vendor/products' },
          { icon: ShoppingCart, label: 'Orders', href: '/vendor/orders' },
          { icon: DollarSign, label: 'Earnings', href: '/vendor/earnings' },
          { icon: Settings, label: 'Settings', href: '/vendor/settings' },
        ];
      case 'admin':
        return [
          { icon: BarChart3, label: 'Dashboard', href: '/admin/dashboard' },
          { icon: Users, label: 'Users', href: '/admin/users' },
          { icon: Store, label: 'Vendors', href: '/admin/vendors' },
          { icon: Package, label: 'Products', href: '/admin/products' },
          { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
          { icon: Settings, label: 'Settings', href: '/admin/settings' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  const typeName = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex-1 flex w-full">
          <Sidebar>
            <SidebarHeader className="p-4 border-b border-sidebar-border">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>{typeName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{typeName} Account</p>
                  <p className="text-xs text-muted-foreground">user@example.com</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="px-4 py-2">Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Home">
                        <Link to="/" className="flex items-center">
                          <Home className="mr-2 h-4 w-4" />
                          <span>Main Site</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {navItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={location.pathname === item.href}
                          tooltip={item.label}
                        >
                          <Link to={item.href} className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter>
              <div className="p-4">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/auth">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Link>
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          
          <SidebarInset className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{typeName} Dashboard</h1>
              <SidebarTrigger />
            </div>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <Footer />
    </div>
  );
}
