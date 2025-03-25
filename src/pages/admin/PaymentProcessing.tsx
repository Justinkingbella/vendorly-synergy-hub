import React, { useState } from 'react';
import { format } from 'date-fns';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, FileText, DollarSign, CheckCircle, XCircle, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type PaymentStatus = 'pending' | 'approved' | 'processed' | 'rejected';

type PaymentRequest = {
  id: number;
  vendorId: number;
  vendorName: string;
  amount: number;
  status: PaymentStatus;
  reference: string;
  bankAccount: string;
  bankName: string;
  accountType: string;
  createdAt: string;
  processedAt?: string;
  comment: string | null;
};

// Mock data for payment requests with correct type
const mockPaymentRequests: PaymentRequest[] = [
  { 
    id: 1, 
    vendorId: 1,
    vendorName: 'Premium Electronics',
    amount: 1250.00, 
    status: 'pending',
    reference: 'PAY-12345678',
    bankAccount: '**** **** **** 4321',
    bankName: 'First National Bank',
    accountType: 'Business',
    createdAt: new Date(2023, 6, 15).toISOString(),
    comment: null
  },
  { 
    id: 2, 
    vendorId: 2,
    vendorName: 'Fashion Hub',
    amount: 890.50, 
    status: 'approved',
    reference: 'PAY-87654321',
    bankAccount: '**** **** **** 8765',
    bankName: 'Bank Windhoek',
    accountType: 'Business',
    createdAt: new Date(2023, 6, 12).toISOString(),
    processedAt: new Date(2023, 6, 14).toISOString(),
    comment: null
  },
  { 
    id: 3, 
    vendorId: 3,
    vendorName: 'Kitchen Kings', 
    amount: 450.25, 
    status: 'rejected',
    reference: 'PAY-11223344',
    bankAccount: '**** **** **** 1122',
    bankName: 'Standard Bank',
    accountType: 'Savings',
    createdAt: new Date(2023, 6, 10).toISOString(),
    processedAt: new Date(2023, 6, 11).toISOString(),
    comment: 'Incorrect bank details provided'
  },
  { 
    id: 4, 
    vendorId: 4,
    vendorName: 'Book Corner', 
    amount: 325.75, 
    status: 'processed',
    reference: 'PAY-55667788',
    bankAccount: '**** **** **** 5566',
    bankName: 'Nedbank',
    accountType: 'Current',
    createdAt: new Date(2023, 6, 8).toISOString(),
    processedAt: new Date(2023, 6, 9).toISOString(),
    comment: null
  },
  { 
    id: 5, 
    vendorId: 5,
    vendorName: 'Fun Toys', 
    amount: 760.30, 
    status: 'pending',
    reference: 'PAY-99887766',
    bankAccount: '**** **** **** 9988',
    bankName: 'First National Bank',
    accountType: 'Business',
    createdAt: new Date(2023, 6, 7).toISOString(),
    comment: null
  }
];

const PaymentProcessing = () => {
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<PaymentRequest | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionComment, setRejectionComment] = useState('');
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>(mockPaymentRequests);

  const filteredPayments = paymentRequests.filter(payment => {
    if (activeTab !== 'all' && payment.status !== activeTab) {
      return false;
    }
    
    if (searchTerm && !(
      payment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
    )) {
      return false;
    }
    
    if (statusFilter !== 'all' && payment.status !== statusFilter) {
      return false;
    }
    
    return true;
  });

  const handleApprovePayment = () => {
    if (!selectedPayment) return;
    
    const updatedPayments = paymentRequests.map(payment => 
      payment.id === selectedPayment.id 
        ? {
            ...payment, 
            status: 'approved' as PaymentStatus,
            processedAt: new Date().toISOString()
          } 
        : payment
    );
    
    setPaymentRequests(updatedPayments);
    setIsApproveDialogOpen(false);
    
    toast({
      title: "Payment Approved",
      description: `Payment of N$${selectedPayment.amount.toFixed(2)} to ${selectedPayment.vendorName} has been approved.`,
    });
  };

  const handleRejectPayment = () => {
    if (!selectedPayment) return;
    
    const updatedPayments = paymentRequests.map(payment => 
      payment.id === selectedPayment.id 
        ? {
            ...payment, 
            status: 'rejected' as PaymentStatus,
            processedAt: new Date().toISOString(),
            comment: rejectionComment
          } 
        : payment
    );
    
    setPaymentRequests(updatedPayments);
    setIsRejectDialogOpen(false);
    setRejectionComment('');
    
    toast({
      title: "Payment Rejected",
      description: `Payment of N$${selectedPayment.amount.toFixed(2)} to ${selectedPayment.vendorName} has been rejected.`,
    });
  };

  const handleProcessPayment = (payment: PaymentRequest) => {
    const updatedPayments = paymentRequests.map(p => 
      p.id === payment.id 
        ? {
            ...p, 
            status: 'processed' as PaymentStatus,
            processedAt: new Date().toISOString()
          } 
        : p
    );
    
    setPaymentRequests(updatedPayments);
    
    toast({
      title: "Payment Processed",
      description: `Payment of N$${payment.amount.toFixed(2)} to ${payment.vendorName} has been processed.`,
    });
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Approved</Badge>;
      case 'processed':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Processed</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Payment Processing</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Requests</CardTitle>
            <CardDescription>
              Manage and process vendor payment requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by vendor or reference..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Tabs defaultValue="pending" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="processed">Processed</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                <TabsTrigger value="all">All Requests</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center p-4">
                          No payment requests found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.reference}</TableCell>
                          <TableCell>{payment.vendorName}</TableCell>
                          <TableCell>N${payment.amount.toFixed(2)}</TableCell>
                          <TableCell>{format(new Date(payment.createdAt), 'dd MMM yyyy')}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedPayment(payment);
                                  setIsDetailsDialogOpen(true);
                                }}
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                              
                              {payment.status === 'pending' && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-green-600"
                                    onClick={() => {
                                      setSelectedPayment(payment);
                                      setIsApproveDialogOpen(true);
                                    }}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => {
                                      setSelectedPayment(payment);
                                      setIsRejectDialogOpen(true);
                                    }}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              
                              {payment.status === 'approved' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-blue-600"
                                  onClick={() => handleProcessPayment(payment)}
                                >
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  Mark as Processed
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {selectedPayment && (
          <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Payment Request Details</DialogTitle>
                <DialogDescription>
                  Complete details about this payment request
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-right">Reference</Label>
                  <div className="col-span-2">{selectedPayment.reference}</div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-right">Vendor</Label>
                  <div className="col-span-2">{selectedPayment.vendorName}</div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-right">Amount</Label>
                  <div className="col-span-2 font-semibold">N${selectedPayment.amount.toFixed(2)}</div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-2">{getStatusBadge(selectedPayment.status)}</div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-right">Created Date</Label>
                  <div className="col-span-2">{format(new Date(selectedPayment.createdAt), 'dd MMM yyyy HH:mm')}</div>
                </div>
                {selectedPayment.processedAt && (
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-right">Processed Date</Label>
                    <div className="col-span-2">{format(new Date(selectedPayment.processedAt), 'dd MMM yyyy HH:mm')}</div>
                  </div>
                )}
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-right">Bank</Label>
                  <div className="col-span-2">{selectedPayment.bankName}</div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-right">Account</Label>
                  <div className="col-span-2">{selectedPayment.bankAccount}</div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-right">Account Type</Label>
                  <div className="col-span-2">{selectedPayment.accountType}</div>
                </div>
                {selectedPayment.comment && (
                  <div className="grid grid-cols-3 items-start gap-4">
                    <Label className="text-right">Comment</Label>
                    <div className="col-span-2">{selectedPayment.comment}</div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {selectedPayment && (
          <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Approve Payment Request</DialogTitle>
                <DialogDescription>
                  You are about to approve this payment request. This will mark it as ready for processing.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Reference:</span>
                  <span className="font-medium">{selectedPayment.reference}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Vendor:</span>
                  <span className="font-medium">{selectedPayment.vendorName}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold">N${selectedPayment.amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Bank Account:</span>
                  <span className="font-medium">{selectedPayment.bankAccount}</span>
                </div>
                <div className="flex items-center space-x-2 mt-4 p-2 bg-blue-50 rounded text-blue-800">
                  <Info className="h-4 w-4 shrink-0" />
                  <p className="text-sm">After approval, the payment must be processed manually through your bank.</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleApprovePayment}>
                  Approve Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {selectedPayment && (
          <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Reject Payment Request</DialogTitle>
                <DialogDescription>
                  Please provide a reason for rejecting this payment request.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Reference:</span>
                  <span className="font-medium">{selectedPayment.reference}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Vendor:</span>
                  <span className="font-medium">{selectedPayment.vendorName}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold">N${selectedPayment.amount.toFixed(2)}</span>
                </div>
                <div className="mt-4">
                  <Label htmlFor="rejection-reason">Rejection Reason</Label>
                  <Textarea
                    id="rejection-reason"
                    value={rejectionComment}
                    onChange={(e) => setRejectionComment(e.target.value)}
                    placeholder="Please provide a reason for rejecting this payment"
                    className="mt-2"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleRejectPayment}
                  disabled={!rejectionComment}
                >
                  Reject Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  );
};

export default PaymentProcessing;
