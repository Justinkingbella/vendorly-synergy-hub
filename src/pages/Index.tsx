
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, Star, Gift, Truck, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data for featured products and categories
const FEATURED_PRODUCTS = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.8,
    vendor: 'AudioTech'
  },
  {
    id: '2',
    title: 'Smart Watch Series 5',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
    rating: 4.9,
    vendor: 'TechWorld'
  },
  {
    id: '3',
    title: 'Minimalist Desk Lamp',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
    rating: 4.7,
    vendor: 'HomeDecor'
  },
  {
    id: '4',
    title: 'Professional DSLR Camera',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.6,
    vendor: 'PhotoPro'
  }
];

const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', count: 1240, image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D' },
  { id: 'fashion', name: 'Fashion', count: 840, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 'home', name: 'Home & Garden', count: 560, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww' },
  { id: 'beauty', name: 'Beauty & Health', count: 320, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww' }
];

const VENDORS = [
  { id: '1', name: 'AudioTech', rating: 4.8, productCount: 82, image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: '2', name: 'TechWorld', rating: 4.9, productCount: 156, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNvbXBhbnl8ZW58MHx8MHx8fDA%3D' },
  { id: '3', name: 'HomeDecor', rating: 4.7, productCount: 94, image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlfGVufDB8fDB8fHww' }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-primary/10 px-4 py-1.5 rounded-full text-primary text-sm font-medium">
                  Multi-Vendor Marketplace
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Shop from thousands of verified vendors
                </h1>
                <p className="text-lg text-muted-foreground">
                  Discover amazing products from top vendors worldwide, with secure payments and fast shipping.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/products">
                      Shop Now <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/vendor/register">Become a Vendor</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D" 
                    alt="Shopping" 
                    className="rounded-lg shadow-lg object-cover"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 w-48">
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                        <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">12,000+</p>
                        <p className="text-xs text-muted-foreground">Products</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 w-48">
                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">1,000+</p>
                        <p className="text-xs text-muted-foreground">Vendors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
                <p className="text-muted-foreground">Explore our wide selection of categories</p>
              </div>
              <Button variant="outline" asChild className="mt-4 md:mt-0">
                <Link to="/categories">
                  View All Categories <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/category/${category.id}`}
                  className="group relative overflow-hidden rounded-lg aspect-[4/3] transition-transform hover:scale-[1.02]"
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm text-white/80">{category.count} products</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-muted-foreground">Handpicked products from our top vendors</p>
              </div>
              <Button variant="outline" asChild className="mt-4 md:mt-0">
                <Link to="/products">
                  View All Products <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_PRODUCTS.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                  <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </Link>
                  <div className="p-4">
                    <Link 
                      to={`/vendor/${product.vendor.toLowerCase().replace(' ', '-')}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {product.vendor}
                    </Link>
                    <Link to={`/product/${product.id}`} className="block mt-1">
                      <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">{product.title}</h3>
                    </Link>
                    <div className="flex items-center mt-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                      <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-primary rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 md:p-12 flex flex-col justify-center text-white">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                    Special Offer
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Save up to 40% on Electronics</h2>
                  <p className="text-white/80 mb-6">
                    Limited time offer on premium electronics from our top-rated vendors. 
                    Don't miss out on these amazing deals!
                  </p>
                  <div>
                    <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                      <Link to="/deals">
                        Shop Now <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block relative">
                  <img 
                    src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D" 
                    alt="Electronics sale" 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Vendors */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Top Vendors</h2>
                <p className="text-muted-foreground">Explore stores from our trusted vendors</p>
              </div>
              <Button variant="outline" asChild className="mt-4 md:mt-0">
                <Link to="/vendors">
                  View All Vendors <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VENDORS.map((vendor) => (
                <Link 
                  key={vendor.id}
                  to={`/vendor/${vendor.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm transition-shadow hover:shadow-md flex flex-col items-center text-center"
                >
                  <div className="h-20 w-20 rounded-full overflow-hidden mb-4">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{vendor.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm">{vendor.rating} Rating</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{vendor.productCount} Products</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Why Shop With Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide the best shopping experience with these amazing benefits
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-sm">
                <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Quick shipping options available from our global network of vendors
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-sm">
                <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
                <p className="text-muted-foreground text-sm">
                  Multiple secure payment options and buyer protection guarantee
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-sm">
                <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
                <p className="text-muted-foreground text-sm">
                  Carefully vetted vendors and products for the best quality assurance
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-sm">
                <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Rewards Program</h3>
                <p className="text-muted-foreground text-sm">
                  Earn points with every purchase and unlock exclusive discounts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Selling on VendorHub?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/80">
              Join thousands of successful vendors on our platform. Reach millions of customers worldwide with our powerful marketplace tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/vendor/register">Become a Vendor</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/vendor/benefits">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
