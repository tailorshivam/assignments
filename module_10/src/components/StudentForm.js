import React, { useState, useEffect } from "react";

const StudentForm = ({ onSubmit, initialData = {}, submitLabel }) => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      course: initialData.course || "",
      email: initialData.email || "",
    });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.course.trim()) newErrors.course = "Course is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    setFormData({ name: "", course: "", email: "" });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className={`form-control ${errors.name && "is-invalid"}`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <div className="invalid-feedback">{errors.name}</div>
      </div>

      <div className="mb-3">
        <label>Course</label>
        <input
          type="text"
          name="course"
          className={`form-control ${errors.course && "is-invalid"}`}
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
        />
        <div className="invalid-feedback">{errors.course}</div>
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className={`form-control ${errors.email && "is-invalid"}`}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="invalid-feedback">{errors.email}</div>
      </div>

      <button type="submit" className="btn btn-success">
        {submitLabel}
      </button>
    </form>
  );
};

export default StudentForm;
