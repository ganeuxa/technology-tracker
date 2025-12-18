// src/components/Navigation.jsx
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  FormControlLabel
} from '@mui/material';

function Navigation({ darkMode, toggleDarkMode }) {
  const location = useLocation();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            🚀 Трекер технологий
          </Link>
        </Typography>

        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ mx: 1, fontWeight: location.pathname === '/' ? 'bold' : 'normal' }}
        >
          Главная
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/technologies"
          sx={{ mx: 1, fontWeight: location.pathname === '/technologies' ? 'bold' : 'normal' }}
        >
          Технологии
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/add-technology"
          sx={{ mx: 1, fontWeight: location.pathname === '/add-technology' ? 'bold' : 'normal' }}
        >
          + Добавить
        </Button>

        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="secondary"
            />
          }
          label="🌙"
          sx={{ ml: 2, color: 'text.primary' }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;