
import React, { useState } from 'react';
import { 
  Search, Plus, Filter, MoreHorizontal, Check, 
  X, Store, ShieldCheck, ShieldX, ExternalLink, 
  UserCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/layout/AdminLayout';
import { useNavigate } from 'react-router-dom';

// Mock data for vendors
const mockVendors = [
  {
    id: 1,
    name: 'Premium Electronics',
    email: 'contact@premiumelectronics.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Lane, Silicon Valley, CA',
    productsCount: 48,
    status: 'active',
    rating: 4.8,
    joinDate: '2021-08-15',
    lastActive: '2023-06-12',
    verified: true,
    subscriptionPlan: 'Professional',
    storeImage: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
  },
  {
    id: 2,
    name: 'Organic Wellness',
    email: 'hello@organicwellness.com',
    phone: '+1 (555) 987-6543',
    address: '45 Green St, Portland, OR',
    productsCount: 72,
    status: 'active',
    rating: 4.5,
    joinDate: '2022-01-10',
    lastActive: '2023-06-10',
    verified: true,
    subscriptionPlan: 'Business',
    storeImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  },
  {
    id: 3,
    name: 'Vintage Treasures',
    email: 'shop@vintagetreasures.com',
    phone: '+1 (555) 456-7890',
    address: '789 Antique Row, Charleston, SC',
    productsCount: 123,
    status: 'pending',
    rating: 4.2,
    joinDate: '2022-11-05',
    lastActive: '2023-06-05',
    verified: false,
    subscriptionPlan: 'Basic',
    storeImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  },
  {
    id: 4,
    name: 'Craft Wonders',
    email: 'info@craftwonders.com',
    phone: '+1 (555) 234-5678',
    address: '567 Artisan Ave, Austin, TX',
    productsCount: 56,
    status: 'active',
    rating: 4.9,
    joinDate: '2022-03-22',
    lastActive: '2023-06-11',
    verified: true,
    subscriptionPlan: 'Professional',
    storeImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  },
  {
    id: 5,
    name: 'Modern Home',
    email: 'support@modernhome.com',
    phone: '+1 (555) 876-5432',
    address: '321 Design District, Miami, FL',
    productsCount: 94,
    status: 'inactive',
    rating: 3.7,
    joinDate: '2021-09-30',
    lastActive: '2023-02-15',
    verified: true,
    subscriptionPlan: 'Basic',
    storeImage: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
  },
  {
    id: 6,
    name: 'Tech Innovations',
    email: 'help@techinnovations.com',
    phone: '+1 (555) 345-6789',
    address: '987 Future Blvd, Seattle, WA',
    productsCount: 37,
    status: 'suspended',
    rating: 2.8,
    joinDate: '2022-05-18',
    lastActive: '2022-12-01',
    verified: false,
    subscriptionPlan: 'Basic',
    storeImage: 'https://images.unsplash.com/photo-1560343090-f0409e92791a',
  },
];

export default function AdminVendors() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [vendors, setVendors] = useState(mockVendors);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState<number | null>(null);
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isEditVendorOpen, setIsEditVendorOpen] = useState(false);
  const [currentVendor, setCurrentVendor] = useState<any>(null);

  // Filter vendors based on search query and filters
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      vendor.status === statusFilter;
    
    const matchesVerification = 
      verificationFilter === 'all' || 
      (verificationFilter === 'verified' && vendor.verified) ||
      (verificationFilter === 'unverified' && !vendor.verified);
    
    return matchesSearch && matchesStatus && matchesVerification;
  });

  // Handle vendor verification
  const handleVerify = (id: number, verify: boolean) => {
    setVendors(vendors.map(vendor => 
      vendor.id === id ? { ...vendor, verified: verify } : vendor
    ));
    
    toast({
      title: verify ? "Vendor Verified" : "Vendor Verification Removed",
      description: `Vendor has been ${verify ? 'verified' : 'unverified'} successfully.`,
    });
  };

  // Handle vendor status change
  const handleStatusChange = (id: number, status: string) => {
    setVendors(vendors.map(vendor => 
      vendor.id === id ? { ...vendor, status } : vendor
    ));
    
    toast({
      title: "Status Updated",
      description: `Vendor status has been updated to ${status}.`,
    });
  };

  // Handle vendor delete
  const handleDelete = (id: number) => {
    setVendorToDelete(id);
    setIsAlertOpen(true);
  };

  // Confirm vendor delete
  const confirmDelete = () => {
    if (vendorToDelete !== null) {
      setVendors(vendors.filter(vendor => vendor.id !== vendorToDelete));
      setIsAlertOpen(false);
      
      toast({
        title: "Vendor Deleted",
        description: "The vendor has been deleted successfully.",
      });
    }
  };

  // Handle adding new vendor
  const handleAddVendor = () => {
    // Validate form
    if (!newVendor.name || !newVendor.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Create new vendor
    const newVendorWithDefaults = {
      ...newVendor,
      id: vendors.length + 1,
      productsCount: 0,
      status: 'pending',
      rating: 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      verified: false,
      subscriptionPlan: 'Basic',
      storeImage: 'https://images.unsplash.com/photo-1606757621555-861dd3d0bc77',
    };

    setVendors([...vendors, newVendorWithDefaults]);
    setIsAddVendorOpen(false);
    setNewVendor({ name: '', email: '', phone: '', address: '' });
    
    toast({
      title: "Vendor Added",
      description: "New vendor has been added successfully.",
    });
  };

  // Handle updating vendor
  const handleUpdateVendor = () => {
    if (!currentVendor.name || !currentVendor.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setVendors(vendors.map(vendor => 
      vendor.id === currentVendor.id ? currentVendor : vendor
    ));
    
    setIsEditVendorOpen(false);
    
    toast({
      title: "Vendor Updated",
      description: "The vendor has been updated successfully.",
    });
  };

  // Handle login as vendor
  const loginAsVendor = (id: number) => {
    navigate(`/vendor/dashboard?admin_view=true&vendor_id=${id}`);
    
    toast({
      title: "Vendor Access",
      description: "You are now viewing the vendor dashboard as an administrator.",
    });
  };

  // Handle input change for new vendor form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVendor({ ...newVendor, [name]: value });
  };

  // Handle input change for edit vendor form
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentVendor({ ...currentVendor, [name]: value });
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusMap: Record<string, { color: string, label: string }> = {
      active: { color: "bg-green-500 hover:bg-green-600", label: "Active" },
      pending: { color: "bg-yellow-500 hover:bg-yellow-600", label: "Pending" },
      inactive: { color: "bg-gray-500 hover:bg-gray-600", label: "Inactive" },
      suspended: { color: "bg-red-500 hover:bg-red-600", label: "Suspended" },
    };

    const statusInfo = statusMap[status] || { color: "bg-gray-500", label: status };

    return (
      <Badge className={`${statusInfo.color} text-white`}>
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-10 px-4 sm:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage vendors, review applications, and monitor performance.
              </p>
            </div>
            <Button onClick={() => setIsAddVendorOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Vendor
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Vendors</TabsTrigger>
                <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search vendors..."
                    className="pl-8 w-full md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Status</p>
                      <Select 
                        value={statusFilter} 
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Verification</p>
                      <Select 
                        value={verificationFilter} 
                        onValueChange={setVerificationFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select verification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Vendors</SelectItem>
                          <SelectItem value="verified">Verified Only</SelectItem>
                          <SelectItem value="unverified">Unverified Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Vendor</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Products</TableHead>
                          <TableHead>Subscription</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredVendors.length > 0 ? (
                          filteredVendors.map((vendor) => (
                            <TableRow key={vendor.id}>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                    {vendor.storeImage ? (
                                      <img 
                                        src={vendor.storeImage} 
                                        alt={vendor.name} 
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <Store className="h-5 w-5 text-gray-500" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium flex items-center">
                                      {vendor.name}
                                      {vendor.verified && (
                                        <Check className="h-4 w-4 text-blue-500 ml-1" />
                                      )}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{vendor.email}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <StatusBadge status={vendor.status} />
                              </TableCell>
                              <TableCell>{vendor.productsCount}</TableCell>
                              <TableCell>
                                <Badge variant={vendor.subscriptionPlan !== 'Basic' ? 'default' : 'outline'}>
                                  {vendor.subscriptionPlan}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <span className="mr-1">{vendor.rating}</span>
                                  <div className="text-yellow-400">★</div>
                                </div>
                              </TableCell>
                              <TableCell>{new Date(vendor.joinDate).toLocaleDateString()}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => loginAsVendor(vendor.id)}>
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Login as Vendor
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {
                                      setCurrentVendor(vendor);
                                      setIsEditVendorOpen(true);
                                    }}>
                                      <Store className="h-4 w-4 mr-2" />
                                      Edit Vendor
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => window.open(`/vendor/${vendor.id}`, '_blank')}>
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      View Store
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleVerify(vendor.id, !vendor.verified)}>
                                      {vendor.verified ? (
                                        <>
                                          <ShieldX className="h-4 w-4 mr-2" />
                                          Remove Verification
                                        </>
                                      ) : (
                                        <>
                                          <ShieldCheck className="h-4 w-4 mr-2" />
                                          Verify Vendor
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleStatusChange(vendor.id, 'active')}>
                                      <Check className="h-4 w-4 mr-2" />
                                      Set as Active
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusChange(vendor.id, 'inactive')}>
                                      <X className="h-4 w-4 mr-2" />
                                      Set as Inactive
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => handleStatusChange(vendor.id, 'suspended')}
                                      className="text-red-600"
                                    >
                                      <ShieldX className="h-4 w-4 mr-2" />
                                      Suspend Vendor
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => handleDelete(vendor.id)}
                                      className="text-red-600"
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Delete Vendor
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-6">
                              <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <Store className="h-10 w-10 mb-2 opacity-50" />
                                <p>No vendors found</p>
                                <p className="text-sm">Try adjusting your search or filters</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between py-4">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{filteredVendors.length}</span> of{" "}
                    <span className="font-medium">{vendors.length}</span> vendors
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    {vendors
                      .filter(vendor => vendor.status === 'pending')
                      .map(vendor => (
                        <div key={vendor.id} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
                          <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                            {vendor.storeImage ? (
                              <img 
                                src={vendor.storeImage} 
                                alt={vendor.name} 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Store className="h-8 w-8 text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium">{vendor.name}</h3>
                            <p className="text-muted-foreground">{vendor.email}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                              <div className="text-sm">
                                <span className="font-medium">Applied:</span>{" "}
                                {new Date(vendor.joinDate).toLocaleDateString()}
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">Phone:</span> {vendor.phone}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row md:flex-col gap-2 justify-end">
                            <Button 
                              onClick={() => {
                                handleVerify(vendor.id, true);
                                handleStatusChange(vendor.id, 'active');
                              }}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => handleStatusChange(vendor.id, 'inactive')}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    {vendors.filter(vendor => vendor.status === 'pending').length === 0 && (
                      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                        <Store className="h-10 w-10 mb-2 opacity-50" />
                        <p>No pending applications</p>
                        <p className="text-sm">All vendor applications have been processed</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendors
                        .filter(vendor => vendor.status === 'active')
                        .map(vendor => (
                          <TableRow key={vendor.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                  {vendor.storeImage ? (
                                    <img 
                                      src={vendor.storeImage} 
                                      alt={vendor.name} 
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <Store className="h-5 w-5 text-gray-500" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium flex items-center">
                                    {vendor.name}
                                    {vendor.verified && (
                                      <Check className="h-4 w-4 text-blue-500 ml-1" />
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">{vendor.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{vendor.productsCount}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className="mr-1">{vendor.rating}</span>
                                <div className="text-yellow-400">★</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={vendor.subscriptionPlan !== 'Basic' ? 'default' : 'outline'}>
                                {vendor.subscriptionPlan}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(vendor.joinDate).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open(`/vendor/${vendor.id}`, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => loginAsVendor(vendor.id)}
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Login
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      {vendors.filter(vendor => vendor.status === 'active').length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Store className="h-10 w-10 mb-2 opacity-50" />
                              <p>No active vendors</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inactive" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendors
                        .filter(vendor => vendor.status === 'inactive' || vendor.status === 'suspended')
                        .map(vendor => (
                          <TableRow key={vendor.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                  {vendor.storeImage ? (
                                    <img 
                                      src={vendor.storeImage} 
                                      alt={vendor.name} 
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <Store className="h-5 w-5 text-gray-500" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium">{vendor.name}</div>
                                  <div className="text-sm text-muted-foreground">{vendor.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={vendor.status} />
                            </TableCell>
                            <TableCell>{new Date(vendor.lastActive).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                size="sm"
                                onClick={() => handleStatusChange(vendor.id, 'active')}
                              >
                                Reactivate
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      {vendors.filter(vendor => vendor.status === 'inactive' || vendor.status === 'suspended').length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Store className="h-10 w-10 mb-2 opacity-50" />
                              <p>No inactive vendors</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Vendor Dialog */}
      <Dialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
            <DialogDescription>
              Create a new vendor account. The vendor will need to complete their profile later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Business Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Enter business name"
                value={newVendor.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={newVendor.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={newVendor.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="address" className="text-sm font-medium">
                Business Address
              </label>
              <Input
                id="address"
                name="address"
                placeholder="Enter business address"
                value={newVendor.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddVendorOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddVendor}>
              Add Vendor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Vendor Dialog */}
      <Dialog open={isEditVendorOpen} onOpenChange={setIsEditVendorOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Vendor</DialogTitle>
            <DialogDescription>
              Update vendor information.
            </DialogDescription>
          </DialogHeader>
          {currentVendor && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  Business Name
                </label>
                <Input
                  id="edit-name"
                  name="name"
                  value={currentVendor.name}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={currentVendor.email}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="edit-phone"
                  name="phone"
                  value={currentVendor.phone}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-address" className="text-sm font-medium">
                  Business Address
                </label>
                <Input
                  id="edit-address"
                  name="address"
                  value={currentVendor.address}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="subscription" className="text-sm font-medium">
                  Subscription Plan
                </label>
                <Select
                  value={currentVendor.subscriptionPlan}
                  onValueChange={(value) => setCurrentVendor({ ...currentVendor, subscriptionPlan: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  value={currentVendor.status}
                  onValueChange={(value) => setCurrentVendor({ ...currentVendor, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={currentVendor.verified}
                  onChange={(e) => setCurrentVendor({ ...currentVendor, verified: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="verified" className="text-sm font-medium">
                  Verified Vendor
                </label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditVendorOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateVendor}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the vendor account
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
