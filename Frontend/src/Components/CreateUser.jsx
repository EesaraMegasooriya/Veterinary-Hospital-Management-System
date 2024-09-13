import React, { useState } from 'react';
import axios from "axios";
import Dog from '../assets/dog.jpg'

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
    <div className='bg-white '>
        <div className='bg-orange-200 mx-14 h-[860px] rounded-2xl flex '>
        <div className='flex-1'>
        <h1 className='text-6xl text-center mt-10'>Hi there !</h1>
      <div className="text-center mt-11">Welcome to VetCare, Community Dashboard</div>
      <form onSubmit={Submit}>
      <div className=' items-center flex justify-center flex-col gap-9' >
          
          <input type="text" value={id} placeholder='ID' className='placeholder:text-gray-500 rounded-lg px-4 w-96 py-2 mt-10 text-1xl bg-orange-200 border-4 border-white' onChange={(e) => setId(e.target.value)} />
        
        <div>
          
          <input type="email" className=' placeholder:text-gray-500 rounded-lg px-4 w-96 py-2  text-1xl bg-orange-200 border-4 border-white' value={email} placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          
          <input type="password" className=' placeholder:text-gray-500 rounded-lg px-4 w-96 py-2  text-1xl bg-orange-200 border-4 border-white' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          
          <input type="text" className=' placeholder:text-gray-500 rounded-lg px-4 w-96 py-2  text-1xl bg-orange-200 border-4 border-white' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          
          <input type="text" className=' placeholder:text-gray-500 rounded-lg px-4 w-96 py-2  text-1xl bg-orange-200 border-4 border-white' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          
          <input type="text" className=' placeholder:text-gray-500 rounded-lg px-4 w-96 py-2  text-1xl bg-orange-200 border-4 border-white' placeholder='Animal Type' value={animalType} onChange={(e) => setAnimalType(e.target.value)} />
        </div>
        <button type="submit" className='rounded-full mt-6 bg-black text-white px-5 w-80 py-2'>Sign Up</button>
        </div>
        <div className='text-center mt-10'>Already have an account? <a href='/login' className='text-blue-500'>Login</a></div>
      </form>
      </div>
      <div className=' '>
        <img src={Dog} alt='logo' className=' rounded-2xl h-full'/>
      </div>
      </div>
    </div>
  );
}

export default CreateUser;
