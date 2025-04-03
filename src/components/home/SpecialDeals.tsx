
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStoreData } from '@/context/StoreDataContext';
import { ArrowRight, ShoppingCart, Timer } from 'lucide-react';

const SpecialDeals: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useStoreData();
  
  // For demo purposes, just use the first few products and add discount info
  const dealProducts = data.products.slice(0, 4).map(product => ({
    ...product,
    discount: Math.floor(Math.random() * 30) + 10, // Random discount between 10-40%
    originalPrice: product.price,
    price: product.price * (1 - (Math.floor(Math.random() * 30) + 10) / 100)
  }));

  // Mock countdown timer
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer for demo purposes
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-gray-800 dark:to-gray-900">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2 animate-fade-in">Flash Deals</h2>
            <p className="text-muted-foreground animate-fade-in">Special offers for a limited time</p>
          </div>
          
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md animate-fade-in">
            <Timer className="w-5 h-5 text-primary mr-2" />
            <div className="text-sm">
              <span>Ends in: </span>
              <span className="font-bold">{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="overflow-hidden card-hover cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative h-48 bg-gray-200 overflow-hidden group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-0 left-0 bg-red-500 text-white font-bold py-1 px-3 rounded-br-lg">
                  {product.discount}% OFF
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium mb-1 hover:text-primary truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2 truncate">
                  {data.vendors.find(v => v.id === product.vendor)?.name || 'Unknown Vendor'}
                </p>
                
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-lg font-bold text-primary">N${product.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      N${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    className="rounded-full w-8 h-8 p-0 btn-hover"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic
                      navigate('/cart');
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            onClick={() => navigate('/deals')}
            className="btn-hover"
          >
            View All Deals <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpecialDeals;
