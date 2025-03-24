
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, Map, CreditCard, Truck, Package, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const StoreFrontFooter = () => {
  const currentYear = new Date().getFullYear();
  
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    
    if (emailInput && emailInput.value) {
      toast({
        title: "Subscription Successful",
        description: "Thank you for subscribing to our newsletter!",
      });
      emailInput.value = '';
    }
  };
  
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 mb-8 border-b">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">Free Delivery</h3>
            <p className="text-sm text-muted-foreground">On orders over N$1000</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <RefreshCw className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">Easy Returns</h3>
            <p className="text-sm text-muted-foreground">30 days return policy</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">100% secure checkout</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">Quality Products</h3>
            <p className="text-sm text-muted-foreground">Carefully selected vendors</p>
          </div>
        </div>
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4">MarketHub</h2>
            <p className="text-muted-foreground mb-4">
              Your one-stop marketplace for quality products from verified vendors across Namibia.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
              <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">Categories</Link>
              <Link to="/deals" className="text-muted-foreground hover:text-foreground transition-colors">Deals</Link>
              <Link to="/vendors" className="text-muted-foreground hover:text-foreground transition-colors">Vendors</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
              <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQs</Link>
              <Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">Shipping Policy</Link>
              <Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors">Returns & Refunds</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <Input 
                type="email"
                name="email" 
                placeholder="Your email" 
                className="rounded-r-none"
                required
              />
              <Button type="submit" className="rounded-l-none">Subscribe</Button>
            </form>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-b">
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-2 text-primary" />
            <span>+264 61 123 4567</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-2 text-primary" />
            <span>support@markethub.na</span>
          </div>
          <div className="flex items-center">
            <Map className="h-5 w-5 mr-2 text-primary" />
            <span>123 Independence Ave, Windhoek, Namibia</span>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} MarketHub. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-medium">VISA</div>
            <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-medium">MASTER</div>
            <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-medium">PAYPAL</div>
            <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-medium">APPLE</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StoreFrontFooter;
