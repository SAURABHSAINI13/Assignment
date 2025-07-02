import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
function App() {
  return (
<BrowserRouter>
<ul>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/tasks">View Tasks</NavLink></li>
  <li><NavLink to="/addtask">Add Tasks</NavLink></li>
  <li><NavLink to="/edit">Edit Tasks</NavLink></li>
</ul>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
      </BrowserRouter>
  );
}
export default App

