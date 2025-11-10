import React from 'react';
import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <div className='w-full px-6 py-4 flex justify-between items-center  from-gray-900 via-gray-800 to-gray-900'>
            {/* Logo Section */}
            <div className="text-center">
                <Link
                    to="/"
                    className="no-underline focus:outline-none"
                >
                    <h1 className="font-momo text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-white hover:to-white transition-all duration-300">
                        Vibe Chat
                    </h1>
                </Link>
            </div>

            {/* Buttons Section */}
            <div className='flex gap-4 items-center'>
                <NavLink to="/login">
                    {({ isActive }) => (
                        <button className={`px-8 py-3 text-lg text-white font-medium rounded-lg border-2 border-cyan-400 transition-all duration-300 cursor-pointer ${isActive
                                ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                                : 'bg-transparent hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-400/50'
                            }`}>
                            Login
                        </button>
                    )}
                </NavLink>
                <NavLink to="/signup">
                {
                    ({isActive})=>
                        <button className={`px-8 py-3 text-lg text-white font-medium rounded-lg border-2 border-cyan-400 transition-all duration-300 cursor-pointer ${isActive
                                ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                                : 'bg-transparent hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-400/50'
                            }`}>
                            Get Started
                        </button>
                }
                
                </NavLink>
            </div>
        </div>
    );
}

export default Navbar;