
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Search, PlusCircle, Edit, Trash2, Pencil, 
  MoreHorizontal, Eye, Tag, FilterX
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

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  inventory: number;
  status: 'active' | 'draft' | 'archived';
  sales: number;
  dateAdded: string;
  image: string;
};

// Mock data for products
const products: Product[] = [
  {
    id: 'PRD-001',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 89.99,
    inventory: 45,
    status: 'active',
    sales: 128,
    dateAdded: '2023-06-15',
    image: 'https://placehold.co/50x50'
  },
  {
    id: 'PRD-002',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 199.99,
    inventory: 32,
    status: 'active',
    sales: 98,
    dateAdded: '2023-06-20',
    image: 'https://placehold.co/50x50'
  },
  {
    id: 'PRD-003',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 59.99,
    inventory: 28,
    status: 'active',
    sales: 79,
    dateAdded: '2023-07-05',
    image: 'https://placehold.co/50x50'
  },
  {
    id: 'PRD-004',
    name: 'Ergonomic Keyboard',
    category: 'Electronics',
    price: 129.99,
    inventory: 15,
    status: 'active',
    sales: 56,
    dateAdded: '2023-07-12',
    image: 'https://placehold.co/50x50'
  },
  {
    id: 'PRD-005',
    name: 'Gaming Mouse',
    category: 'Electronics',
    price: 45.99,
    inventory: 52,
    status: 'active',
    sales: 114,
    dateAdded: '2023-07-18',
    image: 'https://placehold.co/50x50'
  },
  {
    id: 'PRD-006',
    name: 'USB-C Hub',
    category: 'Electronics',
    price: 35.99,
    inventory: 63,
    status: 'active',
    sales: 87,
    dateAdded: '2023-07-25',
    image: 'https://placehold.co/50x50'
  },
  {
    id: 'PRD-007',
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 29.99,
    inventory: 5,
    status: 'active',
    sales: 49,
    dateAdded: '2023-08-02',
    image: 'https://placehold.co/50x50'
  },
  {
    id: 'PRD-008',
    name: 'Phone Charger',
    category: 'Accessories',
    price: 19.99,
    inventory: 0,
    status: 'draft',
    sales: 0,
    dateAdded: '2023-08-10',
    image: 'https://placehold.co/50x50'
  },
  {
    id: 'PRD-009',
    name: 'Desk Lamp',
    category: 'Home',
    price: 39.99,
    inventory: 0,
    status: 'archived',
    sales: 27,
    dateAdded: '2023-05-20',
    image: 'https://placehold.co/50x50'
  },
];

export default function VendorProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter products based on search, category, and status
  const getFilteredProducts = (status: Product['status']) => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesStatus = product.status === status;
      
      return matchesSearch && matchesCategory && matchesStatus;
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
      case 'bestselling':
        return [...productsToSort].sort((a, b) => b.sales - a.sales);
      default:
        return productsToSort;
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('newest');
  };

  return (
    <DashboardLayout type="vendor">
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
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Home">Home</SelectItem>
                </SelectContent>
              </Select>
              
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
                  <SelectItem value="bestselling">Best Selling</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={clearFilters}>
                <FilterX className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button className="shrink-0">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
        
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Products</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4 mt-4">
            <ProductsTable products={sortProducts(getFilteredProducts('active'))} />
          </TabsContent>
          
          <TabsContent value="draft" className="space-y-4 mt-4">
            <ProductsTable products={sortProducts(getFilteredProducts('draft'))} />
          </TabsContent>
          
          <TabsContent value="archived" className="space-y-4 mt-4">
            <ProductsTable products={sortProducts(getFilteredProducts('archived'))} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function ProductsTable({ products }: { products: Product[] }) {
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
              <th scope="col" className="px-4 py-3">Category</th>
              <th scope="col" className="px-4 py-3">Price</th>
              <th scope="col" className="px-4 py-3">Inventory</th>
              <th scope="col" className="px-4 py-3">Sales</th>
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
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{product.category}</Badge>
                </td>
                <td className="px-4 py-3 font-medium">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  {product.inventory > 0 ? (
                    product.inventory
                  ) : (
                    <span className="text-red-500">Out of stock</span>
                  )}
                </td>
                <td className="px-4 py-3">{product.sales}</td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Tag className="mr-2 h-4 w-4" />
                        <span>Change Price</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
