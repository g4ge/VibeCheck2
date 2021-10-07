import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "components/Header";
import { createUser } from "data/UserRepository";
import { validatePassword, isEmptyString, validateEmail, validateMaxLength } from "utils/FormValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "App.css";

function SignUp() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleValidation = () => {
    if (isEmptyString(form.username)) {
      setError("Userame cannot be empty");
      return false;
    }

    if (!validateMaxLength(form.username, 30)) {
      setError("Username length cannot be greater than 30");
      return false;
    }
    
    if (isEmptyString(form.name)) {
      setError("Name cannot be empty");
      return false;
    }
    
    if (!validateMaxLength(form.name, 60)) {
      setError("Name length cannot be greater than 60");
      return false;
    }
    
    if (!validateEmail(form.email)) {
      setError("Email address is invalid");
      return false;
    }
    
    if (!validateMaxLength(form.email, 60)) {
      setError("Email length cannot be greater than 60");
      return false;
    }
    
    if (!validatePassword(form.password)) {
      setError("Password must be at least 6 characters and should be mix of lowercase and uppercase characters, number and punctuation")  
      return false;
    }

    if (!validateMaxLength(form.password, 60)) {
      setError("Password length cannot be greater than 60");
      return false;
    }
    
    return true;
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // stop creating user if form input is invalid
    if (!handleValidation())
      return;

    const user = await createUser(form);

    // if user is created, navigates to sign in page, otherwise set the error
    if (user) {
      history.push("/signin");
    } else {    
      setError("Duplicate username found")
    }
  };

  return (
    <div>
      <Header isSignedIn={false} type={"general"}/>
      
      <div className="content-wrap">
        {/* page welcome text */}
        <div className="welcome-wrap">
          <div className="welcome-text">
            <p className="welcome-text-deco">Connect With</p>
            <p className="welcome-text-deco">Students</p>
          </div>
        </div>

        <div className="form-wrap">
          <form onSubmit={handleSubmit}>
            {/* form title */}
            <div className="form-group mb-4">
              <h3 className="form-title">Sign Up</h3>
            </div>

            {/* form error */}
            {error && 
              <div className="form-group mb-3 form-msg form-error" style={{maxWidth: "270px"}}>
                <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth /> {error}
              </div>
            }

            {/* form input username */}
            <div className="form-group mb-3">
              <label>Userame</label>
              <br />
              <input 
                type="text" 
                className="input-body"
                placeholder="enter username" 
                spellCheck={false} 
                required={true} 
                name="username" 
                value={form.username} 
                onChange={handleChange} 
              />
            </div>
            
            {/* form input name */}
            <div className="form-group mb-3">
              <label>Name</label>
              <br />
              <input 
                type="text" 
                className="input-body"
                placeholder="enter name" 
                spellCheck={false} 
                required={true} 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
              />
            </div>

            {/* form input email */}
            <div className="form-group mb-3">
              <label>Email</label>
              <br />
              <input 
                type="email" 
                className="input-body"
                placeholder="enter email" 
                spellCheck={false} 
                required={true}
                name="email" 
                value={form.email} 
                onChange={handleChange} 
              />
            </div>

            {/* form input password */}
            <div className="form-group mb-4">
              <label>Password</label>
              <br />
              <input 
                type="password" 
                className="input-body"
                placeholder="enter password" 
                spellCheck={false} 
                required={true}
                name="password" 
                value={form.password} 
                onChange={handleChange} 
              />
            </div>

            {/* form submit button */}
            <div className="form-group">
              <button type="submit" className="custom-btn form-btn">Create account</button>
            </div>

          </form>
        </div>
        
        {/* page background design */}
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
      </div>
    </div>
  );
}

export default SignUp;