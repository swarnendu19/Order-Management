
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Users, Package, CreditCard, PieChart, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const customers = useSelector((state: RootState) => state.customers.customers);
  const products = useSelector((state: RootState) => state.products.products);

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const shippedOrders = orders.filter(order => order.status === 'shipped').length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
  const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;

  // Data for charts
  const orderStatusData = [
    { name: 'Pending', value: pendingOrders, color: '#f59e0b' },
    { name: 'Shipped', value: shippedOrders, color: '#3b82f6' },
    { name: 'Delivered', value: deliveredOrders, color: '#10b981' },
    { name: 'Cancelled', value: cancelledOrders, color: '#ef4444' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">Welcome to the Order Management System</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard
          title="Total Orders"
          value={orders.length}
          icon={<ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-white" />}
          color="bg-blue-600"
          path="/orders"
        />
        <StatCard
          title="Total Customers"
          value={customers.length}
          icon={<Users className="w-6 h-6 md:w-8 md:h-8 text-white" />}
          color="bg-green-600"
          path="/customers"
        />
        <StatCard
          title="Total Products"
          value={products.length}
          icon={<Package className="w-6 h-6 md:w-8 md:h-8 text-white" />}
          color="bg-purple-600"
          path="/products"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<CreditCard className="w-6 h-6 md:w-8 md:h-8 text-white" />}
          color="bg-yellow-600"
          path="/orders"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-gray-800">Order Status</h2>
            <PieChart className="w-5 h-5 text-gray-500" />
          </div>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderStatusData} margin={{ top: 5, right: 5, left: 0, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-gray-800">Recent Activity</h2>
            <TrendingUp className="w-5 h-5 text-gray-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 md:px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-3 md:px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-3 md:px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 md:px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 truncate max-w-[80px] md:max-w-none">
                      <Link to="/orders" className="hover:text-blue-600">
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-900 truncate max-w-[80px] md:max-w-none">
                      {order.customerName}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full status-${order.status}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Link to="/orders" className="text-blue-600 hover:text-blue-800 text-xs md:text-sm font-medium">
              View All Orders →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, path }: { 
  title: string; 
  value: number | string; 
  icon: React.ReactNode; 
  color: string;
  path: string;
}) => {
  return (
    <Link to={path} className="block">
      <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex">
          <div className={`${color} p-3 md:p-4 flex items-center justify-center`}>
            {icon}
          </div>
          <div className="p-3 md:p-4 flex-1">
            <h3 className="text-xs md:text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-lg md:text-2xl font-bold text-gray-800">{value}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Dashboard;
