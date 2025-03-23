
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
  Printer,
  RefreshCw,
  XCircle,
  CheckCircle,
  Clock,
  Truck,
  Package,
  AlertCircle
} from "lucide-react";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-9385",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      id: "CUST-1234"
    },
    date: "2023-06-15T10:30:00Z",
    status: "delivered",
    payment: {
      method: "credit_card",
      status: "paid",
      amount: 249.99
    },
    items: [
      {
        id: "PROD-001",
        name: "Premium Wireless Headphones",
        price: 249.99,
        quantity: 1
      }
    ],
    shipping: {
      address: "123 Main St, Apt 4B, New York, NY 10001",
      method: "express",
      trackingNumber: "TRK12345678"
    }
  },
  {
    id: "ORD-8254",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      id: "CUST-5678"
    },
    date: "2023-06-14T14:20:00Z",
    status: "shipped",
    payment: {
      method: "paypal",
      status: "paid",
      amount: 129.99
    },
    items: [
      {
        id: "PROD-002",
        name: "Wireless Earbuds",
        price: 129.99,
        quantity: 1
      }
    ],
    shipping: {
      address: "456 Oak Ave, Seattle, WA 98101",
      method: "standard",
      trackingNumber: "TRK87654321"
    }
  },
  {
    id: "ORD-7123",
    customer: {
      name: "Robert Johnson",
      email: "robert.j@example.com",
      id: "CUST-9012"
    },
    date: "2023-06-14T09:15:00Z",
    status: "processing",
    payment: {
      method: "credit_card",
      status: "paid",
      amount: 399.99
    },
    items: [
      {
        id: "PROD-003",
        name: "Smart Watch Series 5",
        price: 399.99,
        quantity: 1
      }
    ],
    shipping: {
      address: "789 Pine Blvd, Austin, TX 78701",
      method: "express",
      trackingNumber: ""
    }
  },
  {
    id: "ORD-6478",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      id: "CUST-3456"
    },
    date: "2023-06-13T16:45:00Z",
    status: "cancelled",
    payment: {
      method: "credit_card",
      status: "refunded",
      amount: 179.99
    },
    items: [
      {
        id: "PROD-004",
        name: "Bluetooth Speaker Pro",
        price: 179.99,
        quantity: 1
      }
    ],
    shipping: {
      address: "321 Elm St, Chicago, IL 60007",
      method: "standard",
      trackingNumber: ""
    }
  },
  {
    id: "ORD-5798",
    customer: {
      name: "Michael Wilson",
      email: "michael.w@example.com",
      id: "CUST-7890"
    },
    date: "2023-06-13T11:30:00Z",
    status: "pending",
    payment: {
      method: "bank_transfer",
      status: "pending",
      amount: 89.99
    },
    items: [
      {
        id: "PROD-005",
        name: "Wireless Gaming Mouse",
        price: 89.99,
        quantity: 1
      }
    ],
    shipping: {
      address: "654 Maple Dr, Miami, FL 33101",
      method: "standard",
      trackingNumber: ""
    }
  },
  {
    id: "ORD-4567",
    customer: {
      name: "Sarah Brown",
      email: "sarah.b@example.com",
      id: "CUST-2345"
    },
    date: "2023-06-12T13:20:00Z",
    status: "delivered",
    payment: {
      method: "credit_card",
      status: "paid",
      amount: 529.98
    },
    items: [
      {
        id: "PROD-001",
        name: "Premium Wireless Headphones",
        price: 249.99,
        quantity: 1
      },
      {
        id: "PROD-003",
        name: "Smart Watch Series 5",
        price: 399.99,
        quantity: 1
      }
    ],
    shipping: {
      address: "987 Oak St, Denver, CO 80201",
      method: "express",
      trackingNumber: "TRK54321678"
    }
  },
  {
    id: "ORD-3412",
    customer: {
      name: "David Miller",
      email: "david.m@example.com",
      id: "CUST-6789"
    },
    date: "2023-06-12T10:15:00Z",
    status: "returned",
    payment: {
      method: "paypal",
      status: "refunded",
      amount: 59.99
    },
    items: [
      {
        id: "PROD-006",
        name: "Portable Power Bank",
        price: 59.99,
        quantity: 1
      }
    ],
    shipping: {
      address: "753 Pine Ave, Portland, OR 97201",
      method: "standard",
      trackingNumber: "TRK87651234"
    }
  }
];

// Status badge component
const OrderStatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", icon: <Clock className="h-3.5 w-3.5 mr-1" /> },
    processing: { color: "bg-blue-100 text-blue-800 hover:bg-blue-100", icon: <Package className="h-3.5 w-3.5 mr-1" /> },
    shipped: { color: "bg-purple-100 text-purple-800 hover:bg-purple-100", icon: <Truck className="h-3.5 w-3.5 mr-1" /> },
    delivered: { color: "bg-green-100 text-green-800 hover:bg-green-100", icon: <CheckCircle className="h-3.5 w-3.5 mr-1" /> },
    cancelled: { color: "bg-red-100 text-red-800 hover:bg-red-100", icon: <XCircle className="h-3.5 w-3.5 mr-1" /> },
    returned: { color: "bg-gray-100 text-gray-800 hover:bg-gray-100", icon: <RefreshCw className="h-3.5 w-3.5 mr-1" /> }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <Badge variant="outline" className={`flex items-center ${config.color}`}>
      {config.icon}
      <span className="capitalize">{status}</span>
    </Badge>
  );
};

// Format currency helper
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format date helper
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function AdminOrders() {
  const { toast } = useToast();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  
  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Filter orders based on search term and status
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    const matchesTab = activeTab === "all" || 
                       (activeTab === "recent" && new Date(order.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                       (activeTab === "pending" && ["pending", "processing"].includes(order.status)) ||
                       (activeTab === "completed" && ["delivered", "shipped"].includes(order.status)) ||
                       (activeTab === "cancelled" && ["cancelled", "returned"].includes(order.status));
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  // Handle status update
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would make an API call
    toast({
      title: "Order status updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  // Export orders - this would generate CSV/Excel in a real app
  const exportOrders = () => {
    toast({
      title: "Orders exported",
      description: "The orders list has been exported to CSV",
    });
  };

  // Print orders
  const printOrders = () => {
    window.print();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders Management</h1>
          <p className="text-muted-foreground">View and manage all customer orders</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
          <Button variant="outline" size="sm" onClick={exportOrders}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={printOrders}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Order Filters</CardTitle>
          <CardDescription>Filter and search orders by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by order ID, customer name or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <span className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableCaption>A list of all orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-3" />
                    <p className="text-lg font-medium">No orders found</p>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow className="cursor-pointer" onClick={() => toggleOrderExpand(order.id)}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>{formatCurrency(order.payment.amount)}</TableCell>
                    <TableCell className="text-right">
                      {expandedOrder === order.id ? (
                        <ChevronUp className="h-5 w-5 ml-auto" />
                      ) : (
                        <ChevronDown className="h-5 w-5 ml-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded row details */}
                  {expandedOrder === order.id && (
                    <TableRow className="bg-gray-50">
                      <TableCell colSpan={6} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Order Items</h4>
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between border-b pb-2">
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                  </div>
                                  <p>{formatCurrency(item.price)}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Shipping Details</h4>
                            <p className="text-sm mb-1">{order.shipping.address}</p>
                            <p className="text-sm mb-1 capitalize">Method: {order.shipping.method}</p>
                            {order.shipping.trackingNumber && (
                              <p className="text-sm">
                                Tracking: {order.shipping.trackingNumber}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Payment Information</h4>
                            <p className="text-sm mb-1 capitalize">Method: {order.payment.method.replace('_', ' ')}</p>
                            <p className="text-sm mb-1 capitalize">Status: {order.payment.status}</p>
                            <p className="text-sm font-medium">Total: {formatCurrency(order.payment.amount)}</p>
                            
                            <div className="mt-4">
                              <h4 className="font-semibold mb-2">Update Status</h4>
                              <div className="flex flex-wrap gap-2">
                                <Select
                                  defaultValue={order.status}
                                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Change status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                    <SelectItem value="returned">Returned</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {[1, 2, 3].map(page => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                  className={currentPage === 3 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
