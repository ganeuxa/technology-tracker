import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTechnology() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    notes: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Получаем текущие технологии
    const saved = localStorage.getItem('technologies');
    const technologies = saved ? JSON.parse(saved) : [];
    
    // Генерируем новый ID
    const newId = technologies.length > 0 
      ? Math.max(...technologies.map(t => t.id)) + 1 
      : 1;
    
    // Создаем новую технологию
    const newTech = {
      id: newId,
      title: formData.title,
      description: formData.description,
      notes: formData.notes,
      status: 'not-started'
    };
    
    // Сохраняем в localStorage
    const updated = [...technologies, newTech];
    localStorage.setItem('technologies', JSON.stringify(updated));
    
    // Перенаправляем на список
    navigate('/technologies');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Добавить новую технологию</h1>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
            Название технологии *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
            Описание *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div>
          <label htmlFor="notes" style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
            Заметки (опционально)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" className="btn btn-primary">
            Добавить технологию
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/technologies')}
            className="btn"
            style={{ background: '#95a5a6', color: 'white' }}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;