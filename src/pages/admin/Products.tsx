
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { 
  Search, PlusCircle, Edit, Trash2, 
  MoreHorizontal, Eye, FileCheck, X, FilterX, Filter
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

type Product = {
  id: string;
  name: string;
  vendor: {
    id: string;
    name: string;
  };
  category: string;
  price: number;
  status: 'approved' | 'pending' | 'rejected';
  dateAdded: string;
  image: string;
  featured: boolean;
};

// Mock data for products
const products: Product[] = [
  {
    id: 'PRD-001',
    name: 'Wireless Headphones',
    vendor: {
      id: 'V-001',
      name: 'AudioTech',
    },
    category: 'Electronics',
    price: 89.99,
    status: 'approved',
    dateAdded: '2023-06-15',
    image: 'https://placehold.co/50x50',
    featured: true,
  },
  {
    id: 'PRD-002',
    name: 'Smart Watch',
    vendor: {
      id: 'V-001',
      name: 'AudioTech',
    },
    category: 'Electronics',
    price: 199.99,
    status: 'approved',
    dateAdded: '2023-06-20',
    image: 'https://placehold.co/50x50',
    featured: false,
  },
  {
    id: 'PRD-003',
    name: 'Bluetooth Speaker',
    vendor: {
      id: 'V-002',
      name: 'SoundWave',
    },
    category: 'Electronics',
    price: 59.99,
    status: 'approved',
    dateAdded: '2023-07-05',
    image: 'https://placehold.co/50x50',
    featured: true,
  },
  {
    id: 'PRD-004',
    name: 'Ergonomic Keyboard',
    vendor: {
      id: 'V-003',
      name: 'TechGadgets',
    },
    category: 'Electronics',
    price: 129.99,
    status: 'pending',
    dateAdded: '2023-07-12',
    image: 'https://placehold.co/50x50',
    featured: false,
  },
  {
    id: 'PRD-005',
    name: 'Gaming Mouse',
    vendor: {
      id: 'V-003',
      name: 'TechGadgets',
    },
    category: 'Electronics',
    price: 45.99,
    status: 'pending',
    dateAdded: '2023-07-18',
    image: 'https://placehold.co/50x50',
    featured: false,
  },
  {
    id: 'PRD-006',
    name: 'USB-C Hub',
    vendor: {
      id: 'V-001',
      name: 'AudioTech',
    },
    category: 'Electronics',
    price: 35.99,
    status: 'rejected',
    dateAdded: '2023-07-25',
    image: 'https://placehold.co/50x50',
    featured: false,
  },
  {
    id: 'PRD-007',
    name: 'Laptop Stand',
    vendor: {
      id: 'V-004',
      name: 'HomeOffice',
    },
    category: 'Accessories',
    price: 29.99,
    status: 'approved',
    dateAdded: '2023-08-02',
    image: 'https://placehold.co/50x50',
    featured: false,
  },
  {
    id: 'PRD-008',
    name: 'Designer Desk Lamp',
    vendor: {
      id: 'V-004',
      name: 'HomeOffice',
    },
    category: 'Home',
    price: 59.99,
    status: 'pending',
    dateAdded: '2023-08-10',
    image: 'https://placehold.co/50x50',
    featured: false,
  },
];

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Get unique vendors
  const vendors = Array.from(new Set(products.map(product => product.vendor.name)))
    .map(name => {
      const vendor = products.find(product => product.vendor.name === name);
      return {
        id: vendor?.vendor.id || '',
        name: name,
      };
    });

  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Filter products based on search, category, vendor, and status
  const getFilteredProducts = (status: Product['status'] | 'all') => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesVendor = selectedVendor === 'all' || product.vendor.id === selectedVendor;
      const matchesStatus = status === 'all' || product.status === status;
      const matchesFeatured = !featuredOnly || product.featured;
      
      return matchesSearch && matchesCategory && matchesVendor && matchesStatus && matchesFeatured;
    });
  };

  // Sort products
  const sortProducts = (productsToSort: Product[]) => {
    switch (sortBy) {
      case 'newest':
        return [...productsToSort].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      case 'oldest':
        return [...productsToSort].sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
      case 'price-high':
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case 'price-low':
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case 'name-az':
        return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-za':
        return [...productsToSort].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return productsToSort;
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedVendor('all');
    setSortBy('newest');
    setFeaturedOnly(false);
  };

  // Approve/Reject product
  const handleStatusChange = (productId: string, newStatus: Product['status']) => {
    // This would update the product status in a real application
    console.log(`Changing product ${productId} status to ${newStatus}`);
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-secondary" : ""}
              >
                <Filter className="h-4 w-4" />
              </Button>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="name-az">Name: A to Z</SelectItem>
                  <SelectItem value="name-za">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={clearFilters}>
                <FilterX className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
        
        {/* Filter panel */}
        {showFilters && (
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Vendor</label>
                <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Vendors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vendors</SelectItem>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id}>{vendor.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured-only" 
                    checked={featuredOnly}
                    onCheckedChange={(checked) => setFeaturedOnly(checked === true)}
                  />
                  <label
                    htmlFor="featured-only"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Featured Products Only
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-4">
            <ProductsTable 
              products={sortProducts(getFilteredProducts('all'))} 
              onStatusChange={handleStatusChange}
            />
          </TabsContent>
          
          <TabsContent value="approved" className="space-y-4 mt-4">
            <ProductsTable 
              products={sortProducts(getFilteredProducts('approved'))} 
              onStatusChange={handleStatusChange}
            />
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4 mt-4">
            <ProductsTable 
              products={sortProducts(getFilteredProducts('pending'))} 
              onStatusChange={handleStatusChange}
            />
          </TabsContent>
          
          <TabsContent value="rejected" className="space-y-4 mt-4">
            <ProductsTable 
              products={sortProducts(getFilteredProducts('rejected'))} 
              onStatusChange={handleStatusChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function ProductsTable({ 
  products, 
  onStatusChange 
}: { 
  products: Product[]; 
  onStatusChange: (productId: string, status: Product['status']) => void;
}) {
  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">No products found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-4 py-3">Product</th>
              <th scope="col" className="px-4 py-3">Vendor</th>
              <th scope="col" className="px-4 py-3">Category</th>
              <th scope="col" className="px-4 py-3">Price</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b dark:border-gray-700">
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-10 w-10 rounded-md object-cover" 
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.id}</p>
                    </div>
                    {product.featured && (
                      <Badge variant="secondary" className="ml-2">Featured</Badge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {product.vendor.name}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{product.category}</Badge>
                </td>
                <td className="px-4 py-3 font-medium">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    {product.status === 'pending' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-green-600"
                          onClick={() => onStatusChange(product.id, 'approved')}
                        >
                          <FileCheck className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-red-600"
                          onClick={() => onStatusChange(product.id, 'rejected')}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Product</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete Product</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Product['status'] }) {
  switch (status) {
    case 'approved':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Approved
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          Pending Review
        </Badge>
      );
    case 'rejected':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          Rejected
        </Badge>
      );
    default:
      return null;
  }
}
