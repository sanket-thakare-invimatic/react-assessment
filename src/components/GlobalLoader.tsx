import React from 'react';

/**
 * GlobalLoader: A custom animated loader overlay for the app.
 * Uses a modern purple-themed spinner, not Ant Design's Spin.
 */
const GlobalLoader: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(124, 58, 237, 0.08)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="custom-loader">
        <div className="custom-loader-spinner" />
      </div>
      <style>{`
        .custom-loader-spinner {
          width: 56px;
          height: 56px;
          border: 6px solid #ede9fe;
          border-top: 6px solid #7c3aed;
          border-radius: 50%;
          animation: custom-spin 1s linear infinite;
        }
        @keyframes custom-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GlobalLoader; 