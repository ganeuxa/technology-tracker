import React, { useState, useEffect } from 'react';
import { Box, Fab, useTheme, CssBaseline } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import useThemeToggle from './hooks/useThemeToggle';
import SimpleTechCard from './components/SimpleTechCard';
import Dashboard from './components/Dashboard';
import NotificationSnackbar from './components/NotificationSnackbar';

function App() {
  const { darkMode, toggleTheme } = useThemeToggle();
  const theme = useTheme();

  // Пример данных (в реальном приложении — из API или localStorage)
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React',
      description: 'Библиотека для создания пользовательских интерфейсов',
      category: 'frontend',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Node.js',
      description: 'Среда выполнения JavaScript на сервере',
      category: 'backend',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'MongoDB',
      description: 'NoSQL база данных',
      category: 'database',
      status: 'not-started',
    },
    {
      id: 4,
      title: 'TypeScript',
      description: 'Статически типизированный JavaScript',
      category: 'language',
      status: 'not-started',
    },
  ]);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prev =>
      prev.map(t => (t.id === id ? { ...t, status: newStatus } : t))
    );
    setSnackbar({
      open: true,
      message: `Статус обновлён на "${newStatus}"`,
      severity: 'success',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          p: 2,
          minHeight: '100vh',
          bgcolor: darkMode ? '#121212' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000',
        }}
      >
        {/* Кнопка переключения темы */}
        <Fab
          size="small"
          onClick={toggleTheme}
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </Fab>

        {/* Панель управления */}
        <Dashboard technologies={technologies} />

        {/* Заголовок и карточки */}
        <Box sx={{ mt: 4 }}>
          <h2>Технологии</h2>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {technologies.map(tech => (
              <SimpleTechCard
                key={tech.id}
                technology={tech}
                onStatusChange={handleStatusChange}
              />
            ))}
          </Box>
        </Box>

        {/* Уведомления */}
        <NotificationSnackbar
          open={snackbar.open}
          onClose={handleSnackbarClose}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </Box>
    </>
  );
}

export default App;