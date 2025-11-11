import React, { useState, useEffect } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Bounce } from 'react-toastify';
import { authRegister } from '../slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const { user, token, error, loading } = useSelector((state) => state.auth);

  const navigate =useNavigate()

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = () => {
    if (!userName || !password || !email) {
      return toast.error('All fields are required', {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      });
    }

    const userRegistration = { userName, password, email };
    dispatch(authRegister(userRegistration));

    setEmail("");
    setPassword("");
    setUserName("");
  };

  // react to auth state changes
  useEffect(() => {
    if (user && token) {
      toast.success("Registration successful! 🎉", {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      });
      navigate("/chat",{replace:true})
    }

    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      });
    }
  }, [user, token, error]);

  return (
    <div className='h-[80vh] flex items-center justify-center mt-3'>
      <div className='h-full w-3/8 flex flex-col items-center py-3'>
        <div className='text-center text-white'>
          <h1 className='text-4xl font-serif py-4'>Hello!</h1>
        </div>
        <div>
          <InputField type="text" placeholder="Charan" setter={setUserName} value={userName} />
          <InputField type="text" placeholder="vibechat@chat.com" setter={setEmail} value={email} />
          <InputField type="password" placeholder="******" setter={setPassword} value={password} />
          <Button type="Register" handleSignup={handleSignup} disabled={loading}></Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
