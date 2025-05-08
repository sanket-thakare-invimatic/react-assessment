import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Typography, Space, message } from 'antd';
import { MailOutlined, LoginOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

/**
 * Forgot Password page for users.
 * Uses Formik for form state, Yup for validation, Ant Design for UI, and Axios for API.
 */
const ForgotPassword: React.FC = () => {
  // Validation schema for the form
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)' }}>
      <div style={{ maxWidth: 400, width: '100%', padding: 32, background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px #a78bfa44', position: 'relative', animation: 'fadeIn 1s' }}>
        {/* Site Logo with animation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <LoginOutlined style={{ fontSize: 48, color: '#7c3aed', animation: 'bounce 1.2s' }} />
        </div>
        <Typography.Title level={2} style={{ color: '#7c3aed', textAlign: 'center', marginBottom: 8 }}>Forgot Password</Typography.Title>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await axios.post('https://second-brain-web.onrender.com/api/auth/forgot-password', { email: values.email });
              message.success('Password reset link sent to your email!');
              resetForm();
            } catch (error: any) {
              message.error(error.response?.data?.message || 'Failed to send reset link. Please try again.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Field name="email">
                    {({ field }: any) => (
                      <Input {...field} placeholder="Email" size="large" prefix={<MailOutlined />} autoComplete="email" />
                    )}
                  </Field>
                  <div style={{ color: '#d32f2f', fontSize: 12 }}>
                    <ErrorMessage name="email" component="div" />
                  </div>
                </div>
                <Button type="primary" htmlType="submit" block size="large" loading={isSubmitting} style={{ background: '#7c3aed', borderColor: '#7c3aed', transition: 'background 0.3s' }}>
                  Send Reset Link
                </Button>
                <div style={{ textAlign: 'center', fontSize: 14 }}>
                  <Link to="/login">Back to Login</Link>
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

export default ForgotPassword; 