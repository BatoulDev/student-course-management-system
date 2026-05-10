import { useState, useEffect } from 'react';
import StudentCard from '../components/StudentCard';
import { getStudents, addStudent, deleteStudent } from '../services/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', major: '', age: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await getStudents();
      if (res.success) {
        setStudents(res.data);
      } else {
        setError(res.message);
      }
    } catch {
      setError('Failed to fetch students.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteStudent(id);
    if (res.success) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } else {
      setError(res.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim()) errs.email = 'Email is required.';
    if (!formData.major.trim()) errs.major = 'Major is required.';
    if (!formData.age || Number(formData.age) <= 0) errs.age = 'Age must be greater than 0.';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setFormMessage('');
    if (!validate()) return;

    const studentData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      major: formData.major.trim(),
      age: parseInt(formData.age, 10),
    };

    const res = await addStudent(studentData);
    if (res.success) {
      setMessageType('success');
      setFormMessage('Student added successfully!');
      setStudents((prev) => [...prev, res.data]);
      setFormData({ name: '', email: '', major: '', age: '' });
    } else {
      setMessageType('error');
      setFormMessage(res.message);
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="page"><p className="loading">Loading students...</p></div>;

  return (
    <div className="page">
      <h1>Students</h1>

      <div className="add-student-section">
        <h2>Add New Student</h2>
        <form className="add-form" onSubmit={handleAddStudent}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter student name" />
            {formErrors.name && <span className="field-error">{formErrors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" />
            {formErrors.email && <span className="field-error">{formErrors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="major">Major</label>
            <input type="text" id="major" name="major" value={formData.major} onChange={handleInputChange} placeholder="Enter major" />
            {formErrors.major && <span className="field-error">{formErrors.major}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} placeholder="Enter age" min="1" />
            {formErrors.age && <span className="field-error">{formErrors.age}</span>}
          </div>
          <button type="submit" className="btn btn-submit">Add Student</button>
        </form>
        {formMessage && (
          <div className={`message message-${messageType}`}>{formMessage}</div>
        )}
      </div>

      <div className="search-section">
        <h2>Search Students</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="students-list">
        <h2>All Students ({filteredStudents.length})</h2>
        {error && <p className="error-message">{error}</p>}
        {filteredStudents.length === 0 ? (
          <p className="empty-message">
            {searchTerm ? `No students match "${searchTerm}".` : 'No students enrolled yet.'}
          </p>
        ) : (
          <div className="students-grid">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
