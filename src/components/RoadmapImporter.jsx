import { useState } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';

function RoadmapImporter() {
  const { addTechnology } = useTechnologiesApi();
  const [importing, setImporting] = useState(false);

  const handleImportRoadmap = async (roadmapUrl) => {
    try {
      setImporting(true);
      const response = await fetch(roadmapUrl);
      if (!response.ok) throw new Error('Не удалось загрузить дорожную карту');
      const roadmapData = await response.json();
      for (const tech of roadmapData.technologies) {
        await addTechnology(tech);
      }
      alert(`Успешно импортировано ${roadmapData.technologies.length} технологий`);
    } catch (err) {
      alert(`Ошибка импорта: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  const handleExampleImport = () => {
    const mockRoadmap = {
      technologies: [
        {
          title: 'Express.js',
          description: 'Веб-фреймворк для Node.js',
          category: 'backend',
          difficulty: 'intermediate',
          resources: ['https://expressjs.com']
        },
        {
          title: 'Webpack',
          description: 'Модульный сборщик для JavaScript',
          category: 'tooling',
          difficulty: 'advanced',
          resources: ['https://webpack.js.org']
        }
      ]
    };
    const blob = new Blob([JSON.stringify(mockRoadmap)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    handleImportRoadmap(url);
  };

  return (
    <div className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>
      <div className="import-actions">
        <button
          onClick={handleExampleImport}
          disabled={importing}
          className="import-button"
        >
          {importing ? 'Импорт...' : 'Импорт примера дорожной карты'}
        </button>
      </div>
    </div>
  );
}

export default RoadmapImporter;