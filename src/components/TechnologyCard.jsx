// src/components/TechnologyCard.jsx
import './TechnologyCard.css';

function TechnologyCard({ title, description, status, onToggleStatus }) {
  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return '✅ Изучено';
      case 'in-progress': return '🔄 В процессе';
      default: return '⏳ Не начато';
    }
  };

  return (
    <div
      className={`tech-card tech-card--${status}`}
      onClick={onToggleStatus}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onToggleStatus();
        }
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="status-badge">{getStatusText(status)}</span>
    </div>
  );
}

export default TechnologyCard;