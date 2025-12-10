import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <h1>Добро пожаловать в Трекер технологий!</h1>
      <p style={{ margin: '16px 0' }}>
        Это приложение поможет вам отслеживать прогресс изучения различных технологий.
      </p>
      
      <div className="features" style={{ marginTop: '24px' }}>
        <h2>Возможности:</h2>
        <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
          <li>Добавлять новые технологии</li>
          <li>Отслеживать статус изучения</li>
          <li>Просматривать детали по каждой технологии</li>
          <li>Данные сохраняются автоматически</li>
        </ul>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
        <Link to="/technologies" className="btn btn-primary">
          Перейти к списку технологий
        </Link>
        <Link to="/add-technology" className="btn" style={{ background: '#95a5a6', color: 'white' }}>
          Добавить технологию
        </Link>
      </div>
    </div>
  );
}

export default Home;