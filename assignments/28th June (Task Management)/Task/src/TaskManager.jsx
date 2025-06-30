import React, { useState, useEffect } from "react"

const initialState = [
  {
    id: 1,
    title: "Buy Bananas",
    description: "From nearby store",
    priority: "Low",
    status: "Pending",
    isEdit: false,
  },
  {
    id: 2,
    title: "Finish Assignment",
    description: "React CRUD Task",
    priority: "High",
    status: "In Progress",
    isEdit: false,
  },
]

function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const local = localStorage.getItem("tasks");
    return local ? JSON.parse(local) : initialState;
  })
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
  })

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    priority: "",
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  const addTask = () => {
    if (!form.title.trim()) return alert("Title is required");
    const newTask = {
      id: Date.now(),
      ...form,
      status: "Pending",
      isEdit: false,
    };
    setTasks([...tasks, newTask]);
    setForm({ title: "", description: "", priority: "Low" });
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const toggleEdit = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          setEditForm({
            title: task.title,
            description: task.description,
            priority: task.priority,
          });
          return { ...task, isEdit: !task.isEdit };
        }
        return { ...task, isEdit: false };
      })
    );
  }

  const saveEdit = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...editForm,
              isEdit: false,
            }
          : task
      )
    );
  }

  const changeStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Task Manager</h2>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <hr />

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <table border="1" width="100%" cellPadding="8">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  {task.isEdit ? (
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td>
                  {task.isEdit ? (
                    <input
                      type="text"
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                    />
                  ) : (
                    task.description
                  )}
                </td>
                <td>
                  {task.isEdit ? (
                    <select
                      name="priority"
                      value={editForm.priority}
                      onChange={handleEditChange}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  ) : (
                    task.priority
                  )}
                </td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => changeStatus(task.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => toggleEdit(task.id)}>
                    {task.isEdit ? "Save" : "Edit"}
                  </button>
                  {task.isEdit && <button onClick={() => saveEdit(task.id)}>Confirm</button>}
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskManager
