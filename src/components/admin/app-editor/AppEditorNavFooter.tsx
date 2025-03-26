
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Trash2, 
  Plus, 
  GripVertical, 
  Link as LinkIcon,
  Menu as MenuIcon, 
  LayoutList
} from 'lucide-react';

const navLinkSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, "Text is required"),
  url: z.string().min(1, "URL is required"),
  isActive: z.boolean().default(true)
});

const footerColumnSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  links: z.array(z.object({
    id: z.string().optional(),
    text: z.string().min(1, "Text is required"),
    url: z.string().min(1, "URL is required")
  }))
});

const newLinkSchema = z.object({
  newLinkText: z.string().min(1, "Link text is required"),
  newLinkUrl: z.string().min(1, "URL is required"),
});

const newColumnSchema = z.object({
  newColumnTitle: z.string().min(1, "Column title is required"),
});

const newFooterLinkSchema = z.object({
  columnId: z.string().min(1, "Column is required"),
  newLinkText: z.string().min(1, "Link text is required"),
  newLinkUrl: z.string().min(1, "URL is required"),
});

const AppEditorNavFooter = () => {
  const { toast } = useToast();
  
  // Placeholder data - in a real app this would come from a context or api
  const [navLinks, setNavLinks] = useState([
    { id: 'nav-1', text: 'Home', url: '/', isActive: true },
    { id: 'nav-2', text: 'Shop', url: '/shop', isActive: true },
    { id: 'nav-3', text: 'Vendors', url: '/vendors', isActive: true },
    { id: 'nav-4', text: 'About', url: '/about', isActive: true },
    { id: 'nav-5', text: 'Contact', url: '/contact', isActive: true },
  ]);
  
  const [footerColumns, setFooterColumns] = useState([
    {
      id: 'col-1',
      title: 'Company',
      links: [
        { id: 'link-1', text: 'About Us', url: '/about' },
        { id: 'link-2', text: 'Contact', url: '/contact' },
        { id: 'link-3', text: 'Terms', url: '/terms' },
      ]
    },
    {
      id: 'col-2',
      title: 'Resources',
      links: [
        { id: 'link-4', text: 'FAQs', url: '/faqs' },
        { id: 'link-5', text: 'Blog', url: '/blog' },
      ]
    }
  ]);
  
  // Nav Links Form
  const navForm = useForm({
    resolver: zodResolver(newLinkSchema),
    defaultValues: {
      newLinkText: '',
      newLinkUrl: '',
    }
  });

  // Footer Column Form
  const footerColumnForm = useForm({
    resolver: zodResolver(newColumnSchema),
    defaultValues: {
      newColumnTitle: '',
    }
  });

  // Footer Link Form
  const footerLinkForm = useForm({
    resolver: zodResolver(newFooterLinkSchema),
    defaultValues: {
      columnId: '',
      newLinkText: '',
      newLinkUrl: '',
    }
  });

  // Handle adding a new nav link
  const handleAddNavLink = (data: z.infer<typeof newLinkSchema>) => {
    const newLink = {
      id: `nav-${Date.now()}`,
      text: data.newLinkText,
      url: data.newLinkUrl,
      isActive: true
    };
    
    setNavLinks([...navLinks, newLink]);
    
    navForm.reset({
      newLinkText: '',
      newLinkUrl: '',
    });
    
    toast({
      title: "Navigation link added",
      description: `Added "${data.newLinkText}" to the navigation menu.`,
    });
  };

  // Handle removing a nav link
  const handleRemoveNavLink = (linkId: string) => {
    setNavLinks(navLinks.filter(link => link.id !== linkId));
    toast({
      title: "Navigation link removed",
      description: "The link has been removed from the navigation menu.",
    });
  };

  // Handle toggling a nav link active state
  const handleToggleNavLinkActive = (linkId: string, isActive: boolean) => {
    setNavLinks(navLinks.map(link => 
      link.id === linkId ? { ...link, isActive } : link
    ));
  };

  // Handle saving nav links
  const handleSaveNavLinks = () => {
    toast({
      title: "Navigation links updated",
      description: "Your navigation menu has been successfully updated.",
    });
  };

  // Handle adding a new footer column
  const handleAddFooterColumn = (data: z.infer<typeof newColumnSchema>) => {
    const newColumn = {
      id: `footer-col-${Date.now()}`,
      title: data.newColumnTitle,
      links: []
    };
    
    setFooterColumns([...footerColumns, newColumn]);
    
    footerColumnForm.reset({
      newColumnTitle: '',
    });
    
    toast({
      title: "Footer column added",
      description: `Added "${data.newColumnTitle}" column to the footer.`,
    });
  };

  // Handle removing a footer column
  const handleRemoveFooterColumn = (columnId: string) => {
    setFooterColumns(footerColumns.filter(column => column.id !== columnId));
    toast({
      title: "Footer column removed",
      description: "The column has been removed from the footer.",
    });
  };

  // Handle adding a new footer link
  const handleAddFooterLink = (data: z.infer<typeof newFooterLinkSchema>) => {
    const newLink = {
      id: `footer-link-${Date.now()}`,
      text: data.newLinkText,
      url: data.newLinkUrl
    };
    
    setFooterColumns(footerColumns.map(column => 
      column.id === data.columnId 
        ? { ...column, links: [...column.links, newLink] } 
        : column
    ));
    
    footerLinkForm.reset({
      columnId: data.columnId,
      newLinkText: '',
      newLinkUrl: '',
    });
    
    toast({
      title: "Footer link added",
      description: `Added "${data.newLinkText}" to the footer.`,
    });
  };

  // Handle removing a footer link
  const handleRemoveFooterLink = (columnId: string, linkId: string) => {
    setFooterColumns(footerColumns.map(column => 
      column.id === columnId 
        ? { ...column, links: column.links.filter(link => link.id !== linkId) } 
        : column
    ));
  };

  // Handle saving footer
  const handleSaveFooter = () => {
    toast({
      title: "Footer updated",
      description: "Your footer has been successfully updated.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Navigation Menu Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Menu</CardTitle>
          <CardDescription>
            Customize the main navigation menu of your store
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Navigation Links</h3>
            <div className="space-y-2">
              {navLinks.map(link => (
                <div key={link.id} className="flex items-center justify-between p-3 border rounded-md bg-background">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    <div>
                      <p className="font-medium">{link.text}</p>
                      <p className="text-sm text-muted-foreground">{link.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={link.isActive}
                      onCheckedChange={(checked) => handleToggleNavLinkActive(link.id, checked)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveNavLink(link.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Add New Navigation Link</h3>
            <Form {...navForm}>
              <form onSubmit={navForm.handleSubmit(handleAddNavLink)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={navForm.control}
                    name="newLinkText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link Text</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Products" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={navForm.control}
                    name="newLinkUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. /products" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Navigation Link
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="pt-4">
            <Button onClick={handleSaveNavLinks}>Save Navigation Menu</Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Footer</CardTitle>
          <CardDescription>
            Customize the footer sections and links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Footer Columns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {footerColumns.map(column => (
                <div key={column.id} className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{column.title}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveFooterColumn(column.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="space-y-2 mb-4">
                    {column.links.map(link => (
                      <div key={link.id} className="flex items-center justify-between py-1 px-2 border-b">
                        <div>
                          <p className="text-sm">{link.text}</p>
                          <p className="text-xs text-muted-foreground">{link.url}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveFooterLink(column.id, link.id)}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Form {...footerLinkForm}>
                    <form 
                      onSubmit={footerLinkForm.handleSubmit(handleAddFooterLink)}
                      className="space-y-2"
                    >
                      <input type="hidden" {...footerLinkForm.register("columnId")} value={column.id} />
                      <FormField
                        control={footerLinkForm.control}
                        name="newLinkText"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Link text" size={10} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={footerLinkForm.control}
                        name="newLinkUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="URL" size={10} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" size="sm" variant="outline" className="w-full">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Link
                      </Button>
                    </form>
                  </Form>
                </div>
              ))}
              
              <div className="border rounded-md p-4 border-dashed flex flex-col items-center justify-center">
                <Form {...footerColumnForm}>
                  <form 
                    onSubmit={footerColumnForm.handleSubmit(handleAddFooterColumn)}
                    className="space-y-3 w-full"
                  >
                    <FormField
                      control={footerColumnForm.control}
                      name="newColumnTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Column Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Support" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Column
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>

          <Separator />
          
          <div className="pt-4">
            <Button onClick={handleSaveFooter}>Save Footer</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppEditorNavFooter;
