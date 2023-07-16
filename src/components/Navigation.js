import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <div className="bg-customColor w-full h-12 p-3 flex items-center gap-3 text-customLight text-lg">
      <i className="fa-solid fa-graduation-cap text-lg"></i>
      <p>Student Management Application</p>
    </div>
  )
}

const Navigation = ({ Element }) => {
  const menus = [
    { name: "Home", link: '/', icon: "fa solid fa-house cursor-pointer" },
    { name: "Students List", link: '/', icon: "fa solid fa-list-ul cursor-pointer" },
    { name: "Manage Students", link: '/', icon: "fa solid fa-user cursor-pointer" },
    { name: "Manage Staff", link: '/', icon: "fa solid fa-user cursor-pointer", margin: true }
  ];

  const [open, setOpen] = useState(true);

  return (
    <div className=''>
      <Header />
      <section className='flex'>
        <div className={`bg-customColor min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-customLight px-4`}>

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