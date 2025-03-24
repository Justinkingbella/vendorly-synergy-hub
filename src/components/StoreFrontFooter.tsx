
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, Map, CreditCard, Truck, Package, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const StoreFrontFooter = () => {
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
              <a href="#" className="text-gray-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
              <Link to="/products" className="text-muted-foreground hover:text-foreground">Shop</Link>
              <Link to="/categories" className="text-muted-foreground hover:text-foreground">Categories</Link>
              <Link to="/deals" className="text-muted-foreground hover:text-foreground">Deals</Link>
              <Link to="/vendors" className="text-muted-foreground hover:text-foreground">Vendors</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link>
              <Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQs</Link>
              <Link to="/shipping" className="text-muted-foreground hover:text-foreground">Shipping Policy</Link>
              <Link to="/returns" className="text-muted-foreground hover:text-foreground">Returns & Refunds</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms & Conditions</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-r-none"
              />
              <Button className="rounded-l-none">Subscribe</Button>
            </div>
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
            &copy; {new Date().getFullYear()} MarketHub. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px]">VISA</div>
            <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px]">MASTER</div>
            <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px]">PAYPAL</div>
            <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px]">APPLE</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StoreFrontFooter;
