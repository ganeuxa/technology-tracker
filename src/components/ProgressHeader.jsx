function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <p>Всего: <strong>{total}</strong> • Изучено: <strong>{completed}</strong></p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
      <p>Прогресс: <strong>{percent}%</strong></p>
    </div>
  );
}

export default ProgressHeader;