API Automation within MERN stack Example Application


# User Management Application

This is a full-stack user management application that allows users to view, add, and delete user information. It interacts with a backend API to manage users, and it also stores user information in the browser's local storage to mimic a database-like experience.

## Features

- **View Users**: Display a list of users.
- **Add Users**: Add new users with a name and email via a form.
- **Delete Users**: Remove users from the list.
- **Local Storage**: Save and persist user data locally using browser local storage.

## Tech Stack

### Frontend:

- React (with functional components and hooks)
- Local Storage (for persistence of user data)
- Tailwind CSS (for styling, optional, can use custom CSS if preferred)

### Backend:

- Node.js
- Express.js
- API routing for user CRUD operations (Create, Read, Update, Delete)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/user-management-app.git
   cd user-management-app
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Run the application:**
   Start the backend server and the frontend in separate terminals:

   **Backend:**

   ```bash
   cd server
   npm start
   ```

   **Frontend:**

   ```bash
   cd client
   npm run dev
   ```
4. **Access the app:**
   Open the app in your browser at `http://localhost:3000`.

### File Structure

Here's a quick overview of the file structure for the application:

```
user-management-app/
│
├── client/                    # Frontend code (React + Vite)
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── frontendApiClient.js  # Auto-generated API client for frontend
│   │   └── index.jsx          # Entry point for React app
│   └── public/
│       └── index.html         # HTML template
│
├── server/                    # Backend code (Express.js)
│   ├── data/                  # Mock database with user data
│   │   └── mockDatabase.js
│   ├── routes/                # API route handlers
│   │   └── users.js
│   ├── utils/                 # Utilities (e.g., API route logging)
│   │   └── logRoutes.js
│   ├── server.js              # Main server entry point
│   └── package.json           # Backend dependencies
│
├── README.md                  # Documentation
└── package.json               # Root project dependencies
```

### API Endpoints

The application backend provides a basic API for user management with the following endpoints:


| Method | Endpoint         | Description         |
| -------- | ------------------ | --------------------- |
| GET    | `/api/users`     | Get all users       |
| GET    | `/api/users/:id` | Get user by ID      |
| POST   | `/api/users`     | Create a new user   |
| PUT    | `/api/users/:id` | Update a user by ID |
| DELETE | `/api/users/:id` | Delete a user by ID |

### Frontend Components

- **`App.jsx`**: Main component that handles rendering of the user list, adding new users via a form, and deleting users.
- **`frontendApiClient.js`**: Auto-generated API client that interacts with the backend for user CRUD operations.

### Running Tests

Currently, this application does not have automated tests set up, but you can manually test the following functionality:

1. **Add Users**: Enter a name and email into the form and click "Create User". The new user should appear in the list.
2. **Delete Users**: Click the "Delete" button next to a user in the list. The user should be removed from the list.
3. **Persistence**: Refresh the page. The user list should persist as it is stored in local storage.

### Future Improvements

- **Input Validation**: Add more robust validation for the form.
- **Database Integration**: Replace local storage with a real database (e.g., MongoDB, PostgreSQL) in the backend for persistence.
- **Testing**: Add unit and integration tests using tools like Jest and React Testing Library.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This `README.md` provides a detailed explanation of how to set up, run, and use the application. You can modify it as necessary, depending on any specific requirements or changes you'd like to make.
