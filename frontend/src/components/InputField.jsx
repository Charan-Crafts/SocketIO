import React from 'react';
import { EyeOff, Eye } from 'lucide-react'
import { useState } from 'react';
const InputField = ({ type, placeholder,setter,value }) => {

    const [showPassword, setShowPassword] = useState(type === "password" ? false : true);
    return (
        <div className="w-full mt-4 relative">
            <input
                type={type === "password" ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                className="w-full px-4 py-3 text-lg rounded-xl bg-white font-stack outline-none border-none focus:ring-2 focus:ring-cyan-400 pr-12 shadow-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100" onChange={(e)=>setter(e.target.value)} value={value}
            />
            {
                type === "password" ? <>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-cyan-500 focus:outline-none"
                    >
                        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                </> : null
            }

        </div>
    );
}

export default InputField;
