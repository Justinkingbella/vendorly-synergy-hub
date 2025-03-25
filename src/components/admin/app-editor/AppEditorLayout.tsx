
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Image, 
  Upload, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Edit
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const bannerSampleImages = [
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=400&fit=crop'
];

const AppEditorLayout = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");
  const [homeBanners, setHomeBanners] = useState([
    {
      id: '1',
      image: bannerSampleImages[0],
      title: 'Welcome to MarketHub',
      subtitle: 'Shop the biggest selection of products from verified vendors',
      buttonText: 'Shop Now',
      buttonLink: '/products',
      position: 'center',
    },
    {
      id: '2',
      image: bannerSampleImages[1],
      title: 'Exclusive Tech Deals',
      subtitle: 'Get the latest gadgets at unbeatable prices',
      buttonText: 'View Deals',
      buttonLink: '/deals',
      position: 'right',
    }
  ]);
  const [currentBanner, setCurrentBanner] = useState<any>(null);
  const [showBannerDialog, setShowBannerDialog] = useState(false);
  const [editingMode, setEditingMode] = useState(false);

  // Feature section
  const [features, setFeatures] = useState([
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
  ]);
  
  const [currentFeature, setCurrentFeature] = useState<any>(null);
  const [showFeatureDialog, setShowFeatureDialog] = useState(false);
  const [editingFeature, setEditingFeature] = useState(false);

  const addNewBanner = () => {
    setCurrentBanner({
      id: '',
      image: '',
      title: '',
      subtitle: '',
      buttonText: 'Shop Now',
      buttonLink: '/products',
      position: 'center',
    });
    setEditingMode(false);
    setShowBannerDialog(true);
  };

  const editBanner = (banner: any) => {
    setCurrentBanner(banner);
    setEditingMode(true);
    setShowBannerDialog(true);
  };

  const saveBanner = (banner: any) => {
    if (editingMode) {
      // Update existing banner
      setHomeBanners(homeBanners.map(b => b.id === banner.id ? banner : b));
    } else {
      // Add new banner
      setHomeBanners([...homeBanners, { ...banner, id: Date.now().toString() }]);
    }
    setShowBannerDialog(false);
    
    toast({
      title: editingMode ? "Banner updated" : "Banner added",
      description: editingMode ? 
        "The banner has been updated successfully." : 
        "A new banner has been added to your homepage.",
    });
  };

  const removeBanner = (id: string) => {
    setHomeBanners(homeBanners.filter(banner => banner.id !== id));
    toast({
      title: "Banner removed",
      description: "The banner has been removed from your homepage.",
    });
  };

  const moveBannerUp = (index: number) => {
    if (index === 0) return;
    const newBanners = [...homeBanners];
    [newBanners[index], newBanners[index - 1]] = [newBanners[index - 1], newBanners[index]];
    setHomeBanners(newBanners);
  };

  const moveBannerDown = (index: number) => {
    if (index === homeBanners.length - 1) return;
    const newBanners = [...homeBanners];
    [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
    setHomeBanners(newBanners);
  };

  // Feature methods
  const addNewFeature = () => {
    setCurrentFeature({
      id: '',
      icon: 'Star',
      title: '',
      description: '',
    });
    setEditingFeature(false);
    setShowFeatureDialog(true);
  };

  const editFeature = (feature: any) => {
    setCurrentFeature(feature);
    setEditingFeature(true);
    setShowFeatureDialog(true);
  };

  const saveFeature = (feature: any) => {
    if (editingFeature) {
      // Update existing feature
      setFeatures(features.map(f => f.id === feature.id ? feature : f));
    } else {
      // Add new feature
      setFeatures([...features, { ...feature, id: Date.now().toString() }]);
    }
    setShowFeatureDialog(false);
    
    toast({
      title: editingFeature ? "Feature updated" : "Feature added",
      description: editingFeature ? 
        "The feature has been updated successfully." : 
        "A new feature has been added to your homepage.",
    });
  };

  const removeFeature = (id: string) => {
    setFeatures(features.filter(feature => feature.id !== id));
    toast({
      title: "Feature removed",
      description: "The feature has been removed from your homepage.",
    });
  };

  const moveFeatureUp = (index: number) => {
    if (index === 0) return;
    const newFeatures = [...features];
    [newFeatures[index], newFeatures[index - 1]] = [newFeatures[index - 1], newFeatures[index]];
    setFeatures(newFeatures);
  };

  const moveFeatureDown = (index: number) => {
    if (index === features.length - 1) return;
    const newFeatures = [...features];
    [newFeatures[index], newFeatures[index + 1]] = [newFeatures[index + 1], newFeatures[index]];
    setFeatures(newFeatures);
  };

  const handleSaveLayout = () => {
    // Here we would save the entire layout configuration to your backend or context
    toast({
      title: "Layout saved",
      description: "Your layout changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="category">Category Pages</TabsTrigger>
          <TabsTrigger value="product">Product Pages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="home" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Layout</CardTitle>
              <CardDescription>
                Configure the layout and appearance of your homepage
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Banner Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Banners</h3>
                  <Button onClick={addNewBanner} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Banner
                  </Button>
                </div>
                
                {homeBanners.length === 0 ? (
                  <div className="text-center py-8 border rounded-lg bg-muted/30">
                    <Image className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">No banners added yet</p>
                    <Button onClick={addNewBanner} variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Banner
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {homeBanners.map((banner, index) => (
                      <div 
                        key={banner.id} 
                        className="border rounded-lg p-4 bg-background flex items-center gap-4"
                      >
                        <div className="w-24 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                          {banner.image ? (
                            <img 
                              src={banner.image} 
                              alt={banner.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <Image className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{banner.title}</h4>
                          <p className="text-muted-foreground text-xs truncate">{banner.subtitle}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                              {banner.buttonText}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Position: {banner.position}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => moveBannerUp(index)}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => moveBannerDown(index)}
                            disabled={index === homeBanners.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => editBanner(banner)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeBanner(banner.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Separator className="my-6" />

                {/* Featured Categories */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Features Section</h3>
                  <p className="text-sm text-muted-foreground">
                    Display key features of your marketplace to build trust with customers
                  </p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <h4 className="text-base font-medium">Store Features</h4>
                    <Button onClick={addNewFeature} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                  
                  {features.length === 0 ? (
                    <div className="text-center py-8 border rounded-lg bg-muted/30">
                      <Image className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">No features added yet</p>
                      <Button onClick={addNewFeature} variant="outline" className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Feature
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {features.map((feature, index) => (
                        <div 
                          key={feature.id} 
                          className="border rounded-lg p-4 bg-background"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="text-xs">{feature.icon}</span>
                              </div>
                              <h4 className="font-medium">{feature.title}</h4>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => moveFeatureUp(index)}
                                disabled={index === 0}
                              >
                                <MoveUp className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => moveFeatureDown(index)}
                                disabled={index === features.length - 1}
                              >
                                <MoveDown className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => editFeature(feature)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeFeature(feature.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button onClick={handleSaveLayout} className="mt-6">
                  Save Layout
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="category" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Pages Layout</CardTitle>
              <CardDescription>
                Configure the layout of category pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Category page layout settings will be available soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="product" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Pages Layout</CardTitle>
              <CardDescription>
                Configure the layout of product detail pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Product page layout settings will be available soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Banner Dialog */}
      <Dialog open={showBannerDialog} onOpenChange={setShowBannerDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingMode ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
            <DialogDescription>
              {editingMode 
                ? 'Update the details of this banner' 
                : 'Add a new banner to your homepage'
              }
            </DialogDescription>
          </DialogHeader>
          
          {currentBanner && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="bannerImage">Banner Image</Label>
                <div className="border rounded-md p-2 bg-muted/20">
                  <div className="aspect-[3/1] bg-muted rounded-md overflow-hidden mb-2">
                    {currentBanner.image ? (
                      <img 
                        src={currentBanner.image} 
                        alt="Banner preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 my-2">
                    {bannerSampleImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`w-12 h-8 rounded overflow-hidden border-2 ${
                          currentBanner.image === img ? 'border-primary' : 'border-transparent'
                        }`}
                        onClick={() => setCurrentBanner({...currentBanner, image: img})}
                      >
                        <img 
                          src={img} 
                          alt={`Sample ${i+1}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <Input 
                    id="bannerImage" 
                    value={currentBanner.image}
                    placeholder="Enter image URL"
                    onChange={(e) => setCurrentBanner({...currentBanner, image: e.target.value})}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter an image URL or select from samples above
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bannerTitle">Title</Label>
                  <Input 
                    id="bannerTitle" 
                    value={currentBanner.title}
                    onChange={(e) => setCurrentBanner({...currentBanner, title: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="bannerPosition">Text Position</Label>
                  <Select 
                    value={currentBanner.position}
                    onValueChange={(value) => setCurrentBanner({...currentBanner, position: value})}
                  >
                    <SelectTrigger id="bannerPosition">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="bannerSubtitle">Subtitle</Label>
                <Input 
                  id="bannerSubtitle" 
                  value={currentBanner.subtitle}
                  onChange={(e) => setCurrentBanner({...currentBanner, subtitle: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input 
                    id="buttonText" 
                    value={currentBanner.buttonText}
                    onChange={(e) => setCurrentBanner({...currentBanner, buttonText: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input 
                    id="buttonLink" 
                    value={currentBanner.buttonLink}
                    onChange={(e) => setCurrentBanner({...currentBanner, buttonLink: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBannerDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveBanner(currentBanner)}>
              Save Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feature Dialog */}
      <Dialog open={showFeatureDialog} onOpenChange={setShowFeatureDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingFeature ? 'Edit Feature' : 'Add New Feature'}</DialogTitle>
            <DialogDescription>
              {editingFeature 
                ? 'Update the details of this feature' 
                : 'Add a new feature to highlight on your homepage'
              }
            </DialogDescription>
          </DialogHeader>
          
          {currentFeature && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="featureIcon">Icon Name</Label>
                <Input 
                  id="featureIcon" 
                  value={currentFeature.icon}
                  onChange={(e) => setCurrentFeature({...currentFeature, icon: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the name of a Lucide icon (e.g., Truck, ShieldCheck, Star)
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="featureTitle">Title</Label>
                <Input 
                  id="featureTitle" 
                  value={currentFeature.title}
                  onChange={(e) => setCurrentFeature({...currentFeature, title: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="featureDescription">Description</Label>
                <Textarea 
                  id="featureDescription" 
                  value={currentFeature.description}
                  rows={2}
                  onChange={(e) => setCurrentFeature({...currentFeature, description: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeatureDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveFeature(currentFeature)}>
              Save Feature
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppEditorLayout;
