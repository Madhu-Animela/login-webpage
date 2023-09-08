
import React  from "react";
import { useNavigate } from "react-router-dom"; 
import Discription from "../Discription/discription";

export default function LogOut(){
    const navigate=useNavigate();

    const OnClickLogin=()=>{
        navigate("/login",{replace:true})
    }
    return(
        <div>
            <Discription/>
            <button type="button" className="signup-button" onClick={OnClickLogin}>Log Out</button>
        </div>
    )
}