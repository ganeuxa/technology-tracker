// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function Home() {
  const { technologies, progress } = useTechnologies();

  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="page home-page">
      <h1>Добро пожаловать!</h1>
      <p>Ваш персональный трекер изучения технологий.</p>

      <div className="home-stats">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Всего технологий</p>
        </div>
        <div className="stat-card">
          <h3>{stats.completed}</h3>
          <p>Завершено</p>
        </div>
        <div className="stat-card">
          <h3>{progress}%</h3>
          <p>Прогресс</p>
        </div>
      </div>

      <div className="home-actions">
        <Link to="/technologies" className="btn">Посмотреть все технологии</Link>
        <Link to="/add-technology" className="btn">Добавить новую</Link>
      </div>
    </div>
  );
}

export default Home;