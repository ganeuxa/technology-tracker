function TechnologyNotes({ notes, onNotesChange }) {
  return (
    <div className="notes-section">
      <h4>Мои заметки:</h4>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Записывайте сюда важные моменты..."
        rows="3"
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '0.95rem'
        }}
      />
      <div className="notes-hint">
        {notes.length > 0 ? `Заметка сохранена (${notes.length} символов)` : 'Добавьте заметку'}
      </div>
    </div>
  );
}

export default TechnologyNotes;