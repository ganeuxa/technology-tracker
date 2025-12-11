import { useState, useEffect } from 'react';

function DataImportExport() {
  const [technologies, setTechnologies] = useState([]);
  const [status, setStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('technologies');
      if (saved) {
        const parsed = JSON.parse(saved);
        setTechnologies(parsed);
        setStatus('Данные загружены из localStorage');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (error) {
      setStatus('Ошибка загрузки данных из localStorage');
      console.error('Ошибка загрузки:', error);
    }
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('technologies', JSON.stringify(technologies));
      setStatus('Данные сохранены в localStorage');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Ошибка сохранения данных');
      console.error('Ошибка сохранения:', error);
    }
  };

  const exportToJSON = () => {
    try {
      const dataStr = JSON.stringify(technologies, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setStatus('Данные экспортированы в JSON');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Ошибка экспорта данных');
      console.error('Ошибка экспорта:', error);
    }
  };

  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported)) {
          throw new Error('Неверный формат данных');
        }
        setTechnologies(imported);
        setStatus(`Импортировано ${imported.length} технологий`);
        setTimeout(() => setStatus(''), 3000);
      } catch (error) {
        setStatus('Ошибка импорта: неверный формат файла');
        console.error('Ошибка импорта:', error);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            setTechnologies(imported);
            setStatus(`Импортировано ${imported.length} технологий`);
            setTimeout(() => setStatus(''), 3000);
          }
        } catch (error) {
          setStatus('Ошибка импорта: неверный формат файла');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="data-import-export">
      <h1>Импорт и экспорт данных</h1>
      {status && (
        <div className="status-message" role="status" aria-live="polite" aria-atomic="true">
          {status}
        </div>
      )}
      <div className="controls">
        <button onClick={exportToJSON} disabled={technologies.length === 0}>
          Экспорт в JSON
        </button>
        <label className="file-input-label">
          Импорт из JSON
          <input
            type="file"
            accept=".json"
            onChange={importFromJSON}
            style={{ display: 'none' }}
          />
        </label>
        <button onClick={saveToLocalStorage} disabled={technologies.length === 0}>
          Сохранить в localStorage
        </button>
        <button onClick={loadFromLocalStorage}>
          Загрузить из localStorage
        </button>
      </div>
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Перетащите JSON-файл сюда
      </div>
    </div>
  );
}

export default DataImportExport;