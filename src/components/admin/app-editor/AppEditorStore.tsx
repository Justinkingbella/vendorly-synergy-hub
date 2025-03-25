
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Separator } from '@/components/ui/separator';
import { Upload } from 'lucide-react';

const storeInfoSchema = z.object({
  storeName: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
  storeDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  storeEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  storePhone: z.string().min(7, {
    message: "Please enter a valid phone number.",
  }),
  storeAddress: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  socialFacebook: z.string().optional(),
  socialTwitter: z.string().optional(),
  socialInstagram: z.string().optional(),
  socialYoutube: z.string().optional(),
});

const AppEditorStore = () => {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof storeInfoSchema>>({
    resolver: zodResolver(storeInfoSchema),
    defaultValues: {
      storeName: "MarketHub",
      storeDescription: "Multi-vendor marketplace for all your shopping needs across Namibia.",
      storeEmail: "info@markethub.na",
      storePhone: "+264 61 123 4567",
      storeAddress: "123 Independence Ave, Windhoek, Namibia",
      socialFacebook: "https://facebook.com/markethub",
      socialTwitter: "https://twitter.com/markethub",
      socialInstagram: "https://instagram.com/markethub",
      socialYoutube: "https://youtube.com/markethub",
    },
  });

  function onSubmit(values: z.infer<typeof storeInfoSchema>) {
    // Would normally save to backend or context
    console.log(values);
    toast({
      title: "Store information updated",
      description: "Your store information has been successfully updated.",
    });
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFaviconPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Information</CardTitle>
        <CardDescription>
          Update your store's basic information and branding
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Store Logo</h3>
            <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-muted/30">
              <div className="w-32 h-32 bg-background rounded-lg border flex items-center justify-center mb-4 overflow-hidden">
                {logoPreview ? (
                  <img src={logoPreview} alt="Store logo preview" className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-muted-foreground">No logo</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" type="button" className="relative">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </Button>
                {logoPreview && (
                  <Button 
                    variant="ghost" 
                    type="button" 
                    onClick={() => setLogoPreview(null)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended size: 200x200px, max 2MB
              </p>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Favicon</h3>
            <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-muted/30">
              <div className="w-16 h-16 bg-background rounded-lg border flex items-center justify-center mb-4 overflow-hidden">
                {faviconPreview ? (
                  <img src={faviconPreview} alt="Favicon preview" className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-muted-foreground text-sm">No icon</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" type="button" className="relative">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Favicon
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleFaviconUpload}
                  />
                </Button>
                {faviconPreview && (
                  <Button 
                    variant="ghost" 
                    type="button" 
                    onClick={() => setFaviconPreview(null)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended size: 32x32px, max 1MB
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your store name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="storeEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="storeDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your marketplace" 
                      className="resize-none min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    This appears on your homepage and in search results.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="storePhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="storeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Street, City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-2" />
            <h3 className="text-lg font-semibold">Social Media Links</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="socialFacebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://facebook.com/yourstore" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="socialTwitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://twitter.com/yourstore" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="socialInstagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://instagram.com/yourstore" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="socialYoutube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtube.com/channel/yourstore" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="mt-4">Save Store Information</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AppEditorStore;
