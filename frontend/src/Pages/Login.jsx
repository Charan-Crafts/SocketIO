import React from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
const Login = () => {
  return (
    <div className=' h-[80vh] flex items-center justify-center mt-3'>
      <div className=' h-full w-3/8 flex flex-col items-center py-3'>
        <div className='text-center text-white'>
          <h1 className='text-4xl font-serif py-4'>Hello !</h1>
          <h1 className='text-4xl font-serif py-4'>Welcome Back</h1>
        </div>
        <div>
          <InputField type="text" placeholder="vibechat@chat.com"/>
          <InputField type="password" placeholder="******"/>
          <Button type="Login"></Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
