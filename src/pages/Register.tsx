import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Typography, Space, DatePicker, Select, Checkbox, message, Popover } from 'antd';
import { UserAddOutlined, UserOutlined, LockOutlined, MailOutlined, CalendarOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

/**
 * Register page for new users.
 * Uses Formik for form state, Yup for validation, Ant Design for UI, and Axios for API.
 */
const Register: React.FC = () => {
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  // Validation schema for the form
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    dob: Yup.date().required('Date of birth is required').nullable(),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain an uppercase letter')
      .matches(/[0-9]/, 'Must contain a number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain a symbol'),
    agree: Yup.boolean().oneOf([true], 'You must agree to the terms'),
  });

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)' }}>
      <div style={{ maxWidth: 440, width: '100%', padding: 32, background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px #a78bfa44', position: 'relative', animation: 'fadeIn 1s' }}>
        {/* Site Logo with animation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <UserAddOutlined style={{ fontSize: 48, color: '#7c3aed', animation: 'bounce 1.2s' }} />
        </div>
        {/* Title with full-width background strip */}
        <Typography.Title level={2} style={{ color: '#7c3aed', textAlign: 'center', marginBottom: 24 }}>Register</Typography.Title>
        <Formik
          initialValues={{ firstName: '', lastName: '', dob: null, gender: '', email: '', password: '', agree: false }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setApiSuccess(null);
            try {
              // Only send required fields to API
              const payload = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
              };
              const response = await axios.post('https://second-brain-web.onrender.com/api/auth/register', payload);
              // Save authToken and log user in
              if (response.data && response.data.authToken) {
                localStorage.setItem('token', response?.data?.authToken);
                if (response.data.user) {
                  localStorage.setItem('user', JSON.stringify(response.data.user));
                }
                setApiSuccess('Registration successful! Redirecting to home...');
                navigate('/', { replace: true });
              } else {
                localStorage.setItem('token', response?.data?.authToken || 'undefined');
                setApiSuccess('Registration successful!');
              }
            } catch (error: any) {
              message.error(error.response?.data?.message || 'Registration failed. Please try again.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit, isSubmitting, resetForm, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {apiSuccess && <Typography.Text type="success">{apiSuccess}</Typography.Text>}
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <Field name="firstName">
                      {({ field }: any) => (
                        <Input {...field} placeholder="First Name" size="large" prefix={<UserOutlined />} />
                      )}
                    </Field>
                    <div style={{ color: '#d32f2f', fontSize: 12 }}>
                      <ErrorMessage name="firstName" component="div" />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Field name="lastName">
                      {({ field }: any) => (
                        <Input {...field} placeholder="Last Name" size="large" prefix={<UserOutlined />} />
                      )}
                    </Field>
                    <div style={{ color: '#d32f2f', fontSize: 12 }}>
                      <ErrorMessage name="lastName" component="div" />
                    </div>
                  </div>
                </div>
                <div>
                  <Field name="dob">
                    {({ field }: any) => (
                      <DatePicker
                        {...field}
                        value={values.dob ? dayjs(values.dob) : null}
                        onChange={date => setFieldValue('dob', date ? date.toDate() : null)}
                        placeholder="Date of Birth"
                        size="large"
                        style={{ width: '100%' }}
                        prefix={<CalendarOutlined />}
                      />
                    )}
                  </Field>
                  <div style={{ color: '#d32f2f', fontSize: 12 }}>
                    <ErrorMessage name="dob" component="div" />
                  </div>
                </div>
                <div>
                  <Field name="gender">
                    {({ field }: any) => (
                      <Select
                        {...field}
                        value={values.gender}
                        onChange={value => setFieldValue('gender', value)}
                        placeholder="Select Gender"
                        size="large"
                        style={{ width: '100%' }}
                        suffixIcon={values.gender === 'male' ? <ManOutlined /> : values.gender === 'female' ? <WomanOutlined /> : undefined}
                      >
                        <Select.Option value="" disabled>Select Gender</Select.Option>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                      </Select>
                    )}
                  </Field>
                  <div style={{ color: '#d32f2f', fontSize: 12 }}>
                    <ErrorMessage name="gender" component="div" />
                  </div>
                </div>
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
                <div>
                  <Field name="password">
                    {({ field }: any) => (
                      <Input.Password
                        {...field}
                        placeholder="Password"
                        size="large"
                        prefix={<LockOutlined />}
                        autoComplete="new-password"
                      />
                    )}
                  </Field>
                  <div style={{ color: '#d32f2f', fontSize: 12 }}>
                    <ErrorMessage name="password" component="div" />
                  </div>
                </div>
                <div>
                  <Field name="agree" type="checkbox">
                    {({ field }: any) => (
                      <Checkbox {...field} checked={field.value}>
                        <span style={{ color: '#222' }}>
                          I agree to the{' '}
                          <Popover content={<span style={{ color: '#7c3aed' }}>teri adhi salary meri</span>} title={null} trigger="click">
                            <span
                              style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}
                              onClick={e => e.stopPropagation()}
                            >
                              terms and conditions
                            </span>
                          </Popover>
                        </span>
                      </Checkbox>
                    )}
                  </Field>
                  <div style={{ color: '#d32f2f', fontSize: 12 }}>
                    <ErrorMessage name="agree" component="div" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button type="primary" htmlType="submit" block size="large" loading={isSubmitting} style={{ background: '#7c3aed', borderColor: '#7c3aed', transition: 'background 0.3s' }}>
                    Register
                  </Button>
                  <Button htmlType="button" block size="large" onClick={() => resetForm()} disabled={isSubmitting}>
                    Reset
                  </Button>
                </div>
                <div style={{ textAlign: 'center', fontSize: 14 }}>
                  <Link to="/login"><UserOutlined /> Already have an account? Login</Link>
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

export default Register; 