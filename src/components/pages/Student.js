import React, { useState, useEffect } from 'react';
import EditStudentInfoModal from '../utilities/modals/EditStudentInfoModal';
import Loader from '../utilities/Loader';
import Navigation from '../Navigation';
import { Table } from '../utilities/table/Table';
import { getStudents } from '../../services/CRUD.service';
import { studentTableConfig } from '../../services/dataTableConfig';

const Body = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [studentInfo, setStudentInfo] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const editStudentinfo = info => {
    setStudentInfo(info);
    setShowEditModal(true);
  };
  const changeEditInfoRenderStatus = () => setShowEditModal(false);
  const editStudentInfoModal = showEditModal ? <EditStudentInfoModal onchange={changeEditInfoRenderStatus} data={studentInfo} /> : null;

  const actionColumn = {
    Header: 'Action', accessor: 'action',
    Cell: ({ row }) => (
      <div className="flex gap-1 items-center">
        <button onClick={() => editStudentinfo(row.original)}
          className='bg-green-500 text-white text-lg hover:cursor-pointer w-7 h-7 rounded-sm hover:bg-gray-700 duration-500 transition-all'>
          <i className="fa-solid fa-pen-to-square"></i></button>
        <button
          className='bg-red-400 text-white text-lg hover:cursor-pointer w-7 h-7 rounded-sm hover:bg-gray-700 duration-500 transition-all'>
          <i className="fa-solid fa-trash"></i></button>
      </div>
    )
  };
  const tableObject = [...studentTableConfig, actionColumn];

  useEffect(() => {
    let mounted = true;
    const fetchStudents = async () => {
      try {
        const responseData = await getStudents();
        if (mounted && responseData?.status === "SUCCESS") {
          const transformedData = responseData.data?.map(student => ({
            ...student,
            full_name: `${student.firstName} ${student.lastName}`
          }))
          setStudents(transformedData);
          setLoading(false);
        } else setLoading(true);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchStudents();
    console.log(students);
    return () => mounted = false;
  }, []);

  return (
    <div className='w-full'>
      {loading ? <Loader /> :
        <div>
          {editStudentInfoModal}
          <Table columnsHeaders={tableObject} data={students} />
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