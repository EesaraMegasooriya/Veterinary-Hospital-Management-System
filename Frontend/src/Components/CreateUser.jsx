import React, { useState } from 'react';
import axios from "axios";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [id, setId] = useState("");

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/createUser", {
        ID: id,
        Email: email,
        Password: password,
        Name: name,
        Address: address,
        AnimalType: animalType
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={Submit}>
        <div>
          <label>ID</label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Animal Type</label>
          <input type="text" value={animalType} onChange={(e) => setAnimalType(e.target.value)} />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default CreateUser;
