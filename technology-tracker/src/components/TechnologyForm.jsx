// src/components/TechnologyForm.jsx
import { useState, useEffect } from 'react';
import './TechnologyForm.css';

function TechnologyForm({ onSave, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'frontend',
    difficulty: initialData.difficulty || 'beginner',
    deadline: initialData.deadline || '',
    resources: initialData.resources || ['']
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Валидация
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Минимум 2 символа';
    } else if (formData.title.trim().length > 50) {
      newErrors.title = 'Максимум 50 символов';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Минимум 10 символов';
    }

    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом';
      }
    }

    formData.resources.forEach((resource, index) => {
      if (resource && !isValidUrl(resource)) {
        newErrors[`resource_${index}`] = 'Некорректный URL';
      }
    });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources];
    newResources[index] = value;
    setFormData(prev => ({ ...prev, resources: newResources }));
  };

  const addResourceField = () => {
    setFormData(prev => ({ ...prev, resources: [...prev.resources, ''] }));
  };

  const removeResourceField = (index) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, resources: newResources }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const cleanedData = {
        ...formData,
        resources: formData.resources.filter(r => r.trim() !== '')
      };
      onSave(cleanedData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="technology-form"
      noValidate
      aria-labelledby="form-title"
    >
      <h2 id="form-title">
        {initialData.title ? 'Редактирование технологии' : 'Добавление новой технологии'}
      </h2>

      {/* Название */}
      <div className="form-group">
        <label htmlFor="title" className="required">Название технологии</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
          aria-describedby={errors.title ? 'title-error' : undefined}
          required
        />
        {errors.title && (
          <span id="title-error" className="error-message" role="alert">{errors.title}</span>
        )}
      </div>

      {/* Описание */}
      <div className="form-group">
        <label htmlFor="description" className="required">Описание</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={errors.description ? 'error' : ''}
          aria-describedby={errors.description ? 'description-error' : undefined}
          required
        />
        {errors.description && (
          <span id="description-error" className="error-message" role="alert">{errors.description}</span>
        )}
      </div>

      {/* Категория */}
      <div className="form-group">
        <label htmlFor="category">Категория</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="database">База данных</option>
          <option value="devops">DevOps</option>
          <option value="other">Другое</option>
        </select>
      </div>

      {/* Сложность */}
      <div className="form-group">
        <label htmlFor="difficulty">Сложность</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="beginner">Начальный</option>
          <option value="intermediate">Средний</option>
          <option value="advanced">Продвинутый</option>
        </select>
      </div>

      {/* Дедлайн */}
      <div className="form-group">
        <label htmlFor="deadline">Дедлайн (не обязательно)</label>
        <input
          id="deadline"
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
          className={errors.deadline ? 'error' : ''}
          aria-describedby={errors.deadline ? 'deadline-error' : undefined}
        />
        {errors.deadline && (
          <span id="deadline-error" className="error-message" role="alert">{errors.deadline}</span>
        )}
      </div>

      {/* Ресурсы */}
      <div className="form-group">
        <label>Ресурсы для изучения</label>
        {formData.resources.map((resource, index) => (
          <div key={index} className="resource-field">
            <input
              type="url"
              value={resource}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              placeholder="https://example.com"
              className={errors[`resource_${index}`] ? 'error' : ''}
              aria-describedby={errors[`resource_${index}`] ? `resource-${index}-error` : undefined}
            />
            {formData.resources.length > 1 && (
              <button
                type="button"
                onClick={() => removeResourceField(index)}
                className="btn-remove"
                aria-label={`Удалить ресурс ${index + 1}`}
              >
                Удалить
              </button>
            )}
            {errors[`resource_${index}`] && (
              <span
                id={`resource-${index}-error`}
                className="error-message"
                role="alert"
              >
                {errors[`resource_${index}`]}
              </span>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addResourceField}
          className="btn-add-resource"
        >
          + Добавить ресурс
        </button>
      </div>

      {/* Кнопки */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn-primary"
          disabled={!isFormValid}
          aria-disabled={!isFormValid}
        >
          Сохранить
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}

export default TechnologyForm;