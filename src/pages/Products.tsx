
import React, { useState } from 'react';
import { Search, PlusCircle, Filter, Download } from 'lucide-react';

// Sample data for products
const initialProducts = [
  { id: 'P001', name: 'Wireless Headphones', category: 'Electronics', price: '$129.99', stock: 45, status: 'In Stock' },
  { id: 'P002', name: 'Smart Watch', category: 'Electronics', price: '$199.50', stock: 28, status: 'In Stock' },
  { id: 'P003', name: 'Yoga Mat', category: 'Fitness', price: '$35.00', stock: 65, status: 'In Stock' },
  { id: 'P004', name: 'Coffee Maker', category: 'Kitchen', price: '$89.99', stock: 12, status: 'Low Stock' },
  { id: 'P005', name: 'Desk Lamp', category: 'Home Office', price: '$45.50', stock: 30, status: 'In Stock' },
  { id: 'P006', name: 'Bluetooth Speaker', category: 'Electronics', price: '$79.99', stock: 18, status: 'In Stock' },
  { id: 'P007', name: 'Fitness Tracker', category: 'Fitness', price: '$59.99', stock: 8, status: 'Low Stock' },
  { id: 'P008', name: 'Stainless Steel Water Bottle', category: 'Kitchen', price: '$25.00', stock: 40, status: 'In Stock' },
  { id: 'P009', name: 'Wireless Mouse', category: 'Electronics', price: '$49.99', stock: 22, status: 'In Stock' },
  { id: 'P010', name: 'Mechanical Keyboard', category: 'Electronics', price: '$129.99', stock: 5, status: 'Low Stock' },
  { id: 'P011', name: 'Office Chair', category: 'Home Office', price: '$249.99', stock: 0, status: 'Out of Stock' },
  { id: 'P012', name: 'Air Purifier', category: 'Home', price: '$189.99', stock: 7, status: 'Low Stock' },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(initialProducts);
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-gray-500">Manage your product inventory</p>
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
            placeholder="Search products..."
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
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>
      
      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-card border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === 'In Stock' 
                      ? 'bg-green-100 text-green-800'
                      : product.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{product.stock} in stock</span>
                </div>
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="mt-6 flex justify-center">
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
  );
};

export default Products;
