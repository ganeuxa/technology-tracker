// src/pages/TechnologyList.jsx
import { Link } from 'react-router-dom';
import SimpleTechCard from '../components/SimpleTechCard';
import useTechnologies from '../hooks/useTechnologies';

function TechnologyList() {
  const { technologies } = useTechnologies();

  // Защита от некорректных данных
  if (!Array.isArray(technologies)) {
    return <div className="page">Ошибка: некорректные данные</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn">+ Добавить</Link>
      </div>

      {technologies.length === 0 ? (
        <p>Нет технологий</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {technologies.map(tech => (
            // Убедитесь, что tech.category существует
            <SimpleTechCard
              key={tech.id}
              technology={{
                ...tech,
                category: tech.category || 'other' // fallback
              }}
              onStatusChange={(id, status) => {
                const { updateStatus } = useTechnologies();
                updateStatus(id, status);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TechnologyList;