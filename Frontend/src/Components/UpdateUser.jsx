import React from 'react'

function UpdateUser() {
  return (
    <div><h1>Update User</h1>
    <form>
        <div>
        <label>Email</label>
        <input type="email" />
        </div>
        <div>
        <label>Password</label>
        <input type="password" />
        </div>
        <div>
        <label>Name</label>
        <input type="text" />
        </div>
        <div>
        <label>Address</label>
        <input type="text" />
        </div>
        <div>
        <label>Animal Type</label>
        <input type="text" />
        </div>
        <button type="submit">Create User</button>
        </form></div>
  )
}

export default UpdateUser