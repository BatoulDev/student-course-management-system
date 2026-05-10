import { useState, useEffect } from 'react';
import { getCourses, getStudents } from '../services/api';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [coursesRes, studentsRes] = await Promise.all([getCourses(), getStudents()]);
        if (coursesRes.success) setCourses(coursesRes.data);
        if (studentsRes.success) setStudents(studentsRes.data);
      } catch {
        setError('Failed to load dashboard data.');
      }
    };
    fetchAll();
  }, []);

  const totalCourses = courses.length;
  const activeCourses = courses.filter((c) => c.status === 'Active').length;
  const totalStudents = students.length;
  const avgAge = students.length > 0
    ? (students.reduce((sum, s) => sum + s.age, 0) / students.length).toFixed(1)
    : 0;

  return (
    <div className="page dashboard-page">
      <h1>Admin Dashboard</h1>
      <p className="welcome-message">Welcome, Admin! Here is a summary of the system.</p>

      {error && <p className="error-message">{error}</p>}

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Courses Summary</h3>
          <div className="stat">
            <span className="stat-label">Total Courses</span>
            <span className="stat-value">{totalCourses}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Active Courses</span>
            <span className="stat-value">{activeCourses}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Inactive Courses</span>
            <span className="stat-value">{totalCourses - activeCourses}</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Students Summary</h3>
          <div className="stat">
            <span className="stat-label">Total Students</span>
            <span className="stat-value">{totalStudents}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Average Age</span>
            <span className="stat-value">{avgAge}</span>
          </div>
        </div>
      </div>

      {courses.length > 0 && (
        <div className="dashboard-section">
          <h2>Recent Courses</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Instructor</th>
                <th>Status</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              {courses.slice(0, 4).map((c) => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td>{c.instructor}</td>
                  <td><span className={`status-badge status-${c.status.toLowerCase()}`}>{c.status}</span></td>
                  <td>{c.studentsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
