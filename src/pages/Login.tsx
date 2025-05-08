import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Typography, Alert, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Login page for users.
 * Uses Formik for form state, Yup for validation, Ant Design for UI, and Axios for API.
 */
const Login: React.FC = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  // Validation schema for the form
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)' }}>
      <div style={{ maxWidth: 400, width: '100%', padding: 32, background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px #a78bfa44', position: 'relative', animation: 'fadeIn 1s' }}>
        {/* Site Logo with animation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <LoginOutlined style={{ fontSize: 48, color: '#7c3aed', animation: 'bounce 1.2s' }} />
        </div>
        <Typography.Title level={2} style={{ color: '#7c3aed', textAlign: 'center', marginBottom: 8 }}>Login</Typography.Title>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setApiError(null);
            setApiSuccess(null);
            try {
              const response = await axios.post('https://second-brain-web.onrender.com/api/auth/login', values);
              // On success, store token and user details and redirect
              localStorage.setItem('token', response.data.token);
              if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
              }
              setApiSuccess('Login successful! Redirecting...');
              setTimeout(() => navigate('/'), 1200);
            } catch (error: any) {
              setApiError(error.response?.data?.message || 'Login failed. Please try again.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {apiError && <Alert message={apiError} type="error" showIcon />}
                {apiSuccess && <Alert message={apiSuccess} type="success" showIcon />}
                <div>
                  <Field name="email">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        placeholder="Email"
                        size="large"
                        prefix={<UserOutlined style={{ color: '#a78bfa' }} />}
                        autoComplete="email"
                      />
                    )}
                  </Field>
                  <div style={{ color: '#d32f2f', fontSize: 12 }}>
                    <ErrorMessage name="email" component="div" />
                  </div>
                </div>
                <div>
                  <Field name="password">
                    {({ field }: any) => (
                      <Input.Password
                        {...field}
                        placeholder="Password"
                        size="large"
                        prefix={<LockOutlined style={{ color: '#a78bfa' }} />}
                        iconRender={visible => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                        autoComplete="current-password"
                      />
                    )}
                  </Field>
                  <div style={{ color: '#d32f2f', fontSize: 12 }}>
                    <ErrorMessage name="password" component="div" />
                  </div>
                </div>
                <Button type="primary" htmlType="submit" block size="large" loading={isSubmitting} style={{ background: '#7c3aed', borderColor: '#7c3aed', transition: 'background 0.3s' }}>
                  Login
                </Button>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <Link to="/register"><UserOutlined /> New user? Register</Link>
                  <Link to="/forgot-password"><LockOutlined /> Forgot password?</Link>
                </div>
              </Space>
            </Form>
          )}
        </Formik>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </div>
  );
};

export default Login; 