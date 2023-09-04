
import React,{useState} from "react";
import "./registar.css";
import { useNavigate } from "react-router-dom";

import Validation from "./Validation";

 function Registar(){

    // const[name,setName]=useState("");
    // const[email,setEmail]=useState("");
    // const[password,setPassword]=useState("");
    // const[confirmPassword,setConfirmPassword]=useState("");


    const[values,setValues]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const[errors,setErrors]=useState({})

    function handleInput(event){
        const newObj={...values,[event.target.name]:event.target.value}
        setValues(newObj)
    }

    function handleValidation(event){
        event.preventDefualt();
        setErrors(Validation(values))
    }

    const navigate=useNavigate();

    const OnClickSignUpButton=async()=>{
        
    if(setValues.password===setValues.confirmPassword){
        let userDetails={
            Name:setValues.name,
            Email:setValues.email,
            Password:setValues.password,
        }
        let options={
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(userDetails),
        }
        const response=await fetch("http://localhost:5176/api/UserDetails/signup",options);

        const responseCode=await response.json();

        if(responseCode.prop==="Success"){
            navigate('/home',{replace:true})
            console.log(responseCode.prop);
            alert("User created successfully!")
        }
        else{
            alert(responseCode.prop)
        }
    }
    else{
        alert("Both password are must be same. Please try again!")
    }
    }

    const OnClickSignIn=()=>{
        navigate("/login",{replace:true})
    }


    return(
        <div className="container-2">
            <h1>Sign Up</h1>
            <div className="container-3" onSubmit={handleValidation}>
                
                <input type="text" id="txtName" placeholder="Enter Name" className="input-item" onChange={handleInput}/><br></br>
                {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
                {/* <label for="txtEmail">Email Id</label> */}
                <input type="email" id="txtEmail" placeholder="Enter Email Id" className="input-item" onChange={handleInput}/><br></br>
                {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
                {/* <label for="txtPhone">Phone Number</label> */}
                {/* <input type="text" id="txtPhone" placeholder="Enter Phone Number" className="input-item" onChange={(e)=>{setNam(e.target.value)}}/><br></br> */}
                {/* <label for="txtPassword">Password</label> */}
                <input type="password" id="txtPassword" placeholder="Enter Password"  className="input-item" onChange={handleInput}/><br></br>
                {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
                {/* <label for="txtPassword1">Comfirm Password</label> */}
                <input type="password" id="txtPassword1" placeholder="Enter Confirm Password"  className="input-item" onChange={handleInput}/><br></br>
                {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
                <div className="button-container"><button type="button" className="button-signup" onClick={OnClickSignUpButton}>Sign Up</button></div>
                <p>Already  have an Account?<button type="button" className="button-underline" onClick={OnClickSignIn}>Log In</button></p>
            </div>
        </div>
    )
}
export default  Registar;

// onChange={(e)=>{setName(e.target.value)}}