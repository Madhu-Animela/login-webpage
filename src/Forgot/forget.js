import React ,{useState}from "react";
import './forget.css';
import {useNavigate} from "react-router-dom";
import Validation from "../ValidationForm/validation";
import Discription from "../Discription/discription";
import { CgDanger } from "react-icons/cg";

export default function Forgot(){
    const[formData,setFormData]=useState({email:""})
    const[newData,setNewData]=useState({newPassword:"",confirmPassword:""})
    const[errors,setErrors]=useState({})
    const[nameCheck,setNameCheck]=useState(false);
    const[Message,setMessage]=useState("");
    const[propsMessage,setPropsMessage]=useState("")
    const[props,setProps]=useState(false)
    const[propMsg,setPropMsg]=useState(false)

    const navigate=useNavigate();

    
    const handleSubmitForgot=async(e)=>{
        e.preventDefault();
        var errData = Validation(formData)
        setErrors(errData)
        console.log(errData)
        console.log(errors)
        if(errData.email_verify==="success"){
            let userDetails={
                Email:formData.email,
            }
            let options={
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetails)
            }
            
            try{
                const response=await fetch("http://localhost:5176/api/UserDetails/forgot",options)
                console.log(response)
                const responseCode=await response.json();
                console.log(responseCode)
                if(response.status===200){
                    console.log(responseCode.prop)
                    setMessage("Email is successfully verified!")
                    setNameCheck(true)
                }
                else{
                    console.log(responseCode.prop)
                    setMessage("Please enter valid email!")
                }
            }
            catch(error){
                alert(error.msg)
                console.log(error.msg)
            }
        }
    }

    const handleSubmitNewPassword=async(e)=>{
        e.preventDefault();
        var errMsg=Validation(newData)
        setErrors(errMsg)
        console.log(errors)
        if(errors.email_verify==="success" && errMsg.newPassword_verify==="success" && errMsg.confirmPassword_verify==="success"){
            if(newData.newPassword===newData.confirmPassword){
                let userDetails={
                    Email:formData.email,
                    Password:newData.confirmPassword
                }
                let options={
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(userDetails),
                }
                
                const response=await fetch("http://localhost:5176/api/UserDetails/newpassword",options);
                console.log(response)
                const responseCode=await response.json();
    
                if(response.status===200){
                    console.log(responseCode.prop)
                    setPropsMessage("password is successfully updated!")
                    setPropMsg(true)
                    navigate("/login",{replace:true})
                    
                }
                else{
                    setPropsMessage(responseCode.prop)
                    setProps(true)
                    console.log(responseCode.prop)
                }
    
            }
            else{
                setPropsMessage("passwords must be same, enter again!")
                setProps(true)
            }
        }
    }

    const handleFocus=((e)=>{
        const n=e.target.name;
        errors[n]="";
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
    const handleNewPassword=(e)=>{
        const {name,value}=e.target;
        setNewData({...newData,[name]:value})
    }

    // const OnClickForgotButton=async()=>{
//     if(formData.email!==""){
//         let userDetails={
//             Email:formData.email,
//         }
//         let options={
//             method:"POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(userDetails)
//         }
//         const response=await fetch("http://localhost:5176/api/UserDetails/forgot",options)
//         console.log(response)
//         const responseCode=await response.json();
//         console.log(responseCode)

//         if(response.status===200){
//             console.log(responseCode.prop)
//             setMessage("Email is successfully verified!")
//             setName1(true)
//         }
//         else{
//             console.log(responseCode.prop)
//             setMessage("Please enter valid email!")
//         }
//     }
// }

// const OnClickPassword=async()=>{
//     if(formData.email!=="" && formData.newPassword!==""  && formData.confirmPassword!=="" && errors.newPassword==="" && errors.confirmPassword==="" ){
//         if(formData.newPassword===formData.confirmPassword){
//             let userDetails={
//                 Email:formData.email,
//                 Password:formData.confirmPassword
//             }
//             let options={
//                 method:"POST",
//                 headers:{
//                     "Content-type":"application/json"
//                 },
//                 body:JSON.stringify(userDetails),
//             }

//             const response=await fetch("http://localhost:5176/api/UserDetails/newpassword",options);
//             console.log(response)
//             const responseCode=await response.json();

//             if(response.status===200){
//                 console.log(responseCode.prop)
//                 alert("password is updated!")
//                 navigate("/login",{replace:true})
//             }
//             else{
//                 alert(responseCode.prop)
//                 console.log(responseCode.prop)
//             }

//         }
//         else{
//             alert("passwords must be same, enter again!")
//         }
//     }

// }
    return(
        <div className="text-item">
            <Discription />
            <div className="input-element-container">
                {propMsg?<div className="prop-container">
                     <h3 className="prop-message">{propsMessage}</h3> 
                </div>:""}
                {props?<div className="forgot-error-container">
                        <div className="icon-container">
                            <CgDanger className="icon"/><h3>There Was Problem</h3>
                        </div>
                        <p className="para">{propsMessage}</p>
                    </div>:""}
                <div className="forgot-container">

                    <form onSubmit={handleSubmitForgot} className="form-container">
                        <h2>Forgot password</h2>
                        {errors.email && <span className="span-element">{errors.email}</span>}
                        <input type="email" name="email" placeholder="Email" className="input-item" onFocus={handleFocus} onChange={handleChange}/><br></br>
                        <div>
                            <button type="submit" className="verify-button" >Verify Email</button>
                        </div>
                    </form>

                    <p className={nameCheck?"green":"red"}>{Message}</p>
                    
                    <div className={nameCheck?"block-item":"none-item"}>
                        <div className="password-new"> 
                            <form onSubmit={handleSubmitNewPassword} className="form-container">
                                <h2>Create New Password</h2>
                                {errors.newPassword && <span className="span-element">{errors.newPassword}</span>}
                                <input type="password" name="newPassword" placeholder="Enter New Password" className="input-item" onFocus={handleFocus} onChange={handleNewPassword} />
                                {errors.confirmPassword && <span className="span-element">{errors.confirmPassword}</span>}
                                <input type="password" name="confirmPassword" placeholder="Enter Confirm Password" className="input-item" onFocus={handleFocus} onChange={handleNewPassword} />
                                <div className="button-container">
                                    <button type="submit" className="reset-button" >Reset Password</button>
                                </div>    
                            </form>              
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}