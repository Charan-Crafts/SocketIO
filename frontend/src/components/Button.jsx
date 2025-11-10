import React from 'react';

const Button = ({type}) => {
  return (
    <div className='w-full text-center mt-4'>
      <button className='py-4 text-white font-serif text-xl rounded-full bg-red-600 w-full shadow-xl cursor-pointer active:bg-amber-50 duration-300 active:text-black'>{type}</button>
    </div>
  );
}

export default Button;
