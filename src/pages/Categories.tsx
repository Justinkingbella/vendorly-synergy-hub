
import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Categories = () => {
  const categoriesData = [
    {
      id: 1,
      name: 'Electronics',
      imageUrl: 'https://placehold.co/600x400?text=Electronics',
      description: 'Explore the latest gadgets and electronics.',
      subcategories: ['Smartphones', 'Laptops', 'Cameras', 'Audio', 'Wearable Tech']
    },
    {
      id: 2,
      name: 'Fashion',
      imageUrl: 'https://placehold.co/600x400?text=Fashion',
      description: 'Stay trendy with our fashion collection.',
      subcategories: ["Men's Clothing", "Women's Clothing", 'Shoes', 'Accessories', 'Jewelry']
    },
    {
      id: 3,
      name: 'Home & Garden',
      imageUrl: 'https://placehold.co/600x400?text=Home+%26+Garden',
      description: 'Create your dream home with our wide range of products.',
      subcategories: ['Furniture', 'Kitchen', 'Bedding', 'Decor', 'Garden']
    },
    {
      id: 4,
      name: 'Beauty',
      imageUrl: 'https://placehold.co/600x400?text=Beauty',
      description: 'Enhance your beauty with our premium beauty products.',
      subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Bath & Body']
    },
    {
      id: 5,
      name: 'Sports',
      imageUrl: 'https://placehold.co/600x400?text=Sports',
      description: 'Get active with our sports and outdoor equipment.',
      subcategories: ['Fitness', 'Outdoor Recreation', 'Team Sports', 'Sportswear', 'Accessories']
    },
    {
      id: 6,
      name: 'Toys',
      imageUrl: 'https://placehold.co/600x400?text=Toys',
      description: 'Find the perfect toys for kids of all ages.',
      subcategories: ['Action Figures', 'Board Games', 'Dolls', 'Educational Toys', 'Outdoor Toys']
    },
  ];

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Browse our wide selection of products by category</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category) => (
            <div key={category.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
              <Link to={`/category/${category.id}`}>
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-64 object-cover object-center"
                />
              </Link>
              <div className="p-5">
                <Link to={`/category/${category.id}`}>
                  <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{category.name}</h2>
                </Link>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Popular in {category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((subcat, index) => (
                      <Link 
                        key={index} 
                        to={`/category/${category.id}?subcategory=${encodeURIComponent(subcat)}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <span className="inline-flex items-center">
                          {subcat}
                          <ChevronRight className="h-3 w-3 ml-0.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  asChild
                >
                  <Link to={`/category/${category.id}`}>
                    View All {category.name}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StoreLayout>
  );
};

export default Categories;
