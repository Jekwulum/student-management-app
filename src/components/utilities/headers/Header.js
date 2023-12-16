import React from 'react';
import profileImage from '../../assets/undraw_pic_profile_re_7g2h.svg'

const Header = ({ pageName, placeholder }) => {
  return (
    <div className='flex items-center justify-between h-20 w-11/12 m-auto mt-2 px-4 bg-white rounded-lg text-customColor'>
      <div className='text-3xl font-bold'>{pageName}</div>
      <div className='flex items-center justify-center gap-x-3'>
        <input type="text" placeholder={placeholder} className='w-[1050px] md:w-full h-10 rounded-md text-xl border-2 border-customColor outline-none p-2' />
        <i className="fa-regular fa-bell text-2xl cursor-pointer hover:bg-customLight p-3 rounded-full transition-all ease-in-out delay-150"></i>
        <img src={profileImage} className='h-10 w-10 cursor-pointer hover:bg-customLight rounded-full transition-all ease-in-out delay-150' alt="" />
      </div>
    </div>
  )
}

export default Header