import React ,{useState} from "react";
import { useNavigate} from "react-router-dom";
import "./login.css";
import Validation from "./validation";
import Text from "./text";

function Login(){
    const[formData,setFormData]=useState({email:"",password:""});
    const[errors,setErrors]=useState({})
    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
    console.log(errors.password)
    console.log(errors.email)
    const handleSubmit=(e)=>{
        e.preventDefault();
        setErrors(Validation(formData));
    }
    
    const OnClickForgot=()=>{
        navigate('/forget',{replace:true})
    }

    const OnClickSignUp=()=>{
        navigate('/registar',{replace:true})
    }
    

    const OnLoginDetails=async()=>{
       
        if(formData.email!==""  && formData.password!=="" && errors.password==="success" && errors.email==="success"){
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
            }
        }
            
    }
    const handleFocus=((event)=>{
       const n=event.target.name;
       errors[n]="";
    })
    
    return(
        <div className="text-item">
            <Text />
            <div className="container-1">
                <form onSubmit={handleSubmit}>
                    <h2>Log In</h2>
                    <div className="container">
                        {errors.email && <span style={{color:"red"}}>{errors.email}</span>}
                        <input type="email" name="email" placeholder="Enter Email"  className="input-item" onFocus={handleFocus} value={formData.email} onChange={handleChange}/><br></br>

                        {errors.password && <span style={{color:"red"}}>{errors.password}</span>}
                        <input type="password" name="password" placeholder="Enter Pasword"  className="input-item" onFocus={handleFocus} value={formData.password} onChange={handleChange}/><br></br>

                        <div className="button-for">
                            <button type="button" className="button-underline" onClick={OnClickForgot}>Forgot Password?</button>
                        </div><br></br>
                        
                        <div className="button-container">
                            <button type="submit" className="button" onClick={OnLoginDetails}>Login </button>
                            <p>Don't have an Account? <button type="button" className="button-underline" onClick={OnClickSignUp}>Sing Up</button></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;