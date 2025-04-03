
import React from 'react';
import { Product } from '@/store/slices/productSlice';
import { X, Edit, Package, Tag, ShoppingBag, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onEdit: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onClose,
  onEdit
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            Product Details
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.id}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Tag className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Category</p>
                <p className="text-gray-800">{product.category}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <DollarSign className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Price</p>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <ShoppingBag className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Stock</p>
                <p className="text-gray-800">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 0 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock} units
                  </span>
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Description</p>
              <p className="text-gray-800 text-sm">{product.description}</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={onEdit} className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
