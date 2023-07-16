import React from 'react';
import { Carousel } from "@material-tailwind/react";
import Navigation from '../Navigation';
import Photo1 from '../assets/stu-01.jpg'
import Photo2 from '../assets/stu-02.jpg'
import Photo3 from '../assets/stu-03.jpg'

const Body = () => {
  return (
    <Carousel className="h-screen">
      <img
        src={Photo1}
        className="h-full w-full object-cover"
        alt='carousel 1'
      />
      <img
        src={Photo2}
        className="h-full w-full object-cover"
        alt='carousel 1'
      />
      <img
        src={Photo3}
        className="h-full w-full object-cover"
        alt='carousel 1'
      />
    </Carousel>
  )
};

const Home = () => {
  return (
    <Navigation Element={Body} />
  )
}

export default Home;