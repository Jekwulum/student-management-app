import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation';
import { getStudents } from '../../services/CRUD.service';

const Body = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchStudents = async () => {
      try {
        const responseData = await getStudents();
        if (mounted && responseData?.message === "SUCCESS") {
          setStudents(responseData?.data);
          console.log(students);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    
    fetchStudents();
    return () => mounted = false;
  });

  return (
    <div>Student</div>
  )
}

const Student = () => {
  return (
    <Navigation Element={Body} />
  )
};

export default Student;