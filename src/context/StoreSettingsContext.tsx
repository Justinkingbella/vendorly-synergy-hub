
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define all the types for our store settings
interface StoreInfo {
  storeName: string;
  storeDescription: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
  };
  logo: string;
  favicon: string;
}

interface BannerInfo {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  position: 'left' | 'center' | 'right';
  isActive: boolean;
}

interface FeatureInfo {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface NavLink {
  id: string;
  text: string;
  url: string;
  isActive: boolean;
}

interface FooterColumn {
  id: string;
  title: string;
  links: {
    id: string;
    text: string;
    url: string;
  }[];
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  showSocialIcons: boolean;
  enableNewsletterSignup: boolean;
}

interface PageContent {
  title: string;
  subtitle: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  bannerImage: string;
  isActive: boolean;
}

interface StorePages {
  about: PageContent;
  contact: PageContent;
  terms: PageContent;
  privacy: PageContent;
  faqs: PageContent;
  shipping: PageContent;
  vendor: PageContent;
  [key: string]: PageContent;
}

interface MarketingBanner {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  buttonLink: string;
  buttonColor: string;
  position: 'top' | 'bottom';
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface ThemeSettings {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  customCss: string;
}

interface CopyrightSettings {
  text: string;
  showYear: boolean;
  companyName: string;
  rightsText: string;
}

interface StoreSettingsContextType {
  storeInfo: StoreInfo;
  banners: BannerInfo[];
  features: FeatureInfo[];
  navLinks: NavLink[];
  footerColumns: FooterColumn[];
  contactInfo: ContactInfo;
  pages: StorePages;
  marketingBanners: MarketingBanner[];
  themeSettings: ThemeSettings;
  copyrightSettings: CopyrightSettings;
  updateStoreInfo: (info: Partial<StoreInfo>) => void;
  updateBanners: (banners: BannerInfo[]) => void;
  updateFeatures: (features: FeatureInfo[]) => void;
  updateNavLinks: (links: NavLink[]) => void;
  updateFooterColumns: (columns: FooterColumn[]) => void;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  updatePage: (pageId: string, content: Partial<PageContent>) => void;
  updateMarketingBanners: (banners: MarketingBanner[]) => void;
  addMarketingBanner: (banner: MarketingBanner) => void;
  removeMarketingBanner: (id: string) => void;
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void;
  updateCopyrightSettings: (settings: Partial<CopyrightSettings>) => void;
  getActiveBanners: () => BannerInfo[];
  getActiveMarketingBanners: () => MarketingBanner[];
  getActiveNavLinks: () => NavLink[];
}

// Default values for our context
const defaultStoreInfo: StoreInfo = {
  storeName: 'MarketHub',
  storeDescription: 'Multi-vendor marketplace for all your shopping needs across Namibia.',
  storeEmail: 'info@markethub.na',
  storePhone: '+264 61 123 4567',
  storeAddress: '123 Independence Ave, Windhoek, Namibia',
  socialLinks: {
    facebook: 'https://facebook.com/markethub',
    twitter: 'https://twitter.com/markethub',
    instagram: 'https://instagram.com/markethub',
    youtube: 'https://youtube.com/markethub',
  },
  logo: '/logo.png',
  favicon: '/favicon.ico',
};

const defaultBanners: BannerInfo[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=400&fit=crop',
    title: 'Welcome to MarketHub',
    subtitle: 'Shop the biggest selection of products from verified vendors',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    position: 'center',
    isActive: true,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=400&fit=crop',
    title: 'Exclusive Tech Deals',
    subtitle: 'Get the latest gadgets at unbeatable prices',
    buttonText: 'View Deals',
    buttonLink: '/deals',
    position: 'right',
    isActive: true,
  }
];

const defaultFeatures: FeatureInfo[] = [
  {
    id: '1',
    icon: 'Truck',
    title: 'Fast Delivery',
    description: 'Free delivery on orders over N$1000',
  },
  {
    id: '2',
    icon: 'RefreshCw',
    title: 'Easy Returns',
    description: '30 days return policy',
  },
  {
    id: '3',
    icon: 'ShieldCheck',
    title: 'Secure Payments',
    description: '100% secure checkout',
  },
  {
    id: '4',
    icon: 'HeadphonesIcon',
    title: '24/7 Support',
    description: 'Customer support available all day',
  }
];

const defaultNavLinks: NavLink[] = [
  { id: '1', text: 'Home', url: '/', isActive: true },
  { id: '2', text: 'Products', url: '/products', isActive: true },
  { id: '3', text: 'Categories', url: '/categories', isActive: true },
  { id: '4', text: 'Vendors', url: '/vendors', isActive: true },
  { id: '5', text: 'Deals', url: '/deals', isActive: true },
];

const defaultFooterColumns: FooterColumn[] = [
  { 
    id: '1', 
    title: 'Quick Links', 
    links: [
      { id: '1-1', text: 'About Us', url: '/about' },
      { id: '1-2', text: 'Contact Us', url: '/contact' },
      { id: '1-3', text: 'Terms & Conditions', url: '/terms' },
      { id: '1-4', text: 'Privacy Policy', url: '/privacy' },
      { id: '1-5', text: 'FAQs', url: '/faqs' },
    ] 
  },
  { 
    id: '2', 
    title: 'My Account', 
    links: [
      { id: '2-1', text: 'Sign In / Register', url: '/auth' },
      { id: '2-2', text: 'My Dashboard', url: '/customer/dashboard' },
      { id: '2-3', text: 'Order History', url: '/customer/orders' },
      { id: '2-4', text: 'Wishlist', url: '/customer/wishlist' },
      { id: '2-5', text: 'Become a Vendor', url: '/become-vendor' },
    ] 
  },
];

const defaultContactInfo: ContactInfo = {
  email: 'support@markethub.na',
  phone: '+264 61 123 4567',
  address: '123 Independence Ave, Windhoek, Namibia',
  showSocialIcons: true,
  enableNewsletterSignup: true
};

const defaultPages: StorePages = {
  about: {
    title: "About MarketHub",
    subtitle: "Your trusted marketplace in Namibia",
    content: "<h2>Our Story</h2><p>MarketHub was founded in 2022 with a simple vision: to create a vibrant online marketplace that connects Namibian vendors with customers nationwide.</p><h2>Our Mission</h2><p>We strive to build a platform that empowers local businesses and provides customers with access to quality products from verified vendors.</p><h2>Our Team</h2><p>Our dedicated team works tirelessly to ensure that MarketHub provides the best possible experience for both vendors and customers.</p>",
    seoTitle: "About MarketHub - Multi-vendor Marketplace in Namibia",
    seoDescription: "Learn about MarketHub, Namibia's premier multi-vendor marketplace connecting customers with verified vendors across the country.",
    bannerImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop",
    isActive: true
  },
  contact: {
    title: "Contact Us",
    subtitle: "We're here to help",
    content: "<h2>Get in Touch</h2><p>Have questions or feedback? We'd love to hear from you. Contact our team using the information below.</p><h2>Customer Support</h2><p>Email: support@markethub.na</p><p>Phone: +264 61 123 4567</p><p>Hours: Monday-Friday, 8AM-5PM</p><h2>Visit Our Office</h2><p>123 Independence Avenue<br>Windhoek, Namibia</p>",
    seoTitle: "Contact MarketHub - Get in Touch With Our Team",
    seoDescription: "Contact MarketHub's customer support team for assistance with orders, vendor inquiries, or general questions about our marketplace.",
    bannerImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=400&fit=crop",
    isActive: true
  },
  terms: {
    title: "Terms & Conditions",
    subtitle: "Our terms of service",
    content: "<h2>1. Introduction</h2><p>By using MarketHub, you agree to these Terms and Conditions. Please read them carefully.</p><h2>2. User Accounts</h2><p>When you create an account with us, you must provide accurate information. You are responsible for maintaining the security of your account.</p><h2>3. Products & Services</h2><p>MarketHub is a platform where vendors can sell their products. We are not responsible for the quality of products sold by vendors.</p>",
    seoTitle: "Terms and Conditions | MarketHub",
    seoDescription: "Read MarketHub's terms and conditions regarding user accounts, purchases, vendor policies, and platform usage guidelines.",
    bannerImage: "",
    isActive: true
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "How we handle your data",
    content: "<h2>1. Information We Collect</h2><p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer support.</p><h2>2. How We Use Information</h2><p>We use your information to process orders, provide customer support, and improve our services.</p><h2>3. Information Sharing</h2><p>We share your information with vendors when you make a purchase. We do not sell your personal information to third parties.</p>",
    seoTitle: "Privacy Policy | MarketHub",
    seoDescription: "Learn about how MarketHub collects, uses, and protects your personal information when you use our marketplace.",
    bannerImage: "",
    isActive: true
  },
  faqs: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions",
    content: "<h2>General Questions</h2><h3>What is MarketHub?</h3><p>MarketHub is a multi-vendor marketplace where customers can shop from various verified vendors in Namibia.</p><h3>How do I create an account?</h3><p>Click on the 'Sign In / Register' button in the top right corner of the page and follow the registration instructions.</p><h2>Orders & Shipping</h2><h3>How do I track my order?</h3><p>You can track your order by logging into your account and visiting the 'My Orders' section.</p>",
    seoTitle: "Frequently Asked Questions | MarketHub",
    seoDescription: "Find answers to common questions about shopping on MarketHub, vendor policies, shipping, returns, and account management.",
    bannerImage: "",
    isActive: true
  },
  shipping: {
    title: "Shipping Policy",
    subtitle: "Delivery information for your orders",
    content: "<h2>Shipping Methods</h2><p>We offer standard and express shipping options for all orders. Delivery times may vary depending on your location and the vendor.</p><h2>Shipping Costs</h2><p>Shipping costs are calculated based on the weight, dimensions, and destination of your order. Free shipping is available for orders over N$1000.</p><h2>Tracking</h2><p>Once your order is shipped, you will receive a tracking number via email.</p>",
    seoTitle: "Shipping Policy | MarketHub",
    seoDescription: "Learn about MarketHub's shipping methods, costs, delivery times, and tracking information for orders placed on our platform.",
    bannerImage: "",
    isActive: true
  },
  vendor: {
    title: "Become a Vendor",
    subtitle: "Start selling on MarketHub",
    content: "<h2>Why Sell on MarketHub?</h2><p>Join Namibia's growing marketplace and reach thousands of customers nationwide. Our platform provides all the tools you need to start and grow your online business.</p><h2>How It Works</h2><p>1. Register as a vendor<br>2. Set up your store profile<br>3. List your products<br>4. Start selling and earning</p><h2>Pricing & Fees</h2><p>We offer competitive commission rates and subscription plans to suit businesses of all sizes.</p>",
    seoTitle: "Become a Vendor on MarketHub | Start Selling Online",
    seoDescription: "Join MarketHub as a vendor and start selling your products to customers across Namibia. Learn about our vendor program, fees, and benefits.",
    bannerImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop",
    isActive: true
  }
};

const defaultMarketingBanners: MarketingBanner[] = [
  {
    id: '1',
    title: 'Special Offer',
    content: 'Get 10% off your first order with code WELCOME10',
    backgroundColor: '#f0f9ff',
    textColor: '#0369a1',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    buttonColor: '#0284c7',
    position: 'top',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    isActive: true
  },
  {
    id: '2',
    title: 'Free Shipping',
    content: 'Enjoy free shipping on all orders over N$1000',
    backgroundColor: '#f0fdf4',
    textColor: '#166534',
    buttonText: 'Learn More',
    buttonLink: '/shipping',
    buttonColor: '#16a34a',
    position: 'bottom',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    isActive: false
  }
];

const defaultThemeSettings: ThemeSettings = {
  mode: 'light',
  primaryColor: '#1a6d40', // Deep green
  secondaryColor: '#e6f4ea', // Light green
  accentColor: '#3b82f6',
  fontFamily: 'Inter, sans-serif',
  borderRadius: '0.5rem',
  customCss: ''
};

const defaultCopyrightSettings: CopyrightSettings = {
  text: 'All rights reserved.',
  showYear: true,
  companyName: 'MarketHub',
  rightsText: 'All rights reserved.'
};

// Create the context
const StoreSettingsContext = createContext<StoreSettingsContextType | undefined>(undefined);

// Provider component
export const StoreSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(defaultStoreInfo);
  const [banners, setBanners] = useState<BannerInfo[]>(defaultBanners);
  const [features, setFeatures] = useState<FeatureInfo[]>(defaultFeatures);
  const [navLinks, setNavLinks] = useState<NavLink[]>(defaultNavLinks);
  const [footerColumns, setFooterColumns] = useState<FooterColumn[]>(defaultFooterColumns);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [pages, setPages] = useState<StorePages>(defaultPages);
  const [marketingBanners, setMarketingBanners] = useState<MarketingBanner[]>(defaultMarketingBanners);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(defaultThemeSettings);
  const [copyrightSettings, setCopyrightSettings] = useState<CopyrightSettings>(defaultCopyrightSettings);

  // Load settings from localStorage if available
  useEffect(() => {
    try {
      const savedStoreInfo = localStorage.getItem('storeInfo');
      if (savedStoreInfo) setStoreInfo(JSON.parse(savedStoreInfo));
      
      const savedBanners = localStorage.getItem('banners');
      if (savedBanners) setBanners(JSON.parse(savedBanners));
      
      const savedFeatures = localStorage.getItem('features');
      if (savedFeatures) setFeatures(JSON.parse(savedFeatures));
      
      const savedNavLinks = localStorage.getItem('navLinks');
      if (savedNavLinks) setNavLinks(JSON.parse(savedNavLinks));
      
      const savedFooterColumns = localStorage.getItem('footerColumns');
      if (savedFooterColumns) setFooterColumns(JSON.parse(savedFooterColumns));
      
      const savedContactInfo = localStorage.getItem('contactInfo');
      if (savedContactInfo) setContactInfo(JSON.parse(savedContactInfo));
      
      const savedPages = localStorage.getItem('pages');
      if (savedPages) setPages(JSON.parse(savedPages));
      
      const savedMarketingBanners = localStorage.getItem('marketingBanners');
      if (savedMarketingBanners) setMarketingBanners(JSON.parse(savedMarketingBanners));
      
      const savedThemeSettings = localStorage.getItem('themeSettings');
      if (savedThemeSettings) setThemeSettings(JSON.parse(savedThemeSettings));
      
      const savedCopyrightSettings = localStorage.getItem('copyrightSettings');
      if (savedCopyrightSettings) setCopyrightSettings(JSON.parse(savedCopyrightSettings));
    } catch (error) {
      console.error("Error loading store settings from localStorage:", error);
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('storeInfo', JSON.stringify(storeInfo));
      localStorage.setItem('banners', JSON.stringify(banners));
      localStorage.setItem('features', JSON.stringify(features));
      localStorage.setItem('navLinks', JSON.stringify(navLinks));
      localStorage.setItem('footerColumns', JSON.stringify(footerColumns));
      localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
      localStorage.setItem('pages', JSON.stringify(pages));
      localStorage.setItem('marketingBanners', JSON.stringify(marketingBanners));
      localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
      localStorage.setItem('copyrightSettings', JSON.stringify(copyrightSettings));
    } catch (error) {
      console.error("Error saving store settings to localStorage:", error);
    }
  }, [
    storeInfo, 
    banners, 
    features, 
    navLinks, 
    footerColumns, 
    contactInfo, 
    pages,
    marketingBanners,
    themeSettings,
    copyrightSettings
  ]);

  // Update functions
  const updateStoreInfo = (info: Partial<StoreInfo>) => {
    setStoreInfo(current => ({ ...current, ...info }));
  };

  const updateBanners = (newBanners: BannerInfo[]) => {
    setBanners(newBanners);
  };

  const updateFeatures = (newFeatures: FeatureInfo[]) => {
    setFeatures(newFeatures);
  };

  const updateNavLinks = (links: NavLink[]) => {
    setNavLinks(links);
  };

  const updateFooterColumns = (columns: FooterColumn[]) => {
    setFooterColumns(columns);
  };

  const updateContactInfo = (info: Partial<ContactInfo>) => {
    setContactInfo(current => ({ ...current, ...info }));
  };

  const updatePage = (pageId: string, content: Partial<PageContent>) => {
    setPages(current => ({
      ...current,
      [pageId]: { ...current[pageId], ...content }
    }));
  };

  const updateMarketingBanners = (newBanners: MarketingBanner[]) => {
    setMarketingBanners(newBanners);
  };

  const addMarketingBanner = (banner: MarketingBanner) => {
    setMarketingBanners(current => [...current, banner]);
  };

  const removeMarketingBanner = (id: string) => {
    setMarketingBanners(current => current.filter(banner => banner.id !== id));
  };

  const updateThemeSettings = (settings: Partial<ThemeSettings>) => {
    setThemeSettings(current => ({ ...current, ...settings }));
  };

  const updateCopyrightSettings = (settings: Partial<CopyrightSettings>) => {
    setCopyrightSettings(current => ({ ...current, ...settings }));
  };

  // Helper functions to get active items
  const getActiveBanners = () => {
    return banners.filter(banner => banner.isActive);
  };

  const getActiveMarketingBanners = () => {
    const today = new Date();
    return marketingBanners.filter(banner => {
      const startDate = new Date(banner.startDate);
      const endDate = new Date(banner.endDate);
      return banner.isActive && today >= startDate && today <= endDate;
    });
  };

  const getActiveNavLinks = () => {
    return navLinks.filter(link => link.isActive);
  };

  return (
    <StoreSettingsContext.Provider
      value={{
        storeInfo,
        banners,
        features,
        navLinks,
        footerColumns,
        contactInfo,
        pages,
        marketingBanners,
        themeSettings,
        copyrightSettings,
        updateStoreInfo,
        updateBanners,
        updateFeatures,
        updateNavLinks,
        updateFooterColumns,
        updateContactInfo,
        updatePage,
        updateMarketingBanners,
        addMarketingBanner,
        removeMarketingBanner,
        updateThemeSettings,
        updateCopyrightSettings,
        getActiveBanners,
        getActiveMarketingBanners,
        getActiveNavLinks,
      }}
    >
      {children}
    </StoreSettingsContext.Provider>
  );
};

// Hook to use the context
export const useStoreSettings = () => {
  const context = useContext(StoreSettingsContext);
  if (context === undefined) {
    throw new Error('useStoreSettings must be used within a StoreSettingsProvider');
  }
  return context;
};
