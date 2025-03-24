
import React from 'react';
import VendorLayout from '@/components/layout/VendorLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, ShoppingCart, Eye } from 'lucide-react';

const VendorDashboard = () => {
  return (
    <VendorLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Total Sales</h2>
                  <p className="text-muted-foreground">Last 30 days</p>
                </div>
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-3xl font-bold">$10,500</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">New Orders</h2>
                  <p className="text-muted-foreground">Last 7 days</p>
                </div>
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-3xl font-bold">42</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Product Views</h2>
                  <p className="text-muted-foreground">Last 24 hours</p>
                </div>
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-3xl font-bold">1,258</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Badge variant="outline" className="mr-2">New Order</Badge>
                  <span>Order #12345 placed by John Doe</span>
                </div>
                <div className="flex items-start">
                  <Badge variant="outline" className="mr-2">Product Update</Badge>
                  <span>Product "Awesome T-Shirt" updated</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;
