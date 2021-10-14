import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "components/Header";
import { loginUser } from "data/UserRepository";
import { useUserContext } from "libs/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { validateMaxLength } from "utils/FormValidation";
import { updateUsageUponLogin } from "data/UsageRepository";
import "App.css";

function SignIn() {
  const history = useHistory();
  const { setAuthUser } = useUserContext();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: ""
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleValidation = () => {
    if (!validateMaxLength(form.username, 30)) {
      setError("Username length cannot be greater than 30");
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
    
    // stop logging user in if form input is invalid
    if (!handleValidation())
      return;

    const authUser = await loginUser(form.username, form.password);

    if (authUser) {
      // if user is authenticated
      await updateUsageUponLogin(authUser.id); // update user daily usage in db
      setAuthUser(authUser); // store user in context 
      history.push(`/profile/${authUser.id}`); // navigates to profile page
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <div>
      <Header isSignedIn={false} type={"general"}/>
      
      <div className="content-wrap">
        {/* page welcome text */}
        <div className="welcome-wrap">
          <div className="welcome-text">
            <p className="welcome-text-deco">Welcome</p>
            <p className="welcome-text-deco">Back</p>
          </div>
        </div>

        <div className="form-wrap">
          <form onSubmit={handleSubmit}>

            {/* form title */}
            <div className="form-group mb-4">
              <h3 className="form-title">Sign In</h3>
            </div>

            {/* form error */}
            {error && 
              <div className="form-group mb-3 form-msg form-error" style={{width: "270px"}}>
                <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth /> {error}
              </div>
            }

            {/* form input username */}
            <div className="form-group mb-3">
              <label>Username</label>
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
            
            {/* form input password */}
            <div className="form-group mb-5">
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
              <button type="submit" className="custom-btn form-btn">Continue</button>
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

export default SignIn;