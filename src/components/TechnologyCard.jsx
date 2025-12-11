function TechnologyCard({ technology }) {
  const { title, description, category, difficulty, deadline, resources, notes } = technology;

  return (
    <div className="technology-card" role="article">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tech-meta">
        <span className="tech-category">{category}</span>
        <span className="tech-difficulty">{difficulty}</span>
        {deadline && <span className="tech-deadline">До: {deadline}</span>}
      </div>
      {resources && resources.length > 0 && (
        <div className="tech-resources">
          <strong>Ресурсы:</strong>
          <ul>
            {resources.map((url, idx) => (
              <li key={idx}>
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {notes && (
        <div className="tech-notes">
          <strong>Заметки:</strong>
          <p>{notes}</p>
        </div>
      )}
    </div>
  );
}

export default TechnologyCard;