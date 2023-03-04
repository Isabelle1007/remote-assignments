import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Users from './pages/Users'
import SignUp from './pages/SignUp'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp/>}/>
          <Route path='/users' element={<Users/>}/>
          {/* <Route path='/user/:id' element={<Users/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
