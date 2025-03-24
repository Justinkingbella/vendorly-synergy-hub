
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  AlertCircle, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Download, 
  Eye, 
  PackageCheck, 
  PackageX, 
  Search, 
  Truck, 
  X 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import VendorLayout from '@/components/layout/VendorLayout';
import { useToast } from '@/hooks/use-toast';

// Types for order data
type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
}

interface OrderAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  shipping: {
    method: string;
    address: OrderAddress;
    trackingNumber?: string;
  };
  payment: {
    method: string;
    transactionId: string;
    status: 'paid' | 'pending' | 'failed';
  };
  subtotal: number;
  tax: number;
  total: number;
  commission: number;
  vendorEarnings: number;
  status: OrderStatus;
  notes?: string;
}

export default function VendorOrders() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock vendor orders data
  const vendorOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-1001',
      date: '2023-11-15',
      customer: {
        id: 'CUST001',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567'
      },
      items: [
        { id: 'ITEM001', productId: 'PROD001', productName: 'Bluetooth Headphones', sku: 'BH-100', price: 79.99, quantity: 1 },
        { id: 'ITEM002', productId: 'PROD002', productName: 'Wireless Mouse', sku: 'WM-200', price: 24.99, quantity: 1 }
      ],
      shipping: {
        method: 'Standard Shipping',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          postalCode: '12345',
          country: 'United States'
        }
      },
      payment: {
        method: 'Credit Card',
        transactionId: 'TXN10001',
        status: 'paid'
      },
      subtotal: 104.98,
      tax: 8.40,
      total: 113.38,
      commission: 11.34,
      vendorEarnings: 102.04,
      status: 'pending'
    },
    {
      id: '2',
      orderNumber: 'ORD-1002',
      date: '2023-11-14',
      customer: {
        id: 'CUST002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '(555) 987-6543'
      },
      items: [
        { id: 'ITEM003', productId: 'PROD003', productName: 'Smart Watch', sku: 'SW-300', price: 149.99, quantity: 1 }
      ],
      shipping: {
        method: 'Express Shipping',
        address: {
          street: '456 Oak Avenue',
          city: 'Somewhere',
          state: 'NY',
          postalCode: '67890',
          country: 'United States'
        },
        trackingNumber: 'TRK100223344'
      },
      payment: {
        method: 'PayPal',
        transactionId: 'TXN10002',
        status: 'paid'
      },
      subtotal: 149.99,
      tax: 12.00,
      total: 161.99,
      commission: 16.20,
      vendorEarnings: 145.79,
      status: 'confirmed'
    },
    {
      id: '3',
      orderNumber: 'ORD-1003',
      date: '2023-11-14',
      customer: {
        id: 'CUST003',
        name: 'Robert Johnson',
        email: 'robert.j@example.com',
        phone: '(555) 456-7890'
      },
      items: [
        { id: 'ITEM004', productId: 'PROD004', productName: 'Portable Charger', sku: 'PC-400', price: 39.99, quantity: 2 }
      ],
      shipping: {
        method: 'Standard Shipping',
        address: {
          street: '789 Pine Road',
          city: 'Elsewhere',
          state: 'TX',
          postalCode: '54321',
          country: 'United States'
        },
        trackingNumber: 'TRK200334455'
      },
      payment: {
        method: 'Credit Card',
        transactionId: 'TXN10003',
        status: 'paid'
      },
      subtotal: 79.98,
      tax: 6.40,
      total: 86.38,
      commission: 8.64,
      vendorEarnings: 77.74,
      status: 'shipped'
    },
    {
      id: '4',
      orderNumber: 'ORD-1004',
      date: '2023-11-12',
      customer: {
        id: 'CUST004',
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        phone: '(555) 234-5678'
      },
      items: [
        { id: 'ITEM005', productId: 'PROD005', productName: 'Wireless Keyboard', sku: 'WK-500', price: 59.99, quantity: 1 }
      ],
      shipping: {
        method: 'Express Shipping',
        address: {
          street: '101 Maple Lane',
          city: 'Nowhere',
          state: 'FL',
          postalCode: '98765',
          country: 'United States'
        },
        trackingNumber: 'TRK300445566'
      },
      payment: {
        method: 'Credit Card',
        transactionId: 'TXN10004',
        status: 'paid'
      },
      subtotal: 59.99,
      tax: 4.80,
      total: 64.79,
      commission: 6.48,
      vendorEarnings: 58.31,
      status: 'delivered'
    },
    {
      id: '5',
      orderNumber: 'ORD-1005',
      date: '2023-11-10',
      customer: {
        id: 'CUST005',
        name: 'Michael Brown',
        email: 'michael.b@example.com',
        phone: '(555) 876-5432'
      },
      items: [
        { id: 'ITEM006', productId: 'PROD006', productName: 'Bluetooth Speaker', sku: 'BS-600', price: 89.99, quantity: 1 }
      ],
      shipping: {
        method: 'Standard Shipping',
        address: {
          street: '202 Elm Street',
          city: 'Anyplace',
          state: 'IL',
          postalCode: '45678',
          country: 'United States'
        }
      },
      payment: {
        method: 'PayPal',
        transactionId: 'TXN10005',
        status: 'paid'
      },
      subtotal: 89.99,
      tax: 7.20,
      total: 97.19,
      commission: 9.72,
      vendorEarnings: 87.47,
      status: 'cancelled',
      notes: 'Customer requested cancellation due to purchasing wrong item.'
    },
    {
      id: '6',
      orderNumber: 'ORD-1006',
      date: '2023-11-09',
      customer: {
        id: 'CUST006',
        name: 'Sarah Wilson',
        email: 'sarah.w@example.com',
        phone: '(555) 345-6789'
      },
      items: [
        { id: 'ITEM007', productId: 'PROD007', productName: 'Fitness Tracker', sku: 'FT-700', price: 69.99, quantity: 1 },
        { id: 'ITEM008', productId: 'PROD008', productName: 'Water Bottle', sku: 'WB-800', price: 19.99, quantity: 1 }
      ],
      shipping: {
        method: 'Express Shipping',
        address: {
          street: '303 Cedar Avenue',
          city: 'Somewhere',
          state: 'WA',
          postalCode: '87654',
          country: 'United States'
        },
        trackingNumber: 'TRK400556677'
      },
      payment: {
        method: 'Credit Card',
        transactionId: 'TXN10006',
        status: 'paid'
      },
      subtotal: 89.98,
      tax: 7.20,
      total: 97.18,
      commission: 9.72,
      vendorEarnings: 87.46,
      status: 'delivered'
    },
    {
      id: '7',
      orderNumber: 'ORD-1007',
      date: '2023-11-08',
      customer: {
        id: 'CUST007',
        name: 'David Miller',
        email: 'david.m@example.com',
        phone: '(555) 654-3210'
      },
      items: [
        { id: 'ITEM009', productId: 'PROD009', productName: 'USB-C Cable 3-Pack', sku: 'UC-900', price: 14.99, quantity: 2 }
      ],
      shipping: {
        method: 'Standard Shipping',
        address: {
          street: '404 Birch Road',
          city: 'Elsewhere',
          state: 'OR',
          postalCode: '23456',
          country: 'United States'
        },
        trackingNumber: 'TRK500667788'
      },
      payment: {
        method: 'PayPal',
        transactionId: 'TXN10007',
        status: 'paid'
      },
      subtotal: 29.98,
      tax: 2.40,
      total: 32.38,
      commission: 3.24,
      vendorEarnings: 29.14,
      status: 'delivered'
    }
  ];

  // Filter orders based on search and status
  const filteredOrders = vendorOrders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Handle order selection for details view
  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setTrackingNumber(order.shipping.trackingNumber || '');
    setOrderNote(order.notes || '');
  };

  // Handle status change
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    // In a real app, this would update the order status in the database
    toast({
      title: "Order status updated",
      description: `Order #${orderId} status changed to ${newStatus}.`,
    });
    if (selectedOrder) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Handle shipping information update
  const handleUpdateShipping = () => {
    // In a real app, this would update the shipping info in the database
    if (selectedOrder) {
      setSelectedOrder({
        ...selectedOrder,
        shipping: {
          ...selectedOrder.shipping,
          trackingNumber: trackingNumber
        },
        status: 'shipped'
      });
      
      toast({
        title: "Shipping information updated",
        description: `Tracking number added for order #${selectedOrder.orderNumber}.`,
      });
      
      setIsShippingDialogOpen(false);
    }
  };

  // Handle add/update note
  const handleUpdateNote = () => {
    // In a real app, this would update the note in the database
    if (selectedOrder) {
      setSelectedOrder({
        ...selectedOrder,
        notes: orderNote
      });
      
      toast({
        title: "Order note updated",
        description: `Note updated for order #${selectedOrder.orderNumber}.`,
      });
    }
  };

  // Generate status badge based on order status
  const getStatusBadge = (status: OrderStatus) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      confirmed: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      shipped: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      delivered: "bg-green-100 text-green-800 hover:bg-green-200",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
      returned: "bg-gray-100 text-gray-800 hover:bg-gray-200"
    };

    return (
      <Badge variant="outline" className={statusStyles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Get count of orders by status
  const getOrderCountByStatus = (status: OrderStatus) => {
    return vendorOrders.filter(order => order.status === status).length;
  };

  return (
    <VendorLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">View and manage your customer orders</p>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-yellow-100 p-3 mb-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <h3 className="text-2xl font-bold">{getOrderCountByStatus('pending')}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-blue-100 p-3 mb-2">
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <h3 className="text-2xl font-bold">{getOrderCountByStatus('confirmed')}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-indigo-100 p-3 mb-2">
                  <Truck className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Shipped</p>
                  <h3 className="text-2xl font-bold">{getOrderCountByStatus('shipped')}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-green-100 p-3 mb-2">
                  <PackageCheck className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <h3 className="text-2xl font-bold">{getOrderCountByStatus('delivered')}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <TabsList className="mb-2 md:mb-0">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="m-0">
            <Card>
              <CardContent className="p-0">
                {selectedOrder ? (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedOrder(null)}
                        className="gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back to Orders
                      </Button>
                      
                      <div className="flex gap-2">
                        {selectedOrder.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'confirmed')}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Confirm Order
                          </Button>
                        )}
                        
                        {(selectedOrder.status === 'pending' || selectedOrder.status === 'confirmed') && (
                          <Dialog open={isShippingDialogOpen} onOpenChange={setIsShippingDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="default" 
                                size="sm"
                              >
                                <Truck className="h-4 w-4 mr-2" />
                                Ship Order
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Update Shipping Information</DialogTitle>
                                <DialogDescription>
                                  Enter tracking information for order #{selectedOrder.orderNumber}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <label htmlFor="trackingNumber" className="text-sm font-medium">
                                    Tracking Number
                                  </label>
                                  <Input
                                    id="trackingNumber"
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    placeholder="Enter tracking number"
                                  />
                                </div>
                              </div>
                              
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsShippingDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleUpdateShipping}>
                                  Update & Mark as Shipped
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                        
                        {selectedOrder.status === 'shipped' && (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'delivered')}
                          >
                            <PackageCheck className="h-4 w-4 mr-2" />
                            Mark as Delivered
                          </Button>
                        )}
                        
                        {(selectedOrder.status === 'pending' || selectedOrder.status === 'confirmed') && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'cancelled')}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel Order
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Order Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <dl className="grid grid-cols-2 gap-4">
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Order Number</dt>
                              <dd className="text-sm font-bold">{selectedOrder.orderNumber}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Date</dt>
                              <dd className="text-sm">{selectedOrder.date}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                              <dd className="text-sm">{getStatusBadge(selectedOrder.status)}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Payment</dt>
                              <dd className="text-sm">
                                {selectedOrder.payment.method}
                                <Badge variant="outline" className="ml-2 bg-green-100 text-green-800">
                                  {selectedOrder.payment.status}
                                </Badge>
                              </dd>
                            </div>
                          </dl>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <dl className="grid gap-4">
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                              <dd className="text-sm font-bold">{selectedOrder.customer.name}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                              <dd className="text-sm">{selectedOrder.customer.email}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                              <dd className="text-sm">{selectedOrder.customer.phone}</dd>
                            </div>
                          </dl>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <dl className="grid gap-4">
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Shipping Method</dt>
                              <dd className="text-sm">{selectedOrder.shipping.method}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Tracking Number</dt>
                              <dd className="text-sm">
                                {selectedOrder.shipping.trackingNumber || 'Not available'}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                              <dd className="text-sm">
                                {selectedOrder.shipping.address.street}<br />
                                {selectedOrder.shipping.address.city}, {selectedOrder.shipping.address.state} {selectedOrder.shipping.address.postalCode}<br />
                                {selectedOrder.shipping.address.country}
                              </dd>
                            </div>
                          </dl>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Order Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Textarea 
                            placeholder="Add a note to this order" 
                            className="min-h-[120px]"
                            value={orderNote}
                            onChange={(e) => setOrderNote(e.target.value)}
                          />
                          <Button 
                            onClick={handleUpdateNote}
                            className="mt-4"
                          >
                            Save Note
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Order Items</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead className="text-center">SKU</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                              <TableHead className="text-right">Quantity</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedOrder.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.productName}</TableCell>
                                <TableCell className="text-center">{item.sku}</TableCell>
                                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        
                        <div className="mt-6 flex justify-end">
                          <div className="w-full md:w-1/3">
                            <div className="flex justify-between py-2">
                              <span className="text-muted-foreground">Subtotal</span>
                              <span>${selectedOrder.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-muted-foreground">Tax</span>
                              <span>${selectedOrder.tax.toFixed(2)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between py-2 font-bold">
                              <span>Total</span>
                              <span>${selectedOrder.total.toFixed(2)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between py-2 text-muted-foreground">
                              <span>Platform Commission</span>
                              <span>-${selectedOrder.commission.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-2 font-bold text-green-600">
                              <span>Your Earnings</span>
                              <span>${selectedOrder.vendorEarnings.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Items</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedOrders.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <PackageX className="h-12 w-12 mb-2" />
                              <p>No orders found matching your criteria</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.orderNumber}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.customer.name}</TableCell>
                            <TableCell className="text-right">{order.items.length}</TableCell>
                            <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewOrderDetails(order)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
                
                {!selectedOrder && totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                      <span className="font-medium">
                        {Math.min(startIndex + itemsPerPage, filteredOrders.length)}
                      </span>{" "}
                      of <span className="font-medium">{filteredOrders.length}</span> orders
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="m-0">
            <Card>
              <CardContent className="p-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Pending Orders</AlertTitle>
                  <AlertDescription>
                    These orders need your attention. Please confirm or process them.
                  </AlertDescription>
                </Alert>
                <div className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendorOrders.filter(o => o.status === 'pending').map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.customer.name}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mr-2"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleUpdateOrderStatus(order.id, 'confirmed')}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Confirm
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="processing" className="m-0">
            <Card>
              <CardContent className="p-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Processing Orders</AlertTitle>
                  <AlertDescription>
                    These orders have been confirmed and are ready to be shipped.
                  </AlertDescription>
                </Alert>
                <div className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendorOrders.filter(o => o.status === 'confirmed').map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.customer.name}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mr-2"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => {
                                setSelectedOrder(order);
                                setTrackingNumber(order.shipping.trackingNumber || '');
                                setIsShippingDialogOpen(true);
                              }}
                            >
                              <Truck className="h-4 w-4 mr-2" />
                              Ship
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="m-0">
            <Card>
              <CardContent className="p-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Completed Orders</AlertTitle>
                  <AlertDescription>
                    These orders have been delivered to customers.
                  </AlertDescription>
                </Alert>
                <div className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Tracking #</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Your Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendorOrders.filter(o => o.status === 'delivered').map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.customer.name}</TableCell>
                          <TableCell>{order.shipping.trackingNumber || 'N/A'}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell className="text-right text-green-600 font-semibold">
                            ${order.vendorEarnings.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  );
}
