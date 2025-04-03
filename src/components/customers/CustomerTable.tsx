
import React from 'react';
import { Customer } from '@/store/slices/customerSlice';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onView: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ 
  customers,
  onEdit,
  onDelete,
  onView
}) => {
  return (
    <>
      {/* Desktop table */}
      <table className="oms-table hidden md:table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td className="font-medium">{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td className="max-w-xs truncate">{customer.address}</td>
                <td className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 rounded-md hover:bg-gray-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(customer)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(customer)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(customer.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div key={customer.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{customer.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{customer.id}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1 rounded-md hover:bg-gray-100">
                    <MoreHorizontal className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(customer)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(customer)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(customer.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-sm"><span className="font-medium">Email:</span> {customer.email}</p>
                <p className="text-sm"><span className="font-medium">Phone:</span> {customer.phone}</p>
                <p className="text-sm"><span className="font-medium">Address:</span> {customer.address}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No customers found
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerTable;
