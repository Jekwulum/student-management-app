import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import tokenHelper from '../services/helpers/tokenHelper';


const Header = ({ handleLogout }) => {

  return (
    <div className="bg-customColor w-full h-12 p-3 flex items-center justify-between gap-3 text-customLight text-lg">
      <span className='flex items-center gap-3'>
        <i className="fa-solid fa-graduation-cap text-lg"></i>
        <p>Student Management Application</p>
      </span>
      <i
        onClick={() => handleLogout()}
        className="fa-solid fa-right-from-bracket hover:cursor-pointer"></i>
    </div>
  )
}

const Navigation = ({ Element }) => {
  const menus = [
    { name: "Home", link: '/', icon: "fa solid fa-house cursor-pointer" },
    { name: "Dashboard", link: '/dashboard', icon: "fa-solid fa-chart-line cursor-pointer" },
    { name: "Students", link: '/students', icon: "fa solid fa-list-ul cursor-pointer" },
    { name: "Manage Students", link: '/', icon: "fa solid fa-user cursor-pointer" },
    { name: "Manage Staff", link: '/', icon: "fa solid fa-user cursor-pointer", margin: true }
  ];

  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    tokenHelper.clearEncryptedToken();
    navigate('/login');
  };

  return (
    <div className=''>
      <Header handleLogout={handleLogout} />
      <section className='flex'>
        <div className={`bg-customColor min-h-screen ${open ? "w-64" : "w-16"} duration-500 text-customLight px-4`}>

          <div className={`py-3 ${!open && "mr-[10px]"} flex justify-end`}>
            <i className="fa-solid fa-bars cursor-pointer" onClick={() => { setOpen(!open) }}></i>
          </div>

          <div className="mt-4 flex flex-col gap-4 relative">
            {
              menus?.map((menu, key) => (
                <NavLink
                  to={menu?.link}
                  key={key}
                  className={`${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-500 rounded-md transition-all ease-in duration-500`}
                >
                  <i className={menu?.icon}></i>
                  <h2
                    style={{ transitionDelay: `${key + 3}00ms` }}
                    className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                    {menu?.name}
                  </h2>

                  <h2
                    className={`${open && "hidden"} absolute left-48 bg-customLight font-semibold whitespace-pre text-customColor rounded-md drop-shadow-lg px-0 py-0 
                  w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                    {menu?.name}
                  </h2>
                </NavLink>
              ))
            }
          </div>

        </div>

        <Element />
      </section>
    </div>
  )
}

export default Navigation;