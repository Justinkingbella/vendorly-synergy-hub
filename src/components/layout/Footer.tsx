
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Youtube, Mail, 
  Phone, MapPin, ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Footer() {
  const { storeInfo, footerColumns, contactInfo, copyrightSettings } = useStoreSettings();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscription successful",
        description: "You've been added to our newsletter.",
      });
      setEmail('');
    }
  };

  const currentYear = new Date().getFullYear();
  const copyrightText = copyrightSettings.showYear 
    ? `© ${currentYear} ${copyrightSettings.companyName}. ${copyrightSettings.rightsText}`
    : `© ${copyrightSettings.companyName}. ${copyrightSettings.rightsText}`;

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{storeInfo.storeName}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {storeInfo.storeDescription}
            </p>
            {contactInfo.showSocialIcons && (
              <div className="flex space-x-4 mt-4">
                {storeInfo.socialLinks.facebook && (
                  <a href={storeInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                )}
                {storeInfo.socialLinks.twitter && (
                  <a href={storeInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                )}
                {storeInfo.socialLinks.instagram && (
                  <a href={storeInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                )}
                {storeInfo.socialLinks.youtube && (
                  <a href={storeInfo.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Youtube className="h-5 w-5" />
                    <span className="sr-only">YouTube</span>
                  </a>
                )}
              </div>
            )}
          </div>
          
          {/* Dynamic Footer Columns */}
          {footerColumns.map((column) => (
            <div key={column.id}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link to={link.url} className="text-muted-foreground hover:text-primary text-sm inline-flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter and get exclusive deals you won't find anywhere else.
            </p>
            {contactInfo.enableNewsletterSignup && (
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white dark:bg-gray-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
            )}
            
            <div className="mt-8 space-y-2">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{contactInfo.address}</span>
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
              {copyrightText}
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
