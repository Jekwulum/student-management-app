import React, { useState } from 'react';
import { addStudent } from '../../../services/CRUD.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudentModal = ({ onchange, data }) => {
  const [showModal, setShowModal] = useState(true);
  let [payload, setPayload] = useState({ firstName: "", lastName: "", course: "", email: "", password: "password", confirm_password: "password" });

  const handleClose = () => {
    setShowModal(false);
    onchange();
  };

  const saveChanges = async () => {
    if (!validateEmail(payload.email)) toast.error("Invalid email!");
    if (payload.password !== payload.confirm_password) {
      toast.error("Passwords do not match");
    }
    else {
      payload = {
        user: {
          first_name: payload.firstName, last_name: payload.lastName, email: payload.email,
          password: payload.password, confirm_password: payload.confirm_password
        },
        course: payload.course
      };

      const response = await addStudent(payload);
      if (response.status === "SUCCESS") {
        toast.success(response?.message);
        setTimeout(2000);
        // handleClose();
        window.location.reload();
      } else {
        toast.error(`operation failed: ${response.message}`);
      };
    }
  };

  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  }

  return (
    <>
      <ToastContainer />
      {showModal && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-4 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add student record <i className="zmdi zmdi-edit ml-2"></i>
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto w-96">

                  <div className="flex flex-col space-y-1 mb-3">
                    <label htmlFor="first_name" className="inline-block">First Name</label>
                    <input type="text" id="first_name" onChange={e => setPayload({ ...payload, firstName: e.target.value })} value={payload?.firstName}
                      className="border border-customColor h-8 w-full text-sm p-2 focus:outline-none bg-gray-200 text-customColor"
                      placeholder='First Name' />
                  </div>

                  <div className="flex flex-col space-y-1 mb-3">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" id="last_name" onChange={e => setPayload({ ...payload, lastName: e.target.value })} value={payload?.lastName}
                      className="border border-customColor h-8 w-full text-sm p-2 focus:outline-none bg-gray-200 text-customColor"
                      placeholder='Last Name' />
                  </div>

                  <div className="flex flex-col space-y-1 mb-3">
                    <label htmlFor="course" className="">Email</label>
                    <input type="email" id="course" onChange={e => setPayload({ ...payload, email: e.target.value })} value={payload?.email}
                      className="border border-customColor h-8 w-full text-sm p-2 focus:outline-none bg-gray-200 text-customColor"
                      placeholder='Email' />
                  </div>

                  <div className="flex flex-col space-y-1 mb-3">
                    <label htmlFor="course" className="">Course</label>
                    <input type="text" id="course" onChange={e => setPayload({ ...payload, course: e.target.value })} value={payload?.course}
                      className="border border-customColor h-8 w-full text-sm p-2 focus:outline-none bg-gray-200 text-customColor"
                      placeholder='Course' />
                  </div>

                  <div className="flex flex-col space-y-1 mb-3">
                    <label htmlFor="password" className="">Password</label>
                    <input type="text" id="upassword" onChange={e => setPayload({ ...payload, password: e.target.value })} value={payload?.password}
                      className="border border-customColor h-8 w-full text-sm p-2 focus:outline-none bg-gray-200 text-customColor"
                      placeholder='Password' />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label htmlFor="confirm_password" className="">Confirm Password</label>
                    <input type="text" id="confirm_password" onChange={e => setPayload({ ...payload, confirm_password: e.target.value })} value={payload?.confirm_password}
                      className="border border-customColor h-8 w-full text-sm p-2 focus:outline-none bg-gray-200 text-customColor"
                      placeholder='Confirm Password' />
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 hover:bg-red-500 hover:text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-200"
                    type="button"
                    onClick={() => handleClose()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-customColor text-white hover:bg-gray-700 active:bg-customColor font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-200"
                    type="button"
                    onClick={() => saveChanges()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  )
}

export default AddStudentModal;