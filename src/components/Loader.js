import React from 'react';

const Loader = () => {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-center h-screen'>
        <i className="fa-solid fa-spinner fa-spin text-[100px] text-customColor"></i>
      </div>
    </div>
  )
}

export default Loader;