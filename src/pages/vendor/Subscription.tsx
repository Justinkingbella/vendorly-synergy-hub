
import React, { useState } from 'react';
import { 
  CreditCard, Check, X, ArrowRight, Calendar, 
  AlertCircle, CreditCard as CreditCardIcon, Shield
} from 'lucide-react';
import VendorLayout from '@/components/layout/VendorLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from 'react-router-dom';

// Mock subscription data
const currentPlan = {
  name: 'Premium',
  price: 99.99,
  billing: 'monthly',
  startDate: '2023-11-15',
  nextBillingDate: '2023-12-15',
  status: 'Active',
  features: [
    'Reduced commission rates (8.5%)',
    'Advanced analytics',
    'Priority support',
    'Featured placement',
    'Unlimited products',
    'Promotional banners',
  ],
};

// Available plans
const availablePlans = [
  {
    id: 1,
    name: 'Basic',
    price: 29.99,
    billing: 'monthly',
    features: [
      'Standard commission rates (15%)',
      'Basic analytics',
      'Email support',
      'Up to 50 products',
    ],
    notIncluded: [
      'Priority support',
      'Featured placement',
      'Advanced analytics',
      'Reduced commission rates',
    ]
  },
  {
    id: 2,
    name: 'Premium',
    price: 99.99,
    billing: 'monthly',
    popular: true,
    features: [
      'Reduced commission rates (8.5%)',
      'Advanced analytics',
      'Priority support',
      'Featured placement',
      'Unlimited products',
      'Promotional banners',
    ],
    notIncluded: []
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 299.99,
    billing: 'monthly',
    features: [
      'Lowest commission rates (5%)',
      'Full analytics suite',
      'Dedicated account manager',
      'Custom integrations',
      'Unlimited products',
      'Priority placement',
      'Marketing support',
    ],
    notIncluded: []
  }
];

// Billing history
const billingHistory = [
  { id: 'INV-1001', date: '2023-11-15', amount: 99.99, plan: 'Premium', status: 'Paid' },
  { id: 'INV-1000', date: '2023-10-15', amount: 99.99, plan: 'Premium', status: 'Paid' },
  { id: 'INV-999', date: '2023-09-15', amount: 99.99, plan: 'Premium', status: 'Paid' },
  { id: 'INV-998', date: '2023-08-15', amount: 29.99, plan: 'Basic', status: 'Paid' },
  { id: 'INV-997', date: '2023-07-15', amount: 29.99, plan: 'Basic', status: 'Paid' },
];

const VendorSubscription = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAdminView = searchParams.get('admin_view') === 'true';
  
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isUpdatePaymentDialogOpen, setIsUpdatePaymentDialogOpen] = useState(false);
  
  // Calculate days until next billing
  const today = new Date();
  const nextBilling = new Date(currentPlan.nextBillingDate);
  const daysRemaining = Math.ceil((nextBilling.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const billingCycleLength = 30; // assuming 30-day billing cycle
  const cycleProgress = 100 - ((daysRemaining / billingCycleLength) * 100);
  
  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    setIsUpgradeDialogOpen(true);
  };
  
  const handleUpgrade = () => {
    // In a real app, this would process the upgrade
    console.log(`Upgrading to ${selectedPlan} plan`);
    setIsUpgradeDialogOpen(false);
    setIsPaymentDialogOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    setIsPaymentDialogOpen(false);
    
    toast({
      title: "Subscription updated",
      description: `Your subscription has been updated to the ${selectedPlan} plan.`,
    });
  };
  
  const handleCancelSubscription = () => {
    // In a real app, this would process the cancellation
    console.log('Cancelling subscription');
    setIsCancelDialogOpen(false);
    
    toast({
      title: "Subscription cancelled",
      description: "Your subscription has been cancelled. It will remain active until the end of the billing period.",
    });
  };

  return (
    <VendorLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Subscription Management</h1>
        
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription>Manage your current subscription plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold flex items-center mb-4">
                    <Badge className="mr-2 bg-purple-100 text-purple-800">{currentPlan.name} Plan</Badge>
                    <Badge variant="outline" className="ml-auto bg-green-100 text-green-800">{currentPlan.status}</Badge>
                  </h3>
                  
                  <p className="text-2xl font-bold mb-1">${currentPlan.price}/month</p>
                  <p className="text-sm text-muted-foreground mb-4">Billed monthly</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current billing period</span>
                        <span>{daysRemaining} days remaining</span>
                      </div>
                      <Progress value={cycleProgress} className="h-2" />
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Next billing date:</p>
                      <p className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {currentPlan.nextBillingDate}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Payment method:</p>
                      <p className="flex items-center">
                        <CreditCardIcon className="h-4 w-4 mr-2" />
                        •••• •••• •••• 4242
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Plan Features:</p>
                  <ul className="space-y-2 mb-6">
                    {currentPlan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col space-y-2">
                    <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>Cancel Subscription</Button>
                      </DialogTrigger>
                    </Dialog>
                    
                    <Dialog open={isUpdatePaymentDialogOpen} onOpenChange={setIsUpdatePaymentDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">Update Payment Method</Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="plans" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="plans">Available Plans</TabsTrigger>
            <TabsTrigger value="billing">Billing History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availablePlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`
                    ${plan.popular ? 'border-primary' : ''}
                    ${plan.name === currentPlan.name ? 'bg-muted/50' : ''}
                  `}
                >
                  {plan.popular && (
                    <Badge className="absolute top-4 right-4 bg-primary">Popular</Badge>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      ${plan.price}/month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm font-medium">Features:</p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                        {plan.notIncluded && plan.notIncluded.map((feature, i) => (
                          <li key={i} className="flex items-start text-muted-foreground">
                            <X className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {plan.name === currentPlan.name ? (
                      <Button className="w-full" disabled>Current Plan</Button>
                    ) : (
                      <Button 
                        className="w-full" 
                        variant={plan.name === 'Enterprise' ? 'default' : 'outline'}
                        onClick={() => handlePlanSelect(plan.name)}
                      >
                        {plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices and payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingHistory.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.plan}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Download
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
      
      {/* Upgrade Plan Dialog */}
      <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedPlan && selectedPlan === 'Basic' ? 'Downgrade to Basic Plan?' : `Upgrade to ${selectedPlan} Plan?`}
            </DialogTitle>
            <DialogDescription>
              {selectedPlan && selectedPlan === 'Basic'
                ? 'Downgrading will reduce your benefits and increase your commission rate. This change will take effect at the end of your current billing cycle.'
                : `Upgrading will give you access to more premium features and reduce your commission rate. You'll be charged the prorated difference immediately.`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedPlan && (
              <div className="border rounded-md p-4">
                <p className="font-medium mb-1">{selectedPlan} Plan</p>
                <p className="text-sm text-muted-foreground mb-2">
                  ${availablePlans.find(p => p.name === selectedPlan)?.price.toFixed(2)}/month
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  New billing date: {nextBilling.toLocaleDateString()}
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
              <p className="text-sm text-muted-foreground">
                {selectedPlan && selectedPlan === 'Basic'
                  ? 'You can upgrade again at any time.'
                  : 'This will update your subscription immediately.'
                }
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpgradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpgrade}>
              Confirm {selectedPlan === 'Basic' ? 'Downgrade' : 'Upgrade'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cancel Subscription Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Your Subscription?</DialogTitle>
            <DialogDescription>
              We're sorry to see you go. Your subscription will remain active until the end of your current billing period.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="border rounded-md p-4">
              <p className="font-medium mb-1">{currentPlan.name} Plan</p>
              <p className="text-sm text-muted-foreground mb-2">Active until {currentPlan.nextBillingDate}</p>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                No further charges will be made
              </div>
            </div>
            
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
              <p className="text-sm text-muted-foreground">
                After cancellation, your commission rate will revert to the standard rate of 15%.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Keep Subscription
            </Button>
            <Button variant="destructive" onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Payment Information Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Information</DialogTitle>
            <DialogDescription>
              Enter your credit card details to complete the subscription update
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="border rounded-md p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Payment form would go here with credit card fields
              </p>
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-10 h-6 border rounded flex items-center justify-center">
                  <span className="text-xs">Visa</span>
                </div>
                <div className="w-10 h-6 border rounded flex items-center justify-center">
                  <span className="text-xs">MC</span>
                </div>
                <div className="w-10 h-6 border rounded flex items-center justify-center">
                  <span className="text-xs">Amex</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              <p className="text-sm text-muted-foreground">
                Your payment information is securely processed
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentSuccess}>
              Complete Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Update Payment Method Dialog */}
      <Dialog open={isUpdatePaymentDialogOpen} onOpenChange={setIsUpdatePaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Method</DialogTitle>
            <DialogDescription>
              Enter your new payment information below
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="border rounded-md p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Payment form would go here with credit card fields
              </p>
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-10 h-6 border rounded flex items-center justify-center">
                  <span className="text-xs">Visa</span>
                </div>
                <div className="w-10 h-6 border rounded flex items-center justify-center">
                  <span className="text-xs">MC</span>
                </div>
                <div className="w-10 h-6 border rounded flex items-center justify-center">
                  <span className="text-xs">Amex</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              <p className="text-sm text-muted-foreground">
                Your payment information is securely processed
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdatePaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsUpdatePaymentDialogOpen(false);
              toast({
                title: "Payment method updated",
                description: "Your payment method has been successfully updated.",
              });
            }}>
              Update Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
};

export default VendorSubscription;
