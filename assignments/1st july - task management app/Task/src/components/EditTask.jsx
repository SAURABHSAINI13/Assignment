import React, { useEffect, useState } from 'react';
import { getTasks, updateTask } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

function EditTask() {
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTasks().then((res) => {
      const task = res.data.find((t) => t.id === Number(id));
      if (task) setTitle(task.title);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateTask(id, { title });
    navigate('/');
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditTask;
