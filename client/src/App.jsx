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
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">User List</h1>
      <ul className="w-full max-w-lg">
        {users.map((user) => (
          <li key={user.id} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
            <span>{user.name} - {user.email}</span>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold text-blue-600 mt-6">Add a New User</h2>
      <form onSubmit={handleCreateUser} className="w-full max-w-lg bg-white p-6 shadow-md rounded-lg mt-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full"
        >
          Create User
        </button>
      </form>
    </div>

  );
}

export default App;
