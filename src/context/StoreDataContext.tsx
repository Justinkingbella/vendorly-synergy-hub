
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our store data
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  vendor: string;
  stock: number;
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  rating: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'vendor' | 'customer';
}

interface StoreData {
  products: Product[];
  categories: Category[];
  vendors: Vendor[];
  users: User[];
}

interface StoreDataContextType {
  data: StoreData;
  updateProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, updatedCategory: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  updateVendors: (vendors: Vendor[]) => void;
  addVendor: (vendor: Vendor) => void;
  updateVendor: (id: string, updatedVendor: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
  updateUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updatedUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

// Sample initial data
const initialData: StoreData = {
  products: [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      description: 'High-quality wireless headphones with noise cancellation.',
      image: 'https://via.placeholder.com/400',
      category: '1',
      vendor: '1',
      stock: 50,
      featured: true,
    },
    {
      id: '2',
      name: 'Smartphone XL Pro',
      price: 899.99,
      description: 'Latest smartphone with advanced camera and long battery life.',
      image: 'https://via.placeholder.com/400',
      category: '1',
      vendor: '2',
      stock: 25,
      featured: true,
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      price: 29.99,
      description: 'Comfortable t-shirt made from 100% organic cotton.',
      image: 'https://via.placeholder.com/400',
      category: '2',
      vendor: '3',
      stock: 100,
      featured: false,
    },
  ],
  categories: [
    {
      id: '1',
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      image: 'https://via.placeholder.com/400',
    },
    {
      id: '2',
      name: 'Clothing',
      description: 'Apparel and fashion items',
      image: 'https://via.placeholder.com/400',
    },
    {
      id: '3',
      name: 'Home & Kitchen',
      description: 'Products for your home and kitchen',
      image: 'https://via.placeholder.com/400',
    },
  ],
  vendors: [
    {
      id: '1',
      name: 'Tech Solutions Inc.',
      description: 'Quality electronic products at affordable prices',
      logo: 'https://via.placeholder.com/100',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Mobile Masters',
      description: 'Smartphones and accessories from leading brands',
      logo: 'https://via.placeholder.com/100',
      rating: 4.5,
    },
    {
      id: '3',
      name: 'EcoFashion',
      description: 'Sustainable and eco-friendly clothing',
      logo: 'https://via.placeholder.com/100',
      rating: 4.9,
    },
  ],
  users: [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    },
    {
      id: '2',
      name: 'Vendor User',
      email: 'vendor@example.com',
      role: 'vendor',
    },
    {
      id: '3',
      name: 'Customer User',
      email: 'customer@example.com',
      role: 'customer',
    },
  ],
};

// Create the context
const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

// Provider component
export const StoreDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StoreData>(() => {
    const savedData = localStorage.getItem('store-data');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('store-data', JSON.stringify(data));
  }, [data]);

  // Products CRUD
  const updateProducts = (products: Product[]) => {
    setData(prev => ({ ...prev, products }));
  };

  const addProduct = (product: Product) => {
    setData(prev => ({
      ...prev,
      products: [...prev.products, product],
    }));
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(product => 
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    }));
  };

  const deleteProduct = (id: string) => {
    setData(prev => ({
      ...prev,
      products: prev.products.filter(product => product.id !== id),
    }));
  };

  // Categories CRUD
  const updateCategories = (categories: Category[]) => {
    setData(prev => ({ ...prev, categories }));
  };

  const addCategory = (category: Category) => {
    setData(prev => ({
      ...prev,
      categories: [...prev.categories, category],
    }));
  };

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setData(prev => ({
      ...prev,
      categories: prev.categories.map(category => 
        category.id === id ? { ...category, ...updatedCategory } : category
      ),
    }));
  };

  const deleteCategory = (id: string) => {
    setData(prev => ({
      ...prev,
      categories: prev.categories.filter(category => category.id !== id),
    }));
  };

  // Vendors CRUD
  const updateVendors = (vendors: Vendor[]) => {
    setData(prev => ({ ...prev, vendors }));
  };

  const addVendor = (vendor: Vendor) => {
    setData(prev => ({
      ...prev,
      vendors: [...prev.vendors, vendor],
    }));
  };

  const updateVendor = (id: string, updatedVendor: Partial<Vendor>) => {
    setData(prev => ({
      ...prev,
      vendors: prev.vendors.map(vendor => 
        vendor.id === id ? { ...vendor, ...updatedVendor } : vendor
      ),
    }));
  };

  const deleteVendor = (id: string) => {
    setData(prev => ({
      ...prev,
      vendors: prev.vendors.filter(vendor => vendor.id !== id),
    }));
  };

  // Users CRUD
  const updateUsers = (users: User[]) => {
    setData(prev => ({ ...prev, users }));
  };

  const addUser = (user: User) => {
    setData(prev => ({
      ...prev,
      users: [...prev.users, user],
    }));
  };

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setData(prev => ({
      ...prev,
      users: prev.users.map(user => 
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    }));
  };

  const deleteUser = (id: string) => {
    setData(prev => ({
      ...prev,
      users: prev.users.filter(user => user.id !== id),
    }));
  };

  return (
    <StoreDataContext.Provider
      value={{
        data,
        updateProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        updateCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        updateVendors,
        addVendor,
        updateVendor,
        deleteVendor,
        updateUsers,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </StoreDataContext.Provider>
  );
};

// Hook for using the context
export const useStoreData = () => {
  const context = useContext(StoreDataContext);
  if (context === undefined) {
    throw new Error('useStoreData must be used within a StoreDataProvider');
  }
  return context;
};
