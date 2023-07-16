import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Student from './components/pages/Student';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/students' element={<Student />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
