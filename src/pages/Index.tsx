
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from '@/store';
import Layout from '@/components/layout/Layout';
import Dashboard from './Dashboard';
import OrdersPage from './OrdersPage';

const Index = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/customers" element={<ComingSoon title="Customers" />} />
            <Route path="/products" element={<ComingSoon title="Products" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

// Placeholder for unimplemented sections
const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-64 bg-white p-8 rounded-lg shadow">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">{title} Section</h2>
    <p className="text-gray-600 text-center">
      This section is coming soon. We're currently implementing the Orders section as requested.
    </p>
  </div>
);

export default Index;
