// src/pages/TechnologyList.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TechnologyList() {
  const [technologies, setTechnologies] = useState([]);
  const navigate = useNavigate();
  const loadedRef = useRef(false); // ← Реф для отслеживания загрузки

  useEffect(() => {
    if (loadedRef.current) return; // ← Если уже загружено — выходим

    const saved = localStorage.getItem('technologies');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTechnologies(parsed);
        loadedRef.current = true; // ← Устанавливаем флаг
      } catch (e) {
        console.error('Ошибка загрузки технологий:', e);
      }
    } else {
      loadedRef.current = true; // ← Если данных нет — тоже считаем, что загрузка завершена
    }
  }, []); // ← Пустой массив — эффект сработает только при монтировании

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return '✅ Завершено';
      case 'in-progress': return '🔄 В процессе';
      default: return '⏳ Не начато';
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>

      {technologies.length === 0 ? (
        <div className="empty-state">
          <p>Технологий пока нет.</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить первую технологию
          </Link>
        </div>
      ) : (
        <div className="technologies-grid" style={{ display: 'grid', gap: '16px' }}>
          {technologies.map(tech => (
            <div key={tech.id} className="technology-item" style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '16px',
              cursor: 'pointer'
            }} onClick={() => navigate(`/technology/${tech.id}`)}>
              <h3>{tech.title}</h3>
              <p style={{ color: '#666', margin: '8px 0' }}>{tech.description}</p>
              <div className="technology-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: tech.status === 'completed' ? '#e8f5e9' : 
                                   tech.status === 'in-progress' ? '#fff3e0' : '#ffebee',
                  color: tech.status === 'completed' ? '#2e7d32' : 
                         tech.status === 'in-progress' ? '#e65100' : '#c62828',
                  fontWeight: '500'
                }}>
                  {getStatusText(tech.status)}
                </span>
                <span style={{ color: '#666', fontSize: '0.9em' }}>
                  ID: {tech.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TechnologyList;