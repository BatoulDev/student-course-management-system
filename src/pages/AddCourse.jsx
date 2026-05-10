import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../services/api';

const AddCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    duration: '',
    price: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required.';
    if (!formData.instructor.trim()) newErrors.instructor = 'Instructor is required.';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required.';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Price must be greater than 0.';
    if (!formData.description.trim()) newErrors.description = 'Description is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validate()) return;

    const courseData = {
      title: formData.title.trim(),
      instructor: formData.instructor.trim(),
      duration: formData.duration.trim(),
      price: parseFloat(formData.price),
      description: formData.description.trim(),
    };

    const res = await addCourse(courseData);
    if (res.success) {
      setMessageType('success');
      setMessage('Course added successfully!');
      setFormData({ title: '', instructor: '', duration: '', price: '', description: '' });
      setTimeout(() => navigate('/courses'), 1500);
    } else {
      setMessageType('error');
      setMessage(res.message);
    }
  };

  return (
    <div className="page">
      <h1>Add New Course</h1>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Course Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter course title" />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="instructor">Instructor</label>
          <input type="text" id="instructor" name="instructor" value={formData.instructor} onChange={handleChange} placeholder="Enter instructor name" />
          {errors.instructor && <span className="field-error">{errors.instructor}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 12 weeks" />
          {errors.duration && <span className="field-error">{errors.duration}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" min="0" step="0.01" />
          {errors.price && <span className="field-error">{errors.price}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter course description" rows="4" />
          {errors.description && <span className="field-error">{errors.description}</span>}
        </div>
        <button type="submit" className="btn btn-submit">Add Course</button>
      </form>
      {message && (
        <div className={`message message-${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddCourse;
