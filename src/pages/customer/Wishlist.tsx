
import React, { useState } from 'react';
import { 
  Package, Search, Heart, ShoppingCart, 
  Trash2, Filter, X, Clock, AlertCircle
} from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// Mock wishlist items data
const mockWishlistItems = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: ['Wireless Noise-Cancelling Headphones', 'Smartphone Gimbal Stabilizer', '4K Ultra HD Smart TV - 55"', 'Portable Bluetooth Speaker', 'Mechanical Gaming Keyboard', 'Wireless Charging Pad', 'Smart Home Security Camera', 'Fitness Tracking Smartwatch'][i],
  price: [249.99, 119.99, 599.99, 79.99, 149.99, 29.99, 199.99, 179.99][i],
  originalPrice: i % 2 === 0 ? [299.99, null, 699.99, null, 189.99, null, 249.99, null][i] : null,
  category: ['Electronics', 'Photography', 'Electronics', 'Audio', 'Gaming', 'Accessories', 'Smart Home', 'Wearables'][i],
  inStock: i !== 2 && i !== 5,
  addedDate: new Date(Date.now() - (i * 86400000 * (Math.floor(Math.random() * 10) + 1))),
  image: 'product-image.jpg',
}));

const CustomerWishlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isClearAllDialogOpen, setIsClearAllDialogOpen] = useState(false);
  
  // Filter wishlist items
  const filteredItems = mockWishlistItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesAvailability = availabilityFilter === 'all' || 
                               (availabilityFilter === 'in-stock' && item.inStock) || 
                               (availabilityFilter === 'out-of-stock' && !item.inStock);
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });
  
  // Sort wishlist items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      case 'oldest':
        return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'name-az':
        return a.name.localeCompare(b.name);
      case 'name-za':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  
  // Get unique categories for the filter
  const categories = [...new Set(mockWishlistItems.map(item => item.category))];
  
  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    // In a real app, you would delete from your API here
    console.log(`Removing item with ID: ${itemToDelete} from wishlist`);
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    });
  };
  
  const confirmClearAll = () => {
    // In a real app, you would clear all items from your API here
    console.log(`Clearing all items from wishlist`);
    setIsClearAllDialogOpen(false);
    
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };
  
  const handleAddToCart = (item: any) => {
    // In a real app, you would add to cart via your API
    console.log(`Adding item with ID: ${item.id} to cart`);
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };
  
  const handleAddAllToCart = () => {
    // In a real app, you would add all in-stock items to cart via your API
    const inStockItems = filteredItems.filter(item => item.inStock);
    console.log(`Adding ${inStockItems.length} items to cart`);
    
    toast({
      title: "Items added to cart",
      description: `${inStockItems.length} items have been added to your cart.`,
    });
  };

  return (
    <CustomerLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">My Wishlist</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsClearAllDialogOpen(true)}>
              Clear All
            </Button>
            <Button onClick={handleAddAllToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add All to Cart
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Wishlist</CardTitle>
            <CardDescription>Your saved items for future purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search in wishlist..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
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
              
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Date Added (Newest)</SelectItem>
                  <SelectItem value="oldest">Date Added (Oldest)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="name-az">Name (A-Z)</SelectItem>
                  <SelectItem value="name-za">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {sortedItems.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Your wishlist is empty.</p>
                <Button className="mt-4" asChild>
                  <Link to="/products">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                      <Package className="h-12 w-12 text-gray-400" />
                      {item.originalPrice && (
                        <Badge className="absolute top-2 left-2 bg-red-100 text-red-800">
                          Sale
                        </Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <h3 className="font-medium line-clamp-2">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                        
                        <div className="flex items-center mb-2">
                          <p className="font-bold mr-2">${item.price.toFixed(2)}</p>
                          {item.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm">
                          {item.inStock ? (
                            <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                          ) : (
                            <Badge variant="outline" className="border-red-200 text-red-800">Out of Stock</Badge>
                          )}
                          <p className="ml-auto text-muted-foreground flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            Added {item.addedDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          className="flex-1" 
                          asChild
                        >
                          <Link to={`/product/${item.id}`}>View Details</Link>
                        </Button>
                        <Button 
                          className="flex-1" 
                          disabled={!item.inStock}
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Delete Item Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this item from your wishlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Clear All Confirmation Dialog */}
      <AlertDialog open={isClearAllDialogOpen} onOpenChange={setIsClearAllDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Wishlist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove all items from your wishlist? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClearAll}>Clear All</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CustomerLayout>
  );
};

export default CustomerWishlist;
