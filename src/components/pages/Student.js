import React, { useState, useEffect } from 'react';
import Loader from '../Loader';
import Navigation from '../Navigation';
import { getStudents } from '../../services/CRUD.service';

const Body = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchStudents = async () => {
      try {
        const responseData = await getStudents();
        if (mounted && responseData?.status === "SUCCESS") {
          setStudents(responseData?.data);
          setLoading(false);
        } else setLoading(true);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchStudents();
    console.log(students);
    return () => mounted = false;
  });

  return (
    <div className=''>
      {loading ? <Loader /> :
        <div>
          <p>Student</p>
        </div>
      }
    </div>
  )
}

const Student = () => {
  return (
    <Navigation Element={Body} />
  )
};

export default Student;