
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStoreData } from '@/context/StoreDataContext';
import { Star, Shield, Award } from 'lucide-react';

interface FeaturedVendorsProps {
  title: string;
  subtitle?: string;
  limit?: number;
}

const FeaturedVendors: React.FC<FeaturedVendorsProps> = ({
  title,
  subtitle,
  limit = 3
}) => {
  const navigate = useNavigate();
  const { data } = useStoreData();
  
  // Sort vendors by rating and get the top ones
  const topVendors = [...data.vendors]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {topVendors.map((vendor, index) => (
            <Card 
              key={vendor.id} 
              className="overflow-hidden card-hover cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/vendor/${vendor.id}`)}
            >
              <div className="h-40 bg-gradient-to-br from-gray-100 to-white dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-6">
                <img 
                  src={vendor.logo} 
                  alt={vendor.name} 
                  className="max-h-24 max-w-full object-contain"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{vendor.name}</h3>
                  {vendor.verified && (
                    <div className="flex items-center text-blue-500">
                      <Shield className="w-4 h-4 mr-1" />
                      <span className="text-xs">Verified</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center text-yellow-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(vendor.rating) ? 'fill-current' : ''}`} 
                    />
                  ))}
                  <span className="text-sm ml-2 text-gray-600 dark:text-gray-300">{vendor.rating.toFixed(1)}</span>
                </div>
                
                {vendor.rating >= 4.5 && (
                  <div className="flex items-center text-primary mb-4">
                    <Award className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">Top Rated Vendor</span>
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{vendor.description}</p>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full btn-hover"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/vendor/${vendor.id}`);
                  }}
                >
                  View Store
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button 
            onClick={() => navigate('/vendors')}
            variant="outline"
            className="btn-hover"
          >
            View All Vendors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVendors;
