import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { getCourses, deleteCourse } from '../services/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getCourses();
      if (res.success) {
        setCourses(res.data);
      } else {
        setError(res.message);
      }
    } catch {
      setError('Failed to fetch courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteCourse(id);
    if (res.success) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } else {
      setError(res.message);
    }
  };

  if (loading) return <div className="page"><p className="loading">Loading courses...</p></div>;

  return (
    <div className="page">
      <h1>Our Courses</h1>
      {error && <p className="error-message">{error}</p>}
      {courses.length === 0 ? (
        <p className="empty-message">No courses available at the moment.</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
