// Import the needed components and hooks
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { subscriptionPlansTable } from '@/integrations/supabase/client';
import AdminLayout from '@/components/layout/AdminLayout';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// Main component
export default function CreateSubscription() {
  const navigate = useNavigate();
  const { id: subscriptionId } = useParams();
  const { toast } = useToast();

  // State declarations
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [isPopular, setIsPopular] = useState(false);
  const [features, setFeatures] = useState<string[]>(['']);
  const [notIncluded, setNotIncluded] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Function to fetch subscription data if editing
    const fetchSubscription = async () => {
      if (subscriptionId) {
        try {
          setIsLoading(true);
          const { data, error } = await subscriptionPlansTable()
            .select('*')
            .eq('id', subscriptionId)
            .single();
            
          if (error) {
            console.error('Error fetching subscription:', error);
            toast({
              title: 'Error',
              description: 'Failed to fetch subscription details',
              variant: 'destructive',
            });
            return;
          }
          
          // Safely handle potentially null data
          if (data) {
            // Set subscription data with null checks
            setName(data.name ? String(data.name) : '');
            setPrice(data.price !== undefined ? Number(data.price) : 0);
            setDescription(data.description ? String(data.description) : '');
            setIsPopular(data.popular ? Boolean(data.popular) : false);
            
            // Handle arrays from database with null checks
            if (data.features && Array.isArray(data.features)) {
              setFeatures(data.features.length > 0 ? data.features : ['']);
            }
            
            if (data.not_included && Array.isArray(data.not_included)) {
              setNotIncluded(data.not_included.length > 0 ? data.not_included : ['']);
            }
          }
        } catch (err) {
          console.error('Failed to fetch subscription:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSubscription();
  }, [subscriptionId, toast]);

  // Function to handle saving the subscription plan
  const handleSave = async () => {
    try {
      setIsSaving(true);

      const subscriptionData = {
        name,
        price,
        description,
        popular: isPopular,
        features: features.filter(f => f.trim() !== ''),
        not_included: notIncluded.filter(n => n.trim() !== ''),
      };

      if (subscriptionId) {
        // Update existing subscription
        await subscriptionPlansTable()
          .update(subscriptionData)
          .eq('id', subscriptionId);
          
        toast({
          title: 'Success',
          description: 'Subscription plan updated successfully!',
        });
      } else {
        // Create new subscription
        await subscriptionPlansTable().insert({
          id: Math.random().toString(36).substring(2, 15), // Generate a random ID
          ...subscriptionData,
        });
        
        toast({
          title: 'Success',
          description: 'Subscription plan created successfully!',
        });
      }

      navigate('/admin/subscriptions');
    } catch (error) {
      console.error('Error saving subscription:', error);
      toast({
        title: 'Error',
        description: 'Failed to save subscription plan. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Function to add a new feature input
  const addFeature = () => {
    setFeatures([...features, '']);
  };

  // Function to add a new "not included" input
  const addNotIncluded = () => {
    setNotIncluded([...notIncluded, '']);
  };

  // Function to update a feature at a specific index
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  // Function to update a "not included" item at a specific index
  const updateNotIncluded = (index: number, value: string) => {
    const newNotIncluded = [...notIncluded];
    newNotIncluded[index] = value;
    setNotIncluded(newNotIncluded);
  };

  // Function to remove a feature at a specific index
  const removeFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  // Function to remove a "not included" item at a specific index
  const removeNotIncluded = (index: number) => {
    const newNotIncluded = [...notIncluded];
    newNotIncluded.splice(index, 1);
    setNotIncluded(newNotIncluded);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              <Skeleton className="h-8 w-32" />
            </h1>
            <p className="text-muted-foreground">
              <Skeleton className="h-4 w-64" />
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-48" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-64" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    <Skeleton className="h-4 w-24" />
                  </Label>
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">
                    <Skeleton className="h-4 w-24" />
                  </Label>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  <Skeleton className="h-4 w-24" />
                </Label>
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-8 w-32" />
                </div>
                <div>
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{subscriptionId ? 'Edit Subscription Plan' : 'Create Subscription Plan'}</h1>
          <p className="text-muted-foreground">Manage subscription plans for your vendors</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{subscriptionId ? 'Edit Subscription Plan' : 'Create New Subscription Plan'}</CardTitle>
            <CardDescription>
              {subscriptionId ? 'Modify the details of an existing subscription plan' : 'Define a new subscription plan for your vendors'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={price.toString()}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isPopular">Popular Plan</Label>
                  <p className="text-sm text-muted-foreground">
                    Highlight this plan as a popular choice
                  </p>
                </div>
                <Switch
                  id="isPopular"
                  checked={isPopular}
                  onCheckedChange={setIsPopular}
                />
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...features];
                        newFeatures[index] = e.target.value;
                        setFeatures(newFeatures);
                      }}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newFeatures = [...features];
                        newFeatures.splice(index, 1);
                        setFeatures(newFeatures.length ? newFeatures : ['']);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="secondary" size="sm" onClick={() => setFeatures([...features, ''])}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Not Included</Label>
                {notIncluded.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newNotIncluded = [...notIncluded];
                        newNotIncluded[index] = e.target.value;
                        setNotIncluded(newNotIncluded);
                      }}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newNotIncluded = [...notIncluded];
                        newNotIncluded.splice(index, 1);
                        setNotIncluded(newNotIncluded.length ? newNotIncluded : ['']);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="secondary" size="sm" onClick={() => setNotIncluded([...notIncluded, ''])}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Subscription Plan'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
