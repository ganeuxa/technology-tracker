import { useState, useEffect, useRef } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';

// Начальные данные (с полем notes)
const initialTechnologies = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '' },
  { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '' },
  { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '' },
  { id: 4, title: 'Props и Композиция', description: 'Передача данных между компонентами', status: 'not-started', notes: '' },
  { id: 5, title: 'Списки и Keys', description: 'Отображение динамических списков', status: 'not-started', notes: '' }
];

function App() {
  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [searchQuery, setSearchQuery] = useState('');
  const loadedRef = useRef(false); // ← Реф для отслеживания загрузки

  // Загрузка из localStorage при первом рендере
  useEffect(() => {
    if (loadedRef.current) return; // ← Если уже загружено — выходим

    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const withNotes = parsed.map(t => ({ ...t, notes: t.notes || '' }));
        setTechnologies(withNotes);
      } catch (e) {
        console.error('Ошибка при загрузке из localStorage:', e);
        setTechnologies(initialTechnologies);
      }
    }
    loadedRef.current = true; // ← Устанавливаем флаг
  }, []); // ← Пустой массив — эффект сработает только при монтировании

  // Автосохранение в localStorage
  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    console.log('Данные сохранены в localStorage');
  }, [technologies]); // Зависит от technologies

  // Обновление заметок
  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  // Переключение статуса
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

  // Быстрые действия
  const markAllAsCompleted = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const randomNext = () => {
    const notStarted = technologies.filter(t => t.status === 'not-started');
    if (notStarted.length === 0) {
      alert('Все технологии уже начаты или завершены!');
      return;
    }
    const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
    alert(`Следующая технология для изучения:\n\n${randomTech.title}`);
  };

  // Фильтрация по поиску
  const filteredTechnologies = technologies.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Поле поиска */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span>Найдено: {filteredTechnologies.length}</span>
        </div>

        {/* Список технологий */}
        <div className="tech-list">
          {filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              {...tech}
              onToggleStatus={() => toggleStatus(tech.id)}
              onUpdateNotes={(notes) => updateTechnologyNotes(tech.id, notes)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;