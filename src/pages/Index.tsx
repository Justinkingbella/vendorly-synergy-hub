
import React from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import HeroSection from '@/components/home/HeroSection';
import CategoryDisplay from '@/components/home/CategoryDisplay';
import ProductCarousel from '@/components/home/ProductCarousel';
import FeaturedVendors from '@/components/home/FeaturedVendors';
import SpecialDeals from '@/components/home/SpecialDeals';
import BenefitsSection from '@/components/home/BenefitsSection';

export default function Index() {
  return (
    <StoreLayout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Categories Section */}
      <CategoryDisplay 
        title="Shop by Category" 
        subtitle="Find what you're looking for by category"
      />
      
      {/* Featured Products Section */}
      <ProductCarousel 
        title="Featured Products"
        subtitle="Our selection of top products"
        featured={true}
      />
      
      {/* Special Deals Section */}
      <SpecialDeals />
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Featured Vendors Section */}
      <FeaturedVendors 
        title="Our Top Vendors"
        subtitle="Quality products from trusted sellers"
      />
    </StoreLayout>
  );
}
