
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { ShoppingBag, Search, ArrowRight, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { storeInfo } = useStoreSettings();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3752&h=1400&q=80" 
          alt="Marketplace Hero" 
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 mix-blend-multiply"></div>
      </div>
      
      {/* Content */}
      <div className="container relative mx-auto px-4 py-20 md:py-32 flex flex-col items-center">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-white text-sm font-medium">The marketplace you've been waiting for</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-slide-down">
            {storeInfo.storeName || "The Modern Marketplace"}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-slide-up">
            Discover amazing products from local vendors throughout the country.
            Shop with confidence on our secure platform.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto animate-zoom-in">
            <Input 
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 rounded-full border-0 shadow-lg text-base focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6"
              size="lg"
            >
              Search
            </Button>
          </form>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button 
              onClick={() => navigate('/products')} 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 btn-hover rounded-full px-8"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
            <Button 
              onClick={() => navigate('/become-vendor')} 
              variant="outline" 
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10 btn-hover rounded-full px-8"
            >
              Become a Seller
            </Button>
          </div>
        </div>
        
        {/* Floating badges */}
        <div className="hidden lg:block">
          <div className="absolute top-1/3 -left-4 bg-white rounded-lg shadow-lg p-3 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">24/7 Shopping</p>
                <p className="text-sm text-muted-foreground">Shop anytime</p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-1/4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Top Quality</p>
                <p className="text-sm text-muted-foreground">Verified sellers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
