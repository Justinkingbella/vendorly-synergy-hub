
import React from 'react';
import { Link } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  ChevronRight, 
  ShoppingCart, 
  Heart, 
  Star, 
  TrendingUp,
  Package
} from 'lucide-react';

// Mock featured products
const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 599.99,
    originalPrice: 799.99,
    image: 'https://placehold.co/300x300',
    discount: 25,
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: 'Smartphone 128GB Memory',
    price: 4999.99,
    originalPrice: 5999.99,
    image: 'https://placehold.co/300x300',
    discount: 17,
    rating: 4.7,
    reviews: 85,
  },
  {
    id: 3,
    name: 'Laptop 15.6" Full HD',
    price: 8499.99,
    originalPrice: 9999.99,
    image: 'https://placehold.co/300x300',
    discount: 15,
    rating: 4.3,
    reviews: 64,
  },
  {
    id: 4,
    name: 'Smart Watch Fitness Tracker',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://placehold.co/300x300',
    discount: 25,
    rating: 4.6,
    reviews: 93,
  },
];

// Mock categories
const categories = [
  { id: 1, name: 'Electronics', image: 'https://placehold.co/200x200', productCount: 450 },
  { id: 2, name: 'Clothing', image: 'https://placehold.co/200x200', productCount: 320 },
  { id: 3, name: 'Home & Kitchen', image: 'https://placehold.co/200x200', productCount: 280 },
  { id: 4, name: 'Beauty', image: 'https://placehold.co/200x200', productCount: 210 },
  { id: 5, name: 'Sports', image: 'https://placehold.co/200x200', productCount: 175 },
  { id: 6, name: 'Toys & Games', image: 'https://placehold.co/200x200', productCount: 150 },
];

// Mock top vendors
const topVendors = [
  { id: 1, name: 'Premium Electronics', logo: 'https://placehold.co/100x100', productCount: 128 },
  { id: 2, name: 'Fashion Hub', logo: 'https://placehold.co/100x100', productCount: 89 },
  { id: 3, name: 'Home Decor', logo: 'https://placehold.co/100x100', productCount: 76 },
  { id: 4, name: 'Beauty Store', logo: 'https://placehold.co/100x100', productCount: 62 },
];

const Index = () => {
  return (
    <StoreLayout>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-primary/90 to-primary flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover the Best Products in Namibia</h1>
            <p className="text-lg mb-6">Shop quality items from verified vendors throughout the country.</p>
            <div className="flex gap-4">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://placehold.co/1200x500')] opacity-10 mix-blend-overlay"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center p-4 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
              <div className="mr-4 p-3 rounded-full bg-primary/10 text-primary">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over N$599</p>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
              <div className="mr-4 p-3 rounded-full bg-primary/10 text-primary">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">100% authentic products</p>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
              <div className="mr-4 p-3 rounded-full bg-primary/10 text-primary">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Customer service available</p>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
              <div className="mr-4 p-3 rounded-full bg-primary/10 text-primary">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Browse Categories</h2>
              <p className="text-muted-foreground">Find products by category</p>
            </div>
            <Link to="/categories" className="flex items-center text-primary hover:text-primary/80">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] hover:border-primary/50 border border-transparent">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked by our team</p>
            </div>
            <Link to="/products" className="flex items-center text-primary hover:text-primary/80">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] border-transparent hover:border-primary/30">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      {product.discount}% OFF
                    </Badge>
                  )}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Button size="icon" variant="secondary" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white hover:bg-primary hover:text-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white hover:bg-primary hover:text-white">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    <Link to={`/product/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-lg">N$ {product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        N$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Button variant="ghost" className="w-full mt-3 hover:bg-primary hover:text-white transition-colors">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Top Vendors Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Top Vendors</h2>
              <p className="text-muted-foreground">Trusted sellers on our platform</p>
            </div>
            <Link to="/vendors" className="flex items-center text-primary hover:text-primary/80">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topVendors.map((vendor) => (
              <Link key={vendor.id} to={`/vendor/${vendor.id}`}>
                <Card className="hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] hover:border-primary/30 border-transparent">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <img 
                      src={vendor.logo} 
                      alt={vendor.name} 
                      className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-md"
                    />
                    <h3 className="font-medium mb-2">{vendor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{vendor.productCount} products</p>
                    <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white transition-colors">
                      Visit Store
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Deals Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-primary" />
              <div>
                <h2 className="text-2xl font-bold">Hot Deals</h2>
                <p className="text-muted-foreground">Limited time offers</p>
              </div>
            </div>
            <Link to="/deals" className="flex items-center text-primary hover:text-primary/80">
              View All Deals
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          {/* Sample deal card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6 overflow-hidden">
            <div className="md:w-1/2 flex justify-center relative">
              <div className="absolute top-0 left-0 bg-red-500 text-white px-4 py-1 rounded-br-lg font-medium">
                SALE
              </div>
              <img 
                src="https://placehold.co/500x300" 
                alt="Special Deal" 
                className="max-h-80 object-contain"
              />
            </div>
            <div className="md:w-1/2">
              <Badge className="mb-2 bg-red-500">Limited Time Offer</Badge>
              <h3 className="text-2xl font-bold mb-2">50% Off Premium Headphones</h3>
              <p className="text-muted-foreground mb-4">Experience crystal clear sound with our top-rated noise cancelling headphones. Limited stock available.</p>
              
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-primary">N$ 599.99</span>
                <span className="ml-2 text-lg text-muted-foreground line-through">N$ 1,199.99</span>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full hover:border-primary hover:text-primary">
                    View Details
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <span className="text-sm font-medium">Sale ends in:</span>
                  <div className="flex gap-2">
                    <div className="bg-white px-2 py-1 rounded text-center">
                      <span className="block text-primary font-bold">02</span>
                      <span className="text-xs text-muted-foreground">Days</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded text-center">
                      <span className="block text-primary font-bold">18</span>
                      <span className="text-xs text-muted-foreground">Hrs</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded text-center">
                      <span className="block text-primary font-bold">45</span>
                      <span className="text-xs text-muted-foreground">Min</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded text-center">
                      <span className="block text-primary font-bold">30</span>
                      <span className="text-xs text-muted-foreground">Sec</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6">Get updates on new products, special offers, and more.</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 py-3 px-4 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="rounded-l-none sm:rounded-l-none rounded-r-md mt-2 sm:mt-0 bg-white text-primary hover:bg-gray-100">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </StoreLayout>
  );
};

export default Index;
