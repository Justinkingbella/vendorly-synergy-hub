
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Search, ChevronDown, Award, MapPin, Store, ShoppingBag } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import StoreLayout from '@/components/layout/StoreLayout';

// Sample vendors data
const vendors = [
  {
    id: 1,
    name: "Premium Electronics",
    logo: "https://placehold.co/100x100",
    description: "High-quality electronics at affordable prices. All products come with a 1-year warranty.",
    rating: 4.7,
    reviews: 243,
    location: "Windhoek, Namibia",
    products: 87,
    featured: true,
    categories: ["Electronics", "Gadgets"]
  },
  {
    id: 2,
    name: "Fashion World",
    logo: "https://placehold.co/100x100",
    description: "Trendy fashion items for men, women, and children. Free shipping on orders over N$1000.",
    rating: 4.5,
    reviews: 182,
    location: "Swakopmund, Namibia",
    products: 156,
    featured: true,
    categories: ["Fashion", "Accessories"]
  },
  {
    id: 3,
    name: "Home & Decor",
    logo: "https://placehold.co/100x100",
    description: "Everything you need to make your house a home. Quality furniture and decor items.",
    rating: 4.8,
    reviews: 127,
    location: "Walvis Bay, Namibia",
    products: 93,
    featured: false,
    categories: ["Home", "Furniture", "Decor"]
  },
  {
    id: 4,
    name: "Sports Gear",
    logo: "https://placehold.co/100x100",
    description: "Sports equipment and clothing for all types of sports and outdoor activities.",
    rating: 4.6,
    reviews: 89,
    location: "Windhoek, Namibia",
    products: 112,
    featured: false,
    categories: ["Sports", "Outdoor"]
  },
  {
    id: 5,
    name: "Beauty Haven",
    logo: "https://placehold.co/100x100",
    description: "Premium beauty and skincare products from top brands. Cruelty-free options available.",
    rating: 4.9,
    reviews: 209,
    location: "Oshakati, Namibia",
    products: 78,
    featured: true,
    categories: ["Beauty", "Skincare"]
  },
  {
    id: 6,
    name: "Toy Wonderland",
    logo: "https://placehold.co/100x100",
    description: "Educational and fun toys for children of all ages. Safe and durable products.",
    rating: 4.4,
    reviews: 65,
    location: "Windhoek, Namibia",
    products: 143,
    featured: false,
    categories: ["Toys", "Kids"]
  }
];

// Available categories for filtering
const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Toys"
];

export default function VendorsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("rating");
  
  // Filter vendors based on search term and category
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || 
                           vendor.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });
  
  // Sort vendors based on selected sorting criteria
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviews - a.reviews;
    if (sortBy === "products") return b.products - a.products;
    return 0;
  });
  
  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Explore Our Vendors</h1>
        <p className="text-muted-foreground mb-8">
          Discover top-rated sellers offering quality products across various categories.
        </p>
        
        {/* Featured Vendors */}
        <div className="mb-10">
          <h2 className="text-lg font-medium mb-4">Featured Vendors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedVendors
              .filter(vendor => vendor.featured)
              .slice(0, 3)
              .map(vendor => (
                <Link 
                  key={vendor.id} 
                  to={`/vendor/${vendor.id}`}
                  className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <img 
                    src={vendor.logo} 
                    alt={vendor.name} 
                    className="w-20 h-20 rounded-full mb-4"
                  />
                  <h3 className="font-bold text-lg mb-2">{vendor.name}</h3>
                  <div className="flex items-center justify-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">{vendor.rating}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({vendor.reviews})</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{vendor.description}</p>
                  <Button variant="outline" size="sm" className="mt-auto">Visit Store</Button>
                </Link>
              ))}
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search vendors..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select onValueChange={setSortBy} defaultValue={sortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="products">Most Products</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Vendors List */}
        <div className="space-y-6">
          {sortedVendors.map(vendor => (
            <div 
              key={vendor.id} 
              className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/6 flex justify-center">
                  <img 
                    src={vendor.logo} 
                    alt={vendor.name} 
                    className="w-24 h-24 rounded-full"
                  />
                </div>
                
                <div className="md:w-4/6">
                  <div className="flex items-center flex-wrap gap-2">
                    <h3 className="font-bold text-lg">{vendor.name}</h3>
                    {vendor.featured && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        <Award className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center my-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">{vendor.rating}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({vendor.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{vendor.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {vendor.location}
                    </div>
                    <div className="flex items-center">
                      <ShoppingBag className="h-3 w-3 mr-1" />
                      {vendor.products} Products
                    </div>
                    <div className="flex items-center">
                      <Store className="h-3 w-3 mr-1" />
                      {vendor.categories.join(", ")}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/6 flex items-center justify-center mt-4 md:mt-0">
                  <Link to={`/vendor/${vendor.id}`}>
                    <Button>Visit Store</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {sortedVendors.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No vendors found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </StoreLayout>
  );
}
