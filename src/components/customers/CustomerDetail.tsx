
import React from 'react';
import { Customer } from '@/store/slices/customerSlice';
import { X, Edit, User, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BackgroundBeams } from '@/components/ui/background-beams';

interface CustomerDetailProps {
  customer: Customer;
  onClose: () => void;
  onEdit: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ 
  customer, 
  onClose,
  onEdit
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div 
        className="bg-gray-900 rounded-xl border border-blue-900/30 shadow-xl shadow-blue-900/10 w-full max-w-md max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between p-6 border-b border-blue-900/30">
          <h2 className="text-2xl font-semibold text-white">
            Customer Details
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 relative">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-900/20">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white">{customer.name}</h3>
            <p className="text-sm text-blue-400">{customer.id}</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start p-4 rounded-lg bg-blue-900/10 border border-blue-900/20">
              <Mail className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-300">Email</p>
                <p className="text-gray-200">{customer.email}</p>
              </div>
            </div>
            
            <div className="flex items-start p-4 rounded-lg bg-blue-900/10 border border-blue-900/20">
              <Phone className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-300">Phone Number</p>
                <p className="text-gray-200">{customer.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start p-4 rounded-lg bg-blue-900/10 border border-blue-900/20">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-300">Address</p>
                <p className="text-gray-200">{customer.address}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-blue-900/30">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 border-blue-900/30"
            >
              Close
            </Button>
            <Button 
              onClick={onEdit} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          
          <BackgroundBeams className="opacity-10" />
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerDetail;
