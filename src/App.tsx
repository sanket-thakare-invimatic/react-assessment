import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7c3aed', // purple shade
        },
      }}
    >
      <BrowserRouter>
        {/* App routes will go here */}
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
