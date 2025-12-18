// src/components/DataImportExport.jsx
import { useState } from 'react';

function DataImportExport({ onImport, technologies }) {
  const [status, setStatus] = useState('');

  const exportToJSON = () => {
    try {
      const dataStr = JSON.stringify(technologies, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setStatus('Данные экспортированы!');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setStatus('Ошибка экспорта');
    }
  };

  const importFromJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!Array.isArray(imported)) throw new Error();
        onImport(imported);
        setStatus(`Импортировано ${imported.length} технологий`);
        setTimeout(() => setStatus(''), 3000);
      } catch (err) {
        setStatus('Ошибка: неверный формат JSON');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // позволяет повторно выбрать тот же файл
  };

  return (
    <div className="data-import-export" style={{ textAlign: 'center', margin: '20px 0' }}>
      {status && <div className="status">{status}</div>}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <button onClick={exportToJSON} disabled={technologies.length === 0}>
          📤 Экспорт в JSON
        </button>
        <label className="file-input">
          📥 Импорт из JSON
          <input type="file" accept=".json" onChange={importFromJSON} />
        </label>
      </div>
      <style jsx>{`
        .status {
          padding: 8px 16px;
          background: #d4edda;
          color: #155724;
          border-radius: 4px;
          margin-bottom: 10px;
          display: inline-block;
        }
        .file-input {
          display: inline-block;
          padding: 8px 16px;
          background: #3498db;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .file-input input {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default DataImportExport;