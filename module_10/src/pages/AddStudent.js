import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import StudentForm from "../components/StudentForm";

const AddStudent = () => {
  const navigate = useNavigate();

  const handleAdd = async (data) => {
    await api.post("/", data);
    navigate("/");
  };

  return (
    <div>
      <h2 className="mb-4">Add Student</h2>
      <StudentForm onSubmit={handleAdd} submitLabel="Add Student" />
    </div>
  );
};

export default AddStudent;
