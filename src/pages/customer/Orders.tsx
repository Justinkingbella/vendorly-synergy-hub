
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, Clock, Package, AlertCircle } from 'lucide-react';

type Order = {
  id: string;
  product: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  tracking?: string;
};

// Mock data for orders
const orders: Order[] = [
  { 
    id: 'ORD-001', 
    product: 'Wireless Headphones', 
    date: '2023-08-15', 
    status: 'delivered', 
    total: 89.99,
    tracking: 'TRK123456789'
  },
  { 
    id: 'ORD-002', 
    product: 'Smart Watch', 
    date: '2023-08-10', 
    status: 'shipped', 
    total: 199.99,
    tracking: 'TRK987654321'
  },
  { 
    id: 'ORD-003', 
    product: 'Bluetooth Speaker', 
    date: '2023-08-05', 
    status: 'processing', 
    total: 59.99 
  },
  { 
    id: 'ORD-004', 
    product: 'Ergonomic Keyboard', 
    date: '2023-07-25', 
    status: 'delivered', 
    total: 129.99,
    tracking: 'TRK456789123'
  },
  { 
    id: 'ORD-005', 
    product: 'Gaming Mouse', 
    date: '2023-07-15', 
    status: 'cancelled', 
    total: 45.99 
  },
];

export default function CustomerOrders() {
  return (
    <DashboardLayout type="customer">
      <div className="space-y-6">
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
          
          <TabsContent value="processing" className="space-y-4">
            {orders.filter(order => order.status === 'processing').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
          
          <TabsContent value="shipped" className="space-y-4">
            {orders.filter(order => order.status === 'shipped').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
          
          <TabsContent value="delivered" className="space-y-4">
            {orders.filter(order => order.status === 'delivered').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
          
          <TabsContent value="cancelled" className="space-y-4">
            {orders.filter(order => order.status === 'cancelled').map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{order.product}</CardTitle>
          <StatusBadge status={order.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-medium">{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date</p>
            <p className="font-medium">{order.date}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="font-medium">${order.total.toFixed(2)}</p>
          </div>
          <div>
            {order.tracking ? (
              <>
                <p className="text-sm text-muted-foreground">Tracking</p>
                <p className="font-medium">{order.tracking}</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground pt-4">No tracking available</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          {order.status === 'delivered' && (
            <Button variant="outline" size="sm">Review</Button>
          )}
          
          {order.status === 'shipped' && (
            <Button variant="outline" size="sm">Track Order</Button>
          )}
          
          {order.status === 'processing' && (
            <Button variant="outline" size="sm">Cancel</Button>
          )}
          
          <Button variant="secondary" size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: Order['status'] }) {
  switch (status) {
    case 'delivered':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Delivered
        </Badge>
      );
    case 'shipped':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          Shipped
        </Badge>
      );
    case 'processing':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Processing
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Cancelled
        </Badge>
      );
    default:
      return null;
  }
}
