import React from 'react';

const Loader = () => {
  return (
    <div className='flex flex-col justify-center items-center mx-auto h-screen w-full'>
      <i className="fa-solid fa-spinner fa-spin text-[100px] text-customColor"></i>
    </div>
  )
}

export default Loader;