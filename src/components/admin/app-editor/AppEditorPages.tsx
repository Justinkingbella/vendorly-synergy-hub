
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
  TabsContent, 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { FileText, Edit, ExternalLink, Upload, CheckCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import RichTextEditor from '../RichTextEditor';

const contentPages = [
  { id: 'about', name: 'About Us', slug: '/about' },
  { id: 'contact', name: 'Contact Us', slug: '/contact' },
  { id: 'terms', name: 'Terms & Conditions', slug: '/terms' },
  { id: 'privacy', name: 'Privacy Policy', slug: '/privacy' },
  { id: 'faqs', name: 'FAQs', slug: '/faqs' },
  { id: 'shipping', name: 'Shipping Policy', slug: '/shipping' },
  { id: 'vendor', name: 'Become a Vendor', slug: '/become-vendor' },
];

const AppEditorPages = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");
  const [activeSection, setActiveSection] = useState("content");
  const [editMode, setEditMode] = useState(false);
  const [currentPageContent, setCurrentPageContent] = useState({
    about: {
      title: "About MarketHub",
      subtitle: "Your trusted marketplace in Namibia",
      content: "<h2>Our Story</h2><p>MarketHub was founded in 2022 with a simple vision: to create a vibrant online marketplace that connects Namibian vendors with customers nationwide.</p><h2>Our Mission</h2><p>We strive to build a platform that empowers local businesses and provides customers with access to quality products from verified vendors.</p><h2>Our Team</h2><p>Our dedicated team works tirelessly to ensure that MarketHub provides the best possible experience for both vendors and customers.</p>",
      seoTitle: "About MarketHub - Multi-vendor Marketplace in Namibia",
      seoDescription: "Learn about MarketHub, Namibia's premier multi-vendor marketplace connecting customers with verified vendors across the country.",
      bannerImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop"
    },
    contact: {
      title: "Contact Us",
      subtitle: "We're here to help",
      content: "<h2>Get in Touch</h2><p>Have questions or feedback? We'd love to hear from you. Contact our team using the information below.</p><h2>Customer Support</h2><p>Email: support@markethub.na</p><p>Phone: +264 61 123 4567</p><p>Hours: Monday-Friday, 8AM-5PM</p><h2>Visit Our Office</h2><p>123 Independence Avenue<br>Windhoek, Namibia</p>",
      seoTitle: "Contact MarketHub - Get in Touch With Our Team",
      seoDescription: "Contact MarketHub's customer support team for assistance with orders, vendor inquiries, or general questions about our marketplace.",
      bannerImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=400&fit=crop"
    },
    terms: {
      title: "Terms & Conditions",
      subtitle: "Our terms of service",
      content: "<h2>1. Introduction</h2><p>By using MarketHub, you agree to these Terms and Conditions. Please read them carefully.</p><h2>2. User Accounts</h2><p>When you create an account with us, you must provide accurate information. You are responsible for maintaining the security of your account.</p><h2>3. Products & Services</h2><p>MarketHub is a platform where vendors can sell their products. We are not responsible for the quality of products sold by vendors.</p>",
      seoTitle: "Terms and Conditions | MarketHub",
      seoDescription: "Read MarketHub's terms and conditions regarding user accounts, purchases, vendor policies, and platform usage guidelines.",
      bannerImage: ""
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "How we handle your data",
      content: "<h2>1. Information We Collect</h2><p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer support.</p><h2>2. How We Use Information</h2><p>We use your information to process orders, provide customer support, and improve our services.</p><h2>3. Information Sharing</h2><p>We share your information with vendors when you make a purchase. We do not sell your personal information to third parties.</p>",
      seoTitle: "Privacy Policy | MarketHub",
      seoDescription: "Learn about how MarketHub collects, uses, and protects your personal information when you use our marketplace.",
      bannerImage: ""
    },
    faqs: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions",
      content: "<h2>General Questions</h2><h3>What is MarketHub?</h3><p>MarketHub is a multi-vendor marketplace where customers can shop from various verified vendors in Namibia.</p><h3>How do I create an account?</h3><p>Click on the 'Sign In / Register' button in the top right corner of the page and follow the registration instructions.</p><h2>Orders & Shipping</h2><h3>How do I track my order?</h3><p>You can track your order by logging into your account and visiting the 'My Orders' section.</p>",
      seoTitle: "Frequently Asked Questions | MarketHub",
      seoDescription: "Find answers to common questions about shopping on MarketHub, vendor policies, shipping, returns, and account management.",
      bannerImage: ""
    },
    shipping: {
      title: "Shipping Policy",
      subtitle: "Delivery information for your orders",
      content: "<h2>Shipping Methods</h2><p>We offer standard and express shipping options for all orders. Delivery times may vary depending on your location and the vendor.</p><h2>Shipping Costs</h2><p>Shipping costs are calculated based on the weight, dimensions, and destination of your order. Free shipping is available for orders over N$1000.</p><h2>Tracking</h2><p>Once your order is shipped, you will receive a tracking number via email.</p>",
      seoTitle: "Shipping Policy | MarketHub",
      seoDescription: "Learn about MarketHub's shipping methods, costs, delivery times, and tracking information for orders placed on our platform.",
      bannerImage: ""
    },
    vendor: {
      title: "Become a Vendor",
      subtitle: "Start selling on MarketHub",
      content: "<h2>Why Sell on MarketHub?</h2><p>Join Namibia's growing marketplace and reach thousands of customers nationwide. Our platform provides all the tools you need to start and grow your online business.</p><h2>How It Works</h2><p>1. Register as a vendor<br>2. Set up your store profile<br>3. List your products<br>4. Start selling and earning</p><h2>Pricing & Fees</h2><p>We offer competitive commission rates and subscription plans to suit businesses of all sizes.</p>",
      seoTitle: "Become a Vendor on MarketHub | Start Selling Online",
      seoDescription: "Join MarketHub as a vendor and start selling your products to customers across Namibia. Learn about our vendor program, fees, and benefits.",
      bannerImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop"
    }
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes when exiting edit mode
      toast({
        title: "Changes saved",
        description: `Your changes to the ${getCurrentPageName()} page have been saved.`,
      });
    }
    setEditMode(!editMode);
    setPreviewMode(false);
  };

  const handlePreviewToggle = () => {
    setPreviewMode(!previewMode);
  };

  const handleContentChange = (content: string) => {
    setCurrentPageContent({
      ...currentPageContent,
      [activeTab]: {
        ...currentPageContent[activeTab as keyof typeof currentPageContent],
        content
      }
    });
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBannerPreview(result);
        
        // Update the page content with the new banner
        setCurrentPageContent({
          ...currentPageContent,
          [activeTab]: {
            ...currentPageContent[activeTab as keyof typeof currentPageContent],
            bannerImage: result
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextInputChange = (field: string, value: string) => {
    setCurrentPageContent({
      ...currentPageContent,
      [activeTab]: {
        ...currentPageContent[activeTab as keyof typeof currentPageContent],
        [field]: value
      }
    });
  };

  const handlePageSave = () => {
    // Here you would typically save to a backend API
    toast({
      title: "Page saved",
      description: `Your changes to the ${getCurrentPageName()} page have been saved.`,
    });
    setEditMode(false);
    setPreviewMode(false);
  };

  const getCurrentPageName = () => {
    const page = contentPages.find(p => p.id === activeTab);
    return page ? page.name : 'Page';
  };

  const getActivePage = () => {
    return currentPageContent[activeTab as keyof typeof currentPageContent];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Content Pages</CardTitle>
              <CardDescription>
                Edit the content of your site's static pages
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {editMode && (
                <Button 
                  variant={previewMode ? "outline" : "secondary"} 
                  onClick={handlePreviewToggle}
                >
                  {previewMode ? "Edit" : "Preview"}
                </Button>
              )}
              <Button 
                variant={editMode ? "default" : "outline"} 
                onClick={handleEditToggle}
              >
                {editMode ? "Save & Exit" : "Edit Page"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div className="font-medium text-sm text-muted-foreground mb-2">
                Select a page to edit
              </div>
              <div className="space-y-1">
                {contentPages.map((page) => (
                  <Button
                    key={page.id}
                    variant={activeTab === page.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab(page.id);
                      setPreviewMode(false);
                      setBannerPreview(null);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {page.name}
                  </Button>
                ))}
              </div>
              
              {editMode && (
                <>
                  <Separator className="my-4" />
                  <div className="font-medium text-sm text-muted-foreground mb-2">
                    Edit section
                  </div>
                  <div className="space-y-1">
                    <Button
                      variant={activeSection === "content" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection("content")}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Page Content
                    </Button>
                    <Button
                      variant={activeSection === "seo" ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection("seo")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      SEO Settings
                    </Button>
                  </div>
                </>
              )}
              
              {editMode && !previewMode && (
                <Button 
                  className="w-full mt-6" 
                  onClick={handlePageSave}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </div>
            
            <div className="md:col-span-3">
              {previewMode ? (
                <div className="border rounded-lg p-6">
                  <div className="space-y-4">
                    {getActivePage().bannerImage && (
                      <div className="aspect-[3/1] rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={getActivePage().bannerImage} 
                          alt={getActivePage().title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-2 text-center max-w-2xl mx-auto my-8">
                      <h1 className="text-3xl font-bold">{getActivePage().title}</h1>
                      <p className="text-muted-foreground">{getActivePage().subtitle}</p>
                    </div>
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: getActivePage().content }}
                    />
                  </div>
                </div>
              ) : editMode ? (
                <div className="border rounded-lg">
                  <div className="p-4 bg-muted/30 border-b">
                    <h2 className="font-semibold">
                      Editing: {getCurrentPageName()}
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    {activeSection === "content" ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="pageTitle">Page Title</Label>
                            <Input 
                              id="pageTitle" 
                              value={getActivePage().title}
                              onChange={(e) => handleTextInputChange('title', e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="pageSubtitle">Page Subtitle</Label>
                            <Input 
                              id="pageSubtitle" 
                              value={getActivePage().subtitle}
                              onChange={(e) => handleTextInputChange('subtitle', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pageBanner">Banner Image</Label>
                          <div className="border rounded-md p-3 bg-muted/20">
                            <div className="aspect-[3/1] bg-muted rounded-md overflow-hidden mb-3">
                              {(bannerPreview || getActivePage().bannerImage) ? (
                                <img 
                                  src={bannerPreview || getActivePage().bannerImage} 
                                  alt="Banner preview" 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Upload className="h-8 w-8 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" type="button" className="relative">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Banner Image
                                <input
                                  type="file"
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  accept="image/*"
                                  onChange={handleBannerUpload}
                                />
                              </Button>
                              {(bannerPreview || getActivePage().bannerImage) && (
                                <Button 
                                  variant="ghost" 
                                  type="button" 
                                  onClick={() => {
                                    setBannerPreview(null);
                                    handleTextInputChange('bannerImage', '');
                                  }}
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Recommended size: 1200x400px, max 2MB
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pageContent">Page Content</Label>
                          <RichTextEditor 
                            initialValue={getActivePage().content}
                            onChange={handleContentChange}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="seoTitle">SEO Title</Label>
                          <Input 
                            id="seoTitle" 
                            value={getActivePage().seoTitle}
                            onChange={(e) => handleTextInputChange('seoTitle', e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            This title appears in search engine results and browser tabs.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="seoDescription">SEO Description</Label>
                          <Input 
                            id="seoDescription" 
                            value={getActivePage().seoDescription}
                            onChange={(e) => handleTextInputChange('seoDescription', e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            This description appears in search engine results (recommended: 120-160 characters).
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="pageSlug">Page URL</Label>
                          <div className="flex items-center space-x-1">
                            <div className="bg-muted px-3 py-2 rounded-l-md text-sm text-muted-foreground border">
                              yourdomain.com
                            </div>
                            <Input 
                              id="pageSlug" 
                              value={contentPages.find(p => p.id === activeTab)?.slug || ''}
                              className="rounded-l-none"
                              readOnly
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            The URL is based on the page type and cannot be changed.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold text-lg">{getCurrentPageName()}</h3>
                        <p className="text-sm text-muted-foreground">
                          {contentPages.find(p => p.id === activeTab)?.slug}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Title</h4>
                        <p>{getActivePage().title}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Subtitle</h4>
                        <p>{getActivePage().subtitle}</p>
                      </div>
                      
                      {getActivePage().bannerImage && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Banner Image</h4>
                          <div className="mt-2 aspect-[3/1] bg-muted rounded-md overflow-hidden w-full max-w-md">
                            <img 
                              src={getActivePage().bannerImage} 
                              alt={getActivePage().title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">SEO Title</h4>
                        <p>{getActivePage().seoTitle}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">SEO Description</h4>
                        <p className="text-sm">{getActivePage().seoDescription}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Content Preview</h4>
                        <div className="border p-4 rounded-md bg-background mt-2 prose prose-sm max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: getActivePage().content.substring(0, 300) + '...' }} />
                        </div>
                      </div>
                    </div>
                    
                    <Button className="mt-4" onClick={handleEditToggle}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Page
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppEditorPages;
