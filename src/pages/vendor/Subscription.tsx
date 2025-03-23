
import React, { useState } from 'react';
import { Check, CreditCard, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import VendorLayout from '@/components/layout/VendorLayout';

// Mock subscription plans
const mockPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 0,
    billingCycle: 'monthly',
    featured: false,
    features: [
      'List up to 10 products',
      'Standard commission rate (15%)',
      'Basic support',
      'Standard product visibility'
    ]
  },
  {
    id: 2,
    name: 'Professional',
    price: 29.99,
    billingCycle: 'monthly',
    featured: true,
    features: [
      'List up to 100 products',
      'Reduced commission rate (10%)',
      'Priority support',
      'Enhanced product visibility',
      'Access to promotions'
    ]
  },
  {
    id: 3,
    name: 'Business',
    price: 99.99,
    billingCycle: 'monthly',
    featured: false,
    features: [
      'Unlimited products',
      'Lowest commission rate (7%)',
      'Premium support with dedicated manager',
      'Top product visibility',
      'Custom storefront',
      'Marketing assistance'
    ]
  }
];

// Mock subscription history
const mockSubscriptionHistory = [
  {
    id: 1,
    plan: 'Professional',
    startDate: '2023-01-15',
    endDate: '2023-07-15',
    amount: 29.99,
    status: 'active',
    paymentMethod: 'Visa ending in 4242',
    invoiceId: 'INV-2023-001'
  },
  {
    id: 2,
    plan: 'Basic',
    startDate: '2022-07-15',
    endDate: '2023-01-14',
    amount: 0,
    status: 'expired',
    paymentMethod: 'N/A',
    invoiceId: 'INV-2022-045'
  }
];

export default function VendorSubscription() {
  const { toast } = useToast();
  const [currentSubscription, setCurrentSubscription] = useState({
    plan: 'Professional',
    startDate: '2023-01-15',
    endDate: '2023-07-15',
    autoRenew: true,
    daysLeft: 34, // Mock days left in subscription
    usageStats: {
      products: {
        used: 67,
        limit: 100
      }
    }
  });
  const [subscriptionHistory] = useState(mockSubscriptionHistory);
  const [plans] = useState(mockPlans);
  const [selectedPlan, setSelectedPlan] = useState(plans[1]); // Default to Professional
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const handleSubscriptionUpdate = () => {
    // In a real app, this would call an API to update the subscription
    setIsUpgradeDialogOpen(false);
    
    if (selectedPlan.name === currentSubscription.plan) {
      toast({
        title: "No Change",
        description: `You are already on the ${selectedPlan.name} plan.`,
      });
      return;
    }
    
    // Simulate upgrade/downgrade
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = () => {
    setIsPaymentDialogOpen(false);
    
    toast({
      title: "Subscription Updated",
      description: `Your subscription has been updated to ${selectedPlan.name}.`,
    });
    
    // Update the current subscription
    setCurrentSubscription({
      ...currentSubscription,
      plan: selectedPlan.name,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setMonth(new Date().getMonth() + (billingCycle === 'annual' ? 12 : 1))).toISOString().split('T')[0],
      usageStats: {
        products: {
          used: currentSubscription.usageStats.products.used,
          limit: selectedPlan.name === 'Basic' ? 10 : selectedPlan.name === 'Professional' ? 100 : 999999
        }
      }
    });
  };

  const toggleAutoRenew = () => {
    setCurrentSubscription({
      ...currentSubscription,
      autoRenew: !currentSubscription.autoRenew
    });
    
    toast({
      title: currentSubscription.autoRenew ? "Auto-Renewal Disabled" : "Auto-Renewal Enabled",
      description: currentSubscription.autoRenew 
        ? "Your subscription will not renew automatically at the end of the billing period." 
        : "Your subscription will renew automatically at the end of the billing period.",
    });
  };

  // Calculate the price based on billing cycle
  const calculatePrice = (basePrice: number, cycle: string) => {
    if (cycle === 'annual') {
      // Apply a 20% discount for annual billing
      return (basePrice * 12 * 0.8).toFixed(2);
    }
    return basePrice.toFixed(2);
  };

  return (
    <VendorLayout>
      <div className="container mx-auto py-10 px-4 sm:px-6">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your subscription plan and billing details.
            </p>
          </div>

          <Tabs defaultValue="current" className="w-full">
            <TabsList>
              <TabsTrigger value="current">Current Subscription</TabsTrigger>
              <TabsTrigger value="plans">Available Plans</TabsTrigger>
              <TabsTrigger value="history">Billing History</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">
                        {currentSubscription.plan} Plan
                      </CardTitle>
                      <CardDescription>
                        Expires on {new Date(currentSubscription.endDate).toLocaleDateString()}
                        {" "}({currentSubscription.daysLeft} days left)
                      </CardDescription>
                    </div>
                    <Badge className={currentSubscription.plan === 'Basic' ? 'bg-gray-500' : 'bg-primary'}>
                      {currentSubscription.plan}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subscription Status</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Auto Renewal</span>
                      <Badge variant={currentSubscription.autoRenew ? 'default' : 'outline'}>
                        {currentSubscription.autoRenew ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Billing Cycle</span>
                      <span>Monthly</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Start Date</span>
                      <span>{new Date(currentSubscription.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Renewal Date</span>
                      <span>{new Date(currentSubscription.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-4">
                    <h3 className="font-medium">Plan Usage</h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Products</span>
                          <span>
                            {currentSubscription.usageStats.products.used} / {currentSubscription.usageStats.products.limit}
                          </span>
                        </div>
                        <Progress 
                          value={(currentSubscription.usageStats.products.used / currentSubscription.usageStats.products.limit) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6 flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    onClick={toggleAutoRenew}
                    className={!currentSubscription.autoRenew ? "border-green-500 text-green-500 hover:bg-green-50" : ""}
                  >
                    {currentSubscription.autoRenew ? 'Disable Auto-Renewal' : 'Enable Auto-Renewal'}
                  </Button>
                  <Button onClick={() => setIsUpgradeDialogOpen(true)}>
                    Upgrade Plan
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button variant="outline">Update Payment Method</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="plans" className="space-y-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`${plan.featured ? 'border-primary' : 'border'} ${plan.name === currentSubscription.plan ? 'bg-muted/50' : ''}`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>
                            {plan.name === currentSubscription.plan ? 'Current Plan' : ''}
                          </CardDescription>
                        </div>
                        {plan.featured && <Badge className="bg-primary">Popular</Badge>}
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
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant={plan.name === currentSubscription.plan ? 'outline' : 'default'}
                        disabled={plan.name === currentSubscription.plan}
                        onClick={() => {
                          setSelectedPlan(plan);
                          setIsUpgradeDialogOpen(true);
                        }}
                      >
                        {plan.name === currentSubscription.plan ? 'Current Plan' : 'Select Plan'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptionHistory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{new Date(item.startDate).toLocaleDateString()}</TableCell>
                          <TableCell>{item.plan}</TableCell>
                          <TableCell>${item.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              className={item.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="link" className="p-0 h-auto">
                              {item.invoiceId}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button variant="outline">
                  Download All Invoices
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Upgrade Dialog */}
      <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Change Subscription Plan</DialogTitle>
            <DialogDescription>
              {selectedPlan && selectedPlan.name !== currentSubscription.plan ? 
                `Upgrade to the ${selectedPlan.name} plan to get more features and benefits.` : 
                `Select a new plan to change your subscription.`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-medium">Choose a Plan</h3>
                <RadioGroup 
                  defaultValue={selectedPlan.id.toString()} 
                  onValueChange={(value) => {
                    const plan = plans.find(p => p.id.toString() === value);
                    if (plan) setSelectedPlan(plan);
                  }}
                >
                  {plans.map((plan) => (
                    <div key={plan.id} className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value={plan.id.toString()} id={`plan-${plan.id}`} />
                      <Label htmlFor={`plan-${plan.id}`} className="flex-1 flex justify-between">
                        <div>
                          <span className="font-medium">{plan.name}</span>
                          <span className="text-muted-foreground ml-2">
                            (${plan.price}/{plan.billingCycle})
                          </span>
                        </div>
                        {plan.name === currentSubscription.plan && (
                          <Badge variant="outline">Current</Badge>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid gap-4 mt-6">
                <h3 className="text-lg font-medium">Billing Cycle</h3>
                <RadioGroup 
                  defaultValue={billingCycle} 
                  onValueChange={setBillingCycle}
                >
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="flex-1">
                      <div className="font-medium">Monthly</div>
                      <div className="text-sm text-muted-foreground">
                        ${selectedPlan.price}/month
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="annual" id="annual" />
                    <Label htmlFor="annual" className="flex-1 flex justify-between">
                      <div>
                        <div className="font-medium">Annual</div>
                        <div className="text-sm text-muted-foreground">
                          ${calculatePrice(selectedPlan.price, 'annual')}/year (save 20%)
                        </div>
                      </div>
                      <Badge className="bg-green-500">Save 20%</Badge>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {selectedPlan && (
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">
                      ${calculatePrice(selectedPlan.price, billingCycle)}
                      <span className="text-sm font-normal text-muted-foreground">
                        /{billingCycle === 'annual' ? 'year' : 'month'}
                      </span>
                    </span>
                  </div>
                  {selectedPlan.name !== currentSubscription.plan && (
                    <div className="text-sm flex items-start mt-2">
                      <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5 text-amber-500" />
                      <span>
                        {selectedPlan.price > plans.find(p => p.name === currentSubscription.plan)?.price! 
                          ? "You'll be charged the difference immediately." 
                          : "Your current subscription will be prorated when switching plans."}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsUpgradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubscriptionUpdate}
              disabled={selectedPlan.name === currentSubscription.plan}
            >
              {selectedPlan.name === currentSubscription.plan ? 'Current Plan' : 'Continue'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Review your subscription change and confirm payment.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{selectedPlan.name} Plan ({billingCycle})</span>
                    <span>${calculatePrice(selectedPlan.price, billingCycle)}</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <div className="flex justify-between text-green-600">
                      <span>Annual Discount</span>
                      <span>-${(selectedPlan.price * 12 * 0.2).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${calculatePrice(selectedPlan.price, billingCycle)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Payment Method</h3>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-12 bg-gray-100 flex items-center justify-center rounded">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div className="text-sm">
                    <div>Visa ending in 4242</div>
                    <div className="text-muted-foreground">Expires 12/2024</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start mt-4 text-sm">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5 text-amber-500" />
                <span>
                  By clicking "Confirm Payment", you agree to our Terms of Service and authorize us
                  to charge your payment method for the amount above.
                </span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentSubmit}>
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
}
