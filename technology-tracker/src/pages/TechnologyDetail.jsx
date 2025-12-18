// src/pages/TechnologyDetail.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { technologies, updateStatus, updateNotes } = useTechnologies();

  const tech = technologies.find(t => t.id === parseInt(techId));

  if (!tech) {
    return (
      <div className="page error-page">
        <h2>Технология не найдена</h2>
        <Link to="/technologies">← Назад к списку</Link>
      </div>
    );
  }

  return (
    <div className="page technology-detail-page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">← Назад</Link>
        <h1>{tech.title}</h1>
      </div>

      <div className="detail-section">
        <h3>Описание</h3>
        <p>{tech.description}</p>
      </div>

      <div className="detail-section">
        <h3>Статус</h3>
        <div className="status-buttons">
          {['not-started', 'in-progress', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => updateStatus(tech.id, status)}
              className={tech.status === status ? 'active' : ''}
            >
              {status === 'not-started' && 'Не начато'}
              {status === 'in-progress' && 'В процессе'}
              {status === 'completed' && 'Завершено'}
            </button>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h3>Заметки</h3>
        <textarea
          value={tech.notes || ''}
          onChange={(e) => updateNotes(tech.id, e.target.value)}
          placeholder="Ваши заметки..."
          rows="5"
          style={{ width: '100%', padding: '8px', fontSize: '1em' }}
        />
      </div>

      <div className="detail-actions">
        <button onClick={() => navigate(-1)} className="btn-secondary">Закрыть</button>
      </div>
    </div>
  );
}

export default TechnologyDetail;