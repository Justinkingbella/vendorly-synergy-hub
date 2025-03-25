
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, MessageSquare, Tag, Store, Award, Calendar, Clock, ThumbsUp, ShoppingBag, Send } from 'lucide-react';
import { toast } from 'sonner';
import StoreLayout from '@/components/layout/StoreLayout';
import { Badge } from '@/components/ui/badge';

// Sample data for vendor store
const vendorData = {
  id: 1,
  name: "Premium Electronics",
  description: "We provide high-quality electronics at affordable prices. All our products come with a 1-year warranty.",
  logo: "https://placehold.co/200x200",
  coverImage: "https://placehold.co/1200x300",
  rating: 4.7,
  totalReviews: 243,
  totalProducts: 87,
  joinedDate: "2022-03-15",
  location: "Windhoek, Namibia",
  badges: ["Premium Seller", "Fast Shipping", "Top Rated"],
  categories: ["Electronics", "Gadgets", "Home Appliances", "Computers"],
  verified: true
};

// Sample products
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 899.99,
    image: "https://placehold.co/300x300",
    rating: 4.5,
    reviews: 37,
    discount: 15
  },
  {
    id: 2,
    name: "Smart LED TV 55\"",
    price: 7999.99,
    image: "https://placehold.co/300x300",
    rating: 4.8,
    reviews: 52,
    discount: 0
  },
  {
    id: 3,
    name: "Smartphone Pro Max",
    price: 11999.99,
    image: "https://placehold.co/300x300",
    rating: 4.9,
    reviews: 128,
    discount: 10
  },
  {
    id: 4,
    name: "Laptop Ultra Slim",
    price: 15999.99,
    image: "https://placehold.co/300x300",
    rating: 4.7,
    reviews: 86,
    discount: 5
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 399.99,
    image: "https://placehold.co/300x300",
    rating: 4.3,
    reviews: 41,
    discount: 0
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 1299.99,
    image: "https://placehold.co/300x300",
    rating: 4.4,
    reviews: 28,
    discount: 20
  }
];

// Sample reviews
const reviews = [
  {
    id: 1,
    user: "John Doe",
    avatar: "https://placehold.co/50x50",
    rating: 5,
    comment: "Excellent service! The products arrived earlier than expected and in perfect condition.",
    date: "2023-10-15",
    helpful: 12
  },
  {
    id: 2,
    user: "Sarah Smith",
    avatar: "https://placehold.co/50x50",
    rating: 4,
    comment: "Good quality products and reasonable prices. Would definitely buy from this vendor again.",
    date: "2023-09-22",
    helpful: 8
  },
  {
    id: 3,
    user: "Michael Johnson",
    avatar: "https://placehold.co/50x50",
    rating: 5,
    comment: "Very professional vendor. Quick responses to my questions and fast shipping.",
    date: "2023-08-30",
    helpful: 15
  }
];

// Sample coupons
const coupons = [
  {
    id: 1,
    code: "WELCOME20",
    discount: "20% off",
    minSpend: "N$1000",
    validUntil: "2023-12-31",
    description: "20% off your first purchase over N$1000"
  },
  {
    id: 2,
    code: "SUMMER10",
    discount: "10% off",
    minSpend: "N$500",
    validUntil: "2023-11-30",
    description: "10% off all summer items"
  },
  {
    id: 3,
    code: "FREESHIP",
    discount: "Free Shipping",
    minSpend: "N$1500",
    validUntil: "2023-12-15",
    description: "Free shipping on all orders over N$1500"
  }
];

export default function VendorStore() {
  const { id } = useParams();
  const [messageText, setMessageText] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  const handleSendMessage = () => {
    if (messageText.trim()) {
      toast.success("Message sent to vendor successfully!");
      setMessageText("");
    } else {
      toast.error("Please enter a message");
    }
  };
  
  const handleSubmitReview = () => {
    if (rating && reviewText.trim()) {
      toast.success("Your review has been submitted!");
      setRating(null);
      setReviewText("");
    } else {
      toast.error("Please provide both rating and review text");
    }
  };
  
  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon code ${code} copied to clipboard!`);
  };
  
  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Vendor Header */}
        <div className="relative mb-8">
          <div className="h-64 w-full rounded-t-xl overflow-hidden">
            <img 
              src={vendorData.coverImage} 
              alt={`${vendorData.name} cover`} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 px-4 md:px-6 pb-4 space-y-4 md:space-y-0 md:space-x-6">
            <div className="z-10 rounded-xl overflow-hidden border-4 border-white bg-white shadow-lg">
              <img 
                src={vendorData.logo} 
                alt={vendorData.name} 
                className="w-32 h-32 object-cover" 
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">{vendorData.name}</h1>
                {vendorData.verified && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                    <Award className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center mt-1 space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{vendorData.rating}</span>
                  <span className="ml-1 text-xs text-muted-foreground">({vendorData.totalReviews} reviews)</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  {vendorData.totalProducts} Products
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {new Date(vendorData.joinedDate).toLocaleDateString()}
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {vendorData.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Message to {vendorData.name}</DialogTitle>
                    <DialogDescription>
                      Your message will be sent directly to the vendor. They typically respond within 24 hours.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Textarea
                      placeholder="Type your message here..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSendMessage}>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="flex items-center">
                    <Star className="mr-2 h-4 w-4" />
                    Rate Store
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rate {vendorData.name}</DialogTitle>
                    <DialogDescription>
                      Your review helps other shoppers make informed decisions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="focus:outline-none"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                        >
                          <Star
                            className={`h-8 w-8 ${
                              (hoverRating !== null ? star <= hoverRating : star <= (rating || 0))
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <Textarea
                      placeholder="Share your experience with this vendor..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSubmitReview}>Submit Review</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-muted-foreground">{vendorData.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {vendorData.categories.map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Tabs for different sections */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="w-full justify-start mb-8 border-b pb-0 pt-0">
            <TabsTrigger value="products" className="rounded-b-none rounded-t-lg">Products</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-b-none rounded-t-lg">Reviews</TabsTrigger>
            <TabsTrigger value="coupons" className="rounded-b-none rounded-t-lg">Coupons</TabsTrigger>
            <TabsTrigger value="about" className="rounded-b-none rounded-t-lg">About</TabsTrigger>
          </TabsList>
          
          {/* Products Tab */}
          <TabsContent value="products" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover"
                    />
                    {product.discount > 0 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-xs">{product.rating}</span>
                      <span className="ml-1 text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        {product.discount > 0 ? (
                          <>
                            <span className="font-bold">N${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                            <span className="ml-2 text-sm text-muted-foreground line-through">N${product.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="font-bold">N${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button variant="outline">View All Products</Button>
            </div>
          </TabsContent>
          
          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-lg">
                <div className="md:w-1/3 flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold">{vendorData.rating}</div>
                  <div className="flex items-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.floor(vendorData.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : star <= vendorData.rating
                            ? "text-yellow-400 fill-yellow-400" // For partial stars (not implemented)
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Based on {vendorData.totalReviews} reviews
                  </div>
                  <Button className="mt-4">Write a Review</Button>
                </div>
                
                <div className="md:w-2/3 space-y-3">
                  {[5, 4, 3, 2, 1].map((star) => {
                    // Calculate fake percentages 
                    const percentage = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1;
                    return (
                      <div key={star} className="flex items-center">
                        <div className="w-12 text-sm font-medium">{star} star</div>
                        <div className="w-full mx-4 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-yellow-400 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-xs text-right">{percentage}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Review list */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-start">
                      <img 
                        src={review.avatar} 
                        alt={review.user} 
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-medium">{review.user}</h4>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-2 text-sm">{review.comment}</p>
                        <Button variant="ghost" size="sm" className="mt-2 h-8 text-xs">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Coupons Tab */}
          <TabsContent value="coupons" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coupons.map((coupon) => (
                <div 
                  key={coupon.id} 
                  className="border rounded-lg p-4 relative overflow-hidden bg-white hover:shadow-md transition-shadow"
                >
                  <div className="absolute -right-4 -top-4 bg-primary/10 w-16 h-16 rounded-full"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2">{coupon.discount}</Badge>
                      <h3 className="font-bold text-lg">{coupon.description}</h3>
                    </div>
                    <Tag className="text-primary h-6 w-6" />
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">Min spend: {coupon.minSpend}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        Expires: {new Date(coupon.validUntil).toLocaleDateString()}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleCopyCoupon(coupon.code)}
                      className="whitespace-nowrap"
                    >
                      {coupon.code}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* About Tab */}
          <TabsContent value="about" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">About {vendorData.name}</h3>
                  <p className="mb-4">
                    {vendorData.description}
                  </p>
                  <p className="mb-4">
                    We are committed to providing our customers with the best products and service possible. 
                    All our products are sourced directly from manufacturers and come with full warranty.
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center">
                      <Store className="h-5 w-5 mr-3 text-primary" />
                      <span>Premium Vendor since 2022</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-5 w-5 mr-3 text-primary" />
                      <span>Top Rated Seller</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-primary" />
                      <span>Joined {new Date(vendorData.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-muted-foreground">{vendorData.location}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-muted-foreground">contact@premiumelectronics.na</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Phone</div>
                      <div className="text-muted-foreground">+264 61 123 4567</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Business Hours</div>
                      <div className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 3:00 PM<br />
                        Sunday: Closed
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StoreLayout>
  );
}
