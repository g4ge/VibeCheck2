import React, { useState } from "react";
import { useUserContext } from "libs/Context";
import { editUser } from "data/UsersRepository";
import { validatePassword, isEmptyString, validateEmail } from "utils/FormValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import AvatarBook from "images/avatars/book.png";
import AvatarCat from "images/avatars/cat.png";
import AvatarCoffee from "images/avatars/coffee.png";
import AvatarConsole from "images/avatars/console.png";
import AvatarUfo from "images/avatars/ufo.png";
import AvatarUser from "images/avatars/user.png";
import "App.css";

function AccountEditForm() {
  const { authUser, setAuthUser } = useUserContext();
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [avatar, setAvatar] = useState(authUser.avatar);
  const [form, setForm] = useState({
    name: authUser.name,
    email: authUser.email,
    newPassword: "",
    curPassword: ""
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // clear notification & error
    setNotification("");
    setError("");

    // check if name only contain whitespaces
    if (isEmptyString(form.name)) {
      setError("Name cannot be empty");
      return;
    }

    // check if email is valid
    if (!validateEmail(form.email)) {
      setError("Email address is invalid");
      return;
    }

    // if input new password is entered, check if it meets requirements
    if (form.newPassword.length > 0 && !validatePassword(form.newPassword)) {
      setError("Password must be at least 6 characters and should be mix of lowercase and uppercase characters, number and punctuation")  
      return;
    }
    
    // edit user profile
    const userEdited = editUser(authUser, form, avatar);

    if (userEdited.error) {
      setError(userEdited.response);
    } else {
      // update authenticated user profile
      setAuthUser(userEdited.response); 
      setNotification("Profile has been updated");
      // clear password field
      setForm({
        ...form,
        newPassword: "",
        curPassword: ""
      });
    } 
  } 

  return (
    <div>
      <hr className="mt-4"/>
      <h5 className="form-title mt-4">| Edit Profile</h5>
      
      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          {/* form error */}
          {error && 
            <div className="form-group mb-3 form-msg form-error" style={{width: "510px"}}>
              <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth /> {error}
            </div>
          }

          {/* form successful notification */}
          {notification && 
            <div className="form-group mb-3 form-msg form-noti" style={{width: "510px"}}>
              <FontAwesomeIcon icon={faCheckCircle} size="sm" fixedWidth /> {notification}
            </div>
          }

          {/* form input */}
          <div className="form-group mb-3">
            {/* user avatar selection */}
            <label className="input-title">Avatar</label>
            <button 
              type="button" 
              className={`icon-btn pf-avatar-opt-btn ${avatar === "AvatarUser" ? "pf-avatar-select" : ""}`} 
              onClick={() => setAvatar("AvatarUser")}
            >
              <img className="pf-avatar-opt" src={AvatarUser} alt="Avatar User"></img>
            </button>
            <button 
              type="button" 
              className={`icon-btn pf-avatar-opt-btn ${avatar === "AvatarBook" ? "pf-avatar-select" : ""}`} 
              onClick={() => setAvatar("AvatarBook")}
            >
              <img className="pf-avatar-opt" src={AvatarBook} alt="Avatar Book"></img>
            </button>
            <button 
              type="button" 
              className={`icon-btn pf-avatar-opt-btn ${avatar === "AvatarCat" ? "pf-avatar-select" : ""}`} 
              onClick={() => setAvatar("AvatarCat")}
            >
              <img className="pf-avatar-opt" src={AvatarCat} alt="Avatar Cat"></img>
            </button>
            <button 
              type="button" 
              className={`icon-btn pf-avatar-opt-btn ${avatar === "AvatarCoffee" ? "pf-avatar-select" : ""}`} 
              onClick={() => setAvatar("AvatarCoffee")}
            >
              <img className="pf-avatar-opt" src={AvatarCoffee} alt="Avatar Coffee"></img>
            </button>
            <button 
              type="button" 
              className={`icon-btn pf-avatar-opt-btn ${avatar === "AvatarConsole" ? "pf-avatar-select" : ""}`} 
              onClick={() => setAvatar("AvatarConsole")}
            >
              <img className="pf-avatar-opt" src={AvatarConsole} alt="Avatar Console"></img>
            </button>
            <button 
              type="button"
              className={`icon-btn pf-avatar-opt-btn ${avatar === "AvatarUfo" ? "pf-avatar-select" : ""}`} 
              onClick={() => setAvatar("AvatarUfo")}
            >
              <img className="pf-avatar-opt" src={AvatarUfo} alt="Avatar Ufo"></img>
            </button>
          </div>
          {/* input name */}
          <div className="form-group mb-3">
            <label className="input-title">Name</label>
            <input
              type="text"
              className="input-body"
              placeholder="enter new name"
              spellCheck={false}
              required={true}
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          {/* input email */}
          <div className="form-group mb-3">
            <label className="input-title">Email</label>
            <input
              type="email"
              className="input-body"
              placeholder="enter new email"
              spellCheck={false}
              required={true}
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          {/* input new password */}
          <div className="form-group mb-3">
            <label className="input-title">New Password</label>
            <input
              type="password"
              className="input-body"
              placeholder="enter new password"
              spellCheck={false}
              required={false}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
            />
          </div>
          {/* input current password */}
          <div className="form-group mb-3">
            <label className="input-title">Current Password</label>
            <input
              type="password"
              className="input-body"
              placeholder="enter current password"
              spellCheck={false}
              required={true}
              name="curPassword"
              value={form.curPassword}
              onChange={handleChange}
            />
          </div>
          
          {/* save edit button */}
          <div className="form-group mt-4">  
            <button type="submit" className="custom-btn pf-save-btn">Save changes</button>
          </div>
        </form>
        
        {/* avatar references */}
        <div className="references mt-5" style={{textAlign: "center", marginBottom: "-10px"}}>
          Avatars by {" "}
          <a className="link" href="https://www.freepik.com" title="Freepik">Freepik</a>, {" "}
          <a className="link" href="https://www.flaticon.com/authors/pixel-buddha" title="Pixel Buddha">Pixel Buddha</a>,  {" "}
          <a className="link" href="https://creativemarket.com/Becris" title="Becris">Becris</a> & {" "}
          <a className="link" href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from {" "} 
          <a className="link" href="https://www.flaticon.com/" title="Flaticon">Flaticon</a>
        </div>
      </div>
    </div>
  );
}

export default AccountEditForm;