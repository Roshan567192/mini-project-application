import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask, updateTask, deleteTask } from "../slices/taskSlice";

function Tasks() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.tasks);
  const { projects } = useSelector((state) => state.projects);

  const [form, setForm] = useState({ title: "", description: "", project: "" });
  const [filter, setFilter] = useState({ status: "", sort: "asc", search: "" });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.project) return;
    dispatch(createTask(form));
    setForm({ title: "", description: "", project: "" });
  };

  const filteredTasks = list
    .filter((task) => (filter.status ? task.status === filter.status : true))
    .filter((task) =>
      filter.search ? task.title.toLowerCase().includes(filter.search.toLowerCase()) : true
    )
    .sort((a, b) => {
      if (filter.sort === "asc") {
        return new Date(a.dueDate || a.createdAt) - new Date(b.dueDate || b.createdAt);
      } else {
        return new Date(b.dueDate || b.createdAt) - new Date(a.dueDate || a.createdAt);
      }
    });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Tasks</h2>

      {/* Create Task Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Add New Task</h5>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                required
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body row g-3 align-items-center">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={filter.sort}
              onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
            >
              <option value="asc">Due Date Ascending</option>
              <option value="desc">Due Date Descending</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading tasks...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Task List */}
      <div className="row">
        {filteredTasks.length === 0 && <p className="text-center">No tasks found.</p>}
        {filteredTasks.map((task) => (
          <div className="col-md-4 mb-3" key={task._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description || "No description"}</p>
                <span
                  className={`badge mb-2 ${
                    task.status === "done"
                      ? "bg-success"
                      : task.status === "in-progress"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {task.status}
                </span>
                <div className="mt-auto">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() =>
                      dispatch(
                        updateTask({
                          id: task._id,
                          updates: {
                            status:
                              task.status === "todo"
                                ? "in-progress"
                                : task.status === "in-progress"
                                ? "done"
                                : "todo",
                          },
                        })
                      )
                    }
                  >
                    Toggle Status
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => dispatch(deleteTask(task._id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="card-footer text-muted text-end">
                Project: {task.project?.title || "N/A"} | Due:{" "}
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
