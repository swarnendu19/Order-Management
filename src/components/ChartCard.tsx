
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ChartCardProps {
  title: string;
  data: any[];
  dataKey: string;
  color?: string;
}

export const ChartCard = ({ title, data, dataKey, color = "#4F46E5" }: ChartCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-card border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color}
              fill={`${color}20`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
