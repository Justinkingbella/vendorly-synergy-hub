
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Check, Plus, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

// Mock subscription data for edit mode
const mockSubscriptionsById = {
  1: {
    name: 'Basic Plan',
    price: '199',
    description: 'Perfect for small vendors getting started',
    popular: false,
    features: ['Reduced commission rates (8.5%)', 'Up to 20 products', 'Basic analytics'],
    notIncluded: ['Priority support', 'Advanced analytics', 'Featured product placement']
  },
  2: {
    name: 'Premium Plan',
    price: '499',
    description: 'Best value for growing businesses',
    popular: true,
    features: ['Low commission rates (5%)', 'Unlimited products', 'Priority support', 'Advanced analytics'],
    notIncluded: ['Featured product placement']
  }
};

const CreateSubscription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [plan, setPlan] = useState(
    isEditMode && mockSubscriptionsById[Number(id)] ?
    mockSubscriptionsById[Number(id)] :
    {
      name: '',
      price: '',
      description: '',
      popular: false,
      features: [''],
      notIncluded: ['']
    }
  );

  const handleFeatureAdd = () => {
    setPlan({
      ...plan,
      features: [...plan.features, '']
    });
  };

  const handleFeatureRemove = (index: number) => {
    const updatedFeatures = [...plan.features];
    updatedFeatures.splice(index, 1);
    setPlan({
      ...plan,
      features: updatedFeatures
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...plan.features];
    updatedFeatures[index] = value;
    setPlan({
      ...plan,
      features: updatedFeatures
    });
  };

  const handleNotIncludedAdd = () => {
    setPlan({
      ...plan,
      notIncluded: [...plan.notIncluded, '']
    });
  };

  const handleNotIncludedRemove = (index: number) => {
    const updatedNotIncluded = [...plan.notIncluded];
    updatedNotIncluded.splice(index, 1);
    setPlan({
      ...plan,
      notIncluded: updatedNotIncluded
    });
  };

  const handleNotIncludedChange = (index: number, value: string) => {
    const updatedNotIncluded = [...plan.notIncluded];
    updatedNotIncluded[index] = value;
    setPlan({
      ...plan,
      notIncluded: updatedNotIncluded
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the plan
    console.log('Submitting plan:', plan);
    
    toast({
      title: isEditMode ? "Subscription Plan Updated" : "Subscription Plan Created",
      description: `The ${plan.name} plan has been ${isEditMode ? 'updated' : 'created'} successfully.`,
    });
    
    // Navigate back to subscriptions page
    navigate('/admin/subscriptions');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">{isEditMode ? 'Edit' : 'Create'} Subscription Plan</h1>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Plan Details</CardTitle>
              <CardDescription>{isEditMode ? 'Edit' : 'Create a new'} subscription plan for vendors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Plan Name</Label>
                  <Input 
                    id="name" 
                    value={plan.name} 
                    onChange={(e) => setPlan({...plan, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (N$)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={plan.price} 
                    onChange={(e) => setPlan({...plan, price: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={plan.description} 
                  onChange={(e) => setPlan({...plan, description: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="popular" 
                  checked={plan.popular} 
                  onCheckedChange={(checked) => setPlan({...plan, popular: checked})}
                />
                <Label htmlFor="popular">Mark as Popular</Label>
              </div>
              
              <div className="space-y-2">
                <Label>Features Included</Label>
                {plan.features.map((feature, index) => (
                  <div key={`feature-${index}`} className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <Input 
                      value={feature} 
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="e.g., Reduced commission rates (8.5%)"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleFeatureRemove(index)}
                      disabled={plan.features.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleFeatureAdd}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Not Included</Label>
                {plan.notIncluded.map((feature, index) => (
                  <div key={`not-included-${index}`} className="flex items-center space-x-2">
                    <X className="h-5 w-5 text-red-500 shrink-0" />
                    <Input 
                      value={feature} 
                      onChange={(e) => handleNotIncludedChange(index, e.target.value)}
                      placeholder="e.g., Priority support"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleNotIncludedRemove(index)}
                      disabled={plan.notIncluded.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNotIncludedAdd}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Not Included Feature
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/subscriptions')}
              >
                Cancel
              </Button>
              <Button type="submit">{isEditMode ? 'Update' : 'Create'} Subscription Plan</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateSubscription;
