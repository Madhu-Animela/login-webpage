import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";

import './newpassword.css';

export default function NewPassword(){

    const [newpassword,setNewPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const navigate=useNavigate();

    // const OnClickLogin=()=>{
    //     navigate('/login',{replace:true})
    // }
    const OnClickPassword=async()=>{
        if(newpassword===confirmPassword){
            let userDetails={
                confirmPassword:confirmPassword,
            }
            let options={
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(userDetails),
            }

            const response=await fetch("http://localhost:5176/api/UserDetails/newpassword",options);
            const responseCode=await response.json();

            if(responseCode.prop==="Success"){
                console.log(responseCode.prop)
                alert("password is updated!")
                navigate("/login",{replace:true})
            }
            else{
                alert(responseCode.prop)
                console.log(responseCode.prop)
            }

        }
        else{
            alert("passwords must be same, enter again!")
        }
    }
    
    
    return(
        <div className="container-forgot"> 
            <h3>Create New Password</h3><br></br>
            <input type="text" placeholder="Enter New Password" className="input-item" onChange={(e)=>{setNewPassword(e.target.value)}}/><br></br>
            <input type="password" placeholder="Enter Comfirm Password" className="input-item" onChange={(e)=>{setConfirmPassword(e.target.value)}}/><br></br>

            <button type="button" className="button-1" onClick={OnClickPassword}>Reset Password</button><br></br>
            
        </div>
    )
}