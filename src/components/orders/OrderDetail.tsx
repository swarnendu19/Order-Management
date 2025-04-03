
import React from 'react';
import { X } from 'lucide-react';
import { Order } from '@/store/slices/orderSlice';
import { useIsMobile } from '@/hooks/use-mobile';

interface OrderDetailProps {
  order: Order;
  onClose: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onClose }) => {
  const isMobile = useIsMobile();

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 md:p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-800 truncate">
            Order: {order.id}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="flex flex-wrap -mx-2 md:-mx-3 mb-6">
            <div className="w-full md:w-1/2 px-2 md:px-3 mb-4 md:mb-0">
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg h-full">
                <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2 md:mb-3">Order Information</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-gray-600">Status:</div>
                  <div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-gray-600">Order Date:</div>
                  <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                  <div className="text-gray-600">Updated:</div>
                  <div>{new Date(order.updatedAt).toLocaleDateString()}</div>
                  <div className="text-gray-600">Payment Mode:</div>
                  <div>{order.paymentMode}</div>
                  <div className="text-gray-600">Payment Type:</div>
                  <div>{order.paymentType}</div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 px-2 md:px-3">
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg h-full">
                <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2 md:mb-3">Customer Information</h3>
                <div className="mb-2 md:mb-3">
                  <div className="text-sm text-gray-600">Name:</div>
                  <div className="font-medium">{order.customerName}</div>
                </div>
                <div className="mb-2 md:mb-3">
                  <div className="text-sm text-gray-600">Contact:</div>
                  <div>{order.mobileNumber}</div>
                  <div className="truncate">{order.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Shipping Address:</div>
                  <div>{order.addressLine1}</div>
                  {order.addressLine2 && <div>{order.addressLine2}</div>}
                  {order.addressLine3 && <div>{order.addressLine3}</div>}
                  <div>{order.city}, {order.state} {order.postalCode}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2 md:mb-3">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead>
                  <tr>
                    <th className="px-2 md:px-4 py-2 md:py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-gray-900">
                        {item.productName}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-gray-900">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 font-medium text-gray-900">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="px-2 md:px-4 py-2 md:py-3 text-right font-medium">
                      Order Total:
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-lg font-bold text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
