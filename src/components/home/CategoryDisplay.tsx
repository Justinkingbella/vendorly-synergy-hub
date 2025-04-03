
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreData } from '@/context/StoreDataContext';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryDisplayProps {
  title: string;
  subtitle?: string;
  limit?: number;
}

const CategoryDisplay: React.FC<CategoryDisplayProps> = ({
  title,
  subtitle,
  limit = 8,
}) => {
  const navigate = useNavigate();
  const { data } = useStoreData();
  const categories = data.categories.slice(0, limit);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="cursor-pointer overflow-hidden card-hover animate-slide-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <div className="h-32 bg-gray-200 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryDisplay;
