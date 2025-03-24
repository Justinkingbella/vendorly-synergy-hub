import React from 'react';
import VendorLayout from '@/components/layout/VendorLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
                <span className="text-3xl font-bold">$10,500</span>
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
                <span className="text-3xl font-bold">42</span>
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
                <span className="text-3xl font-bold">1,258</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <p>
                <Badge variant="outline" className="mr-2">New Order</Badge>
                Order #12345 placed by John Doe
              </p>
              <p className="mt-4">
                <Badge variant="outline" className="mr-2">Product Update</Badge>
                Product "Awesome T-Shirt" updated
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;
