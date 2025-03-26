
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
import { useStoreSettings } from '@/context/StoreSettingsContext';
import { 
  Trash2, 
  Plus, 
  Grip, 
  LinkIcon,
  MenuIcon, 
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

const AppEditorNavFooter = () => {
  const { toast } = useToast();
  const { navLinks, footerColumns, updateNavLinks, updateFooterColumns } = useStoreSettings();
  
  const [currentLinks, setCurrentLinks] = useState(navLinks);
  const [currentFooterColumns, setCurrentFooterColumns] = useState(footerColumns);

  // Nav Links Form
  const navForm = useForm({
    defaultValues: {
      newLinkText: '',
      newLinkUrl: '',
    }
  });

  // Handle adding a new nav link
  const handleAddNavLink = (data: { newLinkText: string, newLinkUrl: string }) => {
    const newLink = {
      id: `nav-${Date.now()}`,
      text: data.newLinkText,
      url: data.newLinkUrl,
      isActive: true
    };
    
    const updatedLinks = [...currentLinks, newLink];
    setCurrentLinks(updatedLinks);
    
    navForm.reset({
      newLinkText: '',
      newLinkUrl: '',
    });
  };

  // Handle removing a nav link
  const handleRemoveNavLink = (linkId: string) => {
    const updatedLinks = currentLinks.filter(link => link.id !== linkId);
    setCurrentLinks(updatedLinks);
  };

  // Handle toggling a nav link active state
  const handleToggleNavLinkActive = (linkId: string, isActive: boolean) => {
    const updatedLinks = currentLinks.map(link => 
      link.id === linkId ? { ...link, isActive } : link
    );
    setCurrentLinks(updatedLinks);
  };

  // Handle saving nav links
  const handleSaveNavLinks = () => {
    updateNavLinks(currentLinks);
    toast({
      title: "Navigation links updated",
      description: "Your navigation menu has been successfully updated.",
    });
  };

  // Footer Column Form
  const footerForm = useForm({
    defaultValues: {
      newColumnTitle: '',
    }
  });

  // Footer Link Form
  const footerLinkForm = useForm({
    defaultValues: {
      columnId: '',
      newLinkText: '',
      newLinkUrl: '',
    }
  });

  // Handle adding a new footer column
  const handleAddFooterColumn = (data: { newColumnTitle: string }) => {
    const newColumn = {
      id: `footer-col-${Date.now()}`,
      title: data.newColumnTitle,
      links: []
    };
    
    const updatedColumns = [...currentFooterColumns, newColumn];
    setCurrentFooterColumns(updatedColumns);
    
    footerForm.reset({
      newColumnTitle: '',
    });
  };

  // Handle removing a footer column
  const handleRemoveFooterColumn = (columnId: string) => {
    const updatedColumns = currentFooterColumns.filter(column => column.id !== columnId);
    setCurrentFooterColumns(updatedColumns);
  };

  // Handle adding a link to a footer column
  const handleAddFooterLink = (data: { columnId: string, newLinkText: string, newLinkUrl: string }) => {
    const newLink = {
      id: `footer-link-${Date.now()}`,
      text: data.newLinkText,
      url: data.newLinkUrl,
    };
    
    const updatedColumns = currentFooterColumns.map(column => 
      column.id === data.columnId 
        ? { ...column, links: [...column.links, newLink] } 
        : column
    );
    
    setCurrentFooterColumns(updatedColumns);
    
    footerLinkForm.reset({
      columnId: '',
      newLinkText: '',
      newLinkUrl: '',
    });
  };

  // Handle removing a link from a footer column
  const handleRemoveFooterLink = (columnId: string, linkId: string) => {
    const updatedColumns = currentFooterColumns.map(column => 
      column.id === columnId 
        ? { ...column, links: column.links.filter(link => link.id !== linkId) } 
        : column
    );
    
    setCurrentFooterColumns(updatedColumns);
  };

  // Handle saving footer columns
  const handleSaveFooterColumns = () => {
    updateFooterColumns(currentFooterColumns);
    toast({
      title: "Footer updated",
      description: "Your footer information has been successfully updated.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Navigation Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MenuIcon className="h-5 w-5" />
            Navigation Menu
          </CardTitle>
          <CardDescription>
            Configure the navigation links that appear in the header
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Navigation Links</h3>
            <div className="border rounded-md">
              {currentLinks.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No navigation links added yet.
                </div>
              ) : (
                <div className="divide-y">
                  {currentLinks.map((link) => (
                    <div 
                      key={link.id} 
                      className="p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Grip className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{link.text}</p>
                          <p className="text-sm text-muted-foreground">{link.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={link.isActive}
                            onCheckedChange={(checked) => handleToggleNavLinkActive(link.id!, checked)}
                          />
                          <span className="text-sm">
                            {link.isActive ? 'Active' : 'Hidden'}
                          </span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleRemoveNavLink(link.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Add New Navigation Link</h3>
            <form onSubmit={navForm.handleSubmit(handleAddNavLink)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <FormLabel htmlFor="newLinkText">Link Text</FormLabel>
                <Input 
                  id="newLinkText"
                  placeholder="e.g. About Us"
                  {...navForm.register('newLinkText')}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <FormLabel htmlFor="newLinkUrl">URL</FormLabel>
                <div className="flex gap-2">
                  <Input 
                    id="newLinkUrl"
                    placeholder="e.g. /about"
                    {...navForm.register('newLinkUrl')}
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <Button 
            onClick={handleSaveNavLinks}
            className="w-full mt-4"
          >
            Save Navigation Menu
          </Button>
        </CardContent>
      </Card>

      {/* Footer Columns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutList className="h-5 w-5" />
            Footer Columns
          </CardTitle>
          <CardDescription>
            Configure the columns and links that appear in the footer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Footer Columns</h3>
            
            {currentFooterColumns.map((column) => (
              <div key={column.id} className="border rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{column.title}</h4>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleRemoveFooterColumn(column.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="pl-4 border-l space-y-2">
                  {column.links.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No links in this column.</p>
                  ) : (
                    column.links.map((link) => (
                      <div key={link.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">{link.text}</p>
                          <p className="text-xs text-muted-foreground">{link.url}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleRemoveFooterLink(column.id!, link.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleAddFooterLink({
                    columnId: column.id!,
                    newLinkText: formData.get('linkText') as string,
                    newLinkUrl: formData.get('linkUrl') as string
                  });
                  e.currentTarget.reset();
                }} className="grid grid-cols-3 gap-2 pt-2 border-t">
                  <Input name="linkText" placeholder="Link text" size={10} className="col-span-1" />
                  <div className="col-span-2 flex gap-2">
                    <Input name="linkUrl" placeholder="URL (e.g. /about)" className="flex-1" />
                    <Button type="submit" size="sm">
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </form>
              </div>
            ))}
            
            <form onSubmit={footerForm.handleSubmit(handleAddFooterColumn)} className="flex gap-2">
              <Input 
                placeholder="New column title"
                {...footerForm.register('newColumnTitle')}
                className="flex-1"
              />
              <Button type="submit">
                <Plus className="h-4 w-4 mr-2" />
                Add Column
              </Button>
            </form>
          </div>

          <Button 
            onClick={handleSaveFooterColumns}
            className="w-full mt-4"
          >
            Save Footer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppEditorNavFooter;
