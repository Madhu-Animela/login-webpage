import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Validation from "../ValidationForm/validation";
import Discription from "../Discription/discription";

function Login(){
    const[formData,setFormData]=useState({email:"",password:""});
    const[errors,setErrors]=useState({})
    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
    
    const handleSubmitLogin=async(e)=>{
        e.preventDefault();
        setErrors(Validation(formData));
        if(errors.email_verify==="success" && errors.password_verify==="success"){
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
            const response=await fetch("http://localhost:5176/api/UserDetails/login",options);
            console.log(response);
            const jsonResponse=await response.json();
            console.log(jsonResponse);

            if(response.status===200){
                console.log(jsonResponse.prop);
                navigate('/logout',{replace:true})  
                      
            }
            else{
                alert(jsonResponse.prop)
                errors.email1="";
                errors.password="";
            }
        }
    }
    
    const OnClickForgot=()=>{
        navigate('/forget',{replace:true})
    }

    const OnClickSignUp=()=>{
        navigate('/signup',{replace:true})
    }
    
    const handleFocus=((event)=>{
       const n=event.target.name;
       errors[n]="";
    })
    
    return(
        <div className="text-item">
            <Discription />
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
    )
}
export default Login;