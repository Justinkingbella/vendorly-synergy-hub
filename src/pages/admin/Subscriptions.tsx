
import React, { useState } from 'react';
import { Plus, Edit, Trash, Check, X, CreditCard, Tag, DollarSign, LayoutGrid, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AdminLayout from '@/components/layout/AdminLayout';

// Mock data for subscription plans
const mockPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 0,
    billingCycle: 'monthly',
    featured: false,
    active: true,
    features: [
      'List up to 10 products',
      'Standard commission rate (15%)',
      'Basic support',
      'Standard product visibility'
    ],
    vendorCount: 45
  },
  {
    id: 2,
    name: 'Professional',
    price: 29.99,
    billingCycle: 'monthly',
    featured: true,
    active: true,
    features: [
      'List up to 100 products',
      'Reduced commission rate (10%)',
      'Priority support',
      'Enhanced product visibility',
      'Access to promotions'
    ],
    vendorCount: 67
  },
  {
    id: 3,
    name: 'Business',
    price: 99.99,
    billingCycle: 'monthly',
    featured: false,
    active: true,
    features: [
      'Unlimited products',
      'Lowest commission rate (7%)',
      'Premium support with dedicated manager',
      'Top product visibility',
      'Custom storefront',
      'Marketing assistance'
    ],
    vendorCount: 23
  },
  {
    id: 4,
    name: 'Enterprise',
    price: 299.99,
    billingCycle: 'monthly',
    featured: false,
    active: false,
    features: [
      'All Business features',
      'Custom commission structure',
      'API access',
      'White-label options',
      'Dedicated account manager',
      'Custom integration support'
    ],
    vendorCount: 5
  }
];

// Mock data for vendor subscriptions
const mockVendorSubscriptions = [
  {
    id: 1,
    vendorName: 'Premium Electronics',
    planName: 'Professional',
    status: 'active',
    startDate: '2023-01-15',
    endDate: '2023-07-15',
    amount: 29.99,
    autoRenew: true
  },
  {
    id: 2,
    vendorName: 'Organic Wellness',
    planName: 'Business',
    status: 'active',
    startDate: '2023-02-10',
    endDate: '2023-08-10',
    amount: 99.99,
    autoRenew: true
  },
  {
    id: 3,
    vendorName: 'Vintage Treasures',
    planName: 'Basic',
    status: 'active',
    startDate: '2023-03-05',
    endDate: '2023-09-05',
    amount: 0,
    autoRenew: false
  },
  {
    id: 4,
    vendorName: 'Craft Wonders',
    planName: 'Professional',
    status: 'expiring',
    startDate: '2023-01-22',
    endDate: '2023-06-22',
    amount: 29.99,
    autoRenew: false
  },
  {
    id: 5,
    vendorName: 'Modern Home',
    planName: 'Business',
    status: 'expired',
    startDate: '2022-11-30',
    endDate: '2023-05-30',
    amount: 99.99,
    autoRenew: false
  }
];

export default function AdminSubscriptions() {
  const { toast } = useToast();
  const [plans, setPlans] = useState(mockPlans);
  const [vendorSubscriptions, setVendorSubscriptions] = useState(mockVendorSubscriptions);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [isDeletePlanOpen, setIsDeletePlanOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: 0,
    billingCycle: 'monthly',
    featured: false,
    active: true,
    features: ['']
  });

  const handleAddPlan = () => {
    if (!newPlan.name) {
      toast({
        title: "Validation Error",
        description: "Plan name is required.",
        variant: "destructive",
      });
      return;
    }

    // Add plan with a new ID
    const newId = Math.max(...plans.map(plan => plan.id)) + 1;
    const planToAdd = {
      ...newPlan,
      id: newId,
      vendorCount: 0
    };

    setPlans([...plans, planToAdd]);
    setIsAddPlanOpen(false);
    setNewPlan({
      name: '',
      price: 0,
      billingCycle: 'monthly',
      featured: false,
      active: true,
      features: ['']
    });

    toast({
      title: "Plan Added",
      description: `"${newPlan.name}" plan has been added successfully.`,
    });
  };

  const handleEditPlan = () => {
    if (!currentPlan.name) {
      toast({
        title: "Validation Error",
        description: "Plan name is required.",
        variant: "destructive",
      });
      return;
    }

    setPlans(plans.map(plan => 
      plan.id === currentPlan.id ? currentPlan : plan
    ));
    
    setIsEditPlanOpen(false);
    
    toast({
      title: "Plan Updated",
      description: `"${currentPlan.name}" plan has been updated successfully.`,
    });
  };

  const handleDeletePlan = () => {
    // Check if plan has vendors
    if (currentPlan.vendorCount > 0) {
      toast({
        title: "Cannot Delete Plan",
        description: `${currentPlan.vendorCount} vendors are currently using this plan. Reassign them first.`,
        variant: "destructive",
      });
      setIsDeletePlanOpen(false);
      return;
    }

    setPlans(plans.filter(plan => plan.id !== currentPlan.id));
    setIsDeletePlanOpen(false);
    
    toast({
      title: "Plan Deleted",
      description: `"${currentPlan.name}" plan has been deleted successfully.`,
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (currentPlan) {
      const updatedFeatures = [...currentPlan.features];
      updatedFeatures[index] = value;
      setCurrentPlan({ ...currentPlan, features: updatedFeatures });
    } else {
      const updatedFeatures = [...newPlan.features];
      updatedFeatures[index] = value;
      setNewPlan({ ...newPlan, features: updatedFeatures });
    }
  };

  const addFeatureField = () => {
    if (currentPlan) {
      setCurrentPlan({ 
        ...currentPlan, 
        features: [...currentPlan.features, ''] 
      });
    } else {
      setNewPlan({ 
        ...newPlan, 
        features: [...newPlan.features, ''] 
      });
    }
  };

  const removeFeatureField = (index: number) => {
    if (currentPlan) {
      const updatedFeatures = [...currentPlan.features];
      updatedFeatures.splice(index, 1);
      setCurrentPlan({ ...currentPlan, features: updatedFeatures });
    } else {
      const updatedFeatures = [...newPlan.features];
      updatedFeatures.splice(index, 1);
      setNewPlan({ ...newPlan, features: updatedFeatures });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string, label: string }> = {
      active: { color: "bg-green-500 hover:bg-green-600", label: "Active" },
      expiring: { color: "bg-yellow-500 hover:bg-yellow-600", label: "Expiring Soon" },
      expired: { color: "bg-red-500 hover:bg-red-600", label: "Expired" },
      cancelled: { color: "bg-gray-500 hover:bg-gray-600", label: "Cancelled" },
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
              <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
              <p className="text-muted-foreground mt-1">
                Manage subscription plans and vendor subscriptions.
              </p>
            </div>
            <Button onClick={() => setIsAddPlanOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Plan
            </Button>
          </div>

          <Tabs defaultValue="plans" className="w-full">
            <TabsList>
              <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
              <TabsTrigger value="vendors">Vendor Subscriptions</TabsTrigger>
            </TabsList>

            <TabsContent value="plans" className="space-y-4">
              <div className="flex justify-end mb-4">
                <div className="flex items-center space-x-2 border rounded-md p-1">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                    size="sm" 
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'ghost'} 
                    size="sm" 
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card key={plan.id} className={`border ${plan.featured ? 'border-primary' : ''}`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>
                              {plan.vendorCount} vendors
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            {plan.featured && (
                              <Badge className="bg-primary">Featured</Badge>
                            )}
                            {!plan.active && (
                              <Badge variant="outline">Draft</Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <p className="text-3xl font-bold">
                            ${plan.price}
                            <span className="text-sm font-normal text-muted-foreground">
                              /{plan.billingCycle}
                            </span>
                          </p>
                        </div>
                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-4 w-4 mr-2 mt-1 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setCurrentPlan(plan);
                            setIsEditPlanOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          onClick={() => {
                            setCurrentPlan(plan);
                            setIsDeletePlanOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Plan Name</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Vendors</TableHead>
                          <TableHead>Featured</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {plans.map((plan) => (
                          <TableRow key={plan.id}>
                            <TableCell>
                              <div className="font-medium">{plan.name}</div>
                            </TableCell>
                            <TableCell>
                              ${plan.price}/{plan.billingCycle}
                            </TableCell>
                            <TableCell>
                              <Badge variant={plan.active ? "default" : "outline"}>
                                {plan.active ? "Active" : "Draft"}
                              </Badge>
                            </TableCell>
                            <TableCell>{plan.vendorCount}</TableCell>
                            <TableCell>
                              {plan.featured ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <X className="h-4 w-4 text-muted-foreground" />
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setCurrentPlan(plan);
                                    setIsEditPlanOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() => {
                                    setCurrentPlan(plan);
                                    setIsDeletePlanOpen(true);
                                  }}
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
              )}
            </TabsContent>

            <TabsContent value="vendors" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Auto Renew</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendorSubscriptions.map((sub) => (
                        <TableRow key={sub.id}>
                          <TableCell>{sub.vendorName}</TableCell>
                          <TableCell>{sub.planName}</TableCell>
                          <TableCell>
                            {getStatusBadge(sub.status)}
                          </TableCell>
                          <TableCell>{new Date(sub.startDate).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(sub.endDate).toLocaleDateString()}</TableCell>
                          <TableCell>${sub.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            {sub.autoRenew ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground" />
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Plan Dialog */}
      <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Subscription Plan</DialogTitle>
            <DialogDescription>
              Create a new subscription plan for vendors.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  id="name"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  placeholder="e.g. Professional"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: parseFloat(e.target.value) })}
                    className="pl-8"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="billingCycle">Billing Cycle</Label>
                <select
                  id="billingCycle"
                  value={newPlan.billingCycle}
                  onChange={(e) => setNewPlan({ ...newPlan, billingCycle: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label className="mb-2">Options</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={newPlan.featured}
                      onCheckedChange={(checked) => setNewPlan({ ...newPlan, featured: checked })}
                    />
                    <Label htmlFor="featured">Featured Plan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={newPlan.active}
                      onCheckedChange={(checked) => setNewPlan({ ...newPlan, active: checked })}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Plan Features</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addFeatureField}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {newPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="e.g. 100 products"
                    />
                    {newPlan.features.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeatureField(index)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPlanOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPlan}>
              Add Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Plan Dialog */}
      <Dialog open={isEditPlanOpen} onOpenChange={setIsEditPlanOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Subscription Plan</DialogTitle>
            <DialogDescription>
              Update the details for this subscription plan.
            </DialogDescription>
          </DialogHeader>
          {currentPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Plan Name</Label>
                  <Input
                    id="edit-name"
                    value={currentPlan.name}
                    onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="edit-price"
                      type="number"
                      value={currentPlan.price}
                      onChange={(e) => setCurrentPlan({ ...currentPlan, price: parseFloat(e.target.value) })}
                      className="pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-billingCycle">Billing Cycle</Label>
                  <select
                    id="edit-billingCycle"
                    value={currentPlan.billingCycle}
                    onChange={(e) => setCurrentPlan({ ...currentPlan, billingCycle: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label className="mb-2">Options</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="edit-featured"
                        checked={currentPlan.featured}
                        onCheckedChange={(checked) => setCurrentPlan({ ...currentPlan, featured: checked })}
                      />
                      <Label htmlFor="edit-featured">Featured Plan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="edit-active"
                        checked={currentPlan.active}
                        onCheckedChange={(checked) => setCurrentPlan({ ...currentPlan, active: checked })}
                      />
                      <Label htmlFor="edit-active">Active</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>Plan Features</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addFeatureField}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                      />
                      {currentPlan.features.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFeatureField(index)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPlanOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPlan}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Plan Confirmation */}
      <AlertDialog open={isDeletePlanOpen} onOpenChange={setIsDeletePlanOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the "{currentPlan?.name}" subscription plan.
              {currentPlan?.vendorCount > 0 && (
                <p className="mt-2 text-red-500 font-semibold">
                  Warning: {currentPlan.vendorCount} vendors are currently using this plan.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePlan} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
