
import React, { useState } from 'react';
import { Search, UserPlus, Filter, Download } from 'lucide-react';

// Sample data for customers
const initialCustomers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '(555) 123-4567', orders: 12, spent: '$2,345.00', lastOrder: '2023-06-10', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '(555) 987-6543', orders: 8, spent: '$1,290.50', lastOrder: '2023-06-08', status: 'Active' },
  { id: 3, name: 'Robert Johnson', email: 'robert.j@example.com', phone: '(555) 456-7890', orders: 5, spent: '$760.25', lastOrder: '2023-06-05', status: 'Active' },
  { id: 4, name: 'Emily Williams', email: 'emily.w@example.com', phone: '(555) 234-5678', orders: 3, spent: '$350.75', lastOrder: '2023-05-30', status: 'Inactive' },
  { id: 5, name: 'Michael Brown', email: 'michael.b@example.com', phone: '(555) 876-5432', orders: 7, spent: '$925.00', lastOrder: '2023-06-01', status: 'Active' },
  { id: 6, name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '(555) 345-6789', orders: 9, spent: '$1,570.80', lastOrder: '2023-06-07', status: 'Active' },
  { id: 7, name: 'David Lee', email: 'david.l@example.com', phone: '(555) 567-8901', orders: 4, spent: '$420.30', lastOrder: '2023-05-25', status: 'Inactive' },
  { id: 8, name: 'Amanda Clark', email: 'amanda.c@example.com', phone: '(555) 678-9012', orders: 11, spent: '$1,890.45', lastOrder: '2023-06-09', status: 'Active' },
  { id: 9, name: 'James Wilson', email: 'james.w@example.com', phone: '(555) 789-0123', orders: 6, spent: '$870.90', lastOrder: '2023-06-02', status: 'Active' },
  { id: 10, name: 'Lisa Martinez', email: 'lisa.m@example.com', phone: '(555) 890-1234', orders: 2, spent: '$180.25', lastOrder: '2023-05-20', status: 'Inactive' },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState(initialCustomers);
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-gray-500">Manage your customer information</p>
      </div>
      
      {/* Action bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-64 flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="search"
            className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="px-3 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 flex items-center">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>
      
      {/* Customers table */}
      <div className="bg-white overflow-hidden shadow-card rounded-lg border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-accent/10 flex items-center justify-center text-accent font-medium">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.spent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      customer.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-primary hover:text-primary/80">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{filteredCustomers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-primary text-white relative inline-flex items-center px-4 py-2 border border-primary text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
