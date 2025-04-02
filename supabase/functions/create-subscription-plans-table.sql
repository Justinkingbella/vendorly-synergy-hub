
-- Create subscription plans table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  description TEXT,
  popular BOOLEAN DEFAULT false,
  features JSONB DEFAULT '[]'::jsonb,
  not_included JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Anyone can view subscription plans
CREATE POLICY "Anyone can view subscription plans" ON public.subscription_plans
  FOR SELECT USING (true);

-- Only admins can manage subscription plans
CREATE POLICY "Admins can manage subscription plans" ON public.subscription_plans
  FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');
