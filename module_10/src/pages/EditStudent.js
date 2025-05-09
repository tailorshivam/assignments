import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";
import StudentForm from "../components/StudentForm";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await api.get(`/${id}`);
      console.log("Fetched student:", res.data);
      setStudent(res.data);
    };
    fetchStudent();
  }, [id]);

  const handleUpdate = async (data) => {
    await api.put(`/${id}`, data);
    navigate("/");
  };

  return (
    <div>
      <h2 className="mb-4">Edit Student</h2>
      {student ? (
        <StudentForm
          onSubmit={handleUpdate}
          initialData={student}
          submitLabel="Update Student"
        />
      ) : (
        <p>Loading student...</p>
      )}
    </div>
  );
};

export default EditStudent;
