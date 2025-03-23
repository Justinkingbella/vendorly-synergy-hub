
import React, { useState } from 'react';
import { ChevronDown, Filter, Plus, Search, Edit, Trash, ArrowUpDown, Download, FileSpreadsheet, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AdminLayout from '@/components/layout/AdminLayout';

// Mock data for commission rates
const mockCommissionRates = [
  {
    id: 1,
    category: "Electronics",
    rate: 12,
    minAmount: 0,
    maxAmount: null,
    effectiveDate: "2023-01-01",
    isDefault: true
  },
  {
    id: 2,
    category: "Fashion",
    rate: 15,
    minAmount: 0,
    maxAmount: null,
    effectiveDate: "2023-01-01",
    isDefault: false
  },
  {
    id: 3,
    category: "Home & Garden",
    rate: 10,
    minAmount: 0,
    maxAmount: null,
    effectiveDate: "2023-01-01",
    isDefault: false
  },
  {
    id: 4,
    category: "Beauty & Personal Care",
    rate: 18,
    minAmount: 0,
    maxAmount: null,
    effectiveDate: "2023-01-01",
    isDefault: false
  },
  {
    id: 5,
    category: "Books & Media",
    rate: 8,
    minAmount: 0,
    maxAmount: null,
    effectiveDate: "2023-01-01",
    isDefault: false
  },
  {
    id: 6,
    category: "Premium Vendor Plan",
    rate: 10,
    minAmount: 0,
    maxAmount: null,
    effectiveDate: "2023-02-15",
    isDefault: false,
    appliesTo: "subscription",
    subscriptionPlan: "Professional"
  },
  {
    id: 7,
    category: "Business Vendor Plan",
    rate: 7,
    minAmount: 0,
    maxAmount: null,
    effectiveDate: "2023-02-15",
    isDefault: false,
    appliesTo: "subscription",
    subscriptionPlan: "Business"
  }
];

// Mock data for vendor-specific commission rates
const mockVendorCommissions = [
  {
    id: 1,
    vendorName: "Premium Electronics",
    vendorId: 1,
    rate: 8,
    reason: "High sales volume partner",
    effectiveDate: "2023-03-15",
    expiryDate: "2023-12-31"
  },
  {
    id: 2,
    vendorName: "Craft Wonders",
    vendorId: 4,
    rate: 12,
    reason: "Promotional partnership",
    effectiveDate: "2023-04-01",
    expiryDate: "2023-10-01"
  }
];

// Mock data for commission earnings
const mockCommissionEarnings = [
  {
    id: 1,
    vendorName: "Premium Electronics",
    date: "2023-06-01",
    orderId: "ORD-10056",
    orderAmount: 499.99,
    commission: 59.99,
    status: "paid",
    rate: 12
  },
  {
    id: 2,
    vendorName: "Organic Wellness",
    date: "2023-06-02",
    orderId: "ORD-10057",
    orderAmount: 125.50,
    commission: 18.82,
    status: "paid",
    rate: 15
  },
  {
    id: 3,
    vendorName: "Vintage Treasures",
    date: "2023-06-03",
    orderId: "ORD-10058",
    orderAmount: 350.00,
    commission: 35.00,
    status: "paid",
    rate: 10
  },
  {
    id: 4,
    vendorName: "Premium Electronics",
    date: "2023-06-05",
    orderId: "ORD-10060",
    orderAmount: 1299.99,
    commission: 103.99,
    status: "pending",
    rate: 8
  },
  {
    id: 5,
    vendorName: "Modern Home",
    date: "2023-06-06",
    orderId: "ORD-10062",
    orderAmount: 899.50,
    commission: 89.95,
    status: "pending",
    rate: 10
  }
];

export default function AdminCommissions() {
  const { toast } = useToast();
  const [commissionRates, setCommissionRates] = useState(mockCommissionRates);
  const [vendorCommissions, setVendorCommissions] = useState(mockVendorCommissions);
  const [earnings, setEarnings] = useState(mockCommissionEarnings);
  const [activeTab, setActiveTab] = useState("rates");
  const [isAddRateOpen, setIsAddRateOpen] = useState(false);
  const [isEditRateOpen, setIsEditRateOpen] = useState(false);
  const [currentRate, setCurrentRate] = useState<any>(null);
  const [newRate, setNewRate] = useState({
    category: "",
    rate: 10,
    minAmount: 0,
    maxAmount: null,
    effectiveDate: new Date().toISOString().split('T')[0],
    isDefault: false,
    appliesTo: "category",
    subscriptionPlan: ""
  });
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'} | null>(null);

  const handleAddRate = () => {
    if (!newRate.category) {
      toast({
        title: "Validation Error",
        description: "Category/Name is required.",
        variant: "destructive",
      });
      return;
    }

    // Add new commission rate with a new ID
    const newId = Math.max(...commissionRates.map(rate => rate.id)) + 1;
    const rateToAdd = {
      ...newRate,
      id: newId
    };

    setCommissionRates([...commissionRates, rateToAdd]);
    setIsAddRateOpen(false);
    
    // Reset form
    setNewRate({
      category: "",
      rate: 10,
      minAmount: 0,
      maxAmount: null,
      effectiveDate: new Date().toISOString().split('T')[0],
      isDefault: false,
      appliesTo: "category",
      subscriptionPlan: ""
    });

    toast({
      title: "Commission Rate Added",
      description: `New commission rate for "${newRate.category}" has been added successfully.`,
    });
  };

  const handleEditRate = () => {
    if (!currentRate.category) {
      toast({
        title: "Validation Error",
        description: "Category/Name is required.",
        variant: "destructive",
      });
      return;
    }

    // If making this the default rate, update other rates to not be default
    let updatedRates = [...commissionRates];
    if (currentRate.isDefault) {
      updatedRates = updatedRates.map(rate => ({
        ...rate,
        isDefault: rate.id === currentRate.id
      }));
    }

    // Update the current rate
    updatedRates = updatedRates.map(rate => 
      rate.id === currentRate.id ? currentRate : rate
    );
    
    setCommissionRates(updatedRates);
    setIsEditRateOpen(false);
    
    toast({
      title: "Commission Rate Updated",
      description: `Commission rate for "${currentRate.category}" has been updated successfully.`,
    });
  };

  const handleDeleteRate = (id: number) => {
    // Don't allow deleting the default rate
    const rateToDelete = commissionRates.find(rate => rate.id === id);
    
    if (rateToDelete?.isDefault) {
      toast({
        title: "Cannot Delete Default Rate",
        description: "You cannot delete the default commission rate. Make another rate the default first.",
        variant: "destructive",
      });
      return;
    }

    setCommissionRates(commissionRates.filter(rate => rate.id !== id));
    
    toast({
      title: "Commission Rate Deleted",
      description: `Commission rate has been deleted successfully.`,
    });
  };

  // Sort function for table columns
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted items based on current sort configuration
  const getSortedItems = (items: any[]) => {
    if (!sortConfig) return items;
    
    return [...items].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Filter earnings
  const filteredEarnings = earnings.filter((earning) => {
    const matchesSearch = 
      earning.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      earning.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || earning.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort earnings
  const sortedEarnings = getSortedItems(filteredEarnings);

  // Calculate totals
  const totalEarnings = filteredEarnings.reduce((sum, earning) => sum + earning.commission, 0);
  const paidEarnings = filteredEarnings
    .filter(earning => earning.status === 'paid')
    .reduce((sum, earning) => sum + earning.commission, 0);
  const pendingEarnings = filteredEarnings
    .filter(earning => earning.status === 'pending')
    .reduce((sum, earning) => sum + earning.commission, 0);

  return (
    <AdminLayout>
      <div className="container mx-auto py-10 px-4 sm:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Commission Management</h1>
              <p className="text-muted-foreground mt-1">
                Set commission rates, manage vendor-specific rates, and track earnings.
              </p>
            </div>
            {activeTab === "rates" && (
              <Button onClick={() => setIsAddRateOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Rate
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="rates">Commission Rates</TabsTrigger>
              <TabsTrigger value="vendor-rates">Vendor Rates</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>

            <TabsContent value="rates" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category/Type</TableHead>
                        <TableHead>Rate (%)</TableHead>
                        <TableHead>Min Amount</TableHead>
                        <TableHead>Max Amount</TableHead>
                        <TableHead>Effective Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {commissionRates.map((rate) => (
                        <TableRow key={rate.id}>
                          <TableCell>
                            <div className="font-medium">{rate.category}</div>
                            {rate.appliesTo === 'subscription' && (
                              <div className="text-sm text-muted-foreground">
                                Subscription: {rate.subscriptionPlan}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{rate.rate}%</TableCell>
                          <TableCell>${rate.minAmount}</TableCell>
                          <TableCell>{rate.maxAmount ? `$${rate.maxAmount}` : "No limit"}</TableCell>
                          <TableCell>{new Date(rate.effectiveDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {rate.isDefault && (
                              <Badge className="bg-primary">Default</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setCurrentRate(rate);
                                  setIsEditRateOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteRate(rate.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vendor-rates" className="space-y-4">
              <div className="flex justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search vendors..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Vendor Rate
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Custom Rate (%)</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendorCommissions.map((commission) => (
                        <TableRow key={commission.id}>
                          <TableCell>
                            <div className="font-medium">{commission.vendorName}</div>
                          </TableCell>
                          <TableCell>{commission.rate}%</TableCell>
                          <TableCell>{commission.reason}</TableCell>
                          <TableCell>{new Date(commission.effectiveDate).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(commission.expiryDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {vendorCommissions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center h-32">
                            <div className="flex flex-col items-center justify-center">
                              <p className="text-muted-foreground mb-2">No vendor-specific commission rates found</p>
                              <Button size="sm" onClick={() => {}}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Vendor Rate
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

            <TabsContent value="earnings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Commissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Paid Commissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">${paidEarnings.toFixed(2)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending Commissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-600">${pendingEarnings.toFixed(2)}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0 mb-4">
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by vendor or order ID..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Select 
                    value={statusFilter} 
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Export</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Export to CSV
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="cursor-pointer" onClick={() => requestSort('date')}>
                          <div className="flex items-center">
                            Date
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => requestSort('vendorName')}>
                          <div className="flex items-center">
                            Vendor
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead className="cursor-pointer" onClick={() => requestSort('orderAmount')}>
                          <div className="flex items-center">
                            Order Amount
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Rate (%)</TableHead>
                        <TableHead className="cursor-pointer" onClick={() => requestSort('commission')}>
                          <div className="flex items-center">
                            Commission
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedEarnings.map((earning) => (
                        <TableRow key={earning.id}>
                          <TableCell>{new Date(earning.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="font-medium">{earning.vendorName}</div>
                          </TableCell>
                          <TableCell>{earning.orderId}</TableCell>
                          <TableCell>${earning.orderAmount.toFixed(2)}</TableCell>
                          <TableCell>{earning.rate}%</TableCell>
                          <TableCell>${earning.commission.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                earning.status === 'paid' 
                                  ? 'bg-green-500 hover:bg-green-600'
                                  : 'bg-amber-500 hover:bg-amber-600'
                              }
                            >
                              {earning.status === 'paid' ? 'Paid' : 'Pending'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      {sortedEarnings.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center h-32">
                            <div className="flex flex-col items-center justify-center">
                              <Calculator className="h-12 w-12 text-muted-foreground mb-2 opacity-50" />
                              <p className="text-muted-foreground">No commission earnings found</p>
                              <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between py-4">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{sortedEarnings.length}</span> of{" "}
                    <span className="font-medium">{earnings.length}</span> entries
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
          </Tabs>
        </div>
      </div>

      {/* Add Rate Dialog */}
      <Dialog open={isAddRateOpen} onOpenChange={setIsAddRateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Commission Rate</DialogTitle>
            <DialogDescription>
              Create a new commission rate for products or subscription plans.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="appliesTo" className="text-sm font-medium">
                Rate Type
              </label>
              <Select
                value={newRate.appliesTo}
                onValueChange={(value) => setNewRate({ ...newRate, appliesTo: value })}
              >
                <SelectTrigger id="appliesTo">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">Product Category</SelectItem>
                  <SelectItem value="subscription">Subscription Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newRate.appliesTo === 'subscription' && (
              <div className="grid gap-2">
                <label htmlFor="subscriptionPlan" className="text-sm font-medium">
                  Subscription Plan
                </label>
                <Select
                  value={newRate.subscriptionPlan}
                  onValueChange={(value) => setNewRate({ ...newRate, subscriptionPlan: value })}
                >
                  <SelectTrigger id="subscriptionPlan">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium">
                {newRate.appliesTo === 'subscription' ? 'Rate Name' : 'Category'}
              </label>
              <Input
                id="category"
                value={newRate.category}
                onChange={(e) => setNewRate({ ...newRate, category: e.target.value })}
                placeholder={newRate.appliesTo === 'subscription' ? "e.g. Professional Plan Rate" : "e.g. Electronics"}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="rate" className="text-sm font-medium">
                  Commission Rate (%)
                </label>
                <Input
                  id="rate"
                  type="number"
                  value={newRate.rate}
                  onChange={(e) => setNewRate({ ...newRate, rate: parseFloat(e.target.value) })}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            
              <div className="grid gap-2">
                <label htmlFor="effectiveDate" className="text-sm font-medium">
                  Effective Date
                </label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={newRate.effectiveDate}
                  onChange={(e) => setNewRate({ ...newRate, effectiveDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="minAmount" className="text-sm font-medium">
                  Min Amount ($)
                </label>
                <Input
                  id="minAmount"
                  type="number"
                  value={newRate.minAmount}
                  onChange={(e) => setNewRate({ ...newRate, minAmount: parseFloat(e.target.value) })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="maxAmount" className="text-sm font-medium">
                  Max Amount ($)
                </label>
                <Input
                  id="maxAmount"
                  type="number"
                  value={newRate.maxAmount || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : parseFloat(e.target.value);
                    setNewRate({ ...newRate, maxAmount: value });
                  }}
                  min="0"
                  step="0.01"
                  placeholder="No limit"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={newRate.isDefault}
                onChange={(e) => setNewRate({ ...newRate, isDefault: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="isDefault" className="text-sm font-medium">
                Set as default rate
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRate}>
              Add Rate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Rate Dialog */}
      <Dialog open={isEditRateOpen} onOpenChange={setIsEditRateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Commission Rate</DialogTitle>
            <DialogDescription>
              Update the commission rate details.
            </DialogDescription>
          </DialogHeader>
          {currentRate && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-category" className="text-sm font-medium">
                  {currentRate.appliesTo === 'subscription' ? 'Rate Name' : 'Category'}
                </label>
                <Input
                  id="edit-category"
                  value={currentRate.category}
                  onChange={(e) => setCurrentRate({ ...currentRate, category: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="edit-rate" className="text-sm font-medium">
                    Commission Rate (%)
                  </label>
                  <Input
                    id="edit-rate"
                    type="number"
                    value={currentRate.rate}
                    onChange={(e) => setCurrentRate({ ...currentRate, rate: parseFloat(e.target.value) })}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="edit-effectiveDate" className="text-sm font-medium">
                    Effective Date
                  </label>
                  <Input
                    id="edit-effectiveDate"
                    type="date"
                    value={currentRate.effectiveDate}
                    onChange={(e) => setCurrentRate({ ...currentRate, effectiveDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="edit-minAmount" className="text-sm font-medium">
                    Min Amount ($)
                  </label>
                  <Input
                    id="edit-minAmount"
                    type="number"
                    value={currentRate.minAmount}
                    onChange={(e) => setCurrentRate({ ...currentRate, minAmount: parseFloat(e.target.value) })}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="edit-maxAmount" className="text-sm font-medium">
                    Max Amount ($)
                  </label>
                  <Input
                    id="edit-maxAmount"
                    type="number"
                    value={currentRate.maxAmount || ''}
                    onChange={(e) => {
                      const value = e.target.value === '' ? null : parseFloat(e.target.value);
                      setCurrentRate({ ...currentRate, maxAmount: value });
                    }}
                    min="0"
                    step="0.01"
                    placeholder="No limit"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-isDefault"
                  checked={currentRate.isDefault}
                  onChange={(e) => setCurrentRate({ ...currentRate, isDefault: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="edit-isDefault" className="text-sm font-medium">
                  Set as default rate
                </label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditRate}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
