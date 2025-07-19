import React, { useState } from 'react';

function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setNewTitle(task.title); // reset changes
    setIsEditing(false);
  };

  const handleSave = () => {
    if (newTitle.trim() === '') {
      alert('Task title cannot be empty');
      return;
    }
    onUpdate(task.id, { ...task, title: newTitle });
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
