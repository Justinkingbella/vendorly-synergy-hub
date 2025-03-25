
import React, { useState, useEffect } from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, Truck, RotateCcw, Shield, ChevronDown, Check, Package, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

// Mock product data
const mockProduct = {
  id: 1,
  name: 'Wireless Noise-Cancelling Headphones',
  price: 249.99,
  originalPrice: 299.99,
  discount: 17,
  rating: 4.8,
  reviewCount: 342,
  inStock: true,
  description: 'Experience premium sound quality with our wireless noise-cancelling headphones. Perfect for travelers, commuters, or anyone who wants to enjoy their music without distractions.',
  features: [
    'Active noise cancellation technology',
    'Up to 30 hours of battery life',
    'Premium sound quality with deep bass',
    'Comfortable over-ear design',
    'Built-in microphone for calls',
    'Bluetooth 5.0 connectivity',
    'Quick charge: 5 minutes for 3 hours playback',
  ],
  specs: {
    'Brand': 'AudioPro',
    'Model': 'AP-NC100',
    'Color': 'Matte Black',
    'Connectivity': 'Bluetooth 5.0, 3.5mm audio jack',
    'Battery Life': 'Up to 30 hours',
    'Charging Time': '2 hours',
    'Weight': '250g',
    'Warranty': '2 years'
  },
  images: ['https://placehold.co/600x400?text=Headphones+1', 'https://placehold.co/600x400?text=Headphones+2', 'https://placehold.co/600x400?text=Headphones+3', 'https://placehold.co/600x400?text=Headphones+4'],
  colors: ['Black', 'White', 'Blue', 'Red'],
  vendorId: 5,
  vendorName: 'AudioPro Electronics',
  categoryId: 1,
  categoryName: 'Electronics',
  shipping: {
    free: true,
    estimatedDelivery: '3-5 business days'
  },
  returnPolicy: '30-day money-back guarantee'
};

// Mock related products
const relatedProducts = [
  {
    id: 2,
    name: 'Bluetooth Portable Speaker',
    price: 79.99,
    rating: 4.5,
    reviewCount: 128,
    image: 'https://placehold.co/300x200?text=Speaker'
  },
  {
    id: 3,
    name: 'Premium Earbuds',
    price: 149.99,
    rating: 4.7,
    reviewCount: 203,
    image: 'https://placehold.co/300x200?text=Earbuds'
  },
  {
    id: 4,
    name: 'Gaming Headset',
    price: 189.99,
    rating: 4.6,
    reviewCount: 167,
    image: 'https://placehold.co/300x200?text=Gaming+Headset'
  },
  {
    id: 5,
    name: 'Home Theater Sound System',
    price: 399.99,
    rating: 4.9,
    reviewCount: 85,
    image: 'https://placehold.co/300x200?text=Sound+System'
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedImage, setSelectedImage] = useState(0);

  // In a real app, you would fetch the product data based on the ID
  useEffect(() => {
    // Simulate product fetch
    console.log(`Fetching product with ID: ${id}`);
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${mockProduct.name} (${quantity}) has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${mockProduct.name} has been added to your wishlist.`,
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${mockProduct.categoryId}`} className="text-muted-foreground hover:text-foreground">{mockProduct.categoryName}</Link>
          <span className="mx-2">/</span>
          <span className="font-medium">{mockProduct.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="border rounded-lg overflow-hidden mb-4 bg-white">
              <img 
                src={mockProduct.images[selectedImage]} 
                alt={mockProduct.name} 
                className="w-full h-[400px] object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {mockProduct.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`border rounded-md overflow-hidden cursor-pointer ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={img} 
                    alt={`${mockProduct.name} view ${index + 1}`} 
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Link 
                to={`/vendor/${mockProduct.vendorId}`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {mockProduct.vendorName}
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold mt-1 mb-2">{mockProduct.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(mockProduct.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{mockProduct.rating}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {mockProduct.reviewCount} reviews
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">${mockProduct.price.toFixed(2)}</span>
                  {mockProduct.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">${mockProduct.originalPrice.toFixed(2)}</span>
                      <Badge className="bg-red-100 text-red-800">Save {mockProduct.discount}%</Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <Check className="h-4 w-4 mr-1" />
                  {mockProduct.inStock ? 'In stock' : 'Out of stock'}
                </p>
              </div>
              
              <Separator className="my-6" />
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color: {selectedColor}</h3>
                <div className="flex gap-2">
                  {mockProduct.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border ${selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                      style={{ 
                        backgroundColor: color.toLowerCase(),
                        border: color.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none',
                      }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button className="sm:flex-1" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" onClick={handleAddToWishlist}>
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
              </div>
              
              {/* Shipping Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start mb-3">
                  <Truck className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {mockProduct.shipping.free ? 'Free Shipping' : 'Standard Shipping'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Estimated delivery: {mockProduct.shipping.estimatedDelivery}
                    </p>
                  </div>
                </div>
                <div className="flex items-start mb-3">
                  <RotateCcw className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-muted-foreground">
                      {mockProduct.returnPolicy}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Secure Transaction</p>
                    <p className="text-sm text-muted-foreground">
                      Your payment information is processed securely
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Share */}
              <div>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for Description, Features, Specs, Reviews */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-3 data-[state=active]:shadow-none">
              Description
            </TabsTrigger>
            <TabsTrigger value="features" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-3 data-[state=active]:shadow-none">
              Features
            </TabsTrigger>
            <TabsTrigger value="specifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-3 data-[state=active]:shadow-none">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-3 data-[state=active]:shadow-none">
              Reviews ({mockProduct.reviewCount})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-6">
            <p className="text-lg leading-relaxed">
              {mockProduct.description}
            </p>
          </TabsContent>
          
          <TabsContent value="features" className="pt-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockProduct.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="specifications" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(mockProduct.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <div className="flex items-center mt-1">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(mockProduct.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">Based on {mockProduct.reviewCount} reviews</span>
                </div>
              </div>
              <Button>Write a Review</Button>
            </div>
            
            <div className="space-y-6">
              {/* This would be real reviews in a real app - just showing placeholders */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Customer {i + 1}</h4>
                    <span className="text-muted-foreground text-sm">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star 
                        key={j} 
                        className={`h-4 w-4 ${j < 5 - i % 2 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button variant="outline">See All Reviews</Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-2 mb-1">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs ml-1">({product.reviewCount})</span>
                    </div>
                    <p className="font-bold">${product.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

export default ProductDetail;
