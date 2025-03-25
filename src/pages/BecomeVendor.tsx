
import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const BecomeVendor = () => {
  const { pages } = useStoreSettings();
  const pageData = pages.vendor;

  // Sample plan data - in a real app, this would come from your backend
  const plans = [
    {
      name: "Basic",
      price: "N$299",
      period: "per month",
      features: [
        "List up to 50 products",
        "5% commission fee",
        "Basic analytics",
        "Standard support",
        "1 user account"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "N$599",
      period: "per month",
      features: [
        "List up to 500 products",
        "3.5% commission fee",
        "Advanced analytics",
        "Priority support",
        "3 user accounts",
        "Promotional features"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "N$1299",
      period: "per month",
      features: [
        "Unlimited products",
        "2.5% commission fee",
        "Premium analytics",
        "24/7 dedicated support",
        "10 user accounts",
        "All promotional features",
        "API access"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <StoreLayout pageId="vendor">
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
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{pageData.title}</h1>
            <p className="text-lg text-muted-foreground">{pageData.subtitle}</p>
          </div>
          
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
          
          {/* Subscription Plans */}
          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg p-6 ${
                    plan.popular ? 'shadow-lg ring-2 ring-primary relative' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? '' : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'}`}
                    variant={plan.popular ? "default" : "secondary"}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-muted rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to start selling?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of successful vendors on our platform and start growing your business today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg">
                Create Vendor Account
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

export default BecomeVendor;
