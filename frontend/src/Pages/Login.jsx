import React, { useEffect, useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { toast, Bounce } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../slice/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const [password, setPassword] = useState("")


  const dispatch = useDispatch()

  const { error, user, token, loading } = useSelector((state) => state.auth)

  const handleLogin = () => {

    if (!email || !password) {

      return toast.error('All fields are required', {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      });
    }

    const loginInfo = {
      email,
      password
    }

    dispatch(authLogin(loginInfo))

    setEmail("")
    setPassword("")
  }

  useEffect(() => {

    if (user && token) {
      toast.success('Login', {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      });

      navigate("/chats")

    }

    if (error) {
       toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      })
    }
  }, [user, loading, token, error])

  return (
    <div className=' h-[80vh] flex items-center justify-center mt-3'>
      <div className=' h-full w-3/8 flex flex-col items-center py-3'>
        <div className='text-center text-white'>
          <h1 className='text-4xl font-serif py-4'>Hello !</h1>
          <h1 className='text-4xl font-serif py-4'>Welcome Back</h1>
        </div>
        <div>
          <InputField type="text" placeholder="vibechat@chat.com" setter={setEmail} value={email} />
          <InputField type="password" placeholder="******" setter={setPassword} value={password} />
          <Button type="Login" setter={handleLogin}></Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
