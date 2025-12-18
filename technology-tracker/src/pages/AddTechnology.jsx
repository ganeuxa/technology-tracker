// src/pages/AddTechnology.jsx
import { useNavigate } from 'react-router-dom';
import TechnologyForm from '../components/TechnologyForm';

function AddTechnologyPage({ onAddTechnology }) {
  const navigate = useNavigate();

  const handleSave = (newTech) => {
    // Генерируем ID
    const techWithId = { ...newTech, id: Date.now() };
    // Добавляем технологию
    onAddTechnology(techWithId);
    // Переходим обратно
    navigate('/technologies');
  };

  const handleCancel = () => {
    navigate('/technologies');
  };

  return (
    <div className="page">
      <TechnologyForm
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AddTechnologyPage;