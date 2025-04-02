
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStoreData } from '@/context/StoreDataContext';
import { ArrowRight, ShoppingCart, Star } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const { data } = useStoreData();
  const featuredProducts = data.products.filter(product => product.featured);
  
  return (
    <StoreLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="container py-20 px-4 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Amazing Products from Local Vendors
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Shop quality items from verified vendors throughout the country.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/products')} 
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                Browse Products
              </Button>
              <Button 
                onClick={() => navigate('/become-vendor')} 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Become a Seller
              </Button>
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
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
            <p className="text-gray-600">Find what you're looking for by category</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.categories.map((category) => (
              <Card key={category.id} className="cursor-pointer overflow-hidden transition-transform hover:scale-105" onClick={() => navigate(`/category/${category.id}`)}>
                <div className="h-32 bg-gray-200">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Our selection of top products</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/products')}
              className="hidden md:flex items-center gap-2"
            >
              View All <ArrowRight size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden transition-all hover:shadow-md"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                  {product.stock <= 10 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs py-1 px-2 rounded">
                      Low Stock
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center">
                    <div className="flex items-center text-yellow-400 mr-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm ml-1">4.5</span>
                    </div>
                    <span className="text-xs text-gray-500">(120 reviews)</span>
                  </div>
                  <h3 className="font-medium mb-1 hover:text-primary truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {data.vendors.find(v => v.id === product.vendor)?.name || 'Unknown Vendor'}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-lg font-bold text-primary">N${product.price.toFixed(2)}</div>
                    <Button 
                      size="sm" 
                      className="rounded-full w-10 h-10 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic would go here
                        navigate('/cart');
                      }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button 
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>
      
      {/* Tabs Section - Recently Added, Most Popular */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <Tabs defaultValue="popular" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="popular">Most Popular</TabsTrigger>
                <TabsTrigger value="recent">Recently Added</TabsTrigger>
                <TabsTrigger value="deals">Best Deals</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="popular">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.products.slice(0, 4).map((product) => (
                  <Card 
                    key={product.id} 
                    className="overflow-hidden hover:shadow-md cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="h-48 bg-gray-200">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{product.name}</h3>
                      <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...data.products].reverse().slice(0, 4).map((product) => (
                  <Card 
                    key={product.id} 
                    className="overflow-hidden hover:shadow-md cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="h-48 bg-gray-200">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{product.name}</h3>
                      <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="deals">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.products.slice(0, 4).map((product) => (
                  <Card 
                    key={product.id} 
                    className="overflow-hidden hover:shadow-md cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs py-1 px-2 rounded">
                        Sale
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-primary font-bold">${(product.price * 0.8).toFixed(2)}</p>
                        <p className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Vendor Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Our Top Vendors</h2>
            <p className="text-gray-600">Quality products from trusted sellers</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.vendors.map((vendor) => (
              <Card 
                key={vendor.id} 
                className="overflow-hidden hover:shadow-md cursor-pointer"
                onClick={() => navigate(`/vendor/${vendor.id}`)}
              >
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={vendor.logo} 
                    alt={vendor.name} 
                    className="max-h-24 max-w-full"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium mb-1">{vendor.name}</h3>
                  <div className="flex items-center justify-center text-yellow-400 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(vendor.rating) ? 'fill-current' : ''}`} 
                      />
                    ))}
                    <span className="text-sm ml-1 text-gray-600">{vendor.rating}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{vendor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              onClick={() => navigate('/vendors')}
              variant="outline"
            >
              View All Vendors
            </Button>
          </div>
        </div>
      </section>
    </StoreLayout>
  );
}
