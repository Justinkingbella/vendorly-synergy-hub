
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

// Mock data for categories
const mockCategories = [
  { id: 1, name: 'Electronics', slug: 'electronics', productCount: 42 },
  { id: 2, name: 'Clothing', slug: 'clothing', productCount: 67 },
  { id: 3, name: 'Home & Kitchen', slug: 'home-kitchen', productCount: 35 },
  { id: 4, name: 'Books', slug: 'books', productCount: 19 },
  { id: 5, name: 'Toys & Games', slug: 'toys-games', productCount: 28 },
];

type Category = {
  id: number;
  name: string;
  slug: string;
  productCount: number;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredCategories = categories.filter(
    category => category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    // In a real app, you would make an API call here
    const id = Math.max(...categories.map(c => c.id), 0) + 1;
    const newCategoryWithId = { ...newCategory, id, productCount: 0 };
    setCategories([...categories, newCategoryWithId]);
    setNewCategory({ name: '', slug: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Category Added",
      description: `${newCategory.name} has been added successfully.`,
    });
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;
    
    // In a real app, you would make an API call here
    const updatedCategories = categories.map(category => 
      category.id === editingCategory.id ? editingCategory : category
    );
    
    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Category Updated",
      description: `${editingCategory.name} has been updated successfully.`,
    });
  };

  const handleDeleteCategory = () => {
    if (!editingCategory) return;
    
    // In a real app, you would make an API call here
    const updatedCategories = categories.filter(category => category.id !== editingCategory.id);
    setCategories(updatedCategories);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Category Deleted",
      description: `${editingCategory.name} has been deleted successfully.`,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    // Auto-generate a slug from the name
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, name, slug });
    } else {
      setNewCategory({ ...newCategory, name, slug });
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, slug });
    } else {
      setNewCategory({ ...newCategory, slug });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Categories</h1>
          
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a new product category. The slug will be auto-generated.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input
                      id="name"
                      value={newCategory.name}
                      onChange={handleNameChange}
                      placeholder="e.g., Electronics"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={newCategory.slug}
                      onChange={handleSlugChange}
                      placeholder="e.g., electronics"
                    />
                    <p className="text-sm text-muted-foreground">
                      This will be used in the URL: /category/{newCategory.slug || 'example'}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCategory}>Add Category</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      No categories found. Create your first category.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {category.productCount} products
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog open={isEditDialogOpen && editingCategory?.id === category.id} onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) {
                            setEditingCategory(category);
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Category</DialogTitle>
                              <DialogDescription>
                                Make changes to the category details.
                              </DialogDescription>
                            </DialogHeader>
                            {editingCategory && (
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">Category Name</Label>
                                  <Input
                                    id="edit-name"
                                    value={editingCategory.name}
                                    onChange={handleNameChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-slug">Slug</Label>
                                  <Input
                                    id="edit-slug"
                                    value={editingCategory.slug}
                                    onChange={handleSlugChange}
                                  />
                                  <p className="text-sm text-muted-foreground">
                                    This will be used in the URL: /category/{editingCategory.slug}
                                  </p>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleUpdateCategory}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog open={isDeleteDialogOpen && editingCategory?.id === category.id} onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open);
                          if (open) {
                            setEditingCategory(category);
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Category</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this category? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            {editingCategory && (
                              <div className="py-4">
                                <p className="font-medium">{editingCategory.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  This category contains {editingCategory.productCount} products.
                                </p>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button variant="destructive" onClick={handleDeleteCategory}>
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Categories;
