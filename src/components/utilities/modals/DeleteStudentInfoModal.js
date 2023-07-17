import React, { useState } from 'react';
import { deleteStudent } from '../../../services/CRUD.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteStudentInfoModal = ({ onchange, data }) => {
  const [showModal, setShowModal] = useState(true);
  const [enteredRegNo, setEnteredRegNo] = useState();

  const disabledBtn = enteredRegNo && data.registrationNo === enteredRegNo ? false : true;

  const handleClose = () => {
    setShowModal(false);
    onchange();
  };

  const saveChanges = async () => {
    const response = await deleteStudent(data.studentId);
    if (response.status === 204) {
      toast.success("Record successfully deleted");
      window.location.reload();
    } else {
      toast.error(`operation failed: ${response.message}`);
    };
  }

  return (
    <>
      <ToastContainer />
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Delete student record <i className="zmdi zmdi-delete ml-2 text-red-500"></i>
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Delete student record with Reg Number: <span className="text-red-500">{`${data.registrationNo}`}</span> <br />
                    Enter student Reg Number to confirm
                  </p>

                  <input type="email" onChange={e => setEnteredRegNo(e.target.value)}
                    className={`border h-8 w-full text-sm m-1 p-2 ml-2 focus:outline-none bg-gray-200 text-custom-bgColor`} placeholder='Student Reg Number' />
                </div>


                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 hover:bg-red-500 hover:text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-200"
                    type="button"
                    onClick={() => handleClose()}
                  >
                    Close
                  </button>
                  <button
                    disabled = {disabledBtn}
                    className="bg-customColor text-white hover:bg-gray-700 active:bg-customColor font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-200"
                    type="button"
                    onClick={() => saveChanges()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default DeleteStudentInfoModal;