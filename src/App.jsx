import './App.css';
import useTechnologiesApi from './hooks/useTechnologiesApi';
import DataImportExport from './components/DataImportExport';
import TechnologyCard from './components/TechnologyCard';

function App() {
  const { technologies, loading, error, refetch } = useTechnologiesApi();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Загрузка технологий...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Трекер изучения технологий</h1>
        <button onClick={refetch} className="refresh-btn">Обновить</button>
      </header>
      {error && (
        <div className="app-error" role="alert">
          <p>{error}</p>
          <button onClick={refetch}>Попробовать снова</button>
        </div>
      )}
      <main className="app-main">
        <DataImportExport />
        <div className="technologies-grid">
          {technologies.map(tech => (
            <TechnologyCard key={tech.id} technology={tech} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;