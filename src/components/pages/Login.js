import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../../services/Auth.service';
import tokenHelper from '../../services/helpers/tokenHelper';
import { Loading } from '../../services/helpers/constants';

const Login = () => {
  const isLoggedIn = tokenHelper.checkIfLoggedIn(), navigate = useNavigate();
  const [payload, setPayload] = useState({ email: "", password: "" });
  const [loading, setLoadingStatus] = useState(false);

  if (isLoggedIn) {
    return <Navigate to={{ pathname: "/" }} />
  };

  const handleLogin = async () => {
    setLoadingStatus(true);
    const { data: responseData } = await AuthService.login(payload);
    if (responseData.status !== Loading.SUCCESS) {
      toast.error(responseData.message)
      setLoadingStatus(false);
    } else validateLogin(responseData);
  };

  const validateLogin = async responseData => {
    await setLoggedInUser(responseData.data);
    toast.success(responseData.message);
    setLoadingStatus(false);
  };

  const setLoggedInUser = async ({ access, refresh }) => {
    tokenHelper.encryptAndSaveToken(access);
    tokenHelper.encryptAndSaveRefreshToken(refresh);
    navigate('/');
  };

  return (
    <div className='bg-customColor h-screen flex justify-center items-center'>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center space-y-5 w-72 bg-white h-64 m-auto rounded-2xl">
        <h1 className='text-customColor font-bold text-2xl'>Log In</h1>
        <input
          type="email" placeholder='Email' onChange={e => setPayload({ ...payload, email: e.target.value })}
          className='border-none rounded-lg w-64 h-10 p-2 outline-none shadow-lg shadow-deep-purple-300 text-customColor' />
        <input
          type="password" placeholder='Password' onChange={e => setPayload({ ...payload, password: e.target.value })}
          className='border-none rounded-lg w-64 h-10 p-2 outline-none shadow-lg shadow-deep-purple-300 text-customColor' />
        <button
          onClick={handleLogin}
          className='bg-customColor h-9 w-24 rounded-lg text-white border-none hover:bg-customColor/[0.8]'>Login</button>
      </div>
    </div>
  )
}

export default Login;