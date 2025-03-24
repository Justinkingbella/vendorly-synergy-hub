
import React, { useState } from 'react';
import { 
  Package, Search, Filter, ShoppingBag, Star,
  ExternalLink, Download, TruckIcon, MoreHorizontal,
  ArrowUpDown, ChevronDown, ChevronUp
} from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// Mock order data
const mockOrders = Array.from({ length: 12 }).map((_, i) => ({
  id: `ORD-${10000 + i}`,
  date: new Date(Date.now() - i * 86400000 * (Math.floor(Math.random() * 10) + 1)),
  status: ['Delivered', 'Shipped', 'Processing', 'Cancelled'][Math.floor(Math.random() * (i === 0 ? 3 : 4))],
  total: Math.floor(Math.random() * 300) + 50,
  items: Math.floor(Math.random() * 5) + 1,
  trackingNumber: i < 8 ? `TRK-${900000 + i}` : null,
  products: Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, j) => ({
    id: j + 1,
    name: ['Smartphone XS', 'Wireless Earbuds', 'Smart Watch', 'Bluetooth Speaker', 'Tablet Pro'][Math.floor(Math.random() * 5)],
    price: Math.floor(Math.random() * 200) + 50,
    quantity: Math.floor(Math.random() * 2) + 1,
    image: 'product-image.jpg'
  })),
  shippingAddress: {
    name: 'Sarah Connor',
    street: '123 Main St',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    country: 'USA'
  },
  paymentMethod: 'Credit Card',
}));

const CustomerOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [openOrderDetails, setOpenOrderDetails] = useState<string | null>(null);
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false);
  const [selectedTrackingNumber, setSelectedTrackingNumber] = useState<string | null>(null);
  
  // Filter orders based on search term and status filter
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.total - a.total;
      case 'lowest':
        return a.total - b.total;
      default:
        return 0;
    }
  });
  
  const toggleOrderDetails = (orderId: string) => {
    if (openOrderDetails === orderId) {
      setOpenOrderDetails(null);
    } else {
      setOpenOrderDetails(orderId);
    }
  };
  
  const handleTrackOrder = (trackingNumber: string) => {
    setSelectedTrackingNumber(trackingNumber);
    setIsTrackingDialogOpen(true);
  };
  
  const handleReorder = (orderId: string) => {
    // In a real app, you would add all items to cart
    console.log(`Reordering items from order ${orderId}`);
    toast({
      title: "Items added to cart",
      description: "All items from your previous order have been added to your cart.",
    });
  };

  return (
    <CustomerLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>View and manage your past orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by order ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Amount</SelectItem>
                  <SelectItem value="lowest">Lowest Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {sortedOrders.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                <Button className="mt-4" asChild>
                  <Link to="/products">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedOrders.map((order) => (
                  <Collapsible
                    key={order.id}
                    open={openOrderDetails === order.id}
                    onOpenChange={() => {}}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50" onClick={() => toggleOrderDetails(order.id)}>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{order.id}</h3>
                          <Badge className={
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800 ml-2' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 ml-2' :
                            order.status === 'Processing' ? 'bg-amber-100 text-amber-800 ml-2' :
                            'bg-red-100 text-red-800 ml-2'
                          }>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.date.toLocaleDateString()} • {order.items} {order.items === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                        </div>
                        <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            {openOrderDetails === order.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>
                    
                    <CollapsibleContent>
                      <div className="border-t px-4 py-3 bg-slate-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Shipping Address</p>
                            <p className="text-sm">{order.shippingAddress.name}</p>
                            <p className="text-sm">{order.shippingAddress.street}</p>
                            <p className="text-sm">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                            <p className="text-sm">{order.shippingAddress.country}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Payment Method</p>
                            <p className="text-sm">{order.paymentMethod}</p>
                          </div>
                          {order.trackingNumber && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">Tracking Number</p>
                              <div className="flex items-center">
                                <p className="text-sm mr-2">{order.trackingNumber}</p>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 px-2"
                                  onClick={() => handleTrackOrder(order.trackingNumber!)}
                                >
                                  <TruckIcon className="h-3.5 w-3.5 mr-1" />
                                  Track
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm font-medium mb-2">Order Items</p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                              <TableHead className="text-center">Quantity</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.products.map((product) => (
                              <TableRow key={product.id}>
                                <TableCell>
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-100 rounded mr-3 flex items-center justify-center">
                                      <Package className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <div>{product.name}</div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                                <TableCell className="text-center">{product.quantity}</TableCell>
                                <TableCell className="text-right">${(product.price * product.quantity).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
                              <TableCell className="text-right font-medium">${(order.total - 10).toFixed(2)}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={3} className="text-right font-medium">Shipping</TableCell>
                              <TableCell className="text-right font-medium">$10.00</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                              <TableCell className="text-right font-bold">${order.total.toFixed(2)}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" size="sm" onClick={() => handleReorder(order.id)}>
                            Reorder
                          </Button>
                          <Button variant="outline" size="sm" disabled={order.status === 'Cancelled'}>
                            <Download className="mr-2 h-4 w-4" />
                            Invoice
                          </Button>
                          {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                            <Button variant="outline" size="sm">
                              Cancel Order
                            </Button>
                          )}
                          {order.status === 'Delivered' && (
                            <Button size="sm">
                              <Star className="mr-2 h-4 w-4" />
                              Review
                            </Button>
                          )}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Tracking Information Dialog */}
      <Dialog open={isTrackingDialogOpen} onOpenChange={setIsTrackingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tracking Information</DialogTitle>
            <DialogDescription>
              Tracking details for order {selectedTrackingNumber}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Package picked up</p>
                  <p className="text-sm text-muted-foreground">Carrier picked up the package</p>
                </div>
                <p className="text-sm">Dec 1, 2023 - 10:30 AM</p>
              </div>
              <div className="h-10 border-l-2 border-green-500 ml-2"></div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">In transit</p>
                  <p className="text-sm text-muted-foreground">Package is in transit to the destination</p>
                </div>
                <p className="text-sm">Dec 2, 2023 - 3:45 PM</p>
              </div>
              <div className="h-10 border-l-2 border-green-500 ml-2"></div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Out for delivery</p>
                  <p className="text-sm text-muted-foreground">Package is out for delivery</p>
                </div>
                <p className="text-sm">Dec 3, 2023 - 9:15 AM</p>
              </div>
              <div className="h-10 border-l-2 border-gray-300 ml-2"></div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium text-muted-foreground">Delivered</p>
                  <p className="text-sm text-muted-foreground">Package will be delivered</p>
                </div>
                <p className="text-sm text-muted-foreground">Expected: Dec 3, 2023</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTrackingDialogOpen(false)}>
              Close
            </Button>
            <Button asChild>
              <a href={`https://example.com/track/${selectedTrackingNumber}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Carrier Website
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CustomerLayout>
  );
};

export default CustomerOrders;
