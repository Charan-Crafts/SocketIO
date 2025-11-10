import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Navbar from './components/Navbar';
const App = () => {
  return (
    <div  className="bg-[#121212] min-h-screen px-5 py-4">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
