
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Product Details</h1>
        <p className="text-muted-foreground">Viewing product ID: {id}</p>
      </div>
    </div>
  );
}
