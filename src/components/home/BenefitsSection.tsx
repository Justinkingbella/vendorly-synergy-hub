
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Shield, Truck, CreditCard, Clock, HeartHandshake } from 'lucide-react';

const benefits = [
  {
    icon: <ShoppingBag className="w-6 h-6 text-primary" />,
    title: 'Wide Selection',
    description: 'Browse thousands of products from verified vendors across multiple categories'
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: 'Secure Shopping',
    description: 'Our platform ensures safe transactions and protects your personal information'
  },
  {
    icon: <Truck className="w-6 h-6 text-primary" />,
    title: 'Fast Delivery',
    description: 'Get your orders delivered quickly to your doorstep with tracking updates'
  },
  {
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    title: 'Easy Payments',
    description: 'Multiple payment options available for your convenience and flexibility'
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: '24/7 Support',
    description: 'Our customer support team is always ready to assist you with any issues'
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-primary" />,
    title: 'Vendor Support',
    description: 'We help local businesses grow by providing them with a platform to sell'
  }
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Why Shop With Us</h2>
          <p className="text-muted-foreground">
            Discover the advantages of shopping on our marketplace platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
