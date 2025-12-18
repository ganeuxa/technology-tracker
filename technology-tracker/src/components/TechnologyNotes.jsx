// src/components/TechnologyNotes.jsx
function TechnologyNotes({ techId, notes, onNotesChange }) {
  return (
    <div className="notes-section">
      <h4>Заметки: {techId}</h4>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Запишите ключевые моменты, ссылки или мысли..."
        rows="3"
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '6px',
          marginTop: '8px',
          fontFamily: 'inherit'
        }}
      />
      <div style={{ fontSize: '0.9em', color: '#666', marginTop: '4px' }}>
        {notes ? `${notes.length} символов` : 'Еще нет заметок'}
      </div>
    </div>
  );
}

export default TechnologyNotes;