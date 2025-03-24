
import React, { useState } from 'react';
import VendorLayout from '@/components/layout/VendorLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreditCard, Search, FileText, Filter, Calendar, ArrowRight, Eye, Wallet, ArrowUpRight, Download } from 'lucide-react';

// Mock data for payouts
const payoutHistory = [
  { id: 'PAY-10521', amount: 3500.75, requestDate: '2023-12-05', status: 'Pending', account: '****3456' },
  { id: 'PAY-10420', amount: 1250.50, requestDate: '2023-11-15', status: 'Processed', processedDate: '2023-11-17', account: '****3456' },
  { id: 'PAY-10318', amount: 4800.25, requestDate: '2023-10-22', status: 'Processed', processedDate: '2023-10-24', account: '****3456' },
  { id: 'PAY-10299', amount: 920.00, requestDate: '2023-09-18', status: 'Processed', processedDate: '2023-09-20', account: '****3456' },
  { id: 'PAY-10187', amount: 350.50, requestDate: '2023-09-05', status: 'Rejected', rejectionReason: 'Insufficient account information', account: '****3456' },
];

const transactionHistory = [
  { id: 'TRX-20521', type: 'Order Sale', amount: 250.00, date: '2023-12-05', status: 'Completed', orderId: 'ORD-58921' },
  { id: 'TRX-20520', type: 'Order Sale', amount: 1200.75, date: '2023-12-04', status: 'Completed', orderId: 'ORD-58920' },
  { id: 'TRX-20519', type: 'Commission', amount: -180.15, date: '2023-12-04', status: 'Completed', orderId: 'ORD-58920' },
  { id: 'TRX-20518', type: 'Order Sale', amount: 550.50, date: '2023-12-03', status: 'Completed', orderId: 'ORD-58919' },
  { id: 'TRX-20517', type: 'Commission', amount: -82.50, date: '2023-12-03', status: 'Completed', orderId: 'ORD-58919' },
  { id: 'TRX-20516', type: 'Order Sale', amount: 1500.00, date: '2023-12-01', status: 'Completed', orderId: 'ORD-58918' },
  { id: 'TRX-20515', type: 'Commission', amount: -225.00, date: '2023-12-01', status: 'Completed', orderId: 'ORD-58918' },
  { id: 'TRX-20514', type: 'Payout', amount: -4800.25, date: '2023-10-24', status: 'Completed', payoutId: 'PAY-10318' },
];

const VendorPayouts = () => {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestAmount, setRequestAmount] = useState('');
  const [selectedTab, setSelectedTab] = useState('history');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '1234567890123456',
    bankName: 'First National Bank',
    accountHolder: 'Premium Electronics',
    branchCode: '123456',
  });
  const [isEditBankDetailsOpen, setIsEditBankDetailsOpen] = useState(false);
  const [updatedBankDetails, setUpdatedBankDetails] = useState(bankDetails);

  // Calculate available balance from transaction history
  const availableBalance = transactionHistory.reduce((total, transaction) => total + transaction.amount, 0);

  const handleRequestPayout = () => {
    const amount = parseFloat(requestAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }
    
    if (amount > availableBalance) {
      toast({
        title: "Insufficient Balance",
        description: "The requested amount exceeds your available balance.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would make an API call here
    console.log(`Requesting payout of N$ ${amount}`);
    
    setIsRequestDialogOpen(false);
    setRequestAmount('');
    
    toast({
      title: "Payout Requested",
      description: `Your payout request for N$ ${amount.toFixed(2)} has been submitted.`,
    });
  };

  const handleUpdateBankDetails = () => {
    setBankDetails(updatedBankDetails);
    setIsEditBankDetailsOpen(false);
    
    toast({
      title: "Bank Details Updated",
      description: "Your bank account information has been updated successfully.",
    });
  };

  // Filter payouts based on search and status
  const filteredPayouts = payoutHistory.filter(payout => {
    const matchesSearch = 
      payout.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.account.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' ||
      payout.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <VendorLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Payouts</h1>
          
          <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Wallet className="mr-2 h-4 w-4" />
                Request Payout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Payout</DialogTitle>
                <DialogDescription>
                  Enter the amount you want to withdraw from your available balance.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (N$)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={requestAmount}
                    onChange={(e) => setRequestAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-sm text-muted-foreground">
                    Available balance: <span className="font-medium">N$ {availableBalance.toFixed(2)}</span>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Bank Account</Label>
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{bankDetails.bankName}</p>
                        <p>Account: {bankDetails.accountNumber}</p>
                        <p className="text-sm text-muted-foreground">{bankDetails.accountHolder}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setIsRequestDialogOpen(false);
                          setIsEditBankDetailsOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Processing Time</Label>
                  <p className="text-sm text-muted-foreground">
                    Payouts are typically processed within 1-3 business days after approval.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRequestPayout}>
                  Request Payout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isEditBankDetailsOpen} onOpenChange={setIsEditBankDetailsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Bank Details</DialogTitle>
                <DialogDescription>
                  Update your bank account information for payouts.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="accountHolder">Account Holder Name</Label>
                  <Input
                    id="accountHolder"
                    value={updatedBankDetails.accountHolder}
                    onChange={(e) => setUpdatedBankDetails({...updatedBankDetails, accountHolder: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={updatedBankDetails.accountNumber}
                    onChange={(e) => setUpdatedBankDetails({...updatedBankDetails, accountNumber: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Select 
                    value={updatedBankDetails.bankName} 
                    onValueChange={(value) => setUpdatedBankDetails({...updatedBankDetails, bankName: value})}
                  >
                    <SelectTrigger id="bankName">
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="First National Bank">First National Bank</SelectItem>
                      <SelectItem value="Standard Bank">Standard Bank</SelectItem>
                      <SelectItem value="Nedbank">Nedbank</SelectItem>
                      <SelectItem value="Bank Windhoek">Bank Windhoek</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="branchCode">Branch Code</Label>
                  <Input
                    id="branchCode"
                    value={updatedBankDetails.branchCode}
                    onChange={(e) => setUpdatedBankDetails({...updatedBankDetails, branchCode: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditBankDetailsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateBankDetails}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Balances Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Available Balance</p>
                  <h3 className="text-3xl font-bold">N$ {availableBalance.toFixed(2)}</h3>
                  <p className="flex items-center text-sm text-green-500 mt-1">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +N$ 1,950.00 this month
                  </p>
                </div>
                <Button>
                  Request Payout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Bank Account</p>
                  <h3 className="text-xl font-bold mb-1">{bankDetails.bankName}</h3>
                  <p className="text-sm mb-1">Account: {bankDetails.accountNumber}</p>
                  <p className="text-xs text-muted-foreground">{bankDetails.accountHolder}</p>
                </div>
                <Button variant="outline" onClick={() => setIsEditBankDetailsOpen(true)}>
                  Edit Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="history">Payout History</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Payout History</CardTitle>
                  
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search payouts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full md:w-[200px]"
                      />
                    </div>
                    
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-[150px]">
                        <div className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          <span>Status</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processed">Processed</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date Range
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayouts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No payout history found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPayouts.map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell className="font-medium">{payout.id}</TableCell>
                          <TableCell>N$ {payout.amount.toFixed(2)}</TableCell>
                          <TableCell>{payout.requestDate}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                payout.status === 'Processed' ? 'bg-green-100 text-green-800' : 
                                payout.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {payout.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{payout.account}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Payout Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium">Payout ID</p>
                                    <p>{payout.id}</p>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium">Amount</p>
                                    <p>N$ {payout.amount.toFixed(2)}</p>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium">Request Date</p>
                                    <p>{payout.requestDate}</p>
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium">Status</p>
                                    <Badge 
                                      className={
                                        payout.status === 'Processed' ? 'bg-green-100 text-green-800' : 
                                        payout.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                                        'bg-yellow-100 text-yellow-800'
                                      }
                                    >
                                      {payout.status}
                                    </Badge>
                                  </div>
                                  
                                  {payout.processedDate && (
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium">Processed Date</p>
                                      <p>{payout.processedDate}</p>
                                    </div>
                                  )}
                                  
                                  {payout.rejectionReason && (
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium">Rejection Reason</p>
                                      <p className="text-red-600">{payout.rejectionReason}</p>
                                    </div>
                                  )}
                                  
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium">Bank Account</p>
                                    <p>{bankDetails.bankName}</p>
                                    <p>{payout.account}</p>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Receipt
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Transaction History</CardTitle>
                  
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search transactions..."
                        className="pl-8 w-full md:w-[200px]"
                      />
                    </div>
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full md:w-[150px]">
                        <div className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          <span>Type</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="sale">Sales</SelectItem>
                        <SelectItem value="commission">Commissions</SelectItem>
                        <SelectItem value="payout">Payouts</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionHistory.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={
                              transaction.type === 'Order Sale' ? 'bg-blue-100 text-blue-800' :
                              transaction.type === 'Commission' ? 'bg-amber-100 text-amber-800' :
                              'bg-purple-100 text-purple-800'
                            }
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} N$
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {transaction.orderId && (
                            <Link to={`/vendor/orders/${transaction.orderId}`} className="text-primary hover:underline">
                              {transaction.orderId}
                            </Link>
                          )}
                          {transaction.payoutId && (
                            <Link to="#" className="text-primary hover:underline">
                              {transaction.payoutId}
                            </Link>
                          )}
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
    </VendorLayout>
  );
};

export default VendorPayouts;
