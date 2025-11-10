import React from 'react';
import {Link} from "react-router-dom"
import {Github,Linkedin,User} from "lucide-react"
const Footer = () => {
  return (
    <div className='  w-full flex justify-evenly items-center mt-10'>
      <Link to="https://github.com/Charan-Crafts" target='_blank'>
        <Github size={40} color="#ffffff" className='shadow-lg shadow-blue-100/50' />
      </Link>
      <Link to="https://linkedin.com/in/thecharan" target='_blank'>
        <Linkedin size={40} color="#ffffff" className='shadow-lg shadow-blue-100/50' />
      </Link>
      <Link to="https://thecharan.vercel.app/" target='_blank'>
        <User size={40} color="#ffffff"  className='shadow-lg shadow-blue-100/50'/>
      </Link>
    </div>
  );
}

export default Footer;
