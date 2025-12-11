import TechnologyCard from './TechnologyCard';

function TechnologyList({ technologies }) {
  if (technologies.length === 0) {
    return <p>Нет технологий для отображения.</p>;
  }

  return (
    <div className="technologies-grid">
      {technologies.map(tech => (
        <TechnologyCard key={tech.id} technology={tech} />
      ))}
    </div>
  );
}

export default TechnologyList;