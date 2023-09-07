import React from "react";
import './home.css';
import { useNavigate } from "react-router-dom";
import Text from "./text";

export default function Home(){
    const navigate=useNavigate();

    const OnClickLogin=()=>{
        navigate('/login',{relative:true})
    }
    const OnClickSignUp=()=>{
        navigate('/registar',{replace:true})
    }

    return(
        <div className="text-item">
            <div className="text-item">
            <Text />
            </div>
            <div className="container-forgot">
                <div className="home-container">
                    <button type="button" className="home-button-1" onClick={OnClickLogin}>Log in</button><br></br>
                    <button type="button" className="home-button" onClick={OnClickSignUp}>Sign up</button>
                </div>
            </div>
        </div>
        
    )
}