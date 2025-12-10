// src/components/TechnologyCard.jsx
import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  const { id, title, description, status, notes, category } = technology;

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return '✅ Завершено';
      case 'in-progress': return '🔄 В процессе';
      default: return '⏳ Не начато';
    }
  };

  const nextStatus = (status) => {
    if (status === 'not-started') return 'in-progress';
    if (status === 'in-progress') return 'completed';
    return 'not-started';
  };

  return (
    <div className={`tech-card tech-card--${status}`} onClick={() => onStatusChange(id, nextStatus(status))}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="category-badge">{category}</span>
      <span className="status-badge">{getStatusText(status)}</span>

      <div className="notes-section">
        <label>Заметки:</label>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(id, e.target.value)}
          placeholder="Добавьте заметку..."
          rows="2"
        />
      </div>
    </div>
  );
}

export default TechnologyCard;