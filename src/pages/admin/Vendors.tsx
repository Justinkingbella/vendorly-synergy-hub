import React, { useState } from 'react';
import { 
  Store, Search, Filter, Trash2, Edit, Plus, 
  ArrowUpDown, MoreHorizontal, CheckCircle, XCircle, 
  Mail, ExternalLink, DollarSign, Calendar 
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
  DropdownMenuSeparator,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const mockProducts = []; // Define or import correctly

const mockVendors = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: ['TechGadgets', 'AudioWave', 'TimeKeepers', 'SoundBox', 'TabletZone', 'CompuTech', 'GameWorld', 'FitLife', 'SkyView', 'VRZone'][i],
  email: ['tech@example.com', 'audio@example.com', 'time@example.com', 'sound@example.com', 'tablet@example.com', 'compu@example.com', 'game@example.com', 'fit@example.com', 'sky@example.com', 'vr@example.com'][i],
  joinDate: ['2022-01-15', '2022-02-20', '2022-03-10', '2022-04-05', '2022-05-12', '2022-06-18', '2022-07-25', '2022-08-14', '2022-09-30', '2022-10-22'][i],
  status: ['Active', 'Active', 'Active', 'Inactive', 'Active', 'Active', 'Inactive', 'Active', 'Active', 'Active'][i],
  productCount: Math.floor(Math.random() * 100) + 1,
  subscription: ['Premium', 'Basic', 'Premium', 'None', 'Premium', 'Basic', 'None', 'Premium', 'Basic', 'Premium'][i],
  commission: i < 3 ? 10 : i < 6 ? 15 : 20,
  earnings: Math.floor(Math.random() * 50000) + 5000,
}));

const AdminVendors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isVendorDetailsOpen, setIsVendorDetailsOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [vendorToDelete, setVendorToDelete] = useState<number | null>(null);
  
  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vendor.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSubscription = subscriptionFilter === 'all' || vendor.subscription.toLowerCase() === subscriptionFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesSubscription;
  });
  
  const handleDeleteClick = (id: number) => {
    setVendorToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    console.log(`Deleting vendor with ID: ${vendorToDelete}`);
    setIsDeleteDialogOpen(false);
    setVendorToDelete(null);
    
    toast({
      title: "Vendor deleted",
      description: "The vendor has been successfully deleted.",
    });
  };
  
  const openVendorDetails = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsVendorDetailsOpen(true);
  };
  
  const loginAsVendor = (vendor: any) => {
    navigate(`/vendor/dashboard?admin_view=true&vendor_id=${vendor.id}`);
    
    toast({
      title: "Logged in as vendor",
      description: `You are now viewing the dashboard as ${vendor.name}`,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Vendors</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Vendor
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Vendor Filters</CardTitle>
            <CardDescription>Filter and search vendors by various criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search vendors..."
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
              
              <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Subscription" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subscriptions</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vendor List</CardTitle>
            <CardDescription>Manage all vendors in the marketplace</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.id}</TableCell>
                    <TableCell>
                      <div className="font-medium cursor-pointer hover:underline" onClick={() => openVendorDetails(vendor)}>
                        {vendor.name}
                      </div>
                    </TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{new Date(vendor.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{vendor.productCount}</TableCell>
                    <TableCell>
                      <Badge variant={
                        vendor.subscription === 'Premium' ? 'default' : 
                        vendor.subscription === 'Basic' ? 'secondary' : 
                        'outline'
                      } className={
                        vendor.subscription === 'Premium' ? 'bg-purple-100 text-purple-800' : 
                        vendor.subscription === 'Basic' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }>
                        {vendor.subscription}
                      </Badge>
                    </TableCell>
                    <TableCell>{vendor.commission}%</TableCell>
                    <TableCell>
                      <Badge variant={vendor.status === 'Active' ? 'default' : 'secondary'} className={
                        vendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }>
                        {vendor.status}
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
                          <DropdownMenuItem onClick={() => openVendorDetails(vendor)}>
                            <Store className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => loginAsVendor(vendor)}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Login as Vendor
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(vendor.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Vendor
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredVendors.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center p-4">
                      No vendors found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vendor? This action cannot be undone and will remove all associated products.
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
      
      {selectedVendor && (
        <Dialog open={isVendorDetailsOpen} onOpenChange={setIsVendorDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedVendor.name} Details</DialogTitle>
              <DialogDescription>
                View and manage vendor information
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="commissions">Commissions</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4 my-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Vendor ID</p>
                    <p className="text-lg">{selectedVendor.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <Badge variant={selectedVendor.status === 'Active' ? 'default' : 'secondary'} className={
                      selectedVendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }>
                      {selectedVendor.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <div className="flex items-center">
                      <p className="text-lg mr-2">{selectedVendor.email}</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                    <p className="text-lg">{new Date(selectedVendor.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                    <p className="text-lg">{selectedVendor.productCount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                    <p className="text-lg">${selectedVendor.earnings.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 justify-end">
                  <Button variant="outline" onClick={() => loginAsVendor(selectedVendor)}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Login as Vendor
                  </Button>
                  <Button>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Vendor
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="commissions" className="space-y-4">
                <div className="grid grid-cols-2 gap-4 my-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Commission Rate</p>
                    <p className="text-3xl font-bold">{selectedVendor.commission}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Commission Earnings (Admin)</p>
                    <p className="text-3xl font-bold">${Math.floor(selectedVendor.earnings * selectedVendor.commission / 100).toLocaleString()}</p>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Adjust Commission Rate</CardTitle>
                    <CardDescription>Change the commission rate for this vendor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                        <div className="flex space-x-2 mt-2">
                          <Input id="commission-rate" defaultValue={selectedVendor.commission} />
                          <Button>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Update Rate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="subscription" className="space-y-4">
                <div className="grid grid-cols-2 gap-4 my-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Plan</p>
                    <div className="flex items-center">
                      <Badge variant={
                        selectedVendor.subscription === 'Premium' ? 'default' : 
                        selectedVendor.subscription === 'Basic' ? 'secondary' : 
                        'outline'
                      } className={
                        selectedVendor.subscription === 'Premium' ? 'bg-purple-100 text-purple-800' : 
                        selectedVendor.subscription === 'Basic' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }>
                        {selectedVendor.subscription}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Next Renewal</p>
                    <p className="text-lg">December 31, 2023</p>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Subscription</CardTitle>
                    <CardDescription>Change or update subscription plan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="subscription-plan">Subscription Plan</Label>
                        <Select defaultValue={selectedVendor.subscription.toLowerCase()}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select a plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="premium">Premium Plan</SelectItem>
                            <SelectItem value="basic">Basic Plan</SelectItem>
                            <SelectItem value="none">No Subscription</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>
                          <Calendar className="mr-2 h-4 w-4" />
                          Update Subscription
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="products" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-medium">Products by {selectedVendor.name}</p>
                  <Button size="sm" variant="outline" asChild>
                    <a href={`/admin/products?vendor=${selectedVendor.id}`}>
                      View All Products
                    </a>
                  </Button>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.filter(p => p.vendorId === selectedVendor.id).slice(0, 5).map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'Active' ? 'default' : 'secondary'} className={
                            product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }>
                            {product.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default AdminVendors;
