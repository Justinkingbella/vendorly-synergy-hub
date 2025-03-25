import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <h2>Product Detail Page</h2>
        <p>Product ID: {id}</p>
      </div>
    </StoreLayout>
  );
};

export default ProductDetail;
