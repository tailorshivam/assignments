import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

function ListStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true); // New state to track if there is more data
  const limit = 5;

  const fetchStudents = async () => {
    const res = await api.get(`?page=${page}&limit=${limit}`);
    setStudents(res.data);
    setHasMoreData(res.data.length === limit); // If we have a full page, there might be more data
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      await api.delete(`/${id}`);
      fetchStudents();
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4">Student List</h2>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search by name or course"
          className="form-control w-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/students/add" className="btn btn-primary">
          Add Student
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>{student.email}</td>
              <td>
                <Link
                  to={`/students/edit/${student.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="btn btn-secondary"
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasMoreData} // Disable if no more data
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListStudents;