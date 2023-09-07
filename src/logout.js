
import React  from "react";
import { useNavigate } from "react-router-dom"; 
import Text from "./text";

export default function LogOut(){
    const navigate=useNavigate();

    const OnClickLogin=()=>{
        navigate("/login",{replace:true})
    }
    return(
        <div>
            <Text />
            <button type="button" className="button-1" onClick={OnClickLogin}>Log Out</button>
        </div>
    )
}