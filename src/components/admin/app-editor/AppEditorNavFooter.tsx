
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Menu, 
  Edit,
  Navigation,
  FooterIcon,
  FileText
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';

const AppEditorNavFooter = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("navbar");
  
  // Navbar state
  const [navLinks, setNavLinks] = useState([
    { id: '1', text: 'Home', url: '/', isActive: true },
    { id: '2', text: 'Products', url: '/products', isActive: true },
    { id: '3', text: 'Categories', url: '/categories', isActive: true },
    { id: '4', text: 'Vendors', url: '/vendors', isActive: true },
    { id: '5', text: 'Deals', url: '/deals', isActive: true },
  ]);
  const [showNavLinkDialog, setShowNavLinkDialog] = useState(false);
  const [currentNavLink, setCurrentNavLink] = useState<any>(null);
  const [editingNavLink, setEditingNavLink] = useState(false);
  
  // Footer state
  const [footerLinks, setFooterLinks] = useState([
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
  ]);
  const [currentFooterColumn, setCurrentFooterColumn] = useState<any>(null);
  const [showFooterColumnDialog, setShowFooterColumnDialog] = useState(false);
  const [editingFooterColumn, setEditingFooterColumn] = useState(false);
  
  const [currentFooterLink, setCurrentFooterLink] = useState<any>(null);
  const [showFooterLinkDialog, setShowFooterLinkDialog] = useState(false);
  const [editingFooterLink, setEditingFooterLink] = useState(false);
  const [parentColumnId, setParentColumnId] = useState<string>('');

  // Contact Info
  const [contactInfo, setContactInfo] = useState({
    email: 'support@markethub.na',
    phone: '+264 61 123 4567',
    address: '123 Independence Ave, Windhoek, Namibia',
    showSocialIcons: true,
    enableNewsletterSignup: true
  });

  // Navbar methods
  const addNewNavLink = () => {
    setCurrentNavLink({
      id: '',
      text: '',
      url: '/',
      isActive: true
    });
    setEditingNavLink(false);
    setShowNavLinkDialog(true);
  };

  const editNavLink = (link: any) => {
    setCurrentNavLink(link);
    setEditingNavLink(true);
    setShowNavLinkDialog(true);
  };

  const saveNavLink = (link: any) => {
    if (editingNavLink) {
      // Update existing link
      setNavLinks(navLinks.map(l => l.id === link.id ? link : l));
    } else {
      // Add new link
      setNavLinks([...navLinks, { ...link, id: Date.now().toString() }]);
    }
    setShowNavLinkDialog(false);
    
    toast({
      title: editingNavLink ? "Navigation link updated" : "Navigation link added",
      description: editingNavLink ? 
        "The navigation link has been updated successfully." : 
        "A new navigation link has been added.",
    });
  };

  const removeNavLink = (id: string) => {
    setNavLinks(navLinks.filter(link => link.id !== id));
    toast({
      title: "Navigation link removed",
      description: "The navigation link has been removed.",
    });
  };

  const moveNavLinkUp = (index: number) => {
    if (index === 0) return;
    const newLinks = [...navLinks];
    [newLinks[index], newLinks[index - 1]] = [newLinks[index - 1], newLinks[index]];
    setNavLinks(newLinks);
  };

  const moveNavLinkDown = (index: number) => {
    if (index === navLinks.length - 1) return;
    const newLinks = [...navLinks];
    [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
    setNavLinks(newLinks);
  };

  const toggleNavLinkActive = (id: string) => {
    setNavLinks(navLinks.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  // Footer methods
  const addNewFooterColumn = () => {
    setCurrentFooterColumn({
      id: '',
      title: '',
      links: []
    });
    setEditingFooterColumn(false);
    setShowFooterColumnDialog(true);
  };

  const editFooterColumn = (column: any) => {
    setCurrentFooterColumn(column);
    setEditingFooterColumn(true);
    setShowFooterColumnDialog(true);
  };

  const saveFooterColumn = (column: any) => {
    if (editingFooterColumn) {
      // Update existing column
      setFooterLinks(footerLinks.map(c => c.id === column.id ? column : c));
    } else {
      // Add new column
      setFooterLinks([...footerLinks, { ...column, id: Date.now().toString() }]);
    }
    setShowFooterColumnDialog(false);
    
    toast({
      title: editingFooterColumn ? "Footer column updated" : "Footer column added",
      description: editingFooterColumn ? 
        "The footer column has been updated successfully." : 
        "A new footer column has been added.",
    });
  };

  const removeFooterColumn = (id: string) => {
    setFooterLinks(footerLinks.filter(column => column.id !== id));
    toast({
      title: "Footer column removed",
      description: "The footer column has been removed.",
    });
  };

  const moveFooterColumnUp = (index: number) => {
    if (index === 0) return;
    const newColumns = [...footerLinks];
    [newColumns[index], newColumns[index - 1]] = [newColumns[index - 1], newColumns[index]];
    setFooterLinks(newColumns);
  };

  const moveFooterColumnDown = (index: number) => {
    if (index === footerLinks.length - 1) return;
    const newColumns = [...footerLinks];
    [newColumns[index], newColumns[index + 1]] = [newColumns[index + 1], newColumns[index]];
    setFooterLinks(newColumns);
  };

  // Footer link methods
  const addNewFooterLink = (columnId: string) => {
    setCurrentFooterLink({
      id: '',
      text: '',
      url: '/'
    });
    setParentColumnId(columnId);
    setEditingFooterLink(false);
    setShowFooterLinkDialog(true);
  };

  const editFooterLink = (link: any, columnId: string) => {
    setCurrentFooterLink(link);
    setParentColumnId(columnId);
    setEditingFooterLink(true);
    setShowFooterLinkDialog(true);
  };

  const saveFooterLink = (link: any) => {
    const updatedFooterLinks = [...footerLinks];
    const columnIndex = updatedFooterLinks.findIndex(col => col.id === parentColumnId);
    
    if (columnIndex !== -1) {
      if (editingFooterLink) {
        // Update existing link
        updatedFooterLinks[columnIndex].links = updatedFooterLinks[columnIndex].links.map(
          l => l.id === link.id ? link : l
        );
      } else {
        // Add new link
        updatedFooterLinks[columnIndex].links = [
          ...updatedFooterLinks[columnIndex].links, 
          { ...link, id: `${parentColumnId}-${Date.now()}` }
        ];
      }
      
      setFooterLinks(updatedFooterLinks);
      setShowFooterLinkDialog(false);
      
      toast({
        title: editingFooterLink ? "Footer link updated" : "Footer link added",
        description: editingFooterLink ? 
          "The footer link has been updated successfully." : 
          "A new footer link has been added.",
      });
    }
  };

  const removeFooterLink = (linkId: string, columnId: string) => {
    const updatedFooterLinks = [...footerLinks];
    const columnIndex = updatedFooterLinks.findIndex(col => col.id === columnId);
    
    if (columnIndex !== -1) {
      updatedFooterLinks[columnIndex].links = updatedFooterLinks[columnIndex].links.filter(
        link => link.id !== linkId
      );
      
      setFooterLinks(updatedFooterLinks);
      
      toast({
        title: "Footer link removed",
        description: "The footer link has been removed.",
      });
    }
  };

  const moveFooterLinkUp = (linkIndex: number, columnId: string) => {
    if (linkIndex === 0) return;
    
    const updatedFooterLinks = [...footerLinks];
    const columnIndex = updatedFooterLinks.findIndex(col => col.id === columnId);
    
    if (columnIndex !== -1) {
      const links = [...updatedFooterLinks[columnIndex].links];
      [links[linkIndex], links[linkIndex - 1]] = [links[linkIndex - 1], links[linkIndex]];
      updatedFooterLinks[columnIndex].links = links;
      setFooterLinks(updatedFooterLinks);
    }
  };

  const moveFooterLinkDown = (linkIndex: number, columnId: string) => {
    const updatedFooterLinks = [...footerLinks];
    const columnIndex = updatedFooterLinks.findIndex(col => col.id === columnId);
    
    if (columnIndex !== -1) {
      const links = [...updatedFooterLinks[columnIndex].links];
      if (linkIndex === links.length - 1) return;
      
      [links[linkIndex], links[linkIndex + 1]] = [links[linkIndex + 1], links[linkIndex]];
      updatedFooterLinks[columnIndex].links = links;
      setFooterLinks(updatedFooterLinks);
    }
  };

  // Contact info methods
  const handleContactInfoChange = (key: string, value: any) => {
    setContactInfo({
      ...contactInfo,
      [key]: value
    });
  };

  const handleSaveChanges = () => {
    // Here we would typically save all the nav/footer settings to a backend
    toast({
      title: "Changes saved",
      description: "Your navigation and footer changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="navbar" className="flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            <span>Navigation Bar</span>
          </TabsTrigger>
          <TabsTrigger value="footer" className="flex items-center gap-2">
            <FooterIcon className="h-4 w-4" />
            <span>Footer</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="navbar" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Bar</CardTitle>
              <CardDescription>
                Configure the links and appearance of your site's navigation bar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Main Navigation Links</h3>
                  <Button onClick={addNewNavLink} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>
                
                {navLinks.length === 0 ? (
                  <div className="text-center py-8 border rounded-lg bg-muted/30">
                    <Menu className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">No navigation links added yet</p>
                    <Button onClick={addNewNavLink} variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Link
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {navLinks.map((link, index) => (
                      <div 
                        key={link.id} 
                        className={`border rounded-lg p-3 bg-background flex items-center justify-between ${
                          !link.isActive ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Switch 
                            checked={link.isActive} 
                            onCheckedChange={() => toggleNavLinkActive(link.id)}
                          />
                          <div>
                            <p className="font-medium">{link.text}</p>
                            <p className="text-xs text-muted-foreground">{link.url}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => moveNavLinkUp(index)}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => moveNavLinkDown(index)}
                            disabled={index === navLinks.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => editNavLink(link)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeNavLink(link.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <Separator className="my-6" />

                <Button onClick={handleSaveChanges}>
                  Save Navigation Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="footer" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Footer Configuration</CardTitle>
              <CardDescription>
                Configure the links, columns and information displayed in your site footer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Footer Link Columns</h3>
                  <Button onClick={addNewFooterColumn} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Column
                  </Button>
                </div>
                
                {footerLinks.length === 0 ? (
                  <div className="text-center py-8 border rounded-lg bg-muted/30">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">No footer columns added yet</p>
                    <Button onClick={addNewFooterColumn} variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Column
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {footerLinks.map((column, columnIndex) => (
                      <div 
                        key={column.id} 
                        className="border rounded-lg p-4 bg-background"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-base">{column.title}</h4>
                          
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => moveFooterColumnUp(columnIndex)}
                              disabled={columnIndex === 0}
                            >
                              <MoveUp className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => moveFooterColumnDown(columnIndex)}
                              disabled={columnIndex === footerLinks.length - 1}
                            >
                              <MoveDown className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => editFooterColumn(column)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeFooterColumn(column.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2 pl-2">
                          {column.links.map((link, linkIndex) => (
                            <div 
                              key={link.id} 
                              className="flex items-center justify-between py-1 border-b last:border-b-0"
                            >
                              <div>
                                <p className="text-sm">{link.text}</p>
                                <p className="text-xs text-muted-foreground">{link.url}</p>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => moveFooterLinkUp(linkIndex, column.id)}
                                  disabled={linkIndex === 0}
                                >
                                  <MoveUp className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => moveFooterLinkDown(linkIndex, column.id)}
                                  disabled={linkIndex === column.links.length - 1}
                                >
                                  <MoveDown className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => editFooterLink(link, column.id)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => removeFooterLink(link.id, column.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full mt-2" 
                            onClick={() => addNewFooterLink(column.id)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Link
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Set the contact information displayed in your footer
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="footerEmail">Email Address</Label>
                      <Input 
                        id="footerEmail" 
                        value={contactInfo.email}
                        onChange={(e) => handleContactInfoChange('email', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="footerPhone">Phone Number</Label>
                      <Input 
                        id="footerPhone" 
                        value={contactInfo.phone}
                        onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="footerAddress">Address</Label>
                    <Input 
                      id="footerAddress" 
                      value={contactInfo.address}
                      onChange={(e) => handleContactInfoChange('address', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch 
                      id="showSocialIcons"
                      checked={contactInfo.showSocialIcons}
                      onCheckedChange={(checked) => handleContactInfoChange('showSocialIcons', checked)}
                    />
                    <Label htmlFor="showSocialIcons">Show social media icons</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="enableNewsletterSignup"
                      checked={contactInfo.enableNewsletterSignup}
                      onCheckedChange={(checked) => handleContactInfoChange('enableNewsletterSignup', checked)}
                    />
                    <Label htmlFor="enableNewsletterSignup">Enable newsletter signup form</Label>
                  </div>
                </div>
                
                <Button onClick={handleSaveChanges} className="mt-6">
                  Save Footer Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Nav Link Dialog */}
      <Dialog open={showNavLinkDialog} onOpenChange={setShowNavLinkDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingNavLink ? 'Edit Navigation Link' : 'Add Navigation Link'}</DialogTitle>
            <DialogDescription>
              {editingNavLink 
                ? 'Update the details of this navigation link' 
                : 'Add a new link to your site navigation'
              }
            </DialogDescription>
          </DialogHeader>
          
          {currentNavLink && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="linkText">Link Text</Label>
                <Input 
                  id="linkText" 
                  value={currentNavLink.text}
                  onChange={(e) => setCurrentNavLink({...currentNavLink, text: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input 
                  id="linkUrl" 
                  value={currentNavLink.url}
                  onChange={(e) => setCurrentNavLink({...currentNavLink, url: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">
                  Use relative URLs (e.g., /about) for internal links
                </p>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="linkActive"
                  checked={currentNavLink.isActive}
                  onCheckedChange={(checked) => setCurrentNavLink({...currentNavLink, isActive: checked})}
                />
                <Label htmlFor="linkActive">Link is active</Label>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNavLinkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveNavLink(currentNavLink)}>
              {editingNavLink ? 'Update Link' : 'Add Link'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer Column Dialog */}
      <Dialog open={showFooterColumnDialog} onOpenChange={setShowFooterColumnDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingFooterColumn ? 'Edit Footer Column' : 'Add Footer Column'}</DialogTitle>
            <DialogDescription>
              {editingFooterColumn 
                ? 'Update the details of this footer column' 
                : 'Add a new column to your footer'
              }
            </DialogDescription>
          </DialogHeader>
          
          {currentFooterColumn && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="columnTitle">Column Title</Label>
                <Input 
                  id="columnTitle" 
                  value={currentFooterColumn.title}
                  onChange={(e) => setCurrentFooterColumn({...currentFooterColumn, title: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFooterColumnDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveFooterColumn(currentFooterColumn)}>
              {editingFooterColumn ? 'Update Column' : 'Add Column'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer Link Dialog */}
      <Dialog open={showFooterLinkDialog} onOpenChange={setShowFooterLinkDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingFooterLink ? 'Edit Footer Link' : 'Add Footer Link'}</DialogTitle>
            <DialogDescription>
              {editingFooterLink 
                ? 'Update the details of this footer link' 
                : 'Add a new link to this footer column'
              }
            </DialogDescription>
          </DialogHeader>
          
          {currentFooterLink && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="footerLinkText">Link Text</Label>
                <Input 
                  id="footerLinkText" 
                  value={currentFooterLink.text}
                  onChange={(e) => setCurrentFooterLink({...currentFooterLink, text: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="footerLinkUrl">Link URL</Label>
                <Input 
                  id="footerLinkUrl" 
                  value={currentFooterLink.url}
                  onChange={(e) => setCurrentFooterLink({...currentFooterLink, url: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">
                  Use relative URLs (e.g., /about) for internal links
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFooterLinkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveFooterLink(currentFooterLink)}>
              {editingFooterLink ? 'Update Link' : 'Add Link'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppEditorNavFooter;
