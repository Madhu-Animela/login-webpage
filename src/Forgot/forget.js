import React ,{useState}from "react";
import './forget.css';
import {useNavigate} from "react-router-dom";
import Validation from "../ValidationForm/validation";
import Discription from "../Discription/discription";

export default function Forgot(){
    const[formData,setFormData]=useState({email:"",newPassword:"",confirmPassword:""})
    const[errors,setErrors]=useState({})
    const[name1,setName1]=useState(false);
    const[Message,setMessage]=useState("");

    const navigate=useNavigate();

    
    const handleSubmitForgot=async(e)=>{
        e.preventDefault();
        setErrors(Validation(formData))
        if(errors.email_verify==="success"){
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

    const handleSubmitNewPassword=async(e)=>{
        e.preventDefault();
        setErrors(Validation(formData))
        if(errors.email_verify==="success" && errors.newPassword_verify==="success" && errors.confirmPassword_verify==="success"){
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
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
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
            <div className="forgot-container">

                <form onSubmit={handleSubmitForgot} className="form-container">
                    <h2>Forgot password</h2>
                    {errors.email && <span className="span-element">{errors.email}</span>}
                    <input type="email" name="email" placeholder="Email" className="input-item" onFocus={handleFocus} onChange={handleChange}/><br></br>
                    <div>
                        <button type="submit" className="verify-button" >Verify Email</button>
                    </div>
                </form>

                <p className={name1?"green":"red"}>{Message}</p>

                <div className={name1?"block-item":"none-item"}>
                    <div className="password-new"> 
                        <form onSubmit={handleSubmitNewPassword} className="form-container">
                            <h2>Create New Password</h2>
                            {errors.newPassword && <span className="span-element">{errors.newPassword}</span>}
                            <input type="password" name="newPassword" placeholder="Enter New Password" className="input-item" onFocus={handleFocus} onChange={handleChange} />
                            {errors.confirmPassword && <span className="span-element">{errors.confirmPassword}</span>}
                            <input type="password" name="confirmPassword" placeholder="Enter Confirm Password" className="input-item" onFocus={handleFocus} onChange={handleChange} />
                            <div className="button-container">
                                <button type="submit" className="reset-button" >Reset Password</button>
                            </div>    
                        </form>              
                    </div>
                </div>
                
            </div>
        </div>
    )
}