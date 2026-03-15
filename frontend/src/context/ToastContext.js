import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: '', visible: false, type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, visible: true, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`toast-notification${toast.visible ? ' show' : ''}`}
        style={toast.type === 'error' ? { background: '#e74c3c', color: '#fff' } : {}}
      >
        {toast.message}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
