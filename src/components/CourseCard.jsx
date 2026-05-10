import { Link } from 'react-router-dom';

const CourseCard = ({ course, onDelete }) => {
  return (
    <div className="course-card">
      <h3 className="course-title">{course.title}</h3>
      <p className="course-instructor"><strong>Instructor:</strong> {course.instructor}</p>
      <p className="course-duration"><strong>Duration:</strong> {course.duration}</p>
      <p className="course-price"><strong>Price:</strong> ${course.price.toFixed(2)}</p>
      <p className="course-status">
        <strong>Status:</strong>
        <span className={`status-badge status-${course.status.toLowerCase()}`}>{course.status}</span>
      </p>
      <div className="course-actions">
        <Link to={`/courses/${course.id}`} className="btn btn-details">View Details</Link>
        <button onClick={() => onDelete(course.id)} className="btn btn-delete">Delete Course</button>
      </div>
    </div>
  );
};

export default CourseCard;
