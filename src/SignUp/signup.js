
import React,{useState} from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import Validation from "../ValidationForm/validation";
import Discription from "../Discription/discription";

 function SignUp(){
    const [formData,setFormData]=useState({username:"",email:"",password:"",confirmPassword:""})
    const[errors,setErrors]=useState({})

    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
    
    const handleSubmit= async (e) =>{
        e.preventDefault();
        setErrors(Validation(formData))

        if(errors.email_verify==="success" && errors.password_verify==="success" && errors.confirmPassword_verify==="success"){
            if(formData.password===formData.confirmPassword){
                let userDetails={
                    Name:formData.username,
                    Email:formData.email,
                    Password:formData.password,
                }
                let options={
                    method:"POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(userDetails),
                }
                const response=await fetch("http://localhost:5176/api/UserDetails/signup",options);
                console.log(response)
                const responseCode=await response.json();
                console.log(responseCode)
                if(response.status===200){
                    console.log(responseCode.prop);
                    alert("User created successfully!")
                    navigate('/logout',{replace:true})
                }
                else{
                    alert("unable is to sign in the page")
                }
            
            }
            else{
                alert("Both the passwords should be same. Please try again!")
                errors.email_verify="";
                errors.password_verify="";
                errors.confirmPassword_verify=""
            }
        }
    }
    
    //const OnClickSignUpButton=async()=>{
        //     if(formData.username!=="" && formData.email!=="" && formData.password!=="" && errors.email==="" && errors.password.length>6 && errors.confirmPassword.length>6){
        //         if(formData.password===formData.confirmPassword){
        //             let userDetails={
        //                 Name:formData.username,
        //                 Email:formData.email,
        //                 Password:formData.password,
        //             }
        //             let options={
        //                 method:"POST",
        //                 headers: {
        //                     "Content-Type" : "application/json"
        //                 },
        //                 body: JSON.stringify(userDetails),
        //             }
        //             const response=await fetch("http://localhost:5176/api/UserDetails/signup",options);
        //             console.log(response)
        //             const responseCode=await response.json();
        //             console.log(responseCode)
        //             if(response.status===200){
        //                 console.log(responseCode.prop);
        //                 alert("User created successfully!")
        //                 navigate('/logout',{replace:true})
        //             }
        //             else{
        //                 setErrors(Validation(formData))
        //                 alert("unable is to sign in the page")
        //             }
        
        //     }
        //     else{
        //         alert("Both password are must be same. Please try again!")
        //     }
        //     }
    //}
        
    const OnClickSignIn=()=>{
        navigate("/login",{replace:true})
    }
    
    const handleFocus1=((event)=>{
        const n=event.target.name;
        console.log(n)
        errors[n]="";
    });

    return(
        <div className="text-item">
            <Discription />
            <div className="sign-up-container">
                <form onSubmit={handleSubmit}>
                    <h1 style={{textAlign:"center"}}>Sign Up</h1>
                    <div className="signup-input-container">
                        {errors.username && <span className="span-element">{errors.username}</span>}
                        <input type="text" name="username" placeholder="Enter UserName" className="input-item" onFocus={handleFocus1} value={formData.username} onChange={handleChange}/>
                        
                        {errors.email && <span className="span-element">{errors.email}</span>}
                        <input type="email" name="email" placeholder="Enter Email Id" className="input-item" onFocus={handleFocus1} value={formData.email} onChange={handleChange}/>
                        
                        {errors.password && <span className="span-element">{errors.password}</span>}
                        <input type="password" name="password" placeholder="Enter Password"  className="input-item" onFocus={handleFocus1} value={formData.password} onChange={handleChange}/>
                    
                        {errors.confirmPassword && <span className="span-element">{errors.confirmPassword}</span>} 
                        <input type="password" name="confirmPassword" placeholder="Enter Confirm Password"  className="input-item" onFocus={handleFocus1} value={formData.confirmPassword} onChange={handleChange}/><br></br>
                        

                        <div className="button-container"><button type="submit" className="button-signup" >Sign Up</button></div>

                        <p>Already  have an Account?<button type="button" className="button-underline" onClick={OnClickSignIn}>Log In</button></p>
                    
                    </div>
                </form>
            </div>
        </div>
    )
}
export default  SignUp;