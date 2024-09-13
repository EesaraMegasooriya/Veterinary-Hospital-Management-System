import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null); // Track which user is being edited
  const [editFormData, setEditFormData] = useState({
    Email: '',
    Password: '',
    Name: '',
    Address: '',
    AnimalType: ''
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/users") // Get all users
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle edit button click
  const handleEditClick = (user) => {
    setEditingUserId(user.ID); // Set the user ID to be edited
    setEditFormData(user); // Set form data to the user's current data
    console.log("Editing user with ID:", user.ID);
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Function to handle form submission for updating a user
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updating user with ID:", editingUserId);
    console.log("Data being sent:", editFormData);
    
    axios
      .put(`http://localhost:4000/users/${editingUserId}`, editFormData) // Update user by custom ID
      .then((result) => {
        // Update the users list with the updated data
        setUsers(users.map(user => user.ID === editingUserId ? result.data : user));
        setEditingUserId(null); // Exit edit mode
        console.log("User updated successfully");
      })
      .catch((err) => console.log("Error during update:", err));
  };

  // Function to handle delete
  const handleDelete = (ID) => {
    console.log("Deleting user with ID:", ID);
    
    axios
      .delete(`http://localhost:4000/users/${ID}`) // Use custom ID for deletion
      .then(() => {
        // Remove the deleted user from the local state
        setUsers(users.filter((user) => user.ID !== ID));
        console.log("User deleted successfully");
      })
      .catch((err) => console.log("Error during deletion:", err));
  };

  return (
    <div>
      <div className="container">
        <table className="">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Password</th>
              <th>Name</th>
              <th>Address</th>
              <th>Animal Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.ID}>
                {editingUserId === user.ID ? (
                  // If the user is being edited, show the form
                  <>
                    <td>{user.ID}</td>
                    <td>
                      <input
                        type="email"
                        name="Email"
                        value={editFormData.Email}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="password"
                        name="Password"
                        value={editFormData.Password}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Name"
                        value={editFormData.Name}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Address"
                        value={editFormData.Address}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="AnimalType"
                        value={editFormData.AnimalType}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <button className="btn" onClick={handleUpdate}>Save</button>
                      <button className="btn" onClick={() => setEditingUserId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  // Otherwise, show the user's data
                  <>
                    <td>{user.ID}</td>
                    <td>{user.Email}</td>
                    <td>{user.Password}</td>
                    <td>{user.Name}</td>
                    <td>{user.Address}</td>
                    <td>{user.AnimalType}</td>
                    <td>
                      <button className="btn" onClick={() => handleEditClick(user)}>Edit</button>
                      <button className="btn" onClick={() => handleDelete(user.ID)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
