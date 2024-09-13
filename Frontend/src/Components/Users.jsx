import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users") // Get all users
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  // Function to handle delete
  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:4000/users/${_id}`) // Use _id for deletion
      .then(() => {
        // Remove the deleted user from the local state
        setUsers(users.filter((user) => user._id !== _id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Link to="/create">ADD USER</Link>
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
              <tr key={user._id}>
                <td>{user._id}</td> {/* Display MongoDB _id */}
                <td>{user.Email}</td>
                <td>{user.Password}</td>
                <td>{user.Name}</td>
                <td>{user.Address}</td>
                <td>{user.AnimalType}</td>
                <td>
                  <Link to={`/update/${user._id}`}>Update</Link> {/* Pass _id for update */}
                  <button className="btn" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
