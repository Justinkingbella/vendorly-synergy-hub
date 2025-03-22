
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, Heart, Share2, Star, ChevronRight, Truck, Shield, 
  RefreshCw, Minus, Plus, Check, Info, AlertTriangle, CircleHelp
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock product data (would typically come from an API)
const mockProduct = {
  id: 1,
  name: 'Premium Wireless Headphones',
  description: 'Experience premium sound quality with these wireless noise-cancelling headphones. Designed for comfort and performance, these headphones deliver crystal-clear audio for an immersive listening experience.',
  price: 249.99,
  originalPrice: 299.99,
  discountPercentage: 17,
  rating: 4.8,
  reviewCount: 120,
  stockStatus: 'In Stock',
  stockCount: 15,
  sku: 'WH-PREMIUM-001',
  categories: ['Audio', 'Electronics', 'Accessories'],
  tags: ['wireless', 'bluetooth', 'noise-cancellation', 'premium'],
  features: [
    'Active Noise Cancellation Technology',
    'Bluetooth 5.0 connectivity',
    '30-hour battery life',
    'Premium memory foam ear cushions',
    'Built-in microphone for calls',
    'Touch controls on ear cup',
    'Foldable design for easy transport'
  ],
  specifications: {
    'Connectivity': 'Bluetooth 5.0, 3.5mm audio jack',
    'Battery Life': 'Up to 30 hours',
    'Charging Time': '2 hours',
    'Drivers': '40mm neodymium drivers',
    'Frequency Response': '20Hz - 20kHz',
    'Impedance': '32 Ohm',
    'Weight': '250g',
    'Colors Available': 'Black, Silver, Blue',
    'Warranty': '2-year manufacturer warranty'
  },
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1968&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524678714210-9917a6c619c2?q=80&w=1969&auto=format&fit=crop',
  ],
  colors: [
    { name: 'Black', value: '#000000', inStock: true },
    { name: 'Silver', value: '#C0C0C0', inStock: true },
    { name: 'Blue', value: '#0047AB', inStock: false },
  ],
  vendor: {
    id: 1,
    name: 'AudioTech',
    logo: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1770&auto=format&fit=crop',
    rating: 4.7,
    productCount: 48,
    verified: true,
  },
  shipping: {
    freeShipping: true,
    estimatedDelivery: '3-5 business days',
    returnPeriod: 30,
  },
  warranty: '2-year manufacturer warranty',
};

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    rating: 5,
    date: '2023-05-15',
    title: 'Best headphones I've ever owned',
    comment: 'The sound quality is absolutely amazing. Very comfortable for long listening sessions and the battery life is impressive. Highly recommend!',
    helpful: 24,
    verified: true,
  },
  {
    id: 2,
    user: {
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/100?img=5',
    },
    rating: 4,
    date: '2023-04-20',
    title: 'Great sound, minor comfort issues',
    comment: 'Sound quality is excellent and noise cancellation works very well. My only complaint is that they get a bit uncomfortable after wearing them for 3+ hours. Otherwise, great product!',
    helpful: 16,
    verified: true,
  },
  {
    id: 3,
    user: {
      name: 'Robert Johnson',
      avatar: 'https://i.pravatar.cc/100?img=3',
    },
    rating: 5,
    date: '2023-03-10',
    title: 'Worth every penny',
    comment: 'These headphones are incredible. The noise cancellation is perfect for my commute and the sound is crisp and clear. Battery lasts forever too!',
    helpful: 12,
    verified: true,
  },
  {
    id: 4,
    user: {
      name: 'Emily Davis',
      avatar: 'https://i.pravatar.cc/100?img=9',
    },
    rating: 3,
    date: '2023-02-28',
    title: 'Good but not great',
    comment: 'The sound quality is good, but I expected better noise cancellation at this price point. The ear cups are comfortable though and battery life is excellent.',
    helpful: 8,
    verified: true,
  },
];

// Mock related products
const relatedProducts = [
  {
    id: 3,
    name: 'Noise-Cancelling Earbuds',
    price: 129.99,
    rating: 4.5,
    reviewCount: 74,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1770&auto=format&fit=crop',
    category: 'Audio',
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
    id: 7,
    name: 'Wireless Earbuds',
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.3,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop',
    category: 'Audio',
    badge: 'Sale',
  },
  {
    id: 12,
    name: 'Gaming Headset',
    price: 149.99,
    rating: 4.6,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1591670578357-8de71c387061?q=80&w=1974&auto=format&fit=crop',
    category: 'Gaming',
  },
];

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Truncate text function
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState(mockProduct);
  const [reviews, setReviews] = useState(mockReviews);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch product data
  useEffect(() => {
    // In a real app, we would fetch data based on the ID
    // For now, we'll just simulate a loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Handle quantity change
  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    if (value > product.stockCount) {
      toast({
        title: "Maximum quantity reached",
        description: `Sorry, we only have ${product.stockCount} units in stock.`,
      });
      setQuantity(product.stockCount);
      return;
    }
    
    setQuantity(value);
  };
  
  // Add to cart handler
  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} (${selectedColor.name}) has been added to your cart.`,
    });
  };
  
  // Add to wishlist handler
  const addToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };
  
  // Share product handler
  const shareProduct = () => {
    // In a real app, we would implement sharing functionality
    // For now, just show a toast
    toast({
      title: "Share link copied",
      description: "Product link has been copied to your clipboard.",
    });
  };
  
  // Mark review as helpful
  const markReviewAsHelpful = (reviewId: number) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 } 
        : review
    ));
    
    toast({
      title: "Thank you!",
      description: "You marked this review as helpful.",
    });
  };
  
  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = (count / reviews.length) * 100;
    return { rating, count, percentage };
  });
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link to="/products" className="text-muted-foreground hover:text-foreground">Products</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link to={`/category/${product.categories[0].toLowerCase()}`} className="text-muted-foreground hover:text-foreground">
            {product.categories[0]}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="font-medium text-foreground">{truncateText(product.name, 30)}</span>
        </nav>
        
        {isLoading ? (
          <div className="rounded-lg bg-white shadow-sm p-8 flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-muted-foreground">Loading product details...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Product Detail Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-lg bg-gray-100 aspect-square">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {product.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="h-full flex items-center justify-center p-1">
                              <img 
                                src={image} 
                                alt={`${product.name} - Image ${index + 1}`} 
                                className="h-full w-full object-contain" 
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  </div>
                  <div className="flex gap-2 overflow-auto pb-1">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded border-2 ${
                          activeImageIndex === index 
                            ? 'border-primary' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`Thumbnail ${index + 1}`} 
                          className="w-full h-full object-cover rounded" 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="flex flex-col">
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                    
                    <div className="flex items-center mt-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(averageRating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {averageRating.toFixed(1)} ({reviews.length} reviews)
                      </span>
                      <Separator orientation="vertical" className="mx-3 h-4" />
                      <Link to={`/vendor/${product.vendor.id}`} className="text-sm text-muted-foreground hover:text-primary flex items-center">
                        <span>By {product.vendor.name}</span>
                        {product.vendor.verified && (
                          <Badge variant="outline" className="ml-2">Verified</Badge>
                        )}
                      </Link>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-muted-foreground">{product.description}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Key Features:</h3>
                      <ul className="space-y-1">
                        {product.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-baseline mb-6">
                      <div className="text-3xl font-bold">
                        {formatCurrency(product.price)}
                      </div>
                      {product.originalPrice && (
                        <>
                          <div className="ml-3 text-lg text-muted-foreground line-through">
                            {formatCurrency(product.originalPrice)}
                          </div>
                          <Badge className="ml-3 bg-red-500 hover:bg-red-600">
                            Save {product.discountPercentage}%
                          </Badge>
                        </>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Available Colors:</h3>
                      <div className="flex gap-3">
                        {product.colors.map((color) => (
                          <TooltipProvider key={color.name}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className={`relative h-10 w-10 rounded-full ${
                                    !color.inStock ? 'opacity-50 cursor-not-allowed' : ''
                                  } ${
                                    selectedColor.name === color.name 
                                    ? 'ring-2 ring-primary ring-offset-2' 
                                    : ''
                                  }`}
                                  style={{ backgroundColor: color.value }}
                                  onClick={() => {
                                    if (color.inStock) {
                                      setSelectedColor(color);
                                    }
                                  }}
                                  disabled={!color.inStock}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{color.name}{!color.inStock ? ' (Out of Stock)' : ''}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Quantity:</h3>
                        <div className="text-sm">
                          <span className={product.stockCount > 10 ? 'text-green-600' : product.stockCount > 5 ? 'text-orange-500' : 'text-red-500'}>
                            {product.stockCount} units left
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <input
                          type="number"
                          min="1"
                          max={product.stockCount}
                          value={quantity}
                          onChange={(e) => handleQuantityChange(Number(e.target.value))}
                          className="h-10 w-16 text-center border-y border-input bg-transparent"
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= product.stockCount}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-3">
                        <Button 
                          className="flex-1 sm:flex-none gap-2"
                          size="lg"
                          onClick={addToCart}
                        >
                          <ShoppingCart className="h-5 w-5" />
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-12 w-12"
                          onClick={addToWishlist}
                        >
                          <Heart className="h-5 w-5" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-12 w-12"
                          onClick={shareProduct}
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="ml-3">
                          <span className="text-sm font-medium">Shipping:</span>
                          <span className="text-sm ml-1 text-muted-foreground">
                            {product.shipping.freeShipping ? 'Free shipping' : 'Standard shipping rates apply'}.
                            Estimated delivery in {product.shipping.estimatedDelivery}.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <RefreshCw className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="ml-3">
                          <span className="text-sm font-medium">Returns:</span>
                          <span className="text-sm ml-1 text-muted-foreground">
                            Easy {product.shipping.returnPeriod}-day returns. See our policy.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="ml-3">
                          <span className="text-sm font-medium">Warranty:</span>
                          <span className="text-sm ml-1 text-muted-foreground">
                            {product.warranty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Tabs: Details, Specifications, Reviews */}
            <div className="mt-8">
              <Tabs defaultValue="details">
                <TabsList className="w-full border-b bg-transparent justify-start rounded-none">
                  <TabsTrigger value="details" className="data-[state=active]:border-b-primary data-[state=active]:border-b-2 rounded-none">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="specifications" className="data-[state=active]:border-b-primary data-[state=active]:border-b-2 rounded-none">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:border-b-primary data-[state=active]:border-b-2 rounded-none">
                    Reviews ({reviews.length})
                  </TabsTrigger>
                </TabsList>
                
                {/* Details Tab */}
                <TabsContent value="details" className="bg-white rounded-b-lg shadow-sm p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Product Description</h2>
                    <p className="text-muted-foreground">
                      {product.description}
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-6">Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h3 className="text-lg font-semibold mt-6">What's in the Box</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>{product.name}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>USB-C Charging Cable</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>3.5mm Audio Cable</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Carrying Case</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>User Manual</span>
                      </li>
                    </ul>
                    
                    <div className="mt-8 flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={product.vendor.logo} alt={product.vendor.name} />
                          <AvatarFallback>{product.vendor.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{product.vendor.name}</h3>
                            {product.vendor.verified && (
                              <Badge variant="outline" className="ml-2">Verified</Badge>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < Math.floor(product.vendor.rating) 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-xs ml-1">{product.vendor.rating}</span>
                            <span className="text-xs text-muted-foreground ml-3">
                              {product.vendor.productCount} products
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" asChild>
                        <Link to={`/vendor/${product.vendor.id}`}>
                          View Store
                        </Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Specifications Tab */}
                <TabsContent value="specifications" className="bg-white rounded-b-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Technical Specifications</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index} className="py-2 border-b">
                        <div className="flex justify-between">
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">SKU</h4>
                        <p className="text-muted-foreground">{product.sku}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Categories</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {product.categories.map((category, index) => (
                            <Badge key={index} variant="secondary">{category}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Tags</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {product.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" className="bg-white rounded-b-lg shadow-sm p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Reviews Summary */}
                    <div className="md:col-span-1">
                      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                      
                      <div className="flex items-center mb-4">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < Math.floor(averageRating) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-lg font-bold">{averageRating.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          out of 5
                        </span>
                      </div>
                      
                      <div className="text-sm mb-6">
                        Based on {reviews.length} reviews
                      </div>
                      
                      <div className="space-y-2">
                        {ratingDistribution.map(({ rating, count, percentage }) => (
                          <div key={rating} className="flex items-center">
                            <div className="w-12 text-sm">{rating} stars</div>
                            <div className="w-full mx-2 h-2 bg-gray-200 rounded">
                              <div 
                                className="h-2 bg-yellow-400 rounded" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="w-8 text-xs text-right">{count}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <Button className="w-full">Write a Review</Button>
                      </div>
                    </div>
                    
                    {/* Review List */}
                    <div className="md:col-span-2">
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b pb-6">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                                  <AvatarFallback>{review.user.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center">
                                    <span className="font-medium">{review.user.name}</span>
                                    {review.verified && (
                                      <Badge variant="outline" className="ml-2 text-xs">Verified Purchase</Badge>
                                    )}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(review.date).toLocaleDateString('en-US', { 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}
                                  </span>
                                </div>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating 
                                      ? 'text-yellow-400 fill-yellow-400' 
                                      : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <h4 className="font-medium mb-1">{review.title}</h4>
                            <p className="text-muted-foreground mb-3">{review.comment}</p>
                            
                            <div className="flex items-center justify-between">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => markReviewAsHelpful(review.id)}
                              >
                                Was this helpful? ({review.helpful})
                              </Button>
                              <Button variant="ghost" size="sm">Report</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <Button variant="outline">Load More Reviews</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Related Products */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Related Products</h2>
                <Button variant="ghost" asChild>
                  <Link to="/products" className="flex items-center">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md h-full">
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        {product.badge && (
                          <Badge className={`absolute top-2 right-2 z-10 ${
                            product.badge === 'Sale' ? 'bg-red-500 hover:bg-red-600' : ''
                          }`}>
                            {product.badge}
                          </Badge>
                        )}
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                        />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <h3 className="font-medium mt-1 mb-1">{product.name}</h3>
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
                        <div>
                          <span className="font-bold">{formatCurrency(product.price)}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
