# Student Course Management System

## Overview

Student Course Management System is a React.js web application developed as a frontend educational management platform. The application allows administrators to manage courses and students, authenticate users, navigate between pages, and simulate API operations using local JSON data.

## Features

- User authentication with protected routes
- Course management
  - View courses
  - Add courses
  - Delete courses
  - View course details
- Student management
  - View students
  - Add students
  - Delete students
  - Search students by name
- Dashboard with summary statistics
- Responsive navigation and routing
- Form validation and error handling
- Simulated API requests using Fetch API

## Technologies Used

- React.js
- JavaScript ES6+
- React Router DOM
- Fetch API
- CSS
- Functional Components
- React Hooks

## Project Structure

```text
src/
├── components/
├── pages/
├── routes/
├── services/
├── data/
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

Clone the repository:

```bash
git clone https://github.com/BatoulDev/student-course-management-system.git
```

Navigate to the project directory:

```bash
cd student-course-management-system
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Login Credentials

```text
Username: admin
Password: 1234
```

## API Simulation

The application simulates backend API operations using static JSON files and Fetch API methods.

Supported operations:

- GET courses
- GET students
- POST add course
- POST add student
- DELETE course
- DELETE student

## Error Handling

The application handles:

- Empty form validation
- Invalid login credentials
- API fetch errors
- Empty course lists
- Empty student lists

## License

This project was developed for educational purposes.