
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';
import { 
  Card, CardContent, CardFooter, CardTitle, CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Percent, Star, Clock, Tag, ShoppingCart, Heart } from 'lucide-react';

// Mock deal data
const dealsData = [
  {
    id: 1,
    title: "Premium Smartphone",
    description: "Latest model with 128GB storage and triple camera",
    originalPrice: 12999.99,
    discountedPrice: 9999.99,
    discountPercentage: 23,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300",
    endDate: "2023-12-31",
    rating: 4.8,
    reviews: 127,
    category: "flash" 
  },
  {
    id: 2,
    title: "Wireless Earbuds",
    description: "Active noise cancellation with 24h battery life",
    originalPrice: 1999.99,
    discountedPrice: 1299.99,
    discountPercentage: 35,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=300",
    endDate: "2023-12-20",
    rating: 4.6,
    reviews: 94,
    category: "flash"
  },
  {
    id: 3,
    title: "Smart Watch",
    description: "Health monitoring, GPS, and waterproof",
    originalPrice: 3499.99,
    discountedPrice: 2799.99,
    discountPercentage: 20,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=300",
    endDate: "2023-12-25",
    rating: 4.4,
    reviews: 68,
    category: "monthly"
  },
  {
    id: 4,
    title: "Coffee Maker",
    description: "Programmable, 12-cup capacity with auto shut-off",
    originalPrice: 1299.99,
    discountedPrice: 899.99,
    discountPercentage: 30,
    image: "https://images.unsplash.com/photo-1606937448659-79fe058bc20c?q=80&w=300",
    endDate: "2023-12-22",
    rating: 4.7,
    reviews: 53,
    category: "clearance"
  },
  {
    id: 5,
    title: "Portable Bluetooth Speaker",
    description: "Waterproof, 20h playtime, and deep bass",
    originalPrice: 999.99,
    discountedPrice: 699.99,
    discountPercentage: 30,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=300",
    endDate: "2023-12-18",
    rating: 4.5,
    reviews: 87,
    category: "flash"
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "Heart rate monitor, sleep tracking, and water resistant",
    originalPrice: 1499.99,
    discountedPrice: 999.99,
    discountPercentage: 33,
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=300",
    endDate: "2023-12-24",
    rating: 4.3,
    reviews: 72,
    category: "clearance"
  },
  {
    id: 7,
    title: "Blender Set",
    description: "Multiple attachments for various blending needs",
    originalPrice: 1899.99,
    discountedPrice: 1499.99,
    discountPercentage: 21,
    image: "https://images.unsplash.com/photo-1612883503623-9d5dc8265abd?q=80&w=300",
    endDate: "2023-12-31",
    rating: 4.6,
    reviews: 41,
    category: "monthly"
  },
  {
    id: 8,
    title: "Gaming Headset",
    description: "Surround sound with noise-cancelling microphone",
    originalPrice: 1799.99,
    discountedPrice: 1299.99,
    discountPercentage: 28,
    image: "https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?q=80&w=300",
    endDate: "2023-12-20",
    rating: 4.7,
    reviews: 63,
    category: "flash"
  }
];

const Deals = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredDeals = activeTab === "all" 
    ? dealsData 
    : dealsData.filter(deal => deal.category === activeTab);
  
  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Special Deals & Offers</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover amazing discounts on top products across various categories. Limited time offers you don't want to miss!
          </p>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-md mx-auto">
              <TabsTrigger value="all" className="flex-1">All Deals</TabsTrigger>
              <TabsTrigger value="flash" className="flex-1">Flash Sales</TabsTrigger>
              <TabsTrigger value="monthly" className="flex-1">Deal of Month</TabsTrigger>
              <TabsTrigger value="clearance" className="flex-1">Clearance</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDeals.map(deal => (
            <Card key={deal.id} className="overflow-hidden">
              <div className="relative">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-red-500">
                  <Percent className="h-3 w-3 mr-1" /> {deal.discountPercentage}% OFF
                </Badge>
                
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full opacity-90">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm">{deal.rating} ({deal.reviews})</span>
                </div>
                
                <CardTitle className="text-lg mb-1">{deal.title}</CardTitle>
                <CardDescription className="line-clamp-2 h-10">
                  {deal.description}
                </CardDescription>
                
                <div className="mt-3 mb-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold">N${deal.discountedPrice.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        N${deal.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>Ends soon</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button asChild className="flex-1">
                  <Link to={`/product/${deal.id}`}>
                    View Deal
                  </Link>
                </Button>
                <Button variant="secondary" size="icon">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 bg-muted rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Subscribe for Exclusive Deals</h2>
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
            Be the first to know about upcoming sales, exclusive offers, and special discounts.
          </p>
          <div className="flex max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-2 rounded-l-md border border-r-0 focus:outline-none"
            />
            <Button className="rounded-l-none">Subscribe</Button>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

export default Deals;
