import { getUsers, createUsers, deleteById } from './frontendApiClient';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' }); // State for form input
  const [error, setError] = useState('');

  // Load users from backend and also store them in local storage
  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
      // Save data to local storage
      localStorage.setItem('users', JSON.stringify(data));
    }
    fetchUsers();
  }, []);

  // Handle input change in form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle creating a user (backend + local storage)
  const handleCreateUser = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Validate the form (basic validation for empty fields)
    if (!formData.name || !formData.email) {
      setError('Please provide both name and email.');
      return;
    }

    const newUser = { name: formData.name, email: formData.email };
    const data = await createUsers(newUser);
    setUsers([...users, data]);

    // Update local storage as well
    localStorage.setItem('users', JSON.stringify([...users, data]));

    // Clear form data
    setFormData({ name: '', email: '' });
    setError(''); // Clear any errors
  };

  // Function to handle deleting a user (backend + local storage)
  const handleDeleteUser = async (id) => {
    await deleteById(id);
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);

    // Update local storage as well
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // Load users from local storage if available (to handle offline scenarios)
  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem('users'));
    if (localUsers) {
      setUsers(localUsers);
    }
  }, []);

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

      <h2>Add a New User</h2>
      <form onSubmit={handleCreateUser}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default App;
