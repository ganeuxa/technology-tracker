// src/components/QuickActions.jsx
function QuickActions({ onMarkAll, onResetAll, onRandomNext }) {
  return (
    <div className="quick-actions">
      <button onClick={onMarkAll} className="btn btn-success">
        Отметить всё как выполнено
      </button>
      <button onClick={onResetAll} className="btn btn-warning">
        Сбросить все статусы
      </button>
      <button onClick={onRandomNext} className="btn btn-info">
        Случайный выбор следующей технологии
      </button>
    </div>
  );
}

export default QuickActions;