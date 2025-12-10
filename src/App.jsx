// src/App.jsx
import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';

// Начальные данные
const initialTechnologies = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started' },
  { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started' },
  { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' },
  { id: 4, title: 'Props и Композиция', description: 'Передача данных между компонентами', status: 'not-started' },
  { id: 5, title: 'Списки и Keys', description: 'Отображение динамических списков', status: 'not-started' }
];

function App() {
  const [technologies, setTechnologies] = useState(initialTechnologies);

  // Функция для смены статуса у одной технологии
  const toggleStatus = (id) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === id
          ? {
              ...tech,
              status:
                tech.status === 'not-started'
                  ? 'in-progress'
                  : tech.status === 'in-progress'
                  ? 'completed'
                  : 'not-started'
            }
          : tech
      )
    );
  };

  // Функция для "отметить всё как выполнено"
  const markAllAsCompleted = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  // Функция для сброса всех статусов
  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  // Функция для случайного выбора "не начатой" технологии
  const randomNext = () => {
    const notStarted = technologies.filter(t => t.status === 'not-started');
    if (notStarted.length === 0) {
      alert('Все технологии уже начаты или завершены!');
      return;
    }
    const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
    alert(`Следующая технология для изучения:\n\n${randomTech.title}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Трекер изучения технологий</h1>
      </header>
      <main>
        <ProgressHeader technologies={technologies} />
        <QuickActions
          onMarkAll={markAllAsCompleted}
          onResetAll={resetAllStatuses}
          onRandomNext={randomNext}
        />
        <div className="tech-list">
          {technologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              {...tech}
              onToggleStatus={() => toggleStatus(tech.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;