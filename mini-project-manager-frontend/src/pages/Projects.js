import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../slices/projectSlice";

function Projects() {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const { token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (token) dispatch(fetchProjects());
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    dispatch(createProject(form));
    setForm({ title: "", description: "" });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Projects Dashboard</h2>

      {/* Create Project Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Add New Project</h5>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Project Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Project Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Loading/Error */}
      {loading && <div className="alert alert-info">Loading projects...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Projects List */}
      <div className="row">
        {projects.map((project) => (
          <div className="col-md-4 mb-3" key={project._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
                <span
                  className={`badge ${
                    project.status === "active" ? "bg-success" : "bg-secondary"
                  } mb-2`}
                >
                  {project.status}
                </span>
                <div className="mt-auto">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() =>
                      dispatch(
                        updateProject({
                          id: project._id,
                          updates: {
                            status:
                              project.status === "active"
                                ? "completed"
                                : "active",
                          },
                        })
                      )
                    }
                  >
                    Toggle Status
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => dispatch(deleteProject(project._id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="card-footer text-muted text-end">
                Created At: {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
