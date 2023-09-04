import React ,{useState} from "react";
import {useNavigate} from "react-router-dom";
import "./login.css";

function Login(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const navigate=useNavigate();

    const OnClickForgot=()=>{
        navigate('/forget',{replace:true})
    }

    const OnClickSignUp=()=>{
        navigate('/registar',{replace:true})
    }

    const OnLoginDetails=async(event)=>{
            let userDetails={
                Email:email,
                Password:password,
            }
            let options={
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetails)
            }
            const response=await fetch("http://localhost:5176/api/UserDetails/login",options);
            const jsonResponse=await response.json();

            if(jsonResponse.prop==="Success"){
                console.log(jsonResponse.prop);
                navigate('/home',{replace:true})
                
            }
            else{
                alert(jsonResponse.prop)
            }
    }

    return(
        <div className="container-1">
            <h2>Log In</h2>
            <div className="container">
                {/* <label for="txtName">Name</label> */}
                <input type="email" id="txtName" placeholder="Enter Email" required className="input-item" onChange={(e)=>{setEmail(e.target.value)}}/><br></br>
                {/* <label for="txtPassword">Pasword</label> */}
                <input type="password" id="txtPassword" placeholder="Enter Pasword" required className="input-item" onChange={(e)=>{setPassword(e.target.value)}}/><br></br>
                <div className="button-for">
                    <button type="button" className="button-underline" onClick={OnClickForgot}>Forgot Password?</button>
                </div><br></br>
                
                <div className="button-container">
                
                    <button type="button" className="button" onClick={OnLoginDetails}>Login </button>
                
                <p>Don't have an Account? <button type="button" className="button-underline" onClick={OnClickSignUp}>Sing Up</button></p>
                </div>
                
            </div>
        </div>
    )
}
export default Login;