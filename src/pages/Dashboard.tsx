
import React from 'react';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { ChartCard } from '../components/ChartCard';
import { TableCard } from '../components/TableCard';

// Sample data
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4000 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', date: '2023-06-15', status: 'Delivered', total: '$89.99' },
  { id: '#ORD-002', customer: 'Jane Smith', date: '2023-06-14', status: 'Processing', total: '$129.50' },
  { id: '#ORD-003', customer: 'Robert Johnson', date: '2023-06-14', status: 'Pending', total: '$45.00' },
  { id: '#ORD-004', customer: 'Emily Williams', date: '2023-06-13', status: 'Delivered', total: '$210.75' },
  { id: '#ORD-005', customer: 'Michael Brown', date: '2023-06-12', status: 'Cancelled', total: '$55.25' },
];

const orderColumns = [
  { accessorKey: 'id', header: 'Order ID' },
  { accessorKey: 'customer', header: 'Customer' },
  { accessorKey: 'date', header: 'Date' },
  { 
    accessorKey: 'status', 
    header: 'Status',
    cell: (info: any) => {
      const status = info.status;
      let statusClasses = 'px-2 py-1 text-xs font-medium rounded-full';
      
      switch (status) {
        case 'Delivered':
          statusClasses += ' bg-green-100 text-green-800';
          break;
        case 'Processing':
          statusClasses += ' bg-blue-100 text-blue-800';
          break;
        case 'Pending':
          statusClasses += ' bg-yellow-100 text-yellow-800';
          break;
        case 'Cancelled':
          statusClasses += ' bg-red-100 text-red-800';
          break;
        default:
          statusClasses += ' bg-gray-100 text-gray-800';
      }
      
      return <span className={statusClasses}>{status}</span>;
    }
  },
  { accessorKey: 'total', header: 'Total' },
];

const recentProducts = [
  { id: 'PRD-001', name: 'Wireless Headphones', category: 'Electronics', stock: 45, price: '$129.99' },
  { id: 'PRD-002', name: 'Smart Watch', category: 'Electronics', stock: 28, price: '$199.50' },
  { id: 'PRD-003', name: 'Yoga Mat', category: 'Fitness', stock: 65, price: '$35.00' },
  { id: 'PRD-004', name: 'Coffee Maker', category: 'Kitchen', stock: 12, price: '$89.99' },
  { id: 'PRD-005', name: 'Desk Lamp', category: 'Home Office', stock: 30, price: '$45.50' },
];

const productColumns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Product' },
  { accessorKey: 'category', header: 'Category' },
  { 
    accessorKey: 'stock', 
    header: 'Stock',
    cell: (info: any) => {
      const stock = info.stock;
      let textClass = '';
      
      if (stock <= 15) {
        textClass = 'text-red-600 font-medium';
      } else if (stock <= 30) {
        textClass = 'text-yellow-600 font-medium';
      } else {
        textClass = 'text-green-600 font-medium';
      }
      
      return <span className={textClass}>{stock}</span>;
    }
  },
  { accessorKey: 'price', header: 'Price' },
];

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome to your Order Management dashboard</p>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Customers" 
          value="1,248" 
          icon={Users} 
          change={{ value: "12%", type: "increase" }}
          colorClass="bg-blue-100 text-blue-600"
        />
        <StatsCard 
          title="Total Products" 
          value="684" 
          icon={Package}
          change={{ value: "8%", type: "increase" }}
          colorClass="bg-purple-100 text-purple-600"
        />
        <StatsCard 
          title="Total Orders" 
          value="3,672" 
          icon={ShoppingCart}
          change={{ value: "5%", type: "decrease" }}
          colorClass="bg-orange-100 text-orange-600"
        />
        <StatsCard 
          title="Revenue" 
          value="$243,748" 
          icon={DollarSign}
          change={{ value: "10%", type: "increase" }}
          colorClass="bg-green-100 text-green-600"
        />
      </div>
      
      {/* Chart row */}
      <div className="mb-6">
        <ChartCard 
          title="Revenue Overview" 
          data={revenueData} 
          dataKey="value" 
          color="#4338ca"
        />
      </div>
      
      {/* Tables row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TableCard 
          title="Recent Orders" 
          columns={orderColumns} 
          data={recentOrders} 
          viewAllLink="/orders"
        />
        <TableCard 
          title="Popular Products" 
          columns={productColumns} 
          data={recentProducts} 
          viewAllLink="/products"
        />
      </div>
    </div>
  );
};

export default Dashboard;
