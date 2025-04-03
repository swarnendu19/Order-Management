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
        return 'bg-amber-600 text-amber-50';
      case 'shipped':
        return 'bg-blue-600 text-blue-50';
      case 'delivered':
        return 'bg-green-600 text-green-50';
      case 'cancelled':
        return 'bg-red-600 text-red-50';
      default:
        return 'bg-gray-600 text-gray-50';
    }
  };

  return (
    <div className="fixed inset-0   bg-opacity-70 flex items-center justify-center z-50 p-3 md:p-6 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-lg shadow-xl border border-blue-500 w-full max-w-4xl max-h-[90vh] overflow-y-auto text-gray-100">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-blue-700 bg-gray-800">
          <h2 className="text-lg md:text-2xl font-semibold text-blue-300 truncate">
            Order: {order.id}
          </h2>
          <button onClick={onClose} className="text-blue-400 hover:text-blue-200 transition-colors">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="flex flex-wrap -mx-2 md:-mx-3 mb-6">
            <div className="w-full md:w-1/2 px-2 md:px-3 mb-4 md:mb-0">
              <div className="bg-gray-800 p-3 md:p-4 rounded-lg h-full border-l-4 border-blue-500">
                <h3 className="text-base md:text-lg font-medium text-blue-300 mb-2 md:mb-3">Order Information</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-gray-400">Status:</div>
                  <div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-gray-400">Order Date:</div>
                  <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                  <div className="text-gray-400">Updated:</div>
                  <div>{new Date(order.updatedAt).toLocaleDateString()}</div>
                  <div className="text-gray-400">Payment Mode:</div>
                  <div>{order.paymentMode}</div>
                  <div className="text-gray-400">Payment Type:</div>
                  <div>{order.paymentType}</div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 px-2 md:px-3">
              <div className="bg-gray-800 p-3 md:p-4 rounded-lg h-full border-l-4 border-blue-500">
                <h3 className="text-base md:text-lg font-medium text-blue-300 mb-2 md:mb-3">Customer Information</h3>
                <div className="mb-2 md:mb-3">
                  <div className="text-sm text-gray-400">Name:</div>
                  <div className="font-medium">{order.customerName}</div>
                </div>
                <div className="mb-2 md:mb-3">
                  <div className="text-sm text-gray-400">Contact:</div>
                  <div>{order.mobileNumber}</div>
                  <div className="truncate">{order.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Shipping Address:</div>
                  <div>{order.addressLine1}</div>
                  {order.addressLine2 && <div>{order.addressLine2}</div>}
                  {order.addressLine3 && <div>{order.addressLine3}</div>}
                  <div>{order.city}, {order.state} {order.postalCode}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-medium text-blue-300 mb-2 md:mb-3">Order Items</h3>
            <div className="overflow-x-auto rounded-lg border border-blue-800">
              <table className="min-w-full divide-y divide-blue-900 text-sm">
                <thead>
                  <tr>
                    <th className="px-2 md:px-4 py-2 md:py-3 bg-gray-800 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 bg-gray-800 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 bg-gray-800 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-2 md:px-4 py-2 md:py-3 bg-gray-800 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-blue-900">
                  {order.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-800 transition-colors">
                      <td className="px-2 md:px-4 py-2 md:py-3 text-gray-200">
                        {item.productName}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-gray-200">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-gray-200">
                        {item.quantity}
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 font-medium text-gray-200">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-800">
                  <tr>
                    <td colSpan={3} className="px-2 md:px-4 py-2 md:py-3 text-right font-medium text-gray-300">
                      Order Total:
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-lg font-bold text-blue-300">
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