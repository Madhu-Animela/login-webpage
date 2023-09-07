import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';  
import './App.css';
import Home from "./home";
import  Login  from "./login";
import SignUp from './signup';
import Forgot from './forget';
import Text from './text';
import LogOut from './logout';
function App() {

  return (
          <BrowserRouter>
          <div className='madhu-app'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path="/forget" element={<Forgot />} />
                <Route path="/text" element={<Text />} />
                <Route path='/logout' element={<LogOut />} />
            </Routes>
          </div>
          </BrowserRouter> 
   );
}

export default App;
