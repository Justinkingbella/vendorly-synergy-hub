
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { SubscriptionPlanFormData } from '@/types/subscription';
import FeatureListInput from './FeatureListInput';
import { useSubscriptionData } from '@/hooks/useSubscriptionData';

interface SubscriptionFormProps {
  subscriptionId?: string;
  onSuccess: () => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ 
  subscriptionId,
  onSuccess 
}) => {
  const { toast } = useToast();
  const {
    name, 
    setName,
    price, 
    setPrice,
    description, 
    setDescription,
    isPopular, 
    setIsPopular,
    features, 
    setFeatures,
    notIncluded, 
    setNotIncluded,
    isLoading,
    isSaving,
    fetchSubscription,
    saveSubscription
  } = useSubscriptionData(subscriptionId, onSuccess);

  useEffect(() => {
    if (subscriptionId) {
      fetchSubscription();
    }
  }, [subscriptionId]);

  const handleSave = async () => {
    await saveSubscription();
  };

  if (isLoading) {
    return (
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
    );
  }

  return (
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

          <FeatureListInput 
            label="Features" 
            items={features}
            onChange={setFeatures}
          />

          <FeatureListInput 
            label="Not Included" 
            items={notIncluded}
            onChange={setNotIncluded}
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Subscription Plan'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscriptionForm;
