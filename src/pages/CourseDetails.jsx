import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../services/api';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await getCourseById(id);
        if (res.success) {
          setCourse(res.data);
        } else {
          setError(res.message);
        }
      } catch {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="page"><p className="loading">Loading course details...</p></div>;
  if (error) return <div className="page"><p className="error-message">{error}</p><Link to="/courses" className="btn">Back to Courses</Link></div>;

  return (
    <div className="page">
      <div className="course-details">
        <h1>{course.title}</h1>
        <div className="details-grid">
          <div className="detail-item">
            <strong>Instructor:</strong>
            <p>{course.instructor}</p>
          </div>
          <div className="detail-item">
            <strong>Duration:</strong>
            <p>{course.duration}</p>
          </div>
          <div className="detail-item">
            <strong>Price:</strong>
            <p>${course.price.toFixed(2)}</p>
          </div>
          <div className="detail-item">
            <strong>Status:</strong>
            <p><span className={`status-badge status-${course.status.toLowerCase()}`}>{course.status}</span></p>
          </div>
          <div className="detail-item">
            <strong>Students Enrolled:</strong>
            <p>{course.studentsCount}</p>
          </div>
          <div className="detail-item">
            <strong>Description:</strong>
            <p>{course.description}</p>
          </div>
        </div>
        <Link to="/courses" className="btn btn-details">Back to Courses</Link>
      </div>
    </div>
  );
};

export default CourseDetails;
