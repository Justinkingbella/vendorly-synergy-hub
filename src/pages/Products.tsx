import React, { useState, useEffect } from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  Search, 
  Grid3x3, 
  LayoutList, 
  ArrowUpDown,
  Star,
  Heart,
  ShoppingCart,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewCount: 120,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    category: 'Audio',
    brand: 'AudioTech',
    tags: ['wireless', 'bluetooth', 'noise-cancellation'],
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    stockStatus: 'In Stock',
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 399.99,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 85,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop',
    category: 'Wearables',
    brand: 'TechWear',
    tags: ['smartwatch', 'fitness', 'health'],
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    stockStatus: 'In Stock',
  },
  {
    id: 3,
    name: 'Noise-Cancelling Earbuds',
    price: 129.99,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 74,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1770&auto=format&fit=crop',
    category: 'Audio',
    brand: 'SoundMaster',
    tags: ['earbuds', 'wireless', 'noise-cancellation'],
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    stockStatus: 'In Stock',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker Pro',
    price: 179.99,
    originalPrice: 229.99,
    rating: 4.7,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop',
    category: 'Audio',
    brand: 'AudioTech',
    tags: ['speaker', 'bluetooth', 'waterproof'],
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    stockStatus: 'Low Stock',
  },
  {
    id: 5,
    name: 'Portable Power Bank',
    price: 59.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1974&auto=format&fit=crop',
    category: 'Accessories',
    brand: 'PowerPlus',
    tags: ['power', 'portable', 'fast-charging'],
    isNew: false,
    isFeatured: true,
    isOnSale: false,
    stockStatus: 'In Stock',
  },
  {
    id: 6,
    name: 'Wireless Gaming Mouse',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.4,
    reviewCount: 48,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1965&auto=format&fit=crop',
    category: 'Gaming',
    brand: 'GameMaster',
    tags: ['gaming', 'wireless', 'rgb'],
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    stockStatus: 'In Stock',
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
    brand: 'SoundMaster',
    tags: ['earbuds', 'wireless', 'bluetooth'],
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    stockStatus: 'Out of Stock',
  },
  {
    id: 8,
    name: 'Smart Home Speaker',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 73,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1974&auto=format&fit=crop',
    category: 'Smart Home',
    brand: 'HomeConnect',
    tags: ['smart', 'speaker', 'assistant'],
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    stockStatus: 'In Stock',
  },
  {
    id: 9,
    name: 'HD Webcam',
    price: 59.99,
    originalPrice: 89.99,
    rating: 4.2,
    reviewCount: 37,
    image: 'https://images.unsplash.com/photo-1494173853739-c21f58b16055?q=80&w=2065&auto=format&fit=crop',
    category: 'Accessories',
    brand: 'TechView',
    tags: ['webcam', 'hd', 'streaming'],
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    stockStatus: 'In Stock',
  },
  {
    id: 10,
    name: 'Mechanical Keyboard',
    price: 129.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 86,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2080&auto=format&fit=crop',
    category: 'Gaming',
    brand: 'GameMaster',
    tags: ['keyboard', 'mechanical', 'rgb'],
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    stockStatus: 'In Stock',
  },
  {
    id: 11,
    name: 'Ultra-Wide Monitor',
    price: 499.99,
    originalPrice: 599.99,
    rating: 4.8,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=1964&auto=format&fit=crop',
    category: 'Monitors',
    brand: 'ViewTech',
    tags: ['monitor', 'ultrawide', 'gaming'],
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    stockStatus: 'In Stock',
  },
  {
    id: 12,
    name: 'Gaming Headset',
    price: 149.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1591670578357-8de71c387061?q=80&w=1974&auto=format&fit=crop',
    category: 'Gaming',
    brand: 'GameMaster',
    tags: ['gaming', 'headset', 'rgb'],
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    stockStatus: 'In Stock',
  },
];

// Mock categories data
const categories = [
  { id: 1, name: 'Audio', count: 28 },
  { id: 2, name: 'Wearables', count: 12 },
  { id: 3, name: 'Gaming', count: 24 },
  { id: 4, name: 'Smart Home', count: 18 },
  { id: 5, name: 'Accessories', count: 32 },
  { id: 6, name: 'Monitors', count: 9 },
];

// Mock brands data
const brands = [
  { id: 1, name: 'AudioTech', count: 15 },
  { id: 2, name: 'TechWear', count: 8 },
  { id: 3, name: 'SoundMaster', count: 12 },
  { id: 4, name: 'PowerPlus', count: 6 },
  { id: 5, name: 'GameMaster', count: 18 },
  { id: 6, name: 'HomeConnect', count: 10 },
  { id: 7, name: 'TechView', count: 7 },
  { id: 8, name: 'ViewTech', count: 9 },
];

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const Products = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    onSale: false,
    inStock: false,
    freeShipping: false,
    newArrivals: false,
  });
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  
  useEffect(() => {
    const loadProducts = () => {
      setIsLoading(true);
      setTimeout(() => {
        setProducts(mockProducts);
        setIsLoading(false);
      }, 500);
    };
    
    loadProducts();
  }, []);
  
  useEffect(() => {
    if (id) {
      const category = categories.find(cat => cat.id.toString() === id)?.name;
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [id]);
  
  useEffect(() => {
    let result = [...products];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }
    
    if (selectedTags.length > 0) {
      result = result.filter(product => 
        product.tags.some((tag: string) => selectedTags.includes(tag))
      );
    }
    
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (filterOptions.onSale) {
      result = result.filter(product => product.isOnSale);
    }
    
    if (filterOptions.inStock) {
      result = result.filter(product => product.stockStatus !== 'Out of Stock');
    }
    
    if (filterOptions.newArrivals) {
      result = result.filter(product => product.isNew);
    }
    
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
        result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (a.isFeatured === b.isFeatured) ? 0 : a.isFeatured ? -1 : 1);
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, selectedBrands, selectedTags, priceRange, filterOptions, sortOption, searchQuery]);
  
  const handleCategoryChange = (category: string | null) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };
  
  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  
  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const allTags = Array.from(new Set(products.flatMap(product => product.tags)));
  
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
  };
  
  const handleFilterOptionChange = (option: keyof typeof filterOptions) => {
    setFilterOptions({
      ...filterOptions,
      [option]: !filterOptions[option]
    });
  };
  
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrands([]);
    setSelectedTags([]);
    setPriceRange([0, 600]);
    setFilterOptions({
      onSale: false,
      inStock: false,
      freeShipping: false,
      newArrivals: false,
    });
    setSortOption('featured');
    setSearchQuery('');
    
    toast({
      title: "Filters cleared",
      description: "All filters have been reset to default values."
    });
  };
  
  const handleAddToCart = (productId: number, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const product = products.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`
      });
    }
  };
  
  const handleAddToWishlist = (productId: number, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const product = products.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`
      });
    }
  };
  
  const ProductGridCard = ({ product }: { product: any }) => (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md h-full">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {product.isNew && (
          <Badge className="absolute top-2 left-2 z-10 bg-blue-500 hover:bg-blue-600">New</Badge>
        )}
        {product.isOnSale && (
          <Badge className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600">Sale</Badge>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute bottom-2 right-2 flex gap-1">
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
            onClick={(e) => handleAddToWishlist(product.id, e)}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
            onClick={(e) => handleAddToCart(product.id, e)}
          >
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
            <div>
              <span className="font-bold">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <div className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
            {product.stockStatus}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const ProductListCard = ({ product }: { product: any }) => (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden bg-gray-100">
          {product.isNew && (
            <Badge className="absolute top-2 left-2 z-10 bg-blue-500 hover:bg-blue-600">New</Badge>
          )}
          {product.isOnSale && (
            <Badge className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600">Sale</Badge>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="text-sm text-muted-foreground">•</p>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
              </div>
              <h3 className="text-lg font-medium mt-1 mb-1">{product.name}</h3>
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in tincidunt erat, vitae malesuada sem.
              </p>
              <div className="flex flex-wrap gap-1 mb-4">
                {product.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="text-sm font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
              {product.stockStatus}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-xl font-bold">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={(e) => handleAddToWishlist(product.id, e)}
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </Button>
              <Button 
                size="sm" 
                className="gap-1"
                onClick={(e) => handleAddToCart(product.id, e)}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
  
  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Filters</h3>
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Clear All
          </Button>
        </div>
        <Separator className="my-4" />
      </div>
      
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div 
                className={`text-sm cursor-pointer ${selectedCategory === category.name ? 'font-medium text-primary' : 'text-muted-foreground'}`}
                onClick={() => handleCategoryChange(category.name)}
              >
                {category.name}
              </div>
              <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                {category.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            defaultValue={priceRange}
            min={0}
            max={600}
            step={10}
            onValueChange={handlePriceRangeChange}
            className="mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="text-sm">
              {formatCurrency(priceRange[0])}
            </div>
            <div className="text-sm">
              {formatCurrency(priceRange[1])}
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <Accordion type="multiple" className="w-full" defaultValue={["brands"]}>
        <AccordionItem value="brands">
          <AccordionTrigger className="font-medium py-2">Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand.id}`} 
                      checked={selectedBrands.includes(brand.name)}
                      onCheckedChange={() => handleBrandChange(brand.name)}
                    />
                    <label htmlFor={`brand-${brand.id}`} className="text-sm cursor-pointer">
                      {brand.name}
                    </label>
                  </div>
                  <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                    {brand.count}
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="tags">
          <AccordionTrigger className="font-medium py-2">Tags</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {allTags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`tag-${index}`} 
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => handleTagChange(tag)}
                  />
                  <label htmlFor={`tag-${index}`} className="text-sm cursor-pointer">
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="availability">
          <AccordionTrigger className="font-medium py-2">Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="filter-on-sale" 
                  checked={filterOptions.onSale}
                  onCheckedChange={() => handleFilterOptionChange('onSale')}
                />
                <label htmlFor="filter-on-sale" className="text-sm cursor-pointer">
                  On Sale
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="filter-in-stock" 
                  checked={filterOptions.inStock}
                  onCheckedChange={() => handleFilterOptionChange('inStock')}
                />
                <label htmlFor="filter-in-stock" className="text-sm cursor-pointer">
                  In Stock
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="filter-new-arrivals" 
                  checked={filterOptions.newArrivals}
                  onCheckedChange={() => handleFilterOptionChange('newArrivals')}
                />
                <label htmlFor="filter-new-arrivals" className="text-sm cursor-pointer">
                  New Arrivals
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
  
  const FilterSheet = () => (
    <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-1 md:hidden">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
          <SheetDescription>
            Apply filters to find exactly what you're looking for.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <FilterSidebar />
        </div>
        <SheetFooter className="mt-6">
          <Button onClick={() => setIsFilterSheetOpen(false)}>
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
  
  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {selectedCategory ? selectedCategory : 'All Products'}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-input pl-8 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-between md:justify-start items-center">
            <FilterSheet />
            
            <div className="flex items-center gap-2">
              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value)}
              >
                <SelectTrigger className="w-[180px] h-9 gap-1">
                  <ArrowUpDown className="h-3.5 w-3.5" />
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
              
              <div className="hidden md:flex border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-r-none ${viewMode === 'grid' ? 'bg-secondary' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-l-none ${viewMode === 'list' ? 'bg-secondary' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {(selectedCategory || selectedBrands.length > 0 || selectedTags.length > 0 || filterOptions.onSale || filterOptions.inStock || filterOptions.newArrivals) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory && (
              <Badge variant="secondary" className="px-3 py-1 gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory(null)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {selectedBrands.map((brand) => (
              <Badge key={brand} variant="secondary" className="px-3 py-1 gap-1">
                {brand}
                <button onClick={() => handleBrandChange(brand)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 gap-1">
                {tag}
                <button onClick={() => handleTagChange(tag)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            
            {filterOptions.onSale && (
              <Badge variant="secondary" className="px-3 py-1 gap-1">
                On Sale
                <button onClick={() => handleFilterOptionChange('onSale')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {filterOptions.inStock && (
              <Badge variant="secondary" className="px-3 py-1 gap-1">
                In Stock
                <button onClick={() => handleFilterOptionChange('inStock')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {filterOptions.newArrivals && (
              <Badge variant="secondary" className="px-3 py-1 gap-1">
                New Arrivals
                <button onClick={() => handleFilterOptionChange('newArrivals')}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            <Button variant="ghost" size="sm" onClick={handleClearFilters} className="gap-1">
              <X className="h-3 w-3" />
              Clear All
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block">
            <FilterSidebar />
          </div>
          
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-48 bg-gray-100 animate-pulse"></div>
                    <CardContent className="p-4">
                      <div className="h-4 w-1/3 bg-gray-100 animate-pulse mb-2"></div>
                      <div className="h-5 w-2/3 bg-gray-100 animate-pulse mb-2"></div>
                      <div className="h-4 w-1/2 bg-gray-100 animate-pulse mb-2"></div>
                      <div className="h-5 w-1/4 bg-gray-100 animate-pulse"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <Button onClick={handleClearFilters}>Clear All Filters</Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <ProductGridCard product={product} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <ProductListCard product={product} />
                  </Link>
                ))}
              </div>
            )}
            
            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

export default Products;
