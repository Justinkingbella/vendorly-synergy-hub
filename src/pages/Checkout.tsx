
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Tabs, TabsList, TabsTrigger, TabsContent 
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { CreditCard, CreditCardIcon, CheckCircle } from 'lucide-react';

// Mock cart data for order summary
const cartItems = [
  {
    id: 1,
    name: "Premium Bluetooth Headphones",
    price: 899.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300"
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 249.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=300"
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 159.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=300"
  }
];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 79.99;
  const total = subtotal + shipping;
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been submitted and is being processed.",
      variant: "default",
    });
  };
  
  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder}>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" required />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Select defaultValue="khomas">
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="khomas">Khomas</SelectItem>
                          <SelectItem value="erongo">Erongo</SelectItem>
                          <SelectItem value="hardap">Hardap</SelectItem>
                          <SelectItem value="karas">Karas</SelectItem>
                          <SelectItem value="kunene">Kunene</SelectItem>
                          <SelectItem value="ohangwena">Ohangwena</SelectItem>
                          <SelectItem value="omaheke">Omaheke</SelectItem>
                          <SelectItem value="omusati">Omusati</SelectItem>
                          <SelectItem value="oshana">Oshana</SelectItem>
                          <SelectItem value="oshikoto">Oshikoto</SelectItem>
                          <SelectItem value="otjozondjupa">Otjozondjupa</SelectItem>
                          <SelectItem value="zambezi">Zambezi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="postal">Postal Code</Label>
                      <Input id="postal" required />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
                  
                  <RadioGroup defaultValue="standard" className="space-y-3">
                    <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="font-medium">Standard Delivery</Label>
                      </div>
                      <div className="font-medium">N$79.99</div>
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="font-medium">Express Delivery</Label>
                      </div>
                      <div className="font-medium">N$149.99</div>
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="font-medium">Store Pickup</Label>
                      </div>
                      <div className="font-medium">Free</div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  
                  <Tabs defaultValue="creditCard" onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="creditCard">Credit Card</TabsTrigger>
                      <TabsTrigger value="bankTransfer">Bank Transfer</TabsTrigger>
                      <TabsTrigger value="mobilePayment">Mobile Payment</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="creditCard" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" required={paymentMethod === 'creditCard'} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input 
                            id="cardNumber" 
                            required={paymentMethod === 'creditCard'} 
                            placeholder="1234 5678 9012 3456" 
                          />
                          <CreditCardIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            required={paymentMethod === 'creditCard'} 
                            placeholder="MM/YY" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            required={paymentMethod === 'creditCard'} 
                            placeholder="123" 
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="bankTransfer" className="space-y-4 mt-4">
                      <div className="p-4 bg-muted rounded-md">
                        <p className="mb-2 font-medium">Bank Transfer Instructions:</p>
                        <p className="text-sm text-muted-foreground">
                          Please transfer the full amount to the following account:
                        </p>
                        <div className="mt-3 space-y-1 text-sm">
                          <p><span className="font-medium">Bank:</span> First National Bank</p>
                          <p><span className="font-medium">Account Name:</span> MarketHub Ltd</p>
                          <p><span className="font-medium">Account Number:</span> 62123456789</p>
                          <p><span className="font-medium">Branch Code:</span> 280172</p>
                          <p><span className="font-medium">Reference:</span> Your email address</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Please note: Your order will be processed after payment confirmation.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="mobilePayment" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobileNumber">Mobile Number</Label>
                        <Input 
                          id="mobileNumber" 
                          required={paymentMethod === 'mobilePayment'} 
                          placeholder="+264 XX XXX XXXX" 
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        You will receive an SMS with instructions to complete payment.
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/cart">
                    Return to Cart
                  </Link>
                </Button>
                <Button type="submit" size="lg">
                  Place Order
                </Button>
              </div>
            </form>
          </div>
          
          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-muted-foreground">
                            Qty: {item.quantity}
                          </span>
                          <span>
                            N${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>N${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>N${shipping.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>N${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

export default Checkout;
