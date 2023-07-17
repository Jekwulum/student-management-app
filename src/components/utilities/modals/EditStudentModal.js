import React, { useState } from 'react';
import { editStudent } from '../../../services/CRUD.service';

const EditStudentModal = ({ onchange, data }) => {
  const [showModal, setShowModal] = useState(true);
  const [first_name, setFirstName] = useState(data.firstName);
  const [last_name, setLastName] = useState(data.lastName);
  const [course, setCourse] = useState(data.lastName);

  const handleClose = () => {
    setShowModal(false);
    onchange();
  };

  const saveChanges = async (id) => {
    const payload = { first_name, last_name, };
    console.log(payload);
    const response = await editStudent(id, payload);
    if (response.status === "SUCCESS") {
      alert("Success");
      handleClose();
      window.location.reload();
    } else {
      alert(`operation failed: ${response.message}`);
    };
  };

  return (
    <>
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
                    Edit student info <i className="zmdi zmdi-edit ml-2"></i>
                  </h3>
                  {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button> */}
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {/* <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p> */}
                  <div>
                    <label htmlFor="first_name" className="inline-block">First Name:</label>
                    <input type="text" id="first_name" onChange={e => setFirstName(e.target.value)} value={first_name}
                      className="border h-8 w-[300px] text-sm m-1 p-2 ml-2 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='First Name' " />
                  </div>

                  <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" id="last_name" onChange={e => setLastName(e.target.value)} value={last_name}
                      className="border h-8 w-[300px] text-sm m-1 p-2 ml-2 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='Last Name' " />
                  </div>

                  <div className="space-x-[37px]">
                    <label htmlFor="phone" className="inline-block text-right">Course:</label>
                    <input type="text" id="phone" onChange={e => setCourse(e.target.value)} value={course}
                      className="border h-8 w-[300px] text-sm m-1 p-2 ml-2 focus:outline-none bg-gray-200` text-custom-bgColor' placeholder='Phone' " />
                  </div>
                </div>


                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleClose()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-custom-bgColor text-white active:bg-custom-bgColor font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => saveChanges(data.studentId)}
                  >
                    Save Changes
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

export default EditStudentModal;