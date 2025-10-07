import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './AdminComponents.css';

const UserManagement = ({ onCreateUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // This endpoint would need to be implemented on the backend
      const response = await axiosInstance.get('/api/users');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error('Error fetching users:', err);
      // For development, create mock users if API fails
      setUsers([
        { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
        { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
        { _id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'user'
    });
    setCurrentUser(null);
  };

  const openModal = (user = null) => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user'
      });
      setCurrentUser(user);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      if (currentUser) {
        // Update existing user
        response = await axiosInstance.put(`/api/users/${currentUser._id}`, formData);
        setUsers(users.map(user => 
          user._id === currentUser._id ? response.data : user
        ));
      } else {
        // Create new user
        response = await axiosInstance.post('/api/users', formData);
        setUsers([...users, response.data]);
      }

      closeModal();
      // Show success message
      alert(currentUser ? 'User updated successfully!' : 'User created successfully!');
    } catch (err) {
      setError('Failed to save user. Please check your inputs and try again.');
      console.error('Error saving user:', err);
      
      // For development, update the UI without actual API call
      if (currentUser) {
        const updatedUsers = users.map(user => 
          user._id === currentUser._id ? {...user, ...formData} : user
        );
        setUsers(updatedUsers);
      } else {
        const newUser = {
          _id: Date.now().toString(),
          ...formData
        };
        setUsers([...users, newUser]);
      }
      closeModal();
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await axiosInstance.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      alert('User deleted successfully!');
    } catch (err) {
      setError('Failed to delete user. Please try again.');
      console.error('Error deleting user:', err);
      
      // For development, update the UI without actual API call
      setUsers(users.filter(user => user._id !== userId));
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosInstance.patch(`/api/users/${userId}/role`, { role: newRole });
      setUsers(users.map(user => 
        user._id === userId ? {...user, role: newRole} : user
      ));
      alert(`User role updated to ${newRole}`);
    } catch (err) {
      setError('Failed to update user role. Please try again.');
      console.error('Error updating user role:', err);
      
      // For development, update the UI without actual API call
      setUsers(users.map(user => 
        user._id === userId ? {...user, role: newRole} : user
      ));
    }
  };

  if (loading) {
    return <div className="loading-container">Loading users...</div>;
  }

  return (
    <div className="admin-component-container">
      <div className="admin-component-header">
        <h2>User Management</h2>
        <button 
          className="btn-create" 
          onClick={onCreateUser || (() => openModal())}
        >
          <FaPlus /> Add New User
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">No users found.</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select 
                      value={user.role} 
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="role-select"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="action-buttons">
                    <button 
                      className="btn-edit" 
                      title="Edit User"
                      onClick={() => openModal(user)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-delete" 
                      title="Delete User"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* User Form Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{currentUser ? 'Edit User' : 'Add New User'}</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              {!currentUser && (
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleInputChange}
                    required={!currentUser}
                  />
                </div>
              )}
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {currentUser ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;