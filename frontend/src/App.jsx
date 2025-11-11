import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import Chat from './Pages/Chat';

const App = () => {
  return (
    <div  className="bg-[#121212] min-h-screen px-5 py-4">
      <ToastContainer position='top-right'/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
      <Routes>
        <Route path='/chat' element={<Chat/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
