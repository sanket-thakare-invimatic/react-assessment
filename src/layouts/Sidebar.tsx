import React, { useState } from 'react';
import { Layout, Menu, Button, Tooltip } from 'antd';
import {
  HomeOutlined,
  AppstoreAddOutlined,
  VerticalAlignBottomOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

// Navigation items config
const navItems = [
  {
    key: '/',
    icon: <HomeOutlined style={{ fontSize: 28 }} />, // Home
    label: 'Home',
  },
  {
    key: '/drag-drop',
    icon: <AppstoreAddOutlined style={{ fontSize: 28 }} />, // Drag and Drop
    label: 'Drag & Drop',
  },
  {
    key: '/infinite-scroll',
    icon: <VerticalAlignBottomOutlined style={{ fontSize: 28 }} />, // Infinite Scroll
    label: 'Infinite Scroll',
  },
];

/**
 * Sidebar with expand/collapse, navigation, and logout.
 * Only visible to authenticated users.
 */
const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle navigation
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={220}
      collapsedWidth={90}
      style={{
        background: '#7c3aed',
        minHeight: '100vh',
        boxShadow: '2px 0 8px #a78bfa22',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
      }}
      trigger={null}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Expand/Collapse Button at the top (no Home icon) */}
        <div style={{ padding: 16, textAlign: 'center', cursor: 'pointer' }} onClick={() => setCollapsed(!collapsed)}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: 24, color: '#fff' }} /> : <MenuFoldOutlined style={{ fontSize: 24, color: '#fff' }} />}
            style={{ background: 'none', border: 'none' }}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          />
        </div>
        {/* Navigation Menu */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          style={{ background: 'transparent', flex: 1, borderRight: 0 }}
        >
          {navItems.map(item => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              style={{
                margin: '16px 0',
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 16,
                color: location.pathname === item.key ? '#fff' : '#ede9fe',
                background: location.pathname === item.key ? '#a78bfa' : 'transparent',
                transition: 'background 0.2s, color 0.2s',
              }}
              className="sidebar-menu-item"
            >
              {!collapsed && item.label}
            </Menu.Item>
          ))}
        </Menu>
        {/* Logout Button */}
        <div style={{ padding: 16, textAlign: 'center', marginTop: 'auto' }}>
          <Tooltip title="Logout" placement="right">
            <Button
              type="text"
              icon={<LogoutOutlined style={{ fontSize: 28, color: '#e11d48' }} />}
              onClick={handleLogout}
              style={{ background: 'none', border: 'none' }}
              aria-label="Logout"
            >
              {!collapsed && <span style={{ color: '#e11d48', marginLeft: 8, fontWeight: 600 }}>Logout</span>}
            </Button>
          </Tooltip>
        </div>
      </div>
      {/* Custom CSS for hover/active effects */}
      <style>{`
        .sidebar-menu-item.ant-menu-item-selected {
          background: #a78bfa !important;
          color: #fff !important;
        }
        .sidebar-menu-item:hover {
          background: #c4b5fd !important;
          color: #fff !important;
        }
      `}</style>
    </Sider>
  );
};

export default Sidebar; 