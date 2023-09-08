import React from "react";
import './home.css';
import { useNavigate } from "react-router-dom";
import Discription from "../Discription/discription";

export default function Home(){
    const navigate=useNavigate();

    const OnClickLogin=()=>{
        navigate('/login',{relative:true})
    }
    const OnClickSignUp=()=>{
        navigate('/signup',{replace:true})
    }

    return(
        <div className="text-item">
            <Discription />
            <div className="forgot-container">
                <div className="home-container">
                    <button type="button" className="login-button" onClick={OnClickLogin}>Log in</button><br></br>
                    <button type="button" className="signup-button" onClick={OnClickSignUp}>Sign up</button>
                </div>
            </div>
        </div>
        
    )
}