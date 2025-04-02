
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import SubscriptionForm from '@/components/admin/subscriptions/SubscriptionForm';

export default function CreateSubscription() {
  const navigate = useNavigate();
  const { id: subscriptionId } = useParams();

  const handleSuccess = () => {
    navigate('/admin/subscriptions');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{subscriptionId ? 'Edit Subscription Plan' : 'Create Subscription Plan'}</h1>
          <p className="text-muted-foreground">Manage subscription plans for your vendors</p>
        </div>

        <SubscriptionForm 
          subscriptionId={subscriptionId} 
          onSuccess={handleSuccess} 
        />
      </div>
    </AdminLayout>
  );
}
