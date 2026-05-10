import { useState, useEffect } from 'react';
import { getCourses, getStudents } from '../services/api';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await getCourses();
        if (coursesRes.success) setCourses(coursesRes.data);
        const studentsRes = await getStudents();
        if (studentsRes.success) setStudents(studentsRes.data);
      } catch {
        setError('Failed to load data.');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="page home-page">
      <div className="hero-section">
        <h1>Welcome to Student Course Management System</h1>
        <p className="hero-subtitle">Easily manage courses, students, and enrollments in one place.</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="summary-cards">
        <div className="summary-card">
          <h2>{courses.length}</h2>
          <p>Total Courses</p>
        </div>
        <div className="summary-card">
          <h2>{students.length}</h2>
          <p>Total Students</p>
        </div>
        <div className="summary-card">
          <h2>{courses.filter((c) => c.status === 'Active').length}</h2>
          <p>Active Courses</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
