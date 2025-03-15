# Agent Manager

## Overview

Agent Manager is a MERN stack application designed to manage and assign tasks efficiently. It allows users to upload CSV files, view assigned tasks, and handle authentication via JWT.

## Features

- **User Authentication**: Secure login and signup with JWT-based authentication.
- **CSV Upload**: Upload CSV files to assign tasks to agents.
- **Task Management**: Fetch and display assigned tasks.
- **Role-based Access**: Ensures only authorized users can access certain features.
- **Agent Tracking**: Monitor agent performance and task completion.

## Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication
- **Tools & Libraries**: React Hot Toast, Multer

## Installation

### Prerequisites

- Node.js & npm installed
- MongoDB setup

### Clone the Repository

```sh
git clone https://github.com/yourusername/agent-manager.git
cd agent-manager
```

### Backend Setup

```sh
cd backend
npm install
npm run dev
```

### Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory and add:

```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

## Usage

1. Sign up and log in to get authenticated.
2. Upload a CSV file to assign tasks.
3. View assigned tasks in the dashboard.
4. Track agent performance and progress.

## Contribution

Feel free to contribute by opening issues or pull requests.

## License

This project is licensed under the MIT License.
