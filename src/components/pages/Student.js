import React, { useState, useEffect } from 'react';
import AddStudentModal from '../utilities/modals/AddStudentModal';
import DeleteStudentInfoModal from '../utilities/modals/DeleteStudentInfoModal';
import EditStudentInfoModal from '../utilities/modals/EditStudentInfoModal';
import Loader from '../utilities/Loader';
import Navigation from '../Navigation';
import Header from '../utilities/headers/Header';
import { PaginationTable } from '../utilities/table/PaginationTable';
import { getStudents } from '../../services/CRUD.service';
import { studentTableConfig } from '../../services/dataTableConfig';

const Body = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const addStudentRecord = () => {
    setShowAddModal(true);
  };
  const changeAddRecordRenderStatus = () => setShowAddModal(false);
  const addStudentInfoModal = showAddModal && <AddStudentModal onchange={changeAddRecordRenderStatus} />;

  const [studentInfo, setStudentInfo] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const editStudentinfo = info => {
    setStudentInfo(info);
    setShowEditModal(true);
  };
  const changeEditInfoRenderStatus = () => setShowEditModal(false);
  const editStudentInfoModal = showEditModal ? <EditStudentInfoModal onchange={changeEditInfoRenderStatus} data={studentInfo} /> : null;

  const [showDeleteModal, setDeleteModal] = useState(false);
  const deleteStudentInfo = info => {
    setStudentInfo(info);
    setDeleteModal(true);
  };
  const changeDeleteInfoRenderStatus = () => setDeleteModal(false);
  const deleteInfoModal = showDeleteModal ? <DeleteStudentInfoModal onchange={changeDeleteInfoRenderStatus} data={studentInfo} /> : null;

  const actionColumn = {
    Header: 'Action', accessor: 'action',
    Cell: ({ row }) => (
      <div className="flex gap-1 items-center">
        <button onClick={() => editStudentinfo(row.original)}
          className='bg-green-500 text-white text-lg hover:cursor-pointer w-7 h-7 rounded-sm hover:bg-gray-700 duration-500 transition-all'>
          <i className="fa-solid fa-pen-to-square"></i></button>
        <button onClick={() => deleteStudentInfo(row.original)}
          className='bg-red-400 text-white text-lg hover:cursor-pointer w-7 h-7 rounded-sm hover:bg-gray-700 duration-500 transition-all'>
          <i className="fa-solid fa-trash"></i></button>
      </div>
    )
  };
  const tableObject = [...studentTableConfig, actionColumn];

  useEffect(() => {
    // setLoading(true);
    let mounted = true;
    const fetchStudents = async () => {
      try {
        const responseData = await getStudents();
        if (mounted && responseData?.status === "SUCCESS" && Array.isArray(responseData.data)) {
          const transformedData = responseData.data.map(student => ({
            ...student,
            email: `${student.user.email}`,
            full_name: `${student.user.first_name} ${student.user.last_name}`
          }));

          setStudents(transformedData);
          setLoading(false);
        } else {
          setLoading(true);
        }

      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchStudents();
    return () => mounted = false;
  }, []);

  return (
    <div className='w-full'>
      <Header pageName={'Students'} placeholder={'Search students here'}/>
      {loading ? <Loader /> :
        <div>
          {addStudentInfoModal}
          {editStudentInfoModal}
          {deleteInfoModal}
          <div className='mt-5 flex justify-start m-2'>
            <button onClick={() => addStudentRecord()}
              className='h-8 w-24 bg-green-500 rounded-md hover:bg-gray-700 text-white'>Add Student</button>
          </div>
          <PaginationTable columnsHeaders={tableObject} data={students} />
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