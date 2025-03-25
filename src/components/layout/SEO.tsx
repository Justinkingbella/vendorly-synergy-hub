
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'MarketHub - Multi-vendor Marketplace',
  description = 'Shop from thousands of vendors across Namibia on MarketHub.',
  keywords = 'marketplace, ecommerce, online shopping, multi-vendor',
  ogImage = '/logo.png',
  ogUrl,
  canonical,
}) => {
  // Append site name to title if title is provided
  const fullTitle = title !== 'MarketHub - Multi-vendor Marketplace' 
    ? `${title} | MarketHub` 
    : title;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      {ogImage && <meta property="twitter:image" content={ogImage} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default SEO;
