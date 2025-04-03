
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useStoreData } from '@/context/StoreDataContext';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  productIds?: string[];
  limit?: number;
  showViewAll?: boolean;
  featured?: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  productIds,
  limit = 4,
  showViewAll = true,
  featured = false,
}) => {
  const navigate = useNavigate();
  const { data } = useStoreData();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  // Filter products based on props
  let products = data.products;
  
  if (featured) {
    products = products.filter(product => product.featured);
  }
  
  if (productIds && productIds.length > 0) {
    products = products.filter(product => productIds.includes(product.id));
  }
  
  products = products.slice(0, limit);
  
  const totalSlides = Math.ceil(products.length / 4);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  
  // Get visible products for current slide
  const visibleProducts = products.slice(currentSlide * 4, currentSlide * 4 + 4);
  
  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    // Add to cart logic would go here
    console.log(`Added product ${productId} to cart`);
  };
  
  const handleAddToWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    // Add to wishlist logic would go here
    console.log(`Added product ${productId} to wishlist`);
  };

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          
          {showViewAll && (
            <Button 
              variant="outline" 
              onClick={() => navigate('/products')}
              className="hidden md:flex items-center gap-2 btn-hover"
            >
              View All <ArrowRight size={16} />
            </Button>
          )}
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="overflow-hidden card-hover cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="relative h-48 bg-gray-200 overflow-hidden group">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.stock <= 10 && (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                          Low Stock
                        </Badge>
                      )}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button 
                          size="icon" 
                          variant="secondary"
                          className="rounded-full shadow-md mb-2 bg-white hover:bg-gray-100"
                          onClick={(e) => handleAddToWishlist(e, product.id)}
                        >
                          <Heart className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center text-yellow-400 mr-2">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm ml-1 text-gray-700 dark:text-gray-300">4.5</span>
                        </div>
                        <span className="text-xs text-muted-foreground">(120 reviews)</span>
                      </div>
                      <h3 className="font-medium mb-1 hover:text-primary truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 truncate">
                        {data.vendors.find(v => v.id === product.vendor)?.name || 'Unknown Vendor'}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-lg font-bold text-primary">N${product.price.toFixed(2)}</div>
                        <Button 
                          size="sm" 
                          className="rounded-full w-10 h-10 p-0 btn-hover"
                          onClick={(e) => handleAddToCart(e, product.id)}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {totalSlides > 1 && (
            <>
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 rounded-full opacity-70 hover:opacity-100 shadow-md z-10 bg-white dark:bg-gray-800"
                onClick={prevSlide}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 rounded-full opacity-70 hover:opacity-100 shadow-md z-10 bg-white dark:bg-gray-800"
                onClick={nextSlide}
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
        
        {showViewAll && (
          <div className="mt-6 text-center md:hidden">
            <Button 
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto btn-hover"
            >
              View All Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
