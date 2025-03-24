
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, Search, Filter, Trash2, Edit, Plus, 
  ArrowUpDown, MoreHorizontal, Check, X 
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

// Mock product data
const mockProducts = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: ['Smartphone XS', 'Wireless Earbuds', 'Smart Watch', 'Bluetooth Speaker', 'Tablet Pro', 'Laptop Ultra', 'Gaming Console', 'Fitness Tracker', 'Drone Camera', 'VR Headset'][i],
  price: Math.floor(Math.random() * 900) + 100,
  category: ['Electronics', 'Audio', 'Wearables', 'Audio', 'Electronics', 'Computers', 'Gaming', 'Wearables', 'Photography', 'Gaming'][i],
  status: ['Active', 'Active', 'Active', 'Inactive', 'Active', 'Active', 'Inactive', 'Active', 'Active', 'Active'][i],
  vendor: ['TechGadgets', 'AudioWave', 'TimeKeepers', 'SoundBox', 'TabletZone', 'CompuTech', 'GameWorld', 'FitLife', 'SkyView', 'VRZone'][i],
  vendorId: i + 1,
  stock: Math.floor(Math.random() * 100) + 1,
  featured: i < 3,
}));

const AdminProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [vendorFilter, setVendorFilter] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  
  // Filter products based on search term and filters
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || product.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesVendor = vendorFilter === 'all' || product.vendor.toLowerCase() === vendorFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesCategory && matchesVendor;
  });
  
  // Get unique categories, vendors for filters
  const categories = [...new Set(mockProducts.map(p => p.category))];
  const vendors = [...new Set(mockProducts.map(p => p.vendor))];
  
  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    // In a real app, you would delete from your API here
    console.log(`Deleting product with ID: ${productToDelete}`);
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleAddProduct = () => {
    navigate('/admin/products/create');
  };

  const handleEditProduct = (id: number) => {
    navigate(`/admin/products/edit/${id}`);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Products</h1>
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Product Filters</CardTitle>
            <CardDescription>Filter and search products by various criteria</CardDescription>
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
              
              <Select value={vendorFilter} onValueChange={setVendorFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor} value={vendor.toLowerCase()}>
                      {vendor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
            <CardDescription>Manage all products in the marketplace</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span>{product.name}</span>
                        {product.featured && (
                          <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.vendor}</TableCell>
                    <TableCell>N${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === 'Active' ? 'default' : 'secondary'} className={
                        product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditProduct(product.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(product.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center p-4">
                      No products found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
    </AdminLayout>
  );
};

export default AdminProducts;
