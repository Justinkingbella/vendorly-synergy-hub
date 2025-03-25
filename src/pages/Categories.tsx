import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categoriesData = [
    {
      id: 1,
      name: 'Electronics',
      imageUrl: 'https://placehold.co/600x400?text=Electronics',
      description: 'Explore the latest gadgets and electronics.',
    },
    {
      id: 2,
      name: 'Fashion',
      imageUrl: 'https://placehold.co/600x400?text=Fashion',
      description: 'Stay trendy with our fashion collection.',
    },
    {
      id: 3,
      name: 'Home & Garden',
      imageUrl: 'https://placehold.co/600x400?text=Home+%26+Garden',
      description: 'Create your dream home with our wide range of products.',
    },
    {
      id: 4,
      name: 'Beauty',
      imageUrl: 'https://placehold.co/600x400?text=Beauty',
      description: 'Enhance your beauty with our premium beauty products.',
    },
    {
      id: 5,
      name: 'Sports',
      imageUrl: 'https://placehold.co/600x400?text=Sports',
      description: 'Get active with our sports and outdoor equipment.',
    },
    {
      id: 6,
      name: 'Toys',
      imageUrl: 'https://placehold.co/600x400?text=Toys',
      description: 'Find the perfect toys for kids of all ages.',
    },
  ];

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`} className="block">
              <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-70 text-white p-4">
                  <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                  <p className="text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </StoreLayout>
  );
};

export default Categories;
