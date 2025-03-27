
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { Megaphone, Plus, Trash2, Edit, Eye, EyeOff } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const AppEditorMarketing = () => {
  const { toast } = useToast();
  const { marketingBanners, updateMarketingBanners, addMarketingBanner, removeMarketingBanner } = useStoreSettings();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    content: '',
    backgroundColor: '#f0f9ff',
    textColor: '#0369a1',
    buttonText: '',
    buttonLink: '',
    buttonColor: '#0284c7',
    position: 'top' as 'top' | 'bottom', // Explicitly type as union type
    startDate: '',
    endDate: '',
    isActive: true
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    // Validate position value before setting it
    if (name === 'position' && (value === 'top' || value === 'bottom')) {
      setFormData(prev => ({ ...prev, [name]: value as 'top' | 'bottom' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      content: '',
      backgroundColor: '#f0f9ff',
      textColor: '#0369a1',
      buttonText: '',
      buttonLink: '',
      buttonColor: '#0284c7',
      position: 'top' as 'top' | 'bottom',
      startDate: '',
      endDate: '',
      isActive: true
    });
    setEditingBanner(null);
  };
  
  const handleAddNewBanner = () => {
    setIsDialogOpen(true);
    resetForm();
  };
  
  const handleEditBanner = (banner: any) => {
    setEditingBanner(banner);
    setFormData({
      ...banner,
      startDate: banner.startDate.split('T')[0],
      endDate: banner.endDate.split('T')[0]
    });
    setIsDialogOpen(true);
  };
  
  const handleToggleActive = (bannerId: string, currentStatus: boolean) => {
    const updatedBanners = marketingBanners.map(banner => 
      banner.id === bannerId ? { ...banner, isActive: !currentStatus } : banner
    );
    updateMarketingBanners(updatedBanners);
    toast({
      title: "Banner updated",
      description: `Banner ${currentStatus ? 'deactivated' : 'activated'} successfully.`,
    });
  };
  
  const handleDeleteBanner = (bannerId: string) => {
    removeMarketingBanner(bannerId);
    toast({
      title: "Banner deleted",
      description: "The marketing banner has been deleted.",
    });
  };
  
  const handleSaveBanner = () => {
    // Validate required fields
    if (!formData.title || !formData.content || !formData.startDate || !formData.endDate) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (editingBanner) {
      // Update existing banner
      const updatedBanners = marketingBanners.map(banner => 
        banner.id === editingBanner.id ? { ...formData, id: editingBanner.id } : banner
      );
      updateMarketingBanners(updatedBanners);
      toast({
        title: "Banner updated",
        description: "The marketing banner has been updated successfully.",
      });
    } else {
      // Add new banner
      const newBanner = {
        ...formData,
        id: Date.now().toString()
      };
      addMarketingBanner(newBanner);
      toast({
        title: "Banner created",
        description: "The new marketing banner has been created successfully.",
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Marketing Banners</CardTitle>
          <CardDescription>
            Create and manage promotional banners for your store
          </CardDescription>
        </div>
        <Button onClick={handleAddNewBanner}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Banner
        </Button>
      </CardHeader>
      <CardContent>
        {marketingBanners.length === 0 ? (
          <div className="text-center py-12">
            <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No marketing banners</h3>
            <p className="text-muted-foreground mb-4">
              Create your first marketing banner to promote special offers or announcements.
            </p>
            <Button onClick={handleAddNewBanner}>
              <Plus className="h-4 w-4 mr-2" />
              Create Banner
            </Button>
          </div>
        ) : (
          <Table>
            <TableCaption>List of promotional banners for your store</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketingBanners.map((banner) => {
                const startDate = new Date(banner.startDate);
                const endDate = new Date(banner.endDate);
                const isExpired = new Date() > endDate;
                const isFuture = new Date() < startDate;
                
                return (
                  <TableRow key={banner.id}>
                    <TableCell className="font-medium">{banner.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {banner.position}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(banner.startDate).toLocaleDateString()} - {new Date(banner.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {isExpired ? (
                        <Badge variant="secondary">Expired</Badge>
                      ) : isFuture ? (
                        <Badge variant="outline">Scheduled</Badge>
                      ) : banner.isActive ? (
                        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleActive(banner.id, banner.isActive)}
                        >
                          {banner.isActive ? 
                            <EyeOff className="h-4 w-4" /> : 
                            <Eye className="h-4 w-4" />
                          }
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditBanner(banner)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteBanner(banner.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
      
      {/* Banner Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingBanner ? 'Edit Marketing Banner' : 'Create Marketing Banner'}
            </DialogTitle>
            <DialogDescription>
              {editingBanner 
                ? 'Update the details of your marketing banner' 
                : 'Add a new marketing banner to promote special offers or announcements'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Banner Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Special Offer"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select 
                  value={formData.position} 
                  onValueChange={(value) => handleSelectChange('position', value)}
                >
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Top of Page</SelectItem>
                    <SelectItem value="bottom">Bottom of Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Banner Content</Label>
              <Textarea 
                id="content" 
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Get 10% off your first order with code WELCOME10"
                rows={2}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate" 
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex space-x-2">
                  <div 
                    className="w-10 h-10 rounded border" 
                    style={{ backgroundColor: formData.backgroundColor }} 
                  />
                  <Input 
                    id="backgroundColor" 
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex space-x-2">
                  <div 
                    className="w-10 h-10 rounded border" 
                    style={{ backgroundColor: formData.textColor }} 
                  />
                  <Input 
                    id="textColor" 
                    name="textColor"
                    value={formData.textColor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buttonColor">Button Color</Label>
                <div className="flex space-x-2">
                  <div 
                    className="w-10 h-10 rounded border" 
                    style={{ backgroundColor: formData.buttonColor }} 
                  />
                  <Input 
                    id="buttonColor" 
                    name="buttonColor"
                    value={formData.buttonColor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input 
                  id="buttonText" 
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleInputChange}
                  placeholder="Shop Now"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buttonLink">Button Link</Label>
                <Input 
                  id="buttonLink" 
                  name="buttonLink"
                  value={formData.buttonLink}
                  onChange={handleInputChange}
                  placeholder="/products"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="isActive" 
                checked={formData.isActive}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBanner}>
              {editingBanner ? 'Save Changes' : 'Create Banner'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AppEditorMarketing;
