import React from 'react';
import { Card, Row, Col, Typography, Avatar } from 'antd';
import { UserOutlined, MailOutlined, CalendarOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';

/**
 * Home page displays user details in a 2-column format.
 * User details are retrieved from localStorage (set on login/register).
 */
const Home: React.FC = () => {
  // Try to get user details from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Helper to get gender icon
  const genderIcon = (gender: string) => {
    if (gender === 'male') return <ManOutlined style={{ color: '#6366f1' }} />;
    if (gender === 'female') return <WomanOutlined style={{ color: '#d946ef' }} />;
    return <UserOutlined />;
  };

  return (
    <Card
      title={<span><UserOutlined /> User Details</span>}
      style={{ width: '80%', maxWidth: 900, margin: 'auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px #a78bfa22' }}
      headStyle={{ background: '#ede9fe', fontWeight: 700, fontSize: 20 }}
    >
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Typography.Text strong>First Name:</Typography.Text>
          <div>{user.firstName || '-'}</div>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Last Name:</Typography.Text>
          <div>{user.lastName || '-'}</div>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Email:</Typography.Text>
          <div><MailOutlined /> {user.email || '-'}</div>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Status:</Typography.Text>
          <div>{user.status || '-'}</div>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Last Login:</Typography.Text>
          <div>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '-'}</div>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Created At:</Typography.Text>
          <div>{user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</div>
        </Col>
        <Col span={12}>
          <Typography.Text strong>Updated At:</Typography.Text>
          <div>{user.updatedAt ? new Date(user.updatedAt).toLocaleString() : '-'}</div>
        </Col>
      </Row>
    </Card>
  );
};

export default Home; 