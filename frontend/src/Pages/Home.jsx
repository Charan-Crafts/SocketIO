import React from 'react';
import Footer from '../components/Footer';
const Home = () => {
  return (
    <div className=' h-[60vh] flex flex-col items-center mt-4'>
      <div className=' flex flex-col items-center justify-center px-50 py-10 text-white'>
        <h1 className='text-8xl font-serif p-3 mb-4 shadow-md'>Connect with your</h1>
        <h1 className='text-8xl font-serif mb-4 '>friends easily</h1>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Home;
