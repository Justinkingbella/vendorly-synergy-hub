
-- Create store theme settings table
CREATE TABLE IF NOT EXISTS public.store_theme_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mode TEXT NOT NULL DEFAULT 'light',
  primary_color TEXT NOT NULL DEFAULT '#3b82f6',
  secondary_color TEXT NOT NULL DEFAULT '#10b981',
  accent_color TEXT NOT NULL DEFAULT '#f59e0b',
  font_family TEXT NOT NULL DEFAULT 'Inter, sans-serif',
  border_radius TEXT NOT NULL DEFAULT '0.5rem',
  custom_css TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.store_theme_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Anyone can view store theme settings
CREATE POLICY "Anyone can view store theme settings" ON public.store_theme_settings
  FOR SELECT USING (true);

-- Only admins can manage store theme settings
CREATE POLICY "Admins can manage store theme settings" ON public.store_theme_settings
  FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()) = 'admin');
