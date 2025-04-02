
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease';
  };
  colorClass?: string;
}

export const StatsCard = ({ title, value, icon: Icon, change, colorClass }: StatsCardProps) => {
  return (
    <div className="stats-card">
      <div className="flex items-center">
        <div className={cn(
          "p-2 rounded-md", 
          colorClass || "bg-primary/10 text-primary"
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <p className="ml-2 text-sm font-medium text-gray-500">{title}</p>
      </div>
      <div className="mt-2">
        <h3 className="text-2xl font-bold">{value}</h3>
        {change && (
          <div className="flex items-center mt-1">
            <span 
              className={cn(
                "text-xs font-medium",
                change.type === 'increase' ? "text-green-500" : "text-red-500"
              )}
            >
              {change.type === 'increase' ? '+' : '-'}{change.value}
            </span>
            <span className="ml-1 text-xs text-gray-500">since last month</span>
          </div>
        )}
      </div>
    </div>
  );
};
