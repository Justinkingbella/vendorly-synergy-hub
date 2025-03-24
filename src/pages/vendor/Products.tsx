
import React, { useState } from 'react';
import { 
  Package, Search, Filter, Trash2, Edit, Plus, 
  MoreHorizontal, ArrowUp, ArrowDown, 
  DollarSign, Sparkles, Star, StarOff
} from 'lucide-react';
import VendorLayout from '@/components/layout/VendorLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

// Mock product data
const mockProducts = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  name: ['Smartphone XS', 'Wireless Earbuds', 'Smart Watch', 'Bluetooth Speaker', 'Tablet Pro', 'Laptop Ultra', 'Gaming Console', 'Fitness Tracker', 'Drone Camera', 'VR Headset', 'Portable SSD', 'Wireless Charger', 'Smart TV', 'Action Camera', 'Mechanical Keyboard'][i],
  price: Math.floor(Math.random() * 900) + 100,
  category: ['Electronics', 'Audio', 'Wearables', 'Audio', 'Electronics', 'Computers', 'Gaming', 'Wearables', 'Photography', 'Gaming', 'Storage', 'Accessories', 'Electronics', 'Photography', 'Accessories'][i],
  status: ['Active', 'Active', 'Active', 'Inactive', 'Active', 'Active', 'Inactive', 'Active', 'Active', 'Active', 'Active', 'Inactive', 'Active', 'Active', 'Active'][i],
  stock: Math.floor(Math.random() * 100) + 1,
  sales: Math.floor(Math.random() * 200) + 1,
  featured: i < 5,
  images: ['product1.jpg', 'product2.jpg', 'product3.jpg'],
  description: 'High-quality product with premium features and reliable performance. Perfect for everyday use with long-lasting battery and sleek design.',
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
}));

const VendorProducts = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAdminView = searchParams.get('admin_view') === 'true';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  // Filter products based on search term and filters
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || product.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'bestselling':
        return b.sales - a.sales;
      default:
        return 0;
    }
  });
  
  // Get unique categories
  const categories = [...new Set(mockProducts.map(p => p.category))];
  
  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    // In a real app, you would delete from your API here
    console.log(`Deleting product with ID: ${productToDelete}`);
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
    
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    });
  };
  
  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };
  
  const handleAddNewClick = () => {
    setEditingProduct(null);
    setIsProductFormOpen(true);
  };
  
  const handleToggleFeatured = (product: any) => {
    // In a real app, you would update the product in your API
    console.log(`Toggling featured status for product ID: ${product.id}`);
    
    toast({
      title: product.featured ? "Product removed from featured" : "Product added to featured",
      description: `${product.name} has been ${product.featured ? 'removed from' : 'added to'} featured products.`,
    });
  };
  
  return (
    <VendorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">My Products</h1>
          <Button onClick={handleAddNewClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="all">All Products ({mockProducts.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({mockProducts.filter(p => p.status === 'Active').length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive ({mockProducts.filter(p => p.status === 'Inactive').length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Product Filters</CardTitle>
                <CardDescription>Filter and search your products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="bestselling">Best Selling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Product List</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                              <Package className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              {product.featured && (
                                <Badge variant="outline" className="bg-amber-100 text-amber-800 mt-1">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={product.stock > 10 ? 'outline' : 'destructive'} className={
                            product.stock > 10 ? 'bg-green-100 text-green-800' : 
                            product.stock > 0 ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'
                          }>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </Badge>
                        </TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'Active' ? 'default' : 'secondary'} className={
                            product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleToggleFeatured(product)}
                              title={product.featured ? "Remove from featured" : "Add to featured"}
                            >
                              {product.featured ? 
                                <StarOff className="h-4 w-4 text-amber-500" /> : 
                                <Star className="h-4 w-4" />
                              }
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditClick(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditClick(product)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Product
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick(product.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Product
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {sortedProducts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center py-4">
                            <Package className="h-12 w-12 text-muted-foreground mb-3" />
                            <p className="text-muted-foreground mb-2">No products found matching your criteria</p>
                            <Button size="sm" onClick={handleAddNewClick}>
                              <Plus className="mr-2 h-4 w-4" />
                              Add New Product
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active">
            {/* Similar content as 'all' but filtered for active products */}
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Showing {mockProducts.filter(p => p.status === 'Active').length} active products
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive">
            {/* Similar content as 'all' but filtered for inactive products */}
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Showing {mockProducts.filter(p => p.status === 'Inactive').length} inactive products
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Product Form Dialog */}
      <Dialog open={isProductFormOpen} onOpenChange={setIsProductFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {editingProduct 
                ? 'Update your product information' 
                : 'Fill in the details to add a new product'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Product form would go here with fields for name, description, price, category, images, etc.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProductFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsProductFormOpen(false);
              toast({
                title: editingProduct ? "Product updated" : "Product created",
                description: editingProduct
                  ? "Your product has been updated successfully."
                  : "Your new product has been created.",
              });
            }}>
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
};

export default VendorProducts;
