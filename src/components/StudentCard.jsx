const StudentCard = ({ student, onDelete }) => {
  return (
    <div className="student-card">
      <h3 className="student-name">{student.name}</h3>
      <p className="student-email"><strong>Email:</strong> {student.email}</p>
      <p className="student-major"><strong>Major:</strong> {student.major}</p>
      <p className="student-age"><strong>Age:</strong> {student.age}</p>
      <button onClick={() => onDelete(student.id)} className="btn btn-delete">Delete</button>
    </div>
  );
};

export default StudentCard;
