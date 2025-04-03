
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Product, addProduct, updateProduct, deleteProduct } from '@/store/slices/productSlice';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Edit, Trash2, Eye } from 'lucide-react';
import ProductForm from '@/components/products/ProductForm';
import ProductTable from '@/components/products/ProductTable';
import ProductDetail from '@/components/products/ProductDetail';
import { toast } from 'sonner';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);
  
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
    toast.success('Product deleted successfully');
  };

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCloseDetail = () => {
    setViewingProduct(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your product inventory</p>
        </div>
        <Button 
          onClick={handleAddProduct} 
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-3 md:p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, description or category..."
              className="pl-10 p-2 text-sm w-full md:max-w-md rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <ProductTable 
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onView={handleViewProduct}
          />
        </div>
      </div>

      {showForm && (
        <ProductForm 
          product={editingProduct}
          onClose={handleCloseForm}
        />
      )}

      {viewingProduct && (
        <ProductDetail 
          product={viewingProduct}
          onClose={handleCloseDetail}
          onEdit={() => {
            handleCloseDetail();
            handleEditProduct(viewingProduct);
          }}
        />
      )}
    </div>
  );
};

export default ProductsPage;
