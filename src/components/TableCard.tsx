
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TableColumn {
  accessorKey: string;
  header: string;
  cell?: (info: any) => React.ReactNode;
}

interface TableCardProps {
  title: string;
  columns: TableColumn[];
  data: any[];
  viewAllLink: string;
  viewAllText?: string;
}

export const TableCard = ({ 
  title, 
  columns, 
  data, 
  viewAllLink,
  viewAllText = "View All" 
}: TableCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Link 
          to={viewAllLink}
          className="text-sm font-medium text-primary flex items-center hover:underline"
        >
          {viewAllText}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-xs bg-gray-50 text-gray-500 uppercase">
            <tr>
              {columns.map((column, i) => (
                <th 
                  key={i} 
                  className="px-4 py-3 text-left font-medium"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 text-sm">
                      {column.cell ? column.cell(row) : row[column.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length}
                  className="px-4 py-3 text-sm text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
