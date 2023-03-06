import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Users from './pages/Users'
import User from './pages/User'
import SignUp from './pages/SignUp'
import HealthCheck from './pages/HealthCheck';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp/>}/>
          <Route path="/users" element={<User/>} />
          {/* <Route path='/users' element={<Users/>}/> */}
          <Route path='/healthcheck' element={<HealthCheck/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
