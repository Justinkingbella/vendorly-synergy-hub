
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreData } from '@/context/StoreDataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FeaturedVendorsProps {
  title: string;
  subtitle?: string;
  limit?: number;
}

const FeaturedVendors: React.FC<FeaturedVendorsProps> = ({
  title,
  subtitle,
  limit = 6,
}) => {
  const navigate = useNavigate();
  const { data } = useStoreData();
  
  // Get featured vendors from the data
  const vendors = data.vendors.slice(0, limit);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor, index) => (
            <Card 
              key={vendor.id} 
              className="overflow-hidden card-hover animate-slide-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/vendor/${vendor.id}`)}
            >
              <div className="relative h-32 bg-gradient-to-r from-primary/10 to-primary/30">
                {vendor.logo && (
                  <img 
                    src={vendor.logo} 
                    alt={`${vendor.name} cover`} 
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute -bottom-8 left-4">
                  <Avatar className="h-16 w-16 border-4 border-white dark:border-gray-900">
                    <AvatarImage src={vendor.logo} alt={vendor.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {vendor.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Badge className="absolute top-2 right-2 bg-green-500">
                  <CheckCircle className="w-3 h-3 mr-1" /> Verified
                </Badge>
              </div>
              <CardContent className="pt-10 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{vendor.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{vendor.rating?.toFixed(1) || '4.5'}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {vendor.description || 'Quality products and excellent service from this trusted marketplace vendor.'}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="mr-3">54 Products</span>
                  <span>120 Followers</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
