import React, { useState, useEffect } from 'react';
import AddStudentModal from '../utilities/modals/AddStudentModal';
import DeleteStudentInfoModal from '../utilities/modals/DeleteStudentInfoModal';
import EditStudentInfoModal from '../utilities/modals/EditStudentInfoModal';
import Loader from '../utilities/Loader';
import Navigation from '../Navigation';
import Header from '../utilities/headers/Header';
import PieChart from '../utilities/charts/PieChart';
import randomData from '../utilities/data';
import studentPhoto from '../assets/undraw_pic_profile_re_7g2h.svg';
import { PaginationTable } from '../utilities/table/PaginationTable';
import { getStudents, getStudentAttendance } from '../../services/CRUD.service';
import { studentTableConfig } from '../../services/dataTableConfig';

const Body = () => {
  const [studentToDisplay, setStudentToDisplay] = useState(null);
  const [studentAttendance, setStudentAttendance] = useState([2, 3]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const photoColumn = {
    Header: 'Photo', accessor: 'photo',
    Cell: ({ row }) => (
      <img src={studentPhoto} className='h-10 w-10' alt="" />
    )
  };
  const tableObject = [photoColumn, ...studentTableConfig];

  const attendanceFunc = (attendances) => {
    let numPresent = 0, numAbsent = 0;
    attendances.map((item) => {
      numPresent = item.is_present ? numPresent + 1 : numPresent
      numAbsent = item.is_present ? numAbsent : numAbsent + 1
    });
    return [numPresent, numAbsent]
  }

  const handleAttendance = (data) => {
    const attendances = attendanceFunc(data);
    setStudentAttendance(attendances);
  };

  const handleRowClick = async (data) => {
    setStudentToDisplay(data);
    const attendance = await getStudentAttendance(studentToDisplay.student_id);
    handleAttendance(attendance.data.data);
  };


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
          setStudentToDisplay(transformedData[0]);
          // console.log(studentToDisplay);
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
      <Header pageName={'Students'} placeholder={'Search students here'} />
      {loading ? <Loader /> :
        <div className='mt-6'>
          {addStudentInfoModal}
          {editStudentInfoModal}
          {deleteInfoModal}
          {/* {options} */}

          <div className='w-11/12 flex m-auto gap-x-6 text-customColor'>
            <div className='bg-white w-1/3 rounded-xl p-4'>

              <div className='flex items-center justify-between text-xl'>
                <span className='text-xl font-bold'>Students</span>
                <i onClick={() => addStudentRecord()} className='fa-solid fa-user-plus hover:bg-customLight p-2 rounded-full transition-all ease-in-out delay-150 hover:cursor-pointer'></i>
              </div>

              <input type="text" placeholder='Search students here' className='w-full h-10 rounded-md text-xl border-2 border-customColor outline-none p-2 mt-2' />
              <PaginationTable columnsHeaders={tableObject} data={students} handleRowClick={handleRowClick} />
            </div>

            {studentToDisplay ?
              <div className={`bg-white w-2/3 rounded-xl`}>
                <div className='w-full h-32 text-white flex items-center justify-start space-x-6 pl-6 bg-customColor rounded-t-xl'>
                  <img src={studentPhoto} className='h-24 w-24' alt='' />
                  <span className='flex flex-col space-y-1'>
                    <h1 className='text-2xl'>{studentToDisplay.full_name}</h1>
                    <p>Student ID: {studentToDisplay.registration_num}</p>
                  </span>
                </div>
                <div className='p-5'>
                  <div className='w-full h-48 rounded-xl border border-gray-300 p-5 space-y-5'>
                    <div className='flex justify-between items-center'>
                      <span className='text-xl'>Basic Details</span>
                      {/* <i className='fa-solid fa-ellipsis border-gray-300 font-extrabold text-2xl hover:cursor-pointer' onClick={toggleOptions}></i> */}
                      <div>
                        <div className="flex gap-1 items-center">
                          <button onClick={() => editStudentinfo(studentToDisplay)}
                            className='bg-green-500 text-white text-lg hover:cursor-pointer w-7 h-7 rounded-sm hover:bg-gray-700 duration-500 transition-all'>
                            <i className="fa-solid fa-pen-to-square"></i></button>
                          <button onClick={() => deleteStudentInfo(studentToDisplay)}
                            className='bg-red-400 text-white text-lg hover:cursor-pointer w-7 h-7 rounded-sm hover:bg-gray-700 duration-500 transition-all'>
                            <i className="fa-solid fa-trash"></i></button>
                        </div>
                      </div>
                    </div>
                    <div className='mt-3 flex space-x-3 justify-between'>
                      <span className='flex flex-col'>
                        <p className='text-gray-400'>Email</p> <p>{studentToDisplay.email}</p>
                      </span>

                      <span className='flex flex-col'>
                        <p className='text-gray-400'>Course</p> <p>{studentToDisplay.course}</p>
                      </span>


                      <span className='flex flex-col'>
                        <p className='text-gray-400'>Blood Group</p> <p>{randomData.bloodGroups[Math.floor(Math.random() * randomData.bloodGroups.length)]}</p>
                      </span>
                    </div>

                    <div className='mt-3 flex space-x-3 justify-between'>
                      <span className='flex flex-col'>
                        <p className='text-gray-400'>Religion</p> <p>{randomData.religions[Math.floor(Math.random() * randomData.religions.length)]}</p>
                      </span>

                      {/* <RandomParentInfo parentInfo={randomData.parents[Math.floor(Math.random() * randomData.parents.length)]} /> */}
                      <span className='flex flex-col'>
                        <p className='text-gray-400'>Father</p>
                        <p>{randomData.parents[Math.floor(Math.random() * randomData.parents.length)].father.name}</p>
                        <p>{randomData.parents[Math.floor(Math.random() * randomData.parents.length)].father.phone}</p>
                      </span>

                      <span className='flex flex-col'>
                        <p className='text-gray-400'>Mother</p>
                        <p>{randomData.parents[Math.floor(Math.random() * randomData.parents.length)].mother.name}</p>
                        <p>{randomData.parents[Math.floor(Math.random() * randomData.parents.length)].mother.phone}</p>
                      </span>

                    </div>
                  </div>

                  <div className='rounded-xl mt-5 border border-gray-300'>
                    <div className='h-10 rounded-t-xl bg-customColor text-white flex justify-center items-center m-auto font-bold text-lg'>Attendance</div>
                    <div className='w-80 h-80 m-auto'>
                      <PieChart pieData={studentAttendance} />
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className='loading-gradient h-96 w-2/3'></div>
            }
          </div>
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