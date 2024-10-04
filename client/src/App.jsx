import { getUsers, createUsers, deleteById } from './frontendApiClient';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    const newUser = { name: 'New User', email: 'newuser@example.com' };
    const data = await createUsers(newUser);
    setUsers([...users, data]);
  };

  const handleDeleteUser = async (id) => {
    await deleteById(id);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="App">
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
}

export default App;
