// src/components/UserList.jsx
import useApi from '../hooks/useApi';

function UserList() {
  const { data: users, loading, error, refetch } = useApi(
    'https://jsonplaceholder.typicode.com/users'
  );

  if (loading) {
    return <div className="loading">Загрузка пользователей...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Ошибка: {error}</p>
        <button onClick={refetch}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h2>Пользователи ({users?.length})</h2>
      <div className="users-grid">
        {users?.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Телефон:</strong> {user.phone}</p>
            <p><strong>Город:</strong> {user.address.city}</p>
            <p><strong>Компания:</strong> {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;