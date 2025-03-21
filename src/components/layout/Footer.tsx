
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Youtube, Mail, 
  Phone, MapPin, ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">VendorHub</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              A premium multi-vendor marketplace connecting global vendors with customers. 
              Shop with confidence from thousands of verified sellers.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-4">My Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Sign In / Register
                </Link>
              </li>
              <li>
                <Link to="/customer/dashboard" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link to="/customer/orders" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/customer/wishlist" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/vendor/register" className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Become a Vendor
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter and get exclusive deals you won't find anywhere else.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white dark:bg-gray-800"
              />
              <Button>Subscribe</Button>
            </div>
            
            <div className="mt-8 space-y-2">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@vendorhub.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Commerce Street, Market City</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} VendorHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img src="https://placehold.co/40x25" alt="Visa" className="h-6" />
              <img src="https://placehold.co/40x25" alt="Mastercard" className="h-6" />
              <img src="https://placehold.co/40x25" alt="Amex" className="h-6" />
              <img src="https://placehold.co/40x25" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
