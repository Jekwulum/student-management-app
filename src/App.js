import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Student from './components/pages/Student';
import './App.css';

import tokenHelper from './services/helpers/tokenHelper';

function App() {

  const ProtectedRoute = ({ Component }) => {
    if (tokenHelper.checkIfLoggedIn()) return <Component />
    return <Navigate to='/login' />
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/' element={<ProtectedRoute Component={Home} />} />
          <Route exact path='/dashboard' element={<ProtectedRoute Component={Home} />} />
          <Route exact path='/students' element={<ProtectedRoute Component={Student} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
