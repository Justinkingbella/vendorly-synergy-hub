
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
import AdminAuth from "./pages/AdminAuth";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Deals from "./pages/Deals";
import Categories from "./pages/Categories";
import VendorStore from "./pages/VendorStore";
import VendorsList from "./pages/VendorsList";
import BecomeVendor from "./pages/BecomeVendor";

// Admin routes
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminVendors from "./pages/admin/Vendors";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminSettings from "./pages/admin/Settings";
import AdminCommissions from "./pages/admin/Commissions";
import AdminSubscriptions from "./pages/admin/Subscriptions";
import AdminCreateProduct from "./pages/admin/CreateProduct";
import AdminCreateSubscription from "./pages/admin/CreateSubscription";
import AdminPaymentProcessing from "./pages/admin/PaymentProcessing";

// Vendor routes
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorProducts from "./pages/vendor/Products";
import VendorOrders from "./pages/vendor/Orders";
import VendorEarnings from "./pages/vendor/Earnings";
import VendorSettings from "./pages/vendor/Settings";
import VendorSubscription from "./pages/vendor/Subscription";
import VendorPayouts from "./pages/vendor/Payouts";

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
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<Products />} />
          <Route path="/vendors" element={<VendorsList />} />
          <Route path="/vendor/:id" element={<VendorStore />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Products />} />
          <Route path="/become-vendor" element={<BecomeVendor />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/vendors" element={<AdminVendors />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/create" element={<AdminCreateProduct />} />
          <Route path="/admin/products/edit/:id" element={<AdminCreateProduct />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/commissions" element={<AdminCommissions />} />
          <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
          <Route path="/admin/subscriptions/create" element={<AdminCreateSubscription />} />
          <Route path="/admin/subscriptions/edit/:id" element={<AdminCreateSubscription />} />
          <Route path="/admin/payments" element={<AdminPaymentProcessing />} />
          
          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/products" element={<VendorProducts />} />
          <Route path="/vendor/orders" element={<VendorOrders />} />
          <Route path="/vendor/earnings" element={<VendorEarnings />} />
          <Route path="/vendor/settings" element={<VendorSettings />} />
          <Route path="/vendor/subscription" element={<VendorSubscription />} />
          <Route path="/vendor/payouts" element={<VendorPayouts />} />
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
