import './TechnologyCard.css';

function TechnologyCard({ title, description, status }) {
  return (
    <div className={`tech-card tech-card--${status}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="status-badge">{status === 'completed' ? '✅ Изучено' : status === 'in-progress' ? '🔄 В процессе' : '⏳ Не начато'}</span>
    </div>
  );
}

export default TechnologyCard;