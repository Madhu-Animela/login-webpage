import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';  
import './App.css';
import Home from "./home";
import  Login  from "./login";
import  Registar  from "./registar";
import Forgot from './forget';
// import NewPassword  from './newpassword';



function App() {
  return (
    <div className='madhu-app'>
          <div className='img'>
            <h1 className='heading'>Turn Your <br></br>Idea's Into Reality</h1><br></br>

            <p className='para-1'>Start for free and get attractive offers from the community.</p>
          </div>
       
    <div className='app-container'>
    <div className="App">
      
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path='/login' element={<Login />} />
         <Route path='/registar' element={<Registar />} />
          <Route path="/forget" element={<Forgot />} />
          {/* <Route path='/newpassword' element={<NewPassword />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
    </div>
    </div>
  );
}

export default App;
