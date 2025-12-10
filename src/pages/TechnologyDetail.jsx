// src/pages/TechnologyDetail.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

function TechnologyDetail() {
  const { techId } = useParams();
  const [technology, setTechnology] = useState(null);
  const loadedRef = useRef(false); // ← Реф для отслеживания загрузки

  useEffect(() => {
    if (loadedRef.current) return; // ← Если уже загружено — выходим

    const saved = localStorage.getItem('technologies');
    if (saved) {
      try {
        const technologies = JSON.parse(saved);
        const tech = technologies.find(t => t.id === parseInt(techId));
        setTechnology(tech);
        loadedRef.current = true; // ← Устанавливаем флаг
      } catch (e) {
        console.error('Ошибка загрузки технологии:', e);
      }
    }
  }, [techId]); // ← Зависимость от techId — эффект сработает при изменении ID

  const updateStatus = (newStatus) => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      try {
        const technologies = JSON.parse(saved);
        const updated = technologies.map(tech =>
          tech.id === parseInt(techId) ? { ...tech, status: newStatus } : tech
        );
        localStorage.setItem('technologies', JSON.stringify(updated));
        setTechnology(prev => ({ ...prev, status: newStatus }));
      } catch (e) {
        console.error('Ошибка обновления статуса:', e);
      }
    }
  };

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn" style={{ marginTop: '16px' }}>
          ← Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>{technology.title}</h1>
      </div>

      <div className="technology-detail" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="detail-section">
          <h3>Описание</h3>
          <p style={{ marginTop: '8px', lineHeight: 1.6 }}>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons" style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button
              onClick={() => updateStatus('not-started')}
              style={{
                padding: '8px 12px',
                border: '1px solid #f44336',
                background: technology.status === 'not-started' ? '#ffebee' : 'white',
                color: '#c62828',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Не начато
            </button>
            <button
              onClick={() => updateStatus('in-progress')}
              style={{
                padding: '8px 12px',
                border: '1px solid #ff9800',
                background: technology.status === 'in-progress' ? '#fff3e0' : 'white',
                color: '#e65100',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              В процессе
            </button>
            <button
              onClick={() => updateStatus('completed')}
              style={{
                padding: '8px 12px',
                border: '1px solid #4caf50',
                background: technology.status === 'completed' ? '#e8f5e9' : 'white',
                color: '#2e7d32',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Завершено
            </button>
          </div>
        </div>

        {technology.notes && (
          <div className="detail-section">
            <h3>Мои заметки</h3>
            <p style={{ marginTop: '8px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{technology.notes}</p>
          </div>
        )}

        <div className="detail-section">
          <h3>ID технологии</h3>
          <p style={{ marginTop: '8px', color: '#666' }}>ID: {technology.id}</p>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;