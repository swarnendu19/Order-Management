
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Plus, Trash2 } from 'lucide-react';
import { 
  Order, 
  OrderItem, 
  OrderStatus, 
  addOrder, 
  updateOrder 
} from '@/store/slices/orderSlice';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';

interface OrderFormProps {
  order?: Order | null;
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ order, onClose }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customers.customers);
  const products = useSelector((state: RootState) => state.products.products);
  
  const [formData, setFormData] = useState<Partial<Order>>({
    id: '',
    customerId: '',
    customerName: '',
    items: [],
    status: 'pending',
    paymentMode: '',
    paymentType: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    postalCode: '',
    city: '',
    state: '',
    mobileNumber: '',
    email: '',
    total: 0
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with order data if editing
  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      // Generate new order ID if creating
      const newOrderId = `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      setFormData({
        ...formData,
        id: newOrderId,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: []
      });
    }
  }, [order]);

  // Update customer name when customer is selected
  useEffect(() => {
    if (formData.customerId) {
      const selectedCustomer = customers.find(c => c.id === formData.customerId);
      if (selectedCustomer) {
        setFormData(prev => ({
          ...prev,
          customerName: selectedCustomer.name,
          email: selectedCustomer.email,
          mobileNumber: selectedCustomer.phone
        }));
      }
    }
  }, [formData.customerId, customers]);

  // Calculate total whenever items change
  useEffect(() => {
    if (formData.items && formData.items.length > 0) {
      const total = formData.items.reduce((sum, item) => sum + item.total, 0);
      setFormData(prev => ({ ...prev, total }));
    } else {
      setFormData(prev => ({ ...prev, total: 0 }));
    }
  }, [formData.items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const customerId = e.target.value;
    setFormData({ ...formData, customerId });
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...(prev.items || []),
        {
          productId: '',
          productName: '',
          quantity: 1,
          price: 0,
          discount: 0,
          total: 0
        }
      ]
    }));
  };

  const removeItem = (index: number) => {
    const updatedItems = [...(formData.items || [])];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: any) => {
    const updatedItems = [...(formData.items || [])];
    const item = { ...updatedItems[index], [field]: value };
    
    // Update product name and price if product is selected
    if (field === 'productId') {
      const selectedProduct = products.find(p => p.id === value);
      if (selectedProduct) {
        item.productName = selectedProduct.name;
        item.price = selectedProduct.price;
      }
    }
    
    // Recalculate item total
    if (field === 'quantity' || field === 'price' || field === 'discount') {
      const quantity = field === 'quantity' ? Number(value) : item.quantity;
      const price = field === 'price' ? Number(value) : item.price;
      const discount = field === 'discount' ? Number(value) : item.discount;
      item.total = (quantity * price) - discount;
    }
    
    updatedItems[index] = item;
    setFormData({ ...formData, items: updatedItems });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerId) newErrors.customerId = 'Customer is required';
    if (!formData.paymentMode) newErrors.paymentMode = 'Payment mode is required';
    if (!formData.paymentType) newErrors.paymentType = 'Payment type is required';
    if (!formData.addressLine1) newErrors.addressLine1 = 'Address line 1 is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!formData.mobileNumber || !phoneRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Valid phone number is required (format: 555-123-4567)';
    }
    
    if (!formData.items || formData.items.length === 0) {
      newErrors.items = 'At least one item is required';
    } else {
      formData.items.forEach((item, index) => {
        if (!item.productId) {
          newErrors[`item-${index}-productId`] = 'Product is required';
        }
        if (item.quantity <= 0) {
          newErrors[`item-${index}-quantity`] = 'Quantity must be greater than 0';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    const orderData: Order = {
      ...formData as Order,
      updatedAt: new Date().toISOString()
    };
    
    if (order) {
      // Update existing order
      dispatch(updateOrder(orderData));
      toast.success('Order updated successfully');
    } else {
      // Add new order
      orderData.createdAt = new Date().toISOString();
      dispatch(addOrder(orderData));
      toast.success('Order created successfully');
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            {order ? 'Edit Order' : 'Create New Order'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order ID
              </label>
              <Input
                value={formData.id || ''}
                readOnly
                className="bg-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name *
              </label>
              <select
                name="customerId"
                value={formData.customerId || ''}
                onChange={handleCustomerChange}
                className={`w-full p-2 border rounded-md ${
                  errors.customerId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Client</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              {errors.customerId && (
                <p className="text-red-500 text-xs mt-1">{errors.customerId}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status || 'pending'}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Order Items</h3>
            {errors.items && (
              <p className="text-red-500 text-xs mb-2">{errors.items}</p>
            )}
            
            <div className="border border-gray-200 rounded-md p-4 mb-4">
              {formData.items && formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 mb-3 items-center">
                  <div className="col-span-4">
                    <select
                      value={item.productId || ''}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      className={`w-full p-2 border rounded-md ${
                        errors[`item-${index}-productId`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Product</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    {errors[`item-${index}-productId`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`item-${index}-productId`]}</p>
                    )}
                  </div>
                  
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                      placeholder="Qty"
                      min="1"
                      className={`w-full ${
                        errors[`item-${index}-quantity`] ? 'border-red-500' : ''
                      }`}
                    />
                    {errors[`item-${index}-quantity`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`item-${index}-quantity`]}</p>
                    )}
                  </div>
                  
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                      placeholder="Price"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.discount}
                      onChange={(e) => handleItemChange(index, 'discount', Number(e.target.value))}
                      placeholder="Discount"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="col-span-1 font-medium">
                    ${item.total.toFixed(2)}
                  </div>
                  
                  <div className="col-span-1">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addItem}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Product
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Payment Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Mode *
                  </label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode || ''}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.paymentMode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                  {errors.paymentMode && (
                    <p className="text-red-500 text-xs mt-1">{errors.paymentMode}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Type *
                  </label>
                  <select
                    name="paymentType"
                    value={formData.paymentType || ''}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.paymentType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Payment Type</option>
                    <option value="Full Payment">Full Payment</option>
                    <option value="Installment">Installment</option>
                    <option value="Partial Payment">Partial Payment</option>
                  </select>
                  {errors.paymentType && (
                    <p className="text-red-500 text-xs mt-1">{errors.paymentType}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Client Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <Input
                    name="mobileNumber"
                    value={formData.mobileNumber || ''}
                    onChange={handleChange}
                    placeholder="555-123-4567"
                    className={errors.mobileNumber ? 'border-red-500' : ''}
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    placeholder="client@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Shipping Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1 *
                </label>
                <Input
                  name="addressLine1"
                  value={formData.addressLine1 || ''}
                  onChange={handleChange}
                  placeholder="Street address"
                  className={errors.addressLine1 ? 'border-red-500' : ''}
                />
                {errors.addressLine1 && (
                  <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <Input
                  name="addressLine2"
                  value={formData.addressLine2 || ''}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 3
                </label>
                <Input
                  name="addressLine3"
                  value={formData.addressLine3 || ''}
                  onChange={handleChange}
                  placeholder="Additional address info"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code *
                </label>
                <Input
                  name="postalCode"
                  value={formData.postalCode || ''}
                  onChange={handleChange}
                  placeholder="Postal code"
                  className={errors.postalCode ? 'border-red-500' : ''}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <Input
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  placeholder="City"
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <Input
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  placeholder="State"
                  className={errors.state ? 'border-red-500' : ''}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-lg font-semibold">
              Total: ${formData.total?.toFixed(2) || '0.00'}
            </div>
            
            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-oms-blue hover:bg-blue-700">
                {order ? 'Update Order' : 'Create Order'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
