
import React from 'react';
import { CheckCircle } from 'lucide-react';  // Add missing import

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your customer dashboard</p>
      </div>
    </div>
  );
}
