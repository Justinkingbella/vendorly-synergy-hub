
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { 
  Search, FilterX, ChevronDown, ChevronUp, ExternalLink,
  Clock, TrendingUp, CheckCircle, XCircle, AlertTriangle,
  Download, Printer
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from "@/components/ui/card";

type Order = {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  date: string;
  total: number;
  paymentMethod: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal: string;
    country: string;
  };
};

// Mock data for orders
const orders: Order[] = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    products: [
      { name: 'Wireless Headphones', quantity: 1, price: 89.99 },
    ],
    status: 'delivered',
    date: '2023-08-15',
    total: 89.99,
    paymentMethod: 'Credit Card',
    shippingAddress: {
      line1: '123 Main St',
      city: 'Boston',
      state: 'MA',
      postal: '02108',
      country: 'United States',
    },
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    products: [
      { name: 'Smart Watch', quantity: 1, price: 199.99 },
      { name: 'Watch Band', quantity: 2, price: 15.99 },
    ],
    status: 'shipped',
    date: '2023-08-10',
    total: 231.97,
    paymentMethod: 'PayPal',
    shippingAddress: {
      line1: '456 Oak Ave',
      line2: 'Apt 7B',
      city: 'New York',
      state: 'NY',
      postal: '10001',
      country: 'United States',
    },
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Michael Davis',
      email: 'michael.d@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    products: [
      { name: 'Bluetooth Speaker', quantity: 1, price: 59.99 },
    ],
    status: 'processing',
    date: '2023-08-05',
    total: 59.99,
    paymentMethod: 'Credit Card',
    shippingAddress: {
      line1: '789 Pine Blvd',
      city: 'Chicago',
      state: 'IL',
      postal: '60007',
      country: 'United States',
    },
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Emily Wilson',
      email: 'emily.w@example.com',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    products: [
      { name: 'Ergonomic Keyboard', quantity: 1, price: 129.99 },
      { name: 'Mouse Pad', quantity: 1, price: 12.99 },
    ],
    status: 'processing',
    date: '2023-07-25',
    total: 142.98,
    paymentMethod: 'Credit Card',
    shippingAddress: {
      line1: '321 Maple Dr',
      city: 'Seattle',
      state: 'WA',
      postal: '98101',
      country: 'United States',
    },
  },
  {
    id: 'ORD-005',
    customer: {
      name: 'Robert Chen',
      email: 'robert.c@example.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    products: [
      { name: 'Gaming Mouse', quantity: 1, price: 45.99 },
    ],
    status: 'cancelled',
    date: '2023-07-15',
    total: 45.99,
    paymentMethod: 'PayPal',
    shippingAddress: {
      line1: '654 Cedar St',
      city: 'San Francisco',
      state: 'CA',
      postal: '94101',
      country: 'United States',
    },
  },
  {
    id: 'ORD-006',
    customer: {
      name: 'Jennifer Lopez',
      email: 'jennifer.l@example.com',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    products: [
      { name: 'Wireless Charger', quantity: 1, price: 29.99 },
      { name: 'Phone Case', quantity: 1, price: 19.99 },
    ],
    status: 'refunded',
    date: '2023-07-10',
    total: 49.98,
    paymentMethod: 'Credit Card',
    shippingAddress: {
      line1: '987 Elm Ct',
      city: 'Los Angeles',
      state: 'CA',
      postal: '90001',
      country: 'United States',
    },
  },
];

export default function VendorOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Filter orders based on search and status
  const getFilteredOrders = (status: Order['status'] | 'all') => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = status === 'all' || order.status === status;
      
      return matchesSearch && matchesStatus;
    });
  };

  // Sort orders
  const sortOrders = (ordersToSort: Order[]) => {
    switch (sortBy) {
      case 'newest':
        return [...ordersToSort].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return [...ordersToSort].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'highest':
        return [...ordersToSort].sort((a, b) => b.total - a.total);
      case 'lowest':
        return [...ordersToSort].sort((a, b) => a.total - b.total);
      default:
        return ordersToSort;
    }
  };

  // Toggle order details
  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('newest');
  };

  return (
    <DashboardLayout type="vendor">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search orders..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Amount</SelectItem>
                  <SelectItem value="lowest">Lowest Amount</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={clearFilters}>
                <FilterX className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled/Refunded</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-4">
            {sortOrders(getFilteredOrders('all')).map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                isExpanded={expandedOrder === order.id}
                onToggle={() => toggleOrderDetails(order.id)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="processing" className="space-y-4 mt-4">
            {sortOrders(getFilteredOrders('processing')).map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                isExpanded={expandedOrder === order.id}
                onToggle={() => toggleOrderDetails(order.id)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="shipped" className="space-y-4 mt-4">
            {sortOrders(getFilteredOrders('shipped')).map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                isExpanded={expandedOrder === order.id}
                onToggle={() => toggleOrderDetails(order.id)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="delivered" className="space-y-4 mt-4">
            {sortOrders(getFilteredOrders('delivered')).map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                isExpanded={expandedOrder === order.id}
                onToggle={() => toggleOrderDetails(order.id)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="cancelled" className="space-y-4 mt-4">
            {sortOrders(getFilteredOrders('cancelled').concat(getFilteredOrders('refunded'))).map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                isExpanded={expandedOrder === order.id}
                onToggle={() => toggleOrderDetails(order.id)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function OrderCard({ order, isExpanded, onToggle }: { 
  order: Order; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Card>
      <CardContent className="p-0">
        {/* Order Summary */}
        <div 
          className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="mr-4">
              {isExpanded ? 
                <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              }
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium">{order.id}</h3>
                <StatusBadge status={order.status} className="ml-2" />
              </div>
              <p className="text-xs text-muted-foreground">
                {order.date} • {order.customer.name}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="text-right">
              <p className="font-medium">${order.total.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{order.products.length} item(s)</p>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={(e) => {
                e.stopPropagation();
                // View details action
              }}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Details
            </Button>
          </div>
        </div>
        
        {/* Expanded Order Details */}
        {isExpanded && (
          <div className="p-4 pt-0 border-t mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <div className="space-y-2">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {product.quantity}</p>
                      </div>
                      <p className="font-medium">${product.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between mb-1">
                    <p className="text-muted-foreground">Subtotal:</p>
                    <p>${order.total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-1">
                    <p className="text-muted-foreground">Shipping:</p>
                    <p>$0.00</p>
                  </div>
                  <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                    <p>Total:</p>
                    <p>${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Customer</h4>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                      {order.customer.avatar ? (
                        <img src={order.customer.avatar} alt={order.customer.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="flex items-center justify-center h-full w-full text-gray-600 font-bold">
                          {order.customer.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <div className="text-sm">
                      <p>{order.customer.name}</p>
                      <p>{order.shippingAddress.line1}</p>
                      {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postal}</p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <p className="text-sm">{order.paymentMethod}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Order Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    {order.status === 'processing' && (
                      <Button size="sm">Mark as Shipped</Button>
                    )}
                    {order.status === 'shipped' && (
                      <Button size="sm">Mark as Delivered</Button>
                    )}
                    {(order.status === 'processing' || order.status === 'shipped') && (
                      <Button variant="outline" size="sm">Cancel Order</Button>
                    )}
                    <Button variant="outline" size="sm">Print Invoice</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status, className }: { status: Order['status']; className?: string }) {
  switch (status) {
    case 'processing':
      return (
        <Badge className={`bg-yellow-100 text-yellow-800 hover:bg-yellow-200 flex items-center gap-1 ${className}`}>
          <Clock className="h-3 w-3" />
          Processing
        </Badge>
      );
    case 'shipped':
      return (
        <Badge className={`bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-1 ${className}`}>
          <TrendingUp className="h-3 w-3" />
          Shipped
        </Badge>
      );
    case 'delivered':
      return (
        <Badge className={`bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1 ${className}`}>
          <CheckCircle className="h-3 w-3" />
          Delivered
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge className={`bg-red-100 text-red-800 hover:bg-red-200 flex items-center gap-1 ${className}`}>
          <XCircle className="h-3 w-3" />
          Cancelled
        </Badge>
      );
    case 'refunded':
      return (
        <Badge className={`bg-purple-100 text-purple-800 hover:bg-purple-200 flex items-center gap-1 ${className}`}>
          <AlertTriangle className="h-3 w-3" />
          Refunded
        </Badge>
      );
    default:
      return null;
  }
}
