
import React from 'react';
import { Link } from 'react-router-dom';
import StoreLayout from '@/components/layout/StoreLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Smartphones, laptops, cameras, audio equipment, and more electronic gadgets.",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=300",
    subcategories: ["Smartphones", "Laptops", "Cameras", "Audio", "Accessories"]
  },
  {
    id: 2,
    name: "Fashion",
    description: "Clothing, shoes, and accessories for men, women, and children.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=300",
    subcategories: ["Men's Wear", "Women's Wear", "Footwear", "Accessories", "Jewelry"]
  },
  {
    id: 3,
    name: "Home & Garden",
    description: "Furniture, decor, kitchenware, garden tools, and home improvement items.",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=300",
    subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Garden"]
  },
  {
    id: 4,
    name: "Beauty & Health",
    description: "Skincare, makeup, haircare, personal care, and wellness products.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=300",
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Personal Care"]
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    description: "Sporting goods, fitness equipment, camping gear, and outdoor activities.",
    image: "https://images.unsplash.com/photo-1530143311094-34d807799e8f?q=80&w=300",
    subcategories: ["Fitness", "Outdoor Recreation", "Team Sports", "Water Sports", "Camping"]
  },
  {
    id: 6,
    name: "Toys & Kids",
    description: "Toys, games, baby products, and children's items.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=300",
    subcategories: ["Toys", "Games", "Baby Products", "Children's Books", "School Supplies"]
  },
  {
    id: 7,
    name: "Books & Media",
    description: "Books, magazines, movies, music, and digital content.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300",
    subcategories: ["Fiction", "Non-Fiction", "E-Books", "Movies", "Music"]
  },
  {
    id: 8,
    name: "Food & Groceries",
    description: "Fresh food, packaged goods, beverages, and specialty foods.",
    image: "https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=300",
    subcategories: ["Fresh Produce", "Pantry Items", "Beverages", "Snacks", "Specialty Foods"]
  }
];

const Categories = () => {
  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Shop by Category</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our wide range of products organized by categories to find exactly what you're looking for.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {category.subcategories.map((subcat, index) => (
                    <Link 
                      key={index} 
                      to={`/category/${category.id}/subcategory/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-xs bg-muted px-2 py-1 rounded hover:bg-primary/10"
                    >
                      {subcat}
                    </Link>
                  ))}
                </div>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/category/${category.id}`}>
                    Browse {category.name}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Popular Subcategories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Smartphones", "Laptops", "Women's Fashion", "Men's Clothing", 
              "Home Decor", "Beauty Products", "Fitness Equipment", "Kitchen Appliances",
              "Toys", "Books", "Gaming", "Outdoor Gear"
            ].map((item, index) => (
              <Link 
                key={index} 
                to={`/search?q=${item.toLowerCase().replace(/\s+/g, '+')}`}
                className="bg-muted rounded-md p-4 text-center hover:bg-primary/10 transition-colors"
              >
                <span className="font-medium">{item}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

export default Categories;
