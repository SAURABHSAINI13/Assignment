import React, { useState } from 'react'
import { addTask } from '../api'
import { useNavigate } from 'react-router-dom'

function AddTask() {
  const [title, setTitle] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addTask({ title })
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default AddTask
