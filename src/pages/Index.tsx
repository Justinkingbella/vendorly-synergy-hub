
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Star, ShoppingCart, Heart, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 249.99,
    rating: 4.8,
    reviewCount: 120,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    category: 'Audio',
    badge: 'Featured',
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 399.99,
    rating: 4.9,
    reviewCount: 85,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
    category: 'Wearables',
    badge: 'New',
  },
  {
    id: 3,
    name: 'Noise-Cancelling Earbuds',
    price: 129.99,
    rating: 4.5,
    reviewCount: 74,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1770&auto=format&fit=crop',
    category: 'Audio',
    badge: 'Popular',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker Pro',
    price: 179.99,
    rating: 4.7,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop',
    category: 'Audio',
    badge: 'Sale',
  },
  {
    id: 5,
    name: 'Portable Power Bank',
    price: 59.99,
    rating: 4.6,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1974&auto=format&fit=crop',
    category: 'Accessories',
    badge: 'Top Rated',
  },
  {
    id: 6,
    name: 'Wireless Gaming Mouse',
    price: 89.99,
    rating: 4.4,
    reviewCount: 48,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1965&auto=format&fit=crop',
    category: 'Gaming',
    badge: '',
  },
];

// Mock data for categories
const categories = [
  {
    id: 1,
    name: 'Audio',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2165&auto=format&fit=crop',
    productCount: 48,
  },
  {
    id: 2,
    name: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
    productCount: 32,
  },
  {
    id: 3,
    name: 'Gaming',
    image: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?q=80&w=2070&auto=format&fit=crop',
    productCount: 26,
  },
  {
    id: 4,
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1600086827875-a63b01f1335c?q=80&w=1974&auto=format&fit=crop',
    productCount: 54,
  },
];

// Mock data for deals
const dealProducts = [
  {
    id: 7,
    name: 'Wireless Earbuds',
    originalPrice: 149.99,
    salePrice: 99.99,
    discountPercentage: 33,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop',
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
  {
    id: 8,
    name: 'Smart Home Speaker',
    originalPrice: 199.99,
    salePrice: 149.99,
    discountPercentage: 25,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1974&auto=format&fit=crop',
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
  },
  {
    id: 9,
    name: 'HD Webcam',
    originalPrice: 89.99,
    salePrice: 59.99,
    discountPercentage: 33,
    image: 'https://images.unsplash.com/photo-1494173853739-c21f58b16055?q=80&w=2065&auto=format&fit=crop',
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
  },
];

// Mock data for vendors
const featuredVendors = [
  {
    id: 1,
    name: 'AudioTech',
    logo: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1770&auto=format&fit=crop',
    productCount: 48,
    rating: 4.8,
    verified: true,
  },
  {
    id: 2,
    name: 'Tech Accessories',
    logo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop',
    productCount: 72,
    rating: 4.7,
    verified: true,
  },
  {
    id: 3,
    name: 'WearableGear',
    logo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop',
    productCount: 36,
    rating: 4.5,
    verified: true,
  },
  {
    id: 4,
    name: 'GamingHub',
    logo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop',
    productCount: 54,
    rating: 4.6,
    verified: true,
  },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/100?img=1',
    comment: 'Amazing products and fast shipping! I'm really impressed with the quality and customer service.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/100?img=5',
    comment: 'The checkout process was seamless, and my order arrived earlier than expected. Will definitely shop here again!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Robert Johnson',
    avatar: 'https://i.pravatar.cc/100?img=3',
    comment: 'Great selection of tech products at competitive prices. Found exactly what I was looking for!',
    rating: 4,
  },
];

// Hero banners data
const heroBanners = [
  {
    id: 1,
    title: 'Premium Audio Experience',
    subtitle: 'Discover the latest in high-quality audio technology',
    image: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f4?q=80&w=1965&auto=format&fit=crop',
    ctaText: 'Shop Audio',
    ctaLink: '/category/audio',
    position: 'right',
  },
  {
    id: 2,
    title: 'Wearable Tech Sale',
    subtitle: 'Up to 40% off on selected smartwatches and fitness trackers',
    image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=1770&auto=format&fit=crop',
    ctaText: 'View Deals',
    ctaLink: '/deals',
    position: 'left',
  },
  {
    id: 3,
    title: 'Gaming Accessories',
    subtitle: 'Level up your gaming experience with pro gear',
    image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=1770&auto=format&fit=crop',
    ctaText: 'Explore Gaming',
    ctaLink: '/category/gaming',
    position: 'right',
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format countdown timer
const formatTimeLeft = (endTime: Date) => {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();
  
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
};

// Product Card Component
const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {product.badge && (
          <Badge className="absolute top-2 right-2 z-10">{product.badge}</Badge>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute bottom-2 right-2 flex gap-1">
          <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h3 className="font-medium line-clamp-1 mt-1 mb-1">{product.name}</h3>
            <div className="flex items-center space-x-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold">{formatCurrency(product.price)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DealCard = ({ deal }: { deal: any }) => {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(deal.endTime));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(deal.endTime));
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [deal.endTime]);
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Badge className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600">
          {deal.discountPercentage}% OFF
        </Badge>
        <img 
          src={deal.image} 
          alt={deal.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1 mb-1">{deal.name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold">{formatCurrency(deal.salePrice)}</span>
            <span className="text-sm text-muted-foreground line-through ml-2">
              {formatCurrency(deal.originalPrice)}
            </span>
          </div>
          <div className="flex items-center text-xs font-medium text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
          </div>
        </div>
        <Button className="w-full mt-3">Add to Cart</Button>
      </CardContent>
    </Card>
  );
};

const CategoryCard = ({ category }: { category: any }) => {
  return (
    <Link to={`/category/${category.id}`} className="block">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md h-full">
        <div className="relative h-36 overflow-hidden bg-gray-100">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        </div>
        <CardContent className="p-4 text-center">
          <h3 className="font-medium">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.productCount} Products</p>
        </CardContent>
      </Card>
    </Link>
  );
};

const VendorCard = ({ vendor }: { vendor: any }) => {
  return (
    <Link to={`/vendor/${vendor.id}`} className="block">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md h-full">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Avatar className="h-16 w-16 mb-3">
            <AvatarImage src={vendor.logo} alt={vendor.name} />
            <AvatarFallback>{vendor.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex items-center mb-1">
            <h3 className="font-medium">{vendor.name}</h3>
            {vendor.verified && (
              <Badge variant="outline" className="ml-2">Verified</Badge>
            )}
          </div>
          <div className="flex items-center mb-1">
            <div className="flex mr-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${i < Math.floor(vendor.rating) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-xs">{vendor.rating}</span>
          </div>
          <p className="text-sm text-muted-foreground">{vendor.productCount} Products</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function Index() {
  const { toast } = useToast();
  
  const subscribeToNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    toast({
      title: "Subscribed!",
      description: "You've been added to our newsletter.",
    });
    
    // Reset form
    e.currentTarget.reset();
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {heroBanners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="relative h-[60vh] max-h-[600px] overflow-hidden">
                  <img 
                    src={banner.image} 
                    alt={banner.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 flex items-center ${
                    banner.position === 'right' ? 'justify-end pr-12' : 'justify-start pl-12'
                  }`}>
                    <div className={`bg-white/85 backdrop-blur-sm dark:bg-gray-900/85 p-8 max-w-md rounded-lg ${
                      banner.position === 'right' ? 'mr-4 md:mr-12' : 'ml-4 md:ml-12'
                    }`}>
                      <h1 className="text-3xl md:text-4xl font-bold mb-2">{banner.title}</h1>
                      <p className="text-muted-foreground mb-6">{banner.subtitle}</p>
                      <Button asChild>
                        <Link to={banner.ctaLink}>{banner.ctaText}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </div>
        </Carousel>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Button variant="ghost" asChild>
            <Link to="/categories" className="flex items-center">
              View All Categories
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Button variant="ghost" asChild>
            <Link to="/products" className="flex items-center">
              View All Products
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>
      
      {/* Deals Section */}
      <section className="py-12 px-4 md:px-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Limited Time Deals</h2>
            <Button variant="ghost" asChild>
              <Link to="/deals" className="flex items-center">
                View All Deals
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {dealProducts.map((deal) => (
              <Link key={deal.id} to={`/product/${deal.id}`}>
                <DealCard deal={deal} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Products */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Trending Products</h2>
          </div>
        </div>
        <Tabs defaultValue="audio">
          <TabsList className="mb-6">
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="wearables">Wearables</TabsTrigger>
            <TabsTrigger value="gaming">Gaming</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>
          <TabsContent value="audio" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.filter(p => p.category === 'Audio').map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </TabsContent>
          <TabsContent value="wearables" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.filter(p => p.category === 'Wearables').map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </TabsContent>
          <TabsContent value="gaming" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.filter(p => p.category === 'Gaming').map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </TabsContent>
          <TabsContent value="accessories" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.filter(p => p.category === 'Accessories').map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Featured Vendors */}
      <section className="py-12 px-4 md:px-8 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Vendors</h2>
            <Button variant="ghost" asChild>
              <Link to="/vendors" className="flex items-center">
                View All Vendors
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < testimonial.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.comment}</p>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Newsletter Subscription */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest updates on new products, special offers, and more.
          </p>
          <form onSubmit={subscribeToNewsletter} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
