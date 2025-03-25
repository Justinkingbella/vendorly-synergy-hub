
import React from 'react';
import { Link } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, Users, CreditCard, Package, 
  BarChart, ShieldCheck, HelpCircle, ArrowRight 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import SEO from '@/components/layout/SEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BecomeVendor = () => {
  return (
    <StoreLayout>
      <SEO 
        title="Become a Vendor" 
        description="Join thousands of vendors selling to millions of customers across Namibia on MarketHub."
        keywords="vendor registration, sell online, marketplace seller, ecommerce platform"
      />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">Grow Your Business with MarketHub</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join thousands of vendors selling to millions of customers across Namibia
          </p>
          <Button size="lg" asChild>
            <Link to="/vendor/register">
              Apply to Become a Vendor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-3xl font-bold mb-2">2M+</h3>
              <p className="text-muted-foreground">Active Customers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-3xl font-bold mb-2">250K+</h3>
              <p className="text-muted-foreground">Products Sold Monthly</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-3xl font-bold mb-2">N$25M+</h3>
              <p className="text-muted-foreground">Monthly Vendor Earnings</p>
            </CardContent>
          </Card>
        </div>
        
        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply</h3>
              <p className="text-muted-foreground">
                Complete our simple application form with your business details and product information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Up</h3>
              <p className="text-muted-foreground">
                Create your vendor profile, add products, and configure payment and shipping options.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sell</h3>
              <p className="text-muted-foreground">
                Start selling to customers across Namibia and grow your business with our marketing tools.
              </p>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Benefits of Selling with Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Access to Millions of Customers</h3>
                    <p className="text-muted-foreground">
                      Reach a vast customer base across Namibia without the cost of building your own e-commerce platform.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Powerful Seller Tools</h3>
                    <p className="text-muted-foreground">
                      Manage inventory, track orders, and analyze performance with our easy-to-use dashboard.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Secure and Timely Payments</h3>
                    <p className="text-muted-foreground">
                      Receive payments directly to your bank account on a regular schedule with detailed reporting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Marketing Support</h3>
                    <p className="text-muted-foreground">
                      Take advantage of our promotional events, sponsored listings, and targeted campaigns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Logistics Solutions</h3>
                    <p className="text-muted-foreground">
                      Utilize our network of delivery partners or manage your own shipping arrangements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
                    <p className="text-muted-foreground">
                      Get assistance from our vendor support team to help resolve issues and grow your business.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Pricing Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Pricing & Commissions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-center">Basic</h3>
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold">N$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-center text-muted-foreground mb-6">
                  Perfect for new businesses and individual sellers
                </p>
                
                <Separator className="my-4" />
                
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Up to 50 product listings</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>10% commission per sale</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Email support</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-6" asChild>
                  <Link to="/vendor/register?plan=basic">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary relative lg:scale-105">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-center">Professional</h3>
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold">N$299</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-center text-muted-foreground mb-6">
                  Ideal for growing businesses with multiple products
                </p>
                
                <Separator className="my-4" />
                
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Up to 500 product listings</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>7% commission per sale</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Promotional features</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-6" asChild>
                  <Link to="/vendor/register?plan=professional">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-center">Enterprise</h3>
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold">N$999</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-center text-muted-foreground mb-6">
                  For established businesses with high volume sales
                </p>
                
                <Separator className="my-4" />
                
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Unlimited product listings</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>5% commission per sale</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Premium analytics & reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Featured placement</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>API access</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-6" asChild>
                  <Link to="/vendor/register?plan=enterprise">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-center text-muted-foreground">
            All plans include access to the vendor dashboard, order management tools, and payment processing.
          </p>
        </div>
        
        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Vendor Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="h-16 w-16 rounded-full bg-gray-200 mb-4 mx-auto overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300" 
                    alt="Vendor Portrait" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Sarah's Crafts</h3>
                <p className="text-muted-foreground mb-4 text-center">Handmade jewelry and accessories</p>
                <p className="italic">
                  "Joining MarketHub allowed me to turn my hobby into a full-time business. Sales increased by 300% in just six months!"
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="h-16 w-16 rounded-full bg-gray-200 mb-4 mx-auto overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=300" 
                    alt="Vendor Portrait" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">TechNamibia</h3>
                <p className="text-muted-foreground mb-4 text-center">Electronics and gadgets retailer</p>
                <p className="italic">
                  "The platform's reach helped us expand from a small local shop to serving customers nationwide. Our revenue has doubled year-over-year."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="h-16 w-16 rounded-full bg-gray-200 mb-4 mx-auto overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1567784177951-6fa58317e16b?q=80&w=300" 
                    alt="Vendor Portrait" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Natural Essentials</h3>
                <p className="text-muted-foreground mb-4 text-center">Organic beauty and wellness products</p>
                <p className="italic">
                  "The analytics tools helped us understand what our customers want. We've optimized our product line and now have over 10,000 repeat customers."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I apply to become a vendor?</AccordionTrigger>
                <AccordionContent>
                  Click on the "Apply to Become a Vendor" button, complete the application form with your business details, and submit it for review. Our team will evaluate your application and respond within 48 hours.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What are the requirements to become a vendor?</AccordionTrigger>
                <AccordionContent>
                  You need to have a registered business in Namibia, a bank account, valid identification, and the ability to fulfill orders. Specific product categories may have additional requirements.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How and when will I get paid?</AccordionTrigger>
                <AccordionContent>
                  Payments are processed every two weeks for all completed and delivered orders. Funds are transferred directly to your registered bank account, with detailed reports available in your dashboard.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I handle shipping and returns?</AccordionTrigger>
                <AccordionContent>
                  You can choose to use our logistics partners or manage shipping yourself. For returns, we have a standardized policy that protects both vendors and customers, with clear guidelines for processing returns.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I upgrade or downgrade my subscription plan?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can change your subscription plan at any time from your vendor dashboard. Changes will take effect at the start of your next billing cycle.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>What support do you offer to vendors?</AccordionTrigger>
                <AccordionContent>
                  We provide comprehensive documentation, video tutorials, email support, and a dedicated account manager for Enterprise plan subscribers. We also offer regular webinars and training sessions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join our community of successful vendors and reach millions of customers across Namibia
          </p>
          <Button size="lg" asChild>
            <Link to="/vendor/register">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-muted-foreground">
            Have questions? <Link to="/contact" className="text-primary hover:underline">Contact our vendor support team</Link>
          </p>
        </div>
      </div>
    </StoreLayout>
  );
};

export default BecomeVendor;
