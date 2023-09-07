import React ,{useState}from "react";
import './forget.css';
import {useNavigate} from "react-router-dom";
import Validation from "./validation";
import Text from "./text";  

export default function Forgot(){
    const[formData,setFormData]=useState({email:"",newPassword:"",confirmPassword:""})
    const[errors,setErrors]=useState({})
    const[name1,setName1]=useState(false);
    const[Message,setMessage]=useState("");

    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setErrors(Validation(formData))
        if(errors.email1==="success"){
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
            const response=await fetch("http://localhost:5176/api/UserDetails/forgot",options)
            console.log(response)
            const responseCode=await response.json();
            console.log(responseCode)

            if(response.status===200){
                console.log(responseCode.prop)
                setMessage("Email is successfully verified!")
                setName1(true)
            }
            else{
                console.log(responseCode.prop)
                setMessage("Please enter valid email!")
            }
        }
    }

    const handleSubmit1=async(e)=>{
        e.preventDefault();
        setErrors(Validation(formData))
        if(errors.email1==="success" && errors.newPassword1==="success" && errors.confirmPassword1==="success"){
            if(formData.newPassword===formData.confirmPassword){
                let userDetails={
                    Email:formData.email,
                    Password:formData.confirmPassword
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
    }

    const handleFocus=((e)=>{
        const n=e.target.name;
        errors[n]="";
    })
 
    return(
        <div className="text-item">
            <Text />
            <div className="container-forgot">

                <form onSubmit={handleSubmit} className="form-container">
                    <h2>Forgot password</h2>
                    {errors.email && <span style={{color:'red',textAlign:"left"}}>{errors.email}</span>}
                    <input type="email" name="email" placeholder="Email" className="input-item" onFocus={handleFocus} onChange={handleChange}/><br></br>
                    <div>
                        <button type="submit" className="button-forgot" >Verify Email</button>
                    </div>
                </form>

                <p className={name1?"green":"red"}>{Message}</p>

                <div className={name1?"block-item":"none-item"}>
                    <div className="passwordnew"> 
                        <form onSubmit={handleSubmit1} className="form-container">
                            <h2>Create New Password</h2>
                            {errors.newPassword && <span style={{color:'red',textAlign:"center"}}>{errors.newPassword}</span>}
                            <input type="password" name="newPassword" placeholder="Enter New Password" className="input-item" onFocus={handleFocus} onChange={handleChange} />
                            {errors.confirmPassword && <span style={{color:'red',textAlign:"center"}}>{errors.confirmPassword}</span>}
                            <input type="password" name="confirmPassword" placeholder="Enter Confirm Password" className="input-item" onFocus={handleFocus} onChange={handleChange} />
                            <div className="hello">
                                <button type="submit" className="button-1" >Reset Password</button>
                            </div>    
                        </form>              
                    </div>
                </div>
                
            </div>
        </div>
    )
}