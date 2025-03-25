
import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Clock, Package, ShieldCheck } from 'lucide-react';

const ShippingPage = () => {
  const { pages } = useStoreSettings();
  const pageData = pages.shipping;

  // Sample shipping methods and rates
  const shippingMethods = [
    {
      name: "Standard Shipping",
      price: "N$50 - N$150",
      time: "3-7 business days",
      icon: Truck
    },
    {
      name: "Express Shipping",
      price: "N$150 - N$300",
      time: "1-3 business days",
      icon: Clock
    },
    {
      name: "International Shipping",
      price: "N$400 - N$1200",
      time: "7-14 business days",
      icon: Package
    }
  ];

  return (
    <StoreLayout pageId="shipping">
      <div className="container mx-auto px-4 py-8">
        {pageData.bannerImage && (
          <div className="w-full aspect-[3/1] overflow-hidden rounded-lg mb-8">
            <img 
              src={pageData.bannerImage} 
              alt={pageData.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{pageData.title}</h1>
            <p className="text-lg text-muted-foreground">{pageData.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {shippingMethods.map((method, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">{method.name}</h3>
                    <p className="text-muted-foreground mb-1">Price: {method.price}</p>
                    <p className="text-muted-foreground">Delivery: {method.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-card border rounded-lg p-8 mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="mt-1">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Our Shipping Guarantee</h3>
                <p className="text-muted-foreground">
                  We guarantee safe and timely delivery of all orders. If your order is delayed or
                  damaged during transit, our customer service team will assist you with a replacement
                  or refund. Your satisfaction is our top priority.
                </p>
              </div>
            </div>
          </div>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
        </div>
      </div>
    </StoreLayout>
  );
};

export default ShippingPage;
