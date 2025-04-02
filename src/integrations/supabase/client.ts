
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

const SUPABASE_URL = "https://qkzjmedpwqskvbqwtujr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFremptZWRwd3Fza3ZicXd0dWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MTcyNjAsImV4cCI6MjA1OTA5MzI2MH0.iFChdfKR_KIix9V3Ltx6qcj4q8w4P-OvaK-0pTHVFHc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Type definition helper functions
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// Direct database access helper that handles untyped tables
export const rawQuery = {
  from: (tableName: string) => {
    return {
      select: (columns = '*') => supabase.from(tableName).select(columns),
      insert: (values: any, options?: any) => supabase.from(tableName).insert(values, options),
      update: (values: any) => supabase.from(tableName).update(values),
      delete: () => supabase.from(tableName).delete(),
      eq: (column: string, value: any) => {
        const query = supabase.from(tableName);
        return query.select('*').eq(column, value);
      },
      single: () => {
        const query = supabase.from(tableName);
        return query.select('*').single();
      },
      order: (column: string, options?: { ascending?: boolean }) => {
        const query = supabase.from(tableName);
        return query.select('*').order(column, options);
      },
      limit: (count: number) => {
        const query = supabase.from(tableName);
        return query.select('*').limit(count);
      },
    };
  }
};

// Custom type definitions for tables not yet in types.ts
// These will be used until the types.ts file is regenerated with the new tables

// Interface for store_theme_settings table
export interface StoreThemeSettingsRow {
  id: string;
  mode: 'light' | 'dark' | 'system';
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_family: string;
  border_radius: string;
  custom_css?: string;
  created_at: string;
  updated_at: string;
}

export interface StoreThemeSettingsInsert {
  id?: string;
  mode?: 'light' | 'dark' | 'system';
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  font_family?: string;
  border_radius?: string;
  custom_css?: string;
  created_at?: string;
  updated_at?: string;
}

// Interface for subscription_plans table
export interface SubscriptionPlanRow {
  id: string;
  name: string;
  price: number;
  description?: string;
  popular?: boolean;
  features: string[];
  not_included: string[];
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlanInsert {
  id?: string;
  name: string;
  price: number;
  description?: string;
  popular?: boolean;
  features?: string[];
  not_included?: string[];
  created_at?: string;
  updated_at?: string;
}

// Type-safe standard app_settings table functions 
export const appSettingsTable = () => {
  const query = supabase.from('app_settings');
  
  return {
    select: (columns = '*') => query.select(columns),
    insert: (values: InsertTables<'app_settings'>) => query.insert(values),
    update: (values: UpdateTables<'app_settings'>) => query.update(values),
    delete: () => query.delete(),
    eq: (column: string, value: any) => query.eq(column, value),
    single: () => query.select('*').single(),
    order: (column: string, options?: { ascending?: boolean }) => query.select('*').order(column, options),
    limit: (count: number) => query.select('*').limit(count),
  };
};
export type AppSetting = Tables<'app_settings'>;
export type InsertAppSetting = InsertTables<'app_settings'>;
export type UpdateAppSetting = UpdateTables<'app_settings'>;

// Custom wrapper for subscription_plans table
export const subscriptionPlansTable = () => {
  return {
    select: (columns = '*') => rawQuery.from('subscription_plans').select(columns),
    insert: (values: SubscriptionPlanInsert | SubscriptionPlanInsert[]) => {
      return rawQuery.from('subscription_plans').insert(values);
    },
    update: (values: Partial<SubscriptionPlanInsert>) => rawQuery.from('subscription_plans').update(values),
    delete: () => rawQuery.from('subscription_plans').delete(),
    eq: (column: string, value: any) => rawQuery.from('subscription_plans').eq(column, value),
    single: () => rawQuery.from('subscription_plans').single(),
    order: (column: string, options?: { ascending?: boolean }) => 
      rawQuery.from('subscription_plans').order(column, options),
    limit: (count: number) => rawQuery.from('subscription_plans').limit(count),
  };
};
export type SubscriptionPlan = SubscriptionPlanRow;

// Custom wrapper for store_theme_settings table
export const storeThemeSettingsTable = () => {
  return {
    select: (columns = '*') => rawQuery.from('store_theme_settings').select(columns),
    insert: (values: StoreThemeSettingsInsert | StoreThemeSettingsInsert[]) => {
      return rawQuery.from('store_theme_settings').insert(values);
    },
    update: (values: Partial<StoreThemeSettingsInsert>) => rawQuery.from('store_theme_settings').update(values),
    delete: () => rawQuery.from('store_theme_settings').delete(),
    eq: (column: string, value: any) => rawQuery.from('store_theme_settings').eq(column, value),
    single: () => rawQuery.from('store_theme_settings').single(),
    order: (column: string, options?: { ascending?: boolean }) => 
      rawQuery.from('store_theme_settings').order(column, options),
    limit: (count: number) => rawQuery.from('store_theme_settings').limit(count),
  };
};
export type StoreThemeSetting = StoreThemeSettingsRow;

