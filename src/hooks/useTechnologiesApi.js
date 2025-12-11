import { useState, useEffect } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockTechnologies = [
        {
          id: 1,
          title: 'React',
          description: 'Библиотека для создания пользовательских интерфейсов',
          category: 'frontend',
          difficulty: 'beginner',
          deadline: '2025-12-31',
          resources: ['https://react.dev', 'https://ru.reactjs.org'],
          notes: 'Изучить хуки и компоненты'
        },
        {
          id: 2,
          title: 'Node.js',
          description: 'Среда выполнения JavaScript на сервере',
          category: 'backend',
          difficulty: 'intermediate',
          deadline: '2026-01-31',
          resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'],
          notes: 'Понять основы работы с сервером'
        }
      ];
      setTechnologies(mockTechnologies);
    } catch (err) {
      setError('Не удалось загрузить технологии');
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTechnology = async (techData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newTech = {
        id: Date.now(),
        ...techData,
        createdAt: new Date().toISOString()
      };
      setTechnologies(prev => [...prev, newTech]);
      return newTech;
    } catch (err) {
      throw new Error(`Не удалось добавить технологию: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology
  };
}

export default useTechnologiesApi;