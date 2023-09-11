import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';  
import './App.css';
import Home from './Home/home';
import Login from './Login/login';
import SignUp from './SignUp/signup';
import Forgot from './Forgot/forget';
import LogOut from './Logout/logout';
import Discription from './Discription/discription';
function App() {

  return (
          <BrowserRouter>
          <div className='app-container'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path="/forget" element={<Forgot />} />
                <Route path="/discription" element={<Discription />} />
                <Route path='/logout' element={<LogOut />} />
            </Routes>
          </div>
          </BrowserRouter> 
   );
}

export default App;
