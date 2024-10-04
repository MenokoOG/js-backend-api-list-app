
      // This file is auto-generated by the backend.
      // Use these functions to make HTTP requests to the backend APIs.

      const BASE_URL = 'http://localhost:5000';  // Adjust the base URL as needed

      
    async function getUsers(id) {
      const response = await fetch(`${BASE_URL}/api/users/`, {
        method: 'GET',
      });
      
      const data = await response.json();
      return data;
    }
  


    async function getById(id) {
      const response = await fetch(`${BASE_URL}/api/users/${id}`, {
        method: 'GET',
      });
      
      const data = await response.json();
      return data;
    }
  


    async function createUsers(body) {
      const response = await fetch(`${BASE_URL}/api/users/`, {
        method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      });
      
      const data = await response.json();
      return data;
    }
  


    async function updateById(id, body) {
      const response = await fetch(`${BASE_URL}/api/users/${id}`, {
        method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      });
      
      const data = await response.json();
      return data;
    }
  


      async function deleteById(id) {
        const response = await fetch(`${BASE_URL}/api/users/${id}`, {
          method: 'DELETE',
        });
        
        if (response.status === 204) {
          return null;  // No content for DELETE request
        } else {
          const data = await response.json();
          return data;
        }
      }
    

      export {
        getUsers,
    getById,
    createUsers,
    updateById,
    deleteById
      };
    