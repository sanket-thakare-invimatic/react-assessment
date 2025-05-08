import React from 'react';
import { Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const { Content } = Layout;

/**
 * PrivateLayout wraps private pages with Sidebar and checks authentication.
 */
const PrivateLayout: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Content style={{ background: '#f9f6fd', padding: 32, minHeight: '100vh' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default PrivateLayout; 