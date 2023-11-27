import React, { useState } from "react";
import InputControl from "../InputControl/InputControl";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import  './Signup.css';
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../../firebase"


function Signup() {
  const navigate= useNavigate();
const [values, setValues] = useState({
 
  email: "",
  position: "",
  password: "",
});
const [errorMsg, setErrorMsg] = useState("");
const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

const handleSubmission=()=>{
  if( !values.email || !values.position || !values.password){
    setErrorMsg("Please fill all the fields");
    return;
  }
  setErrorMsg("");
  setSubmitButtonDisabled(true);

  createUserWithEmailAndPassword(auth, values.email, values.password).then(
    async(res) => {
      setSubmitButtonDisabled(false);
      const user = res.user;
      await updateProfile(user, {displayName: values.position,});
      console.log(user);
      navigate("/");
    }
  ).catch((err) =>{ 
     setSubmitButtonDisabled(false);
     setErrorMsg(err.message);
  }
    );
};
  return (
    <div className="container12">
      <div className="innerBox12">
        <h1 className="heading12">Sign up</h1>


         <InputControl
         type="email"
          label="Email"
          placeholder="Enter your email address"
        onChange = {event=>setValues(prev=>({...prev, email:event.target.value}))}   
        />
         <InputControl
          label="Position"
          placeholder="Enter position(student, faculty, coordinator, etc)"
        onChange = {event=>setValues(prev=>({...prev, position:event.target.value}))} 
        />

        <InputControl 
        type= "password"
        label="Password" 
        placeholder="Enter Password"
       onChange = {event=>setValues(prev=>({...prev, password:event.target.value}))} 
        />

        <div className="footer12">
          <b className="error">{errorMsg}</b>
          <button 
          onClick = {handleSubmission}
          disabled = {submitButtonDisabled}
          >
            Sign up</button>
          <p>Already have an account?<span>
          <Link to="/login">Log in</Link>
            </span>
            </p>
        </div>
         </div>
    </div>
  );
}

export default Signup;