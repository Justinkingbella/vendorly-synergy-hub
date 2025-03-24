
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Search, Filter, Calendar, Download, Check, X, Clock, ArrowUp } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Mock data for payment requests
const mockPayments = [
  { 
    id: 'PAY-10521', 
    vendor: 'Premium Electronics', 
    amount: 3500.75, 
    requestDate: '2023-12-05', 
    status: 'Pending', 
    account: '1234 5678 9012 3456', 
    bank: 'First National Bank'
  },
  { 
    id: 'PAY-10520', 
    vendor: 'FashionHub', 
    amount: 1250.50, 
    requestDate: '2023-12-04', 
    status: 'Processed', 
    processedDate: '2023-12-05',
    account: '2345 6789 0123 4567', 
    bank: 'Standard Bank'
  },
  { 
    id: 'PAY-10519', 
    vendor: 'HomeDecor', 
    amount: 870.25, 
    requestDate: '2023-12-03', 
    status: 'Pending', 
    account: '3456 7890 1234 5678', 
    bank: 'Nedbank'
  },
  { 
    id: 'PAY-10518', 
    vendor: 'BookCorner', 
    amount: 430.00, 
    requestDate: '2023-12-01', 
    status: 'Rejected', 
    rejectionReason: 'Insufficient account information',
    account: '4567 8901 2345 6789', 
    bank: 'Bank Windhoek'
  },
  { 
    id: 'PAY-10517', 
    vendor: 'GadgetWorld', 
    amount: 5200.80, 
    requestDate: '2023-11-30', 
    status: 'Processed', 
    processedDate: '2023-12-01',
    account: '5678 9012 3456 7890', 
    bank: 'First National Bank'
  },
];

type Payment = {
  id: string;
  vendor: string;
  amount: number;
  requestDate: string;
  status: 'Pending' | 'Processed' | 'Rejected';
  processedDate?: string;
  rejectionReason?: string;
  account: string;
  bank: string;
};

const PaymentProcessing = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null);
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      payment.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleProcessPayment = () => {
    if (!currentPayment) return;
    
    // In a real app, you would make an API call here
    const updatedPayments = payments.map(payment => 
      payment.id === currentPayment.id 
        ? { 
            ...payment, 
            status: 'Processed' as const, 
            processedDate: new Date().toISOString().split('T')[0] 
          } 
        : payment
    );
    
    setPayments(updatedPayments);
    setIsProcessDialogOpen(false);
    
    toast({
      title: "Payment Processed",
      description: `Payment for ${currentPayment.vendor} (N$ ${currentPayment.amount.toFixed(2)}) has been processed.`,
    });
  };

  const handleRejectPayment = () => {
    if (!currentPayment || !rejectionReason) return;
    
    // In a real app, you would make an API call here
    const updatedPayments = payments.map(payment => 
      payment.id === currentPayment.id 
        ? { 
            ...payment, 
            status: 'Rejected' as const, 
            rejectionReason: rejectionReason
          } 
        : payment
    );
    
    setPayments(updatedPayments);
    setIsRejectDialogOpen(false);
    setRejectionReason('');
    
    toast({
      title: "Payment Rejected",
      description: `Payment for ${currentPayment.vendor} has been rejected.`,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Vendor Payment Processing</h1>
          
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full md:w-64"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Filter</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Requests</CardTitle>
            <CardDescription>Process or reject vendor payout requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No payment requests found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.vendor}</TableCell>
                      <TableCell>N$ {payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.requestDate}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            payment.status === 'Processed' ? 'bg-green-100 text-green-800' : 
                            payment.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {payment.status === 'Pending' && (
                          <div className="flex space-x-2">
                            <Dialog
                              open={isProcessDialogOpen && currentPayment?.id === payment.id}
                              onOpenChange={(open) => {
                                setIsProcessDialogOpen(open);
                                if (open) {
                                  setCurrentPayment(payment);
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Check className="mr-1 h-3 w-3" />
                                  Process
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Process Payment</DialogTitle>
                                  <DialogDescription>
                                    Confirm payment processing for this vendor.
                                  </DialogDescription>
                                </DialogHeader>
                                {currentPayment && (
                                  <div className="py-4 space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <p className="text-sm font-medium">Vendor</p>
                                        <p>{currentPayment.vendor}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Amount</p>
                                        <p>N$ {currentPayment.amount.toFixed(2)}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Bank Details</p>
                                      <p>{currentPayment.bank}</p>
                                      <p>Account: {currentPayment.account}</p>
                                    </div>
                                    <div className="border-t pt-3 mt-3">
                                      <p className="text-sm text-muted-foreground">
                                        By clicking "Process Payment", you confirm that the payment has been processed through your banking system.
                                      </p>
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsProcessDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleProcessPayment}>
                                    Process Payment
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <Dialog
                              open={isRejectDialogOpen && currentPayment?.id === payment.id}
                              onOpenChange={(open) => {
                                setIsRejectDialogOpen(open);
                                if (open) {
                                  setCurrentPayment(payment);
                                } else {
                                  setRejectionReason('');
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <X className="mr-1 h-3 w-3" />
                                  Reject
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Reject Payment</DialogTitle>
                                  <DialogDescription>
                                    Please provide a reason for rejecting this payment request.
                                  </DialogDescription>
                                </DialogHeader>
                                {currentPayment && (
                                  <div className="py-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <p className="text-sm font-medium">Vendor</p>
                                        <p>{currentPayment.vendor}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Amount</p>
                                        <p>N$ {currentPayment.amount.toFixed(2)}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Rejection Reason</label>
                                      <Input
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        placeholder="e.g., Insufficient account information"
                                        required
                                      />
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={handleRejectPayment} disabled={!rejectionReason}>
                                    Reject Payment
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                        
                        {payment.status === 'Processed' && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {payment.processedDate}
                          </div>
                        )}
                        
                        {payment.status === 'Rejected' && (
                          <div className="flex items-center text-sm text-red-500">
                            <Button variant="link" size="sm" className="p-0 h-auto text-red-500">
                              View Reason
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Pending Payments</p>
                  <h3 className="text-2xl font-bold">
                    {payments.filter(p => p.status === 'Pending').length}
                  </h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Payout Today</p>
                  <h3 className="text-2xl font-bold">
                    N$ {payments
                      .filter(p => p.status === 'Processed' && p.processedDate === new Date().toISOString().split('T')[0])
                      .reduce((sum, p) => sum + p.amount, 0)
                      .toFixed(2)}
                  </h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <ArrowUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Rejected Requests</p>
                  <h3 className="text-2xl font-bold">
                    {payments.filter(p => p.status === 'Rejected').length}
                  </h3>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <X className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentProcessing;
