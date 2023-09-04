import React ,{useState}from "react";
import './forget.css';
import { useNavigate} from "react-router-dom";

export default function Forgot(){
    const[email,setEmail]=useState("");
    const [newpassword,setNewPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");


    const[name1,setName1]=useState(false);
    const[Message,setMessage]=useState("");

    const navigate=useNavigate();

    const OnClickForgotButton=async()=>{
        let userDetails={
            Email:email,
            confirmPassword:confirmPassword,
        }
        let options={
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        }
        const response=await fetch("http://localhost:5176/api/UserDetails/forgot",options)
        const responseCode=await response.json();
        if(responseCode.prop==="Success"){
            console.log(responseCode.prop)
            setMessage("Email is successfully verified!")
            setName1(true)
        }
        else{
            setName1(response.prop)
            console.log(responseCode.prop)
            setMessage("Please enter valid email!")
        }
    }

    const OnClickPassword=async()=>{
        if(newpassword===confirmPassword){
            let userDetails={
                Email:email,
                Password:confirmPassword
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
            <h2>Forgot password</h2>
            <input type="text" placeholder="Email" className="input-item" onChange={(e)=>{setEmail(e.target.value)}}/><br></br>
            <div>
                <button type="button" onClick={OnClickForgotButton} className="button-forgot" >Verify Email</button>
            </div>
            <p className={name1?"green":"red"}>{Message}</p>
            <div className={name1?"block-item":"none-item"}>
                <div className="passwordnew"> 
                    <h2>Create New Password</h2>
                    <input type="password" placeholder="Enter New Password" className="input-item" onChange={(e)=>{setNewPassword(e.target.value)}} />
                    <input type="password" placeholder="Enter Confirm Password" className="input-item" onChange={(e)=>{setConfirmPassword(e.target.value)}} />
                    <div className="hello">
                        <button type="button" className="button-1" onClick={OnClickPassword}>Reset Password</button>\
                    </div>                  
                </div>
            </div>
            
        </div>
    )
}