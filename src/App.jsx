// src/App.jsx
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

// Тестовые данные — массив технологий
const technologies = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed' },
  { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress' },
  { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' },
  { id: 4, title: 'Props и Композиция', description: 'Передача данных между компонентами', status: 'completed' },
  { id: 5, title: 'Списки и Keys', description: 'Отображение динамических списков', status: 'in-progress' }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Трекер изучения технологий</h1>
      </header>
      <main>
        {/* Компонент с прогрессом */}
        <ProgressHeader technologies={technologies} />
        {/* Список карточек */}
        <div className="tech-list">
          {technologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;