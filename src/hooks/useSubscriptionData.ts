
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionPlanFormData } from '@/types/subscription';
import { SubscriptionPlanRow, subscriptionPlansTable } from '@/integrations/supabase/client';

export const useSubscriptionData = (subscriptionId?: string, onSuccess?: () => void) => {
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
        
        if (data) {
          // Set subscription data with type safety
          const subscription = data as unknown as SubscriptionPlanRow;
          setName(subscription.name || '');
          setPrice(typeof subscription.price === 'number' ? subscription.price : 0);
          setDescription(subscription.description || '');
          setIsPopular(Boolean(subscription.popular));
          
          // Handle arrays from database with null checks
          if (subscription.features && Array.isArray(subscription.features)) {
            setFeatures(subscription.features.length > 0 ? subscription.features as string[] : ['']);
          }
          
          if (subscription.not_included && Array.isArray(subscription.not_included)) {
            setNotIncluded(subscription.not_included.length > 0 ? subscription.not_included as string[] : ['']);
          }
        }
      } catch (err) {
        console.error('Failed to fetch subscription:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Function to handle saving the subscription plan
  const saveSubscription = async () => {
    try {
      setIsSaving(true);

      const subscriptionData: SubscriptionPlanFormData = {
        name,
        price,
        description,
        popular: isPopular,
        features: features.filter(f => f.trim() !== ''),
        not_included: notIncluded.filter(n => n.trim() !== ''),
      };

      if (subscriptionId) {
        // Update existing subscription
        const { error } = await subscriptionPlansTable()
          .update(subscriptionData)
          .eq('id', subscriptionId);
          
        if (error) {
          throw error;
        }
          
        toast({
          title: 'Success',
          description: 'Subscription plan updated successfully!',
        });
      } else {
        // Create new subscription
        const { error } = await subscriptionPlansTable()
          .insert(subscriptionData);
          
        if (error) {
          throw error;
        }
        
        toast({
          title: 'Success',
          description: 'Subscription plan created successfully!',
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error saving subscription:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save subscription plan. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
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
  };
};
