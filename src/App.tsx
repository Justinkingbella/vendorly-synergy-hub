
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";

// Admin routes
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminVendors from "./pages/admin/Vendors";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminSettings from "./pages/admin/Settings";

// Vendor routes
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorProducts from "./pages/vendor/Products";
import VendorOrders from "./pages/vendor/Orders";
import VendorEarnings from "./pages/vendor/Earnings";
import VendorSettings from "./pages/vendor/Settings";

// Customer routes
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerOrders from "./pages/customer/Orders";
import CustomerWishlist from "./pages/customer/Wishlist";
import CustomerSettings from "./pages/customer/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/categories" element={<Products />} />
          <Route path="/category/:id" element={<Products />} />
          <Route path="/vendors" element={<Products />} />
          <Route path="/vendor/:id" element={<Products />} />
          <Route path="/deals" element={<Products />} />
          <Route path="/cart" element={<Products />} />
          <Route path="/wishlist" element={<Products />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/vendors" element={<AdminVendors />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/products" element={<VendorProducts />} />
          <Route path="/vendor/orders" element={<VendorOrders />} />
          <Route path="/vendor/earnings" element={<VendorEarnings />} />
          <Route path="/vendor/settings" element={<VendorSettings />} />
          <Route path="/vendor/register" element={<Auth />} />
          
          {/* Customer Routes */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/orders" element={<CustomerOrders />} />
          <Route path="/customer/wishlist" element={<CustomerWishlist />} />
          <Route path="/customer/settings" element={<CustomerSettings />} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
