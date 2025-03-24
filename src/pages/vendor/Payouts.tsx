
import React, { useState } from 'react';
import { 
  CreditCard, Wallet, Calendar, Download, 
  ArrowDown, ArrowUp, DollarSign, Filter, 
  FileText, Check, X
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock data for payouts
const mockPayouts = Array.from({ length: 8 }).map((_, i) => ({
  id: `PO-${1000 + i}`,
  amount: Math.floor(Math.random() * 5000) + 500,
  status: ['Pending', 'Completed', 'Processing', 'Rejected'][Math.floor(Math.random() * 4)],
  requestedAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
  processedAt: Math.random() > 0.5 ? new Date(Date.now() - Math.floor(Math.random() * 15 * 24 * 60 * 60 * 1000)) : null,
  paymentMethod: ['Bank Transfer', 'PayPal', 'Stripe'][Math.floor(Math.random() * 3)],
  reference: `REF-${Math.floor(Math.random() * 1000000)}`,
}));

// Validation schema for payout request form
const payoutFormSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }).refine(
    (value) => {
      const num = parseFloat(value);
      return !isNaN(num) && num > 0;
    },
    { message: "Amount must be a positive number" }
  ),
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
  accountDetails: z.string().min(1, { message: "Account details are required" }),
});

type PayoutFormValues = z.infer<typeof payoutFormSchema>;

const VendorPayouts = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [isRequestPayoutOpen, setIsRequestPayoutOpen] = useState(false);
  
  // Setup form with validation
  const form = useForm<PayoutFormValues>({
    resolver: zodResolver(payoutFormSchema),
    defaultValues: {
      amount: "",
      paymentMethod: "",
      accountDetails: "",
    },
  });

  // Filter payouts based on selected filters
  const filteredPayouts = mockPayouts.filter(payout => {
    const matchesStatus = statusFilter === 'all' || payout.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPaymentMethod = paymentMethodFilter === 'all' || 
                               payout.paymentMethod.toLowerCase().includes(paymentMethodFilter.toLowerCase());
    
    if (timeFilter === 'all') return matchesStatus && matchesPaymentMethod;
    
    const today = new Date();
    const requestedDate = new Date(payout.requestedAt);
    const diffTime = Math.abs(today.getTime() - requestedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const matchesTimeFilter = 
      (timeFilter === 'last7days' && diffDays <= 7) ||
      (timeFilter === 'last30days' && diffDays <= 30) ||
      (timeFilter === 'last90days' && diffDays <= 90);
    
    return matchesStatus && matchesPaymentMethod && matchesTimeFilter;
  });
  
  // Format date to readable string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Handle submit for payout request
  const onSubmit = (data: PayoutFormValues) => {
    // In a real app, this would send to your API
    console.log("Payout request:", data);
    
    toast({
      title: "Payout Request Submitted",
      description: `Your request for $${data.amount} has been submitted and is pending review.`,
    });
    
    setIsRequestPayoutOpen(false);
    form.reset();
  };
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <VendorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Payouts</h1>
            <p className="text-muted-foreground">Manage your earnings and request payouts</p>
          </div>
          
          <Dialog open={isRequestPayoutOpen} onOpenChange={setIsRequestPayoutOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0">
                <Wallet className="mr-2 h-4 w-4" />
                Request Payout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Payout</DialogTitle>
                <DialogDescription>
                  Fill in the details below to request a payout of your earnings.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount ($)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter amount" 
                            {...field} 
                            type="number"
                            min="1" 
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum available: $1,500.00
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="stripe">Stripe</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="accountDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Details</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter account details" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Account number, PayPal email, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsRequestPayoutOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Submit Request</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Available Balance</h2>
                  <p className="text-muted-foreground">Ready for payout</p>
                </div>
                <div className="text-3xl font-bold flex items-center">
                  <DollarSign className="h-6 w-6 mr-1" />
                  1,500.00
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Pending Balance</h2>
                  <p className="text-muted-foreground">Processing</p>
                </div>
                <div className="text-3xl font-bold flex items-center">
                  <DollarSign className="h-6 w-6 mr-1" />
                  450.00
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Total Paid Out</h2>
                  <p className="text-muted-foreground">All time</p>
                </div>
                <div className="text-3xl font-bold flex items-center">
                  <DollarSign className="h-6 w-6 mr-1" />
                  12,750.00
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
            <CardDescription>View and filter your payout requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="last90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Export History
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Processed</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayouts.length > 0 ? (
                  filteredPayouts.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell>{payout.id}</TableCell>
                      <TableCell>${payout.amount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(payout.status)}</TableCell>
                      <TableCell>{formatDate(payout.requestedAt)}</TableCell>
                      <TableCell>
                        {payout.processedAt ? formatDate(payout.processedAt) : '—'}
                      </TableCell>
                      <TableCell>{payout.paymentMethod}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {payout.reference}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center py-4">
                        <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                        <p className="text-muted-foreground mb-2">No payout records found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPayouts.length} of {mockPayouts.length} records
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payout Information</CardTitle>
            <CardDescription>How our payout process works</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary text-primary-foreground rounded-full p-1">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Payout Schedule</h3>
                  <p className="text-sm text-muted-foreground">
                    Payouts are processed every Monday and Thursday. Requests submitted before 12 PM will be processed on the next payout day.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary text-primary-foreground rounded-full p-1">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Minimum Payout Amount</h3>
                  <p className="text-sm text-muted-foreground">
                    The minimum amount for a payout request is $50.00. There is no maximum limit.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary text-primary-foreground rounded-full p-1">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Payment Methods</h3>
                  <p className="text-sm text-muted-foreground">
                    We currently support bank transfers, PayPal, and Stripe Connect. You can update your preferred payment method in your settings.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
};

export default VendorPayouts;
