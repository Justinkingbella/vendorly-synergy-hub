
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Grid, List, 
  ChevronDown, Search, X, Plus, Minus, 
  SlidersHorizontal, Star, Heart, ShoppingCart, ArrowUpDown
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 249.99,
    rating: 4.8,
    reviewCount: 120,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    category: 'Audio',
    vendor: 'AudioTech',
    inStock: true,
    features: ['Noise-cancellation', 'Bluetooth 5.0', '30-hour battery'],
    badge: 'Featured',
    description: 'Experience premium sound quality with these wireless noise-cancelling headphones.',
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 399.99,
    rating: 4.9,
    reviewCount: 85,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
    category: 'Wearables',
    vendor: 'Tech Accessories',
    inStock: true,
    features: ['Heart rate monitoring', 'GPS', 'Water resistant'],
    badge: 'New',
    description: 'Stay connected and monitor your health with this advanced smartwatch.',
  },
  {
    id: 3,
    name: 'Noise-Cancelling Earbuds',
    price: 129.99,
    rating: 4.5,
    reviewCount: 74,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1770&auto=format&fit=crop',
    category: 'Audio',
    vendor: 'AudioTech',
    inStock: true,
    features: ['Active noise cancellation', 'Wireless charging', 'Touch controls'],
    badge: 'Popular',
    description: 'Immerse yourself in sound with these compact noise-cancelling earbuds.',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker Pro',
    price: 179.99,
    rating: 4.7,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop',
    category: 'Audio',
    vendor: 'AudioTech',
    inStock: true,
    features: ['360° sound', 'Waterproof', '24-hour battery life'],
    badge: 'Sale',
    description: 'Powerful sound in a portable, waterproof design for indoor and outdoor use.',
  },
  {
    id: 5,
    name: 'Portable Power Bank',
    price: 59.99,
    rating: 4.6,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1974&auto=format&fit=crop',
    category: 'Accessories',
    vendor: 'Tech Accessories',
    inStock: true,
    features: ['20,000 mAh', 'Fast charging', 'Multi-device charging'],
    badge: 'Top Rated',
    description: 'Keep your devices charged on the go with this high-capacity power bank.',
  },
  {
    id: 6,
    name: 'Wireless Gaming Mouse',
    price: 89.99,
    rating: 4.4,
    reviewCount: 48,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1965&auto=format&fit=crop',
    category: 'Gaming',
    vendor: 'GamingHub',
    inStock: true,
    features: ['16,000 DPI', 'Programmable buttons', 'RGB lighting'],
    badge: '',
    description: 'Precision and speed for competitive gaming with customizable features.',
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
    vendor: 'AudioTech',
    inStock: true,
    features: ['Touch controls', 'Voice assistant', 'IPX4 water resistance'],
    badge: 'Sale',
    description: 'Comfortable, lightweight earbuds with impressive sound quality and battery life.',
  },
  {
    id: 8,
    name: 'Smart Home Speaker',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1974&auto=format&fit=crop',
    category: 'Smart Home',
    vendor: 'Tech Accessories',
    inStock: true,
    features: ['Voice control', 'Multi-room audio', 'Smart home integration'],
    badge: 'Sale',
    description: 'Control your smart home and enjoy room-filling sound with this voice-activated speaker.',
  },
  {
    id: 9,
    name: 'HD Webcam',
    price: 59.99,
    originalPrice: 89.99,
    rating: 4.2,
    reviewCount: 41,
    image: 'https://images.unsplash.com/photo-1494173853739-c21f58b16055?q=80&w=2065&auto=format&fit=crop',
    category: 'Accessories',
    vendor: 'Tech Accessories',
    inStock: false,
    features: ['1080p HD', 'Built-in microphone', 'Auto light correction'],
    badge: 'Sale',
    description: 'Crystal clear video calls and recording with automatic light adjustment.',
  },
  {
    id: 10,
    name: 'Gaming Keyboard',
    price: 129.99,
    rating: 4.7,
    reviewCount: 53,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=1936&auto=format&fit=crop',
    category: 'Gaming',
    vendor: 'GamingHub',
    inStock: true,
    features: ['Mechanical switches', 'RGB backlighting', 'Programmable macros'],
    badge: 'Top Rated',
    description: 'Fast, responsive mechanical keyboard designed for serious gamers.',
  },
  {
    id: 11,
    name: 'Fitness Tracker',
    price: 79.99,
    rating: 4.4,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e97df66?q=80&w=1888&auto=format&fit=crop',
    category: 'Wearables',
    vendor: 'WearableGear',
    inStock: true,
    features: ['Heart rate monitoring', 'Sleep tracking', 'Water resistant'],
    badge: '',
    description: 'Track your fitness goals, heart rate, and sleep patterns with this sleek wearable.',
  },
  {
    id: 12,
    name: 'Laptop Stand',
    price: 39.99,
    rating: 4.5,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1619953942547-233eab5a70d6?q=80&w=1887&auto=format&fit=crop',
    category: 'Accessories',
    vendor: 'Tech Accessories',
    inStock: true,
    features: ['Adjustable height', 'Foldable', 'Heat dissipation'],
    badge: '',
    description: 'Ergonomic laptop stand for improved posture and device cooling.',
  },
];

// Categories for filtering
const categories = [
  { id: 'audio', name: 'Audio' },
  { id: 'wearables', name: 'Wearables' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'smart-home', name: 'Smart Home' },
];

// Vendors for filtering
const vendors = [
  { id: 'audiotech', name: 'AudioTech' },
  { id: 'tech-accessories', name: 'Tech Accessories' },
  { id: 'wearablegear', name: 'WearableGear' },
  { id: 'gaminghub', name: 'GamingHub' },
];

// Features for filtering
const features = [
  { id: 'wireless', name: 'Wireless' },
  { id: 'bluetooth', name: 'Bluetooth' },
  { id: 'noise-cancellation', name: 'Noise Cancellation' },
  { id: 'waterproof', name: 'Waterproof' },
  { id: 'fast-charging', name: 'Fast Charging' },
  { id: 'voice-control', name: 'Voice Control' },
];

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export default function Products() {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // View mode (grid or list)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    queryParams.get('categories')?.split(',').filter(Boolean) || []
  );
  const [selectedVendors, setSelectedVendors] = useState<string[]>(
    queryParams.get('vendors')?.split(',').filter(Boolean) || []
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    queryParams.get('features')?.split(',').filter(Boolean) || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(queryParams.get('minPrice')) || 0,
    Number(queryParams.get('maxPrice')) || 500
  ]);
  const [sortOption, setSortOption] = useState(queryParams.get('sort') || 'featured');
  const [inStockOnly, setInStockOnly] = useState(queryParams.get('inStock') === 'true');
  
  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  
  // Apply filters
  useEffect(() => {
    let result = [...mockProducts];
    
    // Search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category.toLowerCase().replace(' ', '-'))
      );
    }
    
    // Vendor filter
    if (selectedVendors.length > 0) {
      result = result.filter(product => 
        selectedVendors.includes(product.vendor.toLowerCase().replace(' ', '-'))
      );
    }
    
    // Features filter (simple implementation - would be more complex in real app)
    if (selectedFeatures.length > 0) {
      result = result.filter(product => 
        product.features.some(feature => 
          selectedFeatures.includes(feature.toLowerCase().replace(' ', '-'))
        )
      );
    }
    
    // Price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // In stock filter
    if (inStockOnly) {
      result = result.filter(product => product.inStock);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, we would sort by date
        // For mock data, we'll just assume the higher IDs are newer
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        // 'featured' - no specific sorting
        break;
    }
    
    setFilteredProducts(result);
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','));
    if (selectedVendors.length > 0) params.set('vendors', selectedVendors.join(','));
    if (selectedFeatures.length > 0) params.set('features', selectedFeatures.join(','));
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    if (inStockOnly) params.set('inStock', 'true');
    params.set('sort', sortOption);
    
    navigate({ search: params.toString() }, { replace: true });
  }, [
    searchQuery, 
    selectedCategories, 
    selectedVendors, 
    selectedFeatures, 
    priceRange, 
    inStockOnly, 
    sortOption,
    navigate
  ]);
  
  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedVendors([]);
    setSelectedFeatures([]);
    setPriceRange([0, 500]);
    setInStockOnly(false);
    setSortOption('featured');
    navigate({ search: '' }, { replace: true });
  };
  
  // Add to cart handler
  const addToCart = (productId: number) => {
    toast({
      title: "Added to cart",
      description: "This product has been added to your cart.",
    });
  };
  
  // Add to wishlist handler
  const addToWishlist = (productId: number) => {
    toast({
      title: "Added to wishlist",
      description: "This product has been added to your wishlist.",
    });
  };
  
  // Active filter count for mobile
  const activeFilterCount = [
    selectedCategories.length > 0,
    selectedVendors.length > 0,
    selectedFeatures.length > 0,
    priceRange[0] > 0 || priceRange[1] < 500,
    inStockOnly
  ].filter(Boolean).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Discover our wide range of high-quality tech products.
          </p>
        </div>
        
        {/* Mobile filter trigger */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-4/5 sm:w-96 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-6">
                {/* Mobile Search */}
                <div>
                  <h3 className="font-medium mb-3">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="pl-10"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Mobile Category Filter */}
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => {
                            setSelectedCategories(
                              checked 
                                ? [...selectedCategories, category.id]
                                : selectedCategories.filter(id => id !== category.id)
                            );
                          }}
                        />
                        <label
                          htmlFor={`mobile-category-${category.id}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mobile Price Range */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Price Range</h3>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-6"
                  />
                  <div className="flex items-center space-x-4">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 0 && value <= priceRange[1]) {
                          setPriceRange([value, priceRange[1]]);
                        }
                      }}
                      min={0}
                      max={priceRange[1]}
                    />
                    <span>to</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= priceRange[0] && value <= 500) {
                          setPriceRange([priceRange[0], value]);
                        }
                      }}
                      min={priceRange[0]}
                      max={500}
                    />
                  </div>
                </div>
                
                {/* Mobile Vendor Filter */}
                <div>
                  <h3 className="font-medium mb-3">Vendors</h3>
                  <div className="space-y-2">
                    {vendors.map((vendor) => (
                      <div key={vendor.id} className="flex items-center">
                        <Checkbox
                          id={`mobile-vendor-${vendor.id}`}
                          checked={selectedVendors.includes(vendor.id)}
                          onCheckedChange={(checked) => {
                            setSelectedVendors(
                              checked 
                                ? [...selectedVendors, vendor.id]
                                : selectedVendors.filter(id => id !== vendor.id)
                            );
                          }}
                        />
                        <label
                          htmlFor={`mobile-vendor-${vendor.id}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {vendor.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mobile Features Filter */}
                <div>
                  <h3 className="font-medium mb-3">Features</h3>
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <div key={feature.id} className="flex items-center">
                        <Checkbox
                          id={`mobile-feature-${feature.id}`}
                          checked={selectedFeatures.includes(feature.id)}
                          onCheckedChange={(checked) => {
                            setSelectedFeatures(
                              checked 
                                ? [...selectedFeatures, feature.id]
                                : selectedFeatures.filter(id => id !== feature.id)
                            );
                          }}
                        />
                        <label
                          htmlFor={`mobile-feature-${feature.id}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {feature.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mobile Availability Filter */}
                <div>
                  <div className="flex items-center">
                    <Checkbox
                      id="mobile-in-stock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) => setInStockOnly(!!checked)}
                    />
                    <label
                      htmlFor="mobile-in-stock"
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      In Stock Only
                    </label>
                  </div>
                </div>
                
                {/* Mobile Actions */}
                <div className="pt-4 border-t flex justify-between">
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                  <Button onClick={() => {
                    // This would apply filters in a real app
                    // Already handled by useEffect
                    document.querySelector('[data-radix-dialog-close]')?.click();
                  }}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            
            <Select
              value={sortOption}
              onValueChange={setSortOption}
            >
              <SelectTrigger className="ml-2 w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="pl-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
              
              <Accordion type="multiple" defaultValue={['categories', 'price', 'vendors', 'features', 'availability']} className="space-y-4">
                <AccordionItem value="categories" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-3">
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={(checked) => {
                              setSelectedCategories(
                                checked 
                                  ? [...selectedCategories, category.id]
                                  : selectedCategories.filter(id => id !== category.id)
                              );
                            }}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="price" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    Price Range
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-3">
                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mb-6"
                    />
                    <div className="flex items-center space-x-4">
                      <Input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= 0 && value <= priceRange[1]) {
                            setPriceRange([value, priceRange[1]]);
                          }
                        }}
                        min={0}
                        max={priceRange[1]}
                        className="h-8"
                      />
                      <span>to</span>
                      <Input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= priceRange[0] && value <= 500) {
                            setPriceRange([priceRange[0], value]);
                          }
                        }}
                        min={priceRange[0]}
                        max={500}
                        className="h-8"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="vendors" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    Vendors
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-3">
                    <div className="space-y-2">
                      {vendors.map((vendor) => (
                        <div key={vendor.id} className="flex items-center">
                          <Checkbox
                            id={`vendor-${vendor.id}`}
                            checked={selectedVendors.includes(vendor.id)}
                            onCheckedChange={(checked) => {
                              setSelectedVendors(
                                checked 
                                  ? [...selectedVendors, vendor.id]
                                  : selectedVendors.filter(id => id !== vendor.id)
                              );
                            }}
                          />
                          <label
                            htmlFor={`vendor-${vendor.id}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {vendor.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="features" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    Features
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-3">
                    <div className="space-y-2">
                      {features.map((feature) => (
                        <div key={feature.id} className="flex items-center">
                          <Checkbox
                            id={`feature-${feature.id}`}
                            checked={selectedFeatures.includes(feature.id)}
                            onCheckedChange={(checked) => {
                              setSelectedFeatures(
                                checked 
                                  ? [...selectedFeatures, feature.id]
                                  : selectedFeatures.filter(id => id !== feature.id)
                              );
                            }}
                          />
                          <label
                            htmlFor={`feature-${feature.id}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {feature.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="availability" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    Availability
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-3">
                    <div className="flex items-center">
                      <Checkbox
                        id="in-stock"
                        checked={inStockOnly}
                        onCheckedChange={(checked) => setInStockOnly(!!checked)}
                      />
                      <label
                        htmlFor="in-stock"
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        In Stock Only
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Button 
                variant="outline" 
                onClick={clearAllFilters}
                className="w-full mt-6"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Desktop Sort and View Options */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Select
                  value={sortOption}
                  onValueChange={setSortOption}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Active Filters */}
            {(selectedCategories.length > 0 || 
              selectedVendors.length > 0 || 
              selectedFeatures.length > 0 || 
              priceRange[0] > 0 || 
              priceRange[1] < 500 || 
              inStockOnly) && (
              <div className="flex flex-wrap items-center gap-2 mb-6 px-4 py-3 bg-white rounded-lg shadow-sm">
                <span className="text-sm font-medium mr-2">Active Filters:</span>
                
                {selectedCategories.map((categoryId) => {
                  const category = categories.find(c => c.id === categoryId);
                  return category ? (
                    <Badge 
                      key={categoryId} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {category.name}
                      <button 
                        onClick={() => setSelectedCategories(
                          selectedCategories.filter(id => id !== categoryId)
                        )}
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ) : null;
                })}
                
                {selectedVendors.map((vendorId) => {
                  const vendor = vendors.find(v => v.id === vendorId);
                  return vendor ? (
                    <Badge 
                      key={vendorId} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {vendor.name}
                      <button 
                        onClick={() => setSelectedVendors(
                          selectedVendors.filter(id => id !== vendorId)
                        )}
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ) : null;
                })}
                
                {selectedFeatures.map((featureId) => {
                  const feature = features.find(f => f.id === featureId);
                  return feature ? (
                    <Badge 
                      key={featureId} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {feature.name}
                      <button 
                        onClick={() => setSelectedFeatures(
                          selectedFeatures.filter(id => id !== featureId)
                        )}
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ) : null;
                })}
                
                {(priceRange[0] > 0 || priceRange[1] < 500) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                    <button 
                      onClick={() => setPriceRange([0, 500])}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                {inStockOnly && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    In Stock Only
                    <button 
                      onClick={() => setInStockOnly(false)}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="ml-auto"
                >
                  Clear All
                </Button>
              </div>
            )}
            
            {/* Products Grid/List View */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                    <Link to={`/product/${product.id}`} className="block">
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
                    </Link>
                    <CardContent className="p-4">
                      <Link to={`/product/${product.id}`} className="block">
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
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold">{formatCurrency(product.price)}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through ml-2">
                                  {formatCurrency(product.originalPrice)}
                                </span>
                              )}
                            </div>
                            {!product.inStock && (
                              <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Link>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          className="flex-1" 
                          size="sm"
                          disabled={!product.inStock}
                          onClick={() => addToCart(product.id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" /> 
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => addToWishlist(product.id)}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <Link to={`/product/${product.id}`} className="block w-full sm:w-48 md:w-64">
                        <div className="relative h-48 sm:h-full overflow-hidden bg-gray-100">
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
                      </Link>
                      <div className="flex-1 flex flex-col p-4">
                        <div className="flex-1">
                          <Link to={`/product/${product.id}`} className="block">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                              <div>
                                <p className="text-sm text-muted-foreground">{product.category} • {product.vendor}</p>
                                <h3 className="font-medium text-lg mt-1">{product.name}</h3>
                              </div>
                              {!product.inStock && (
                                <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                                  Out of Stock
                                </Badge>
                              )}
                            </div>
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
                            <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {product.features.map((feature, index) => (
                                <Badge key={index} variant="outline">{feature}</Badge>
                              ))}
                            </div>
                          </Link>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div>
                            <span className="font-bold text-lg">{formatCurrency(product.price)}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through ml-2">
                                {formatCurrency(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              disabled={!product.inStock}
                              onClick={() => addToCart(product.id)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" /> 
                              Add to Cart
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => addToWishlist(product.id)}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Pagination placeholder */}
            <div className="mt-8 flex justify-center">
              <div className="join">
                <Button variant="outline" size="sm" className="join-item">Previous</Button>
                <Button variant="outline" size="sm" className="join-item">1</Button>
                <Button variant="default" size="sm" className="join-item">2</Button>
                <Button variant="outline" size="sm" className="join-item">3</Button>
                <Button variant="outline" size="sm" className="join-item">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
