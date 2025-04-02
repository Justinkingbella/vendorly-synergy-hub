
export interface SubscriptionPlanFormData {
  id?: string;
  name: string;
  price: number;
  description: string | null;
  popular: boolean;
  features: string[];
  not_included: string[];
}
