import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';
import { Link } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <Link to="/add">Add Task</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <Link to={`/edit/${task.id}`}>Edit</Link>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
