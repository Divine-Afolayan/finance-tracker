# FinTrack - Personal Finance Tracker

FinTrack is a personal finance tracking application that allows multiple users to manage their budgets and expenses. It is built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication (register, login)
- Create, update, and delete budgets
- Create, update, and delete expenses within budgets
- View all budgets and expenses
- Responsive user interface

## Technologies Used

- **Frontend**: React, React Router DOM, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Steps

1. Clone the repository:

```sh
git clone https://github.com/yourusername/fintrack.git
```

2. Navigate to the project directory:

```sh
cd fintrack
```

3. Install backend dependencies:

```sh
cd server
npm install
```

4. Install frontend dependencies:

```sh
cd ../client
npm install
```

5. Create a `.env` file in the `server` directory and add the following environment variables:

```env
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

6. Start the backend server:

```sh
cd server
npm start
```

7. Start the frontend development server:

```sh
cd ../client
npm run dev
```

## Project Structure

```csharp
fintrack/
├── client/                # React frontend
│   ├── public/
│   └── src/
│       ├── components/    # React components
│       ├── pages/         # React pages
│       ├── App.jsx        # Main app component
│       └── index.js       # Entry point
├── server/                # Node.js backend
│   ├── controllers/       # Controller functions
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── server.js          # Entry point
│   └── middleware/        # Middleware functions (e.g., auth)
└── README.md              # This file
```

## API Endpoints

### Auth

- `POST /api/register`: Register a new user
- `POST /api/login`: Login a user

### Budgets

- `GET /api/budgets/:userID`: Get all budgets for a user
- `POST /api/add-budget/:userID`: Add a new budget
- `PUT /api/update-budget/:userID/:budgetID`: Update a budget
- `DELETE /api/delete-budget/:userID/:budgetID`: Delete a budget
