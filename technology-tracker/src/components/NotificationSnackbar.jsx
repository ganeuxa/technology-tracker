// src/components/NotificationSnackbar.jsx
import { Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';

let globalShowSnackbar;

export function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const showSnackbar = (msg, type = 'info') => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  globalShowSnackbar = showSnackbar;

  return (
    <>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

// Глобальная функция для вызова из любого места
export const showSnackbar = (message, severity = 'info') => {
  if (globalShowSnackbar) globalShowSnackbar(message, severity);
};