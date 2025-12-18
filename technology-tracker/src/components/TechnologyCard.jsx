// src/components/TechnologyCard.jsx
import './TechnologyCard.css';

function TechnologyCard({ technology }) {
  return (
    <div className={`technology-card status-${technology.status}`}>
      <h3>{technology.title}</h3>
      <p>{technology.description}</p>
      <div className="status-indicator">
        {technology.status === 'completed' && '✅ Завершено'}
        {technology.status === 'in-progress' && '🔄 В процессе'}
        {technology.status === 'not-started' && '⏳ Не начато'}
      </div>
      {technology.notes && (
        <div className="notes-preview">
          <strong>Заметка:</strong> {technology.notes.substring(0, 100)}...
        </div>
      )}
    </div>
  );
}

export default TechnologyCard;