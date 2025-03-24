
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, ChevronRight, Download, Filter, Search, 
  ArrowUpDown, Eye, ShoppingBag, AlertCircle, CheckCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AdminLayout from '@/components/layout/AdminLayout';
import { useToast } from '@/hooks/use-toast';

// Types for order data
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

interface OrderItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  vendorName: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  vendorId?: string;
}

export default function AdminOrders() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock order data
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-001-2023',
      date: '2023-11-15',
      customer: {
        id: 'CUST001',
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
      items: [
        { id: 'ITEM001', productName: 'Smartphone XS', price: 699.99, quantity: 1, vendorName: 'Tech World' },
        { id: 'ITEM002', productName: 'Wireless Earbuds', price: 129.99, quantity: 1, vendorName: 'Audio Plus' }
      ],
      total: 829.98,
      status: 'delivered',
      paymentMethod: 'Credit Card'
    },
    {
      id: '2',
      orderNumber: 'ORD-002-2023',
      date: '2023-11-14',
      customer: {
        id: 'CUST002',
        name: 'Jane Smith',
        email: 'jane.smith@example.com'
      },
      items: [
        { id: 'ITEM003', productName: 'Smart Watch', price: 249.99, quantity: 1, vendorName: 'Tech World' }
      ],
      total: 249.99,
      status: 'shipped',
      paymentMethod: 'PayPal'
    },
    {
      id: '3',
      orderNumber: 'ORD-003-2023',
      date: '2023-11-14',
      customer: {
        id: 'CUST003',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com'
      },
      items: [
        { id: 'ITEM004', productName: 'Laptop Pro', price: 1299.99, quantity: 1, vendorName: 'Computer Hub' },
        { id: 'ITEM005', productName: 'External Hard Drive', price: 89.99, quantity: 2, vendorName: 'Storage Solutions' }
      ],
      total: 1479.97,
      status: 'processing',
      paymentMethod: 'Credit Card'
    },
    {
      id: '4',
      orderNumber: 'ORD-004-2023',
      date: '2023-11-13',
      customer: {
        id: 'CUST004',
        name: 'Alice Williams',
        email: 'alice.williams@example.com'
      },
      items: [
        { id: 'ITEM006', productName: 'Bluetooth Speaker', price: 79.99, quantity: 1, vendorName: 'Audio Plus' }
      ],
      total: 79.99,
      status: 'pending',
      paymentMethod: 'PayPal'
    },
    {
      id: '5',
      orderNumber: 'ORD-005-2023',
      date: '2023-11-12',
      customer: {
        id: 'CUST005',
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com'
      },
      items: [
        { id: 'ITEM007', productName: 'Gaming Console', price: 499.99, quantity: 1, vendorName: 'Gaming Zone' },
        { id: 'ITEM008', productName: 'Game Controller', price: 59.99, quantity: 2, vendorName: 'Gaming Zone' }
      ],
      total: 619.97,
      status: 'cancelled',
      paymentMethod: 'Credit Card'
    },
    {
      id: '6',
      orderNumber: 'ORD-006-2023',
      date: '2023-11-11',
      customer: {
        id: 'CUST006',
        name: 'David Miller',
        email: 'david.miller@example.com'
      },
      items: [
        { id: 'ITEM009', productName: 'Tablet Pro', price: 399.99, quantity: 1, vendorName: 'Tech World' }
      ],
      total: 399.99,
      status: 'refunded',
      paymentMethod: 'Credit Card'
    },
    {
      id: '7',
      orderNumber: 'ORD-007-2023',
      date: '2023-11-10',
      customer: {
        id: 'CUST007',
        name: 'Emma Davis',
        email: 'emma.davis@example.com'
      },
      items: [
        { id: 'ITEM010', productName: 'Coffee Maker', price: 129.99, quantity: 1, vendorName: 'Home Essentials' }
      ],
      total: 129.99,
      status: 'delivered',
      paymentMethod: 'PayPal'
    }
  ];

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
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
  };

  // Handle status change
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    // In a real app, this would update the order status in the database
    toast({
      title: "Order status updated",
      description: `Order #${orderId} status changed to ${newStatus}.`,
    });
  };

  // Generate status badge based on order status
  const getStatusBadge = (status: OrderStatus) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      processing: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      shipped: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      delivered: "bg-green-100 text-green-800 hover:bg-green-200",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
      refunded: "bg-gray-100 text-gray-800 hover:bg-gray-200"
    };

    return (
      <Badge variant="outline" className={statusStyles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <p className="text-muted-foreground">View and manage customer orders</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-blue-100 p-3 mb-4">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-2xl font-bold">{orders.length}</h3>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-yellow-100 p-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'pending' || o.status === 'processing').length}
                  </h3>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'delivered').length}
                  </h3>
                  <p className="text-sm text-muted-foreground">Delivered Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-red-100 p-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'cancelled' || o.status === 'refunded').length}
                  </h3>
                  <p className="text-sm text-muted-foreground">Cancelled/Refunded</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <TabsList className="mb-2 md:mb-0">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
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
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
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
                        <Select 
                          defaultValue={selectedOrder.status}
                          onValueChange={(value) => handleStatusChange(selectedOrder.id, value as OrderStatus)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="refunded">Refunded</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Order Details</CardTitle>
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
                              <dt className="text-sm font-medium text-muted-foreground">Payment Method</dt>
                              <dd className="text-sm">{selectedOrder.paymentMethod}</dd>
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
                              <dt className="text-sm font-medium text-muted-foreground">Customer ID</dt>
                              <dd className="text-sm">{selectedOrder.customer.id}</dd>
                            </div>
                          </dl>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Items</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead>Vendor</TableHead>
                              <TableHead className="text-right">Quantity</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedOrder.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.productName}</TableCell>
                                <TableCell>{item.vendorName}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell colSpan={4} className="text-right font-bold">Subtotal</TableCell>
                              <TableCell className="text-right font-bold">${selectedOrder.total.toFixed(2)}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={4} className="text-right font-bold">Shipping</TableCell>
                              <TableCell className="text-right">$0.00</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={4} className="text-right font-bold">Total</TableCell>
                              <TableCell className="text-right font-bold">${selectedOrder.total.toFixed(2)}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
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
                              <ShoppingBag className="h-12 w-12 mb-2" />
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
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    Actions
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewOrderDetails(order)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'processing')}>
                                    Mark as Processing
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'shipped')}>
                                    Mark as Shipped
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'delivered')}>
                                    Mark as Delivered
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'cancelled')}>
                                    Cancel Order
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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

          <TabsContent value="recent" className="m-0">
            <Card>
              <CardContent className="p-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Recent Orders</AlertTitle>
                  <AlertDescription>
                    Showing orders from the last 7 days.
                  </AlertDescription>
                </Alert>
                <div className="mt-4">
                  {/* In a real app, this would show recent orders only */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.customer.name}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
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
                    These orders require attention for processing.
                  </AlertDescription>
                </Alert>
                <div className="mt-4">
                  {/* In a real app, this would show pending orders only */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.filter(o => o.status === 'pending').map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.customer.name}</TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleStatusChange(order.id, 'processing')}>
                              Process Order
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
        </Tabs>
      </div>
    </AdminLayout>
  );
}
