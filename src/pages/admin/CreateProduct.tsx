
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { ImagePlus, Plus, X } from 'lucide-react';

// Mock data
const mockCategories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Home & Kitchen' },
  { id: 4, name: 'Books' },
  { id: 5, name: 'Toys & Games' },
];

const mockVendors = [
  { id: 1, name: 'Premium Electronics' },
  { id: 2, name: 'Fashion Hub' },
  { id: 3, name: 'Kitchen Kings' },
  { id: 4, name: 'Book Corner' },
  { id: 5, name: 'Fun Toys' },
];

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    salePrice: '',
    cost: '',
    sku: '',
    stock: '',
    categoryId: '',
    vendorId: '',
    featured: false,
    published: true,
    images: [] as string[],
    specifications: [{ key: '', value: '' }],
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    // Auto-generate slug
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    setProduct({ ...product, name, slug });
  };

  const handleAddSpecification = () => {
    setProduct({
      ...product,
      specifications: [...product.specifications, { key: '', value: '' }]
    });
  };

  const handleRemoveSpecification = (index: number) => {
    const updatedSpecs = [...product.specifications];
    updatedSpecs.splice(index, 1);
    setProduct({
      ...product,
      specifications: updatedSpecs
    });
  };

  const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
    const updatedSpecs = [...product.specifications];
    updatedSpecs[index][field] = value;
    setProduct({
      ...product,
      specifications: updatedSpecs
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleAddImage = () => {
    if (imagePreview) {
      setProduct({
        ...product,
        images: [...product.images, imagePreview]
      });
      setImagePreview(null);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    setProduct({
      ...product,
      images: updatedImages
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would make an API call here
    console.log('Submitting product:', product);
    
    toast({
      title: "Product Created",
      description: `${product.name} has been created successfully.`,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Create Product</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>Basic product details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={product.name}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={product.slug}
                      onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be used in the URL: /product/{product.slug || 'example'}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={product.description}
                      onChange={(e) => setProduct({ ...product, description: e.target.value })}
                      required
                      className="min-h-[120px]"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Regular Price (N$)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="salePrice">Sale Price (N$)</Label>
                      <Input
                        id="salePrice"
                        type="number"
                        value={product.salePrice}
                        onChange={(e) => setProduct({ ...product, salePrice: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cost">Cost (N$)</Label>
                      <Input
                        id="cost"
                        type="number"
                        value={product.cost}
                        onChange={(e) => setProduct({ ...product, cost: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU</Label>
                      <Input
                        id="sku"
                        value={product.sku}
                        onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={product.stock}
                        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                  <CardDescription>Add product specifications and details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="Specification name"
                        value={spec.key}
                        onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                      />
                      <Input
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSpecification(index)}
                        disabled={product.specifications.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddSpecification}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Specification
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={product.categoryId} 
                      onValueChange={(value) => setProduct({ ...product, categoryId: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor</Label>
                    <Select 
                      value={product.vendorId} 
                      onValueChange={(value) => setProduct({ ...product, vendorId: value })}
                    >
                      <SelectTrigger id="vendor">
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockVendors.map((vendor) => (
                          <SelectItem key={vendor.id} value={vendor.id.toString()}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="published">Published</Label>
                    <Switch
                      id="published"
                      checked={product.published}
                      onCheckedChange={(checked) => setProduct({ ...product, published: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Product</Label>
                    <Switch
                      id="featured"
                      checked={product.featured}
                      onCheckedChange={(checked) => setProduct({ ...product, featured: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {product.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image} 
                          alt={`Product ${index}`} 
                          className="h-24 w-full object-cover rounded-md border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Upload Image</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddImage}
                        disabled={!imagePreview}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {imagePreview && (
                      <div className="mt-2">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="h-32 object-contain rounded-md border"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button type="submit">Create Product</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateProduct;
