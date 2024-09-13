import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Users from '../src/Components/Users'
import CreateUser from '../src/Components/CreateUser'
import UpdateUser from '../src/Components/UpdateUser'

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
