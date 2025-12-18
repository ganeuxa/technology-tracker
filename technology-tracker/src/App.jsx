// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import { Routes, Route } from 'react-router-dom';
import useTechnologies from './hooks/useTechnologies';
import { SnackbarProvider } from './components/NotificationSnackbar';

function App() {
  // Тема
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const { technologies, updateStatus, updateNotes } = useTechnologies();

  
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
      <Router>
      <div className="App">
        <Navigation darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)}  />
        <main className="main-content">
          <Routes>
            {/* Передаём функции как пропсы, если нужно */}
            <Route
              path="/technologies"
              element={<TechnologyList
                technologies={technologies}
                onStatusChange={updateStatus}
                onNotesChange={updateNotes}
              />}
            />
            {/* Или используйте напрямую внутри страниц */}
          </Routes>
        </main>
      </div>
      </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;