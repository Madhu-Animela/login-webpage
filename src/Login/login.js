import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Validation from "../ValidationForm/validation";
import Discription from "../Discription/discription";
import {CgDanger} from 'react-icons/cg';
import {TiTick} from "react-icons/ti"

function Login(){
    const[formData,setFormData]=useState({email:"",password:""});
    const[errors,setErrors]=useState({})
    const[propsMessage,setPropsMessage]=useState("")
    const[props,setProps]=useState(false)
    const[propMsg,setPropMsg]=useState(false)

    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
    const handleFocus=((event)=>{
        const n=event.target.name;
        errors[n]="";
     })
    
    const handleSubmitLogin=async(e)=>{
        e.preventDefault();
        var errData=Validation(formData)
        setErrors(errData);
        if(errData.email_verify==="success" && errData.password_verify==="success"){
            let userDetails={
                Email:formData.email,
                Password:formData.password,
            }
            let options={
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetails)
            }
            try{
                const response=await fetch("http://localhost:5176/api/UserDetails/login",options);
                console.log(response);
                const jsonResponse=await response.json();
                console.log(jsonResponse);

                if(response.status===200){
                    console.log(jsonResponse.prop);
                    setPropsMessage(jsonResponse.prop)
        
                    setPropMsg(true)
                    setProps(false)
                    setTimeout(()=>{navigate('/logout',{replace:true}) },3000) 
                        
                }
                else{
                    setPropsMessage(jsonResponse.prop);
                    setProps(true);
                    errors.email1="";
                    errors.password="";
                }
            }catch(error){
                alert(error.msg)
                console.log(error.msg)
            }
        }
    }
    
    const OnClickForgot=()=>{
        navigate('/forget',{replace:true})
    }

    const OnClickSignUp=()=>{
        navigate('/signup',{replace:true})
    }
    
    
    return(
        <div className="text-item">
            <Discription />
            <div className="input-elements-container">
                {propMsg?<div className="login-prop-container">
                    <div className="icon-container">
                        <h3 className="prop-message">{propsMessage} </h3>
                        <TiTick className="icon icon-tick"/>
                    </div> 
                </div>:""}
                {props?<div className="error-container">
                    <div className="icon-container">
                        <CgDanger className="icon"/><h3>There Was Problem</h3>
                    </div>
                    <p className="para">{propsMessage}</p>
                </div>:""}
                <div className="login-container">
                    <form onSubmit={handleSubmitLogin}>
                        <h2 className="login-heading">Log In</h2>
                        <div className="input-element-container">
                            {errors.email && <span className="span-element">{errors.email}</span>}
                            <input type="email" name="email" placeholder="Enter Email"  className="input-item login-input" onFocus={handleFocus} value={formData.email} onChange={handleChange}/><br></br>

                            {errors.password && <span className="span-element">{errors.password}</span>}
                            <input type="password" name="password" placeholder="Enter Pasword"  className="input-item login-input" onFocus={handleFocus} value={formData.password} onChange={handleChange}/><br></br>

                            <div className="button-for">
                                <button type="button" className="button-underline" onClick={OnClickForgot}>Forgot Password?</button>
                            </div><br></br>
                            
                            <div className="button-container">
                                <button type="submit" className="button-for-login" >Login </button>
                                <p>Don't have an Account? <button type="button" className="button-underline" onClick={OnClickSignUp}>Sing Up</button></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;