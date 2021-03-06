import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { validatePassword, isEmptyString, validateEmail, validateMaxLength } from "utils/FormValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import AvatarBook from "images/avatars/book.png";
import AvatarCat from "images/avatars/cat.png";
import AvatarCoffee from "images/avatars/coffee.png";
import AvatarConsole from "images/avatars/console.png";
import AvatarUfo from "images/avatars/ufo.png";
import AvatarUser from "images/avatars/user.png";
import { deleteUser, editUser, getOneUser, setUserStatus } from "data/UserRepository";
import "App.css";

function UserAccount() {
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [avatar, setAvatar] = useState("");
  const [form, setForm] = useState({
    id: "",
    username: "",
    name: "",
    email: "",
    password: ""
  });
  
  useEffect(() => {
    const loadData = async () => {  
      // get the user data
      const user = await getOneUser(parseInt(id));
      setUser(user); 
      setAvatar(user.avatar);
      setForm({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        password: ""
      });
    }
    loadData();
  }, [id])


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleValidation = () => {
    if (isEmptyString(form.username)) {
      setError("Username cannot be empty");
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

    // if password is entered, check if it meets password requirements
    if (form.password.length > 0 && !validatePassword(form.password)) {
      setError("Password must be at least 6 characters and should be mix of lowercase and uppercase characters, number and punctuation")  
      return false;
    }

    // if password is entered, check if it exceeds maximum password length
    if (form.password.length > 0 &&!validateMaxLength(form.password, 60)) {
      setError("Password length cannot be greater than 60");
      return false;
    }

    return true;
  }


  const handleEdit = async (e) => {
    e.preventDefault();
    // clear notification & error
    setNotification("");
    setError("");

    // stop editing user profile if form input is invalid
    if (!handleValidation())
      return;

    // add avatar to user profile form
    const inputForm = { ...form, avatar: avatar };
    
    // edit user profile
    const editedUser = await editUser(inputForm);

    if (editedUser === null) {
      setError("Duplicate username. Please try again.");
    } else {
      setNotification("Profile has been updated.");
      setForm({ ...form, password: "" }); // clear password field
    } 
  } 


  const handleStatus = async (e) => {
    e.preventDefault();

    // block/unblock user
    const statusSetUser = await setUserStatus(user.id);
    
    // update user status
    setUser({ ...user, status: statusSetUser.status });
  }


  const handleDelete = async (e) => {
    e.preventDefault();

    // delete the user
    const res = await deleteUser(user.id);

    // navigate to user management page
    if (res)
      history.push("/user"); 
  }

  return (
    <div>
      <div className="row mb-4">
        <div className="col-6">
          <div className="page-title">
            <Link className="dashboard-link" to={`/user/${id}`}>
              <div className="icon-btn back-btn">
                <FontAwesomeIcon icon={faChevronLeft} size="xs" fixedWidth />
              </div>
            </Link>
            {" "}| Account
          </div>
        </div>
        <div className="col-6">
          <div className="page-title-right">Current viewing user: <strong><i>{form.username}</i></strong></div>
        </div>
      </div>

      <div className="row">
        {/* edit user profile */}
        <div className="col-xl-7 mt-3">
          <div className="user-acc-wrap">
            <div className="form-title mb-3">Edit User Profile</div>
            <form onSubmit={handleEdit}>
              {/* form error */}
              {error && 
                <div className="form-group mb-3 form-msg form-error">
                  <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth /> {error}
                </div>
              }

              {/* form successful notification */}
              {notification && 
                <div className="form-group mb-3 form-msg form-noti">
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
              
              {/* input username */}
              <div className="form-group mb-3">
                <label className="input-title">Username</label>
                <input
                  type="text"
                  className="input-body"
                  placeholder="enter new username"
                  spellCheck={false}
                  required={true}
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />
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
              {/* input password */}
              <div className="form-group mb-3">
                <label className="input-title">Password</label>
                <input
                  type="password"
                  className="input-body"
                  placeholder="enter new password"
                  spellCheck={false}
                  required={false}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              
              {/* save edit button */}
              <div className="form-group mt-4">  
                <button type="submit" className="custom-btn pf-save-btn">Save changes</button>
              </div>
            </form>
          </div>
        </div>
        
        {/* block/unblock user */}
        <div className="col-xl-5 mt-3">
          <div className="user-acc-wrap">
            <div className="form-title mb-3">Block/Unblock User</div>
            <div>Blocking a user will not allow a user to login until the admin unblocks the account.</div>
            <div>Status: <strong><i>{user.status ? "Unblocked" : "Blocked"}</i></strong></div>
            
            {/* block/unblock button based on current user status */}
            <form onSubmit={handleStatus}>
              <div className="form-group mt-3">  
                <button type="submit" className={`custom-btn ${user.status ? "pf-dlt-btn" : "pf-save-btn"}`}>
                  {user.status ? "Block" : "Unblock"}
                </button>
              </div>
            </form>
          </div>

          {/* delete user */}
          <div className="user-acc-wrap mt-3">
            <div className="form-title mb-3">Delete User</div>
            <div>Deleting the user is an irreversible process, this will:</div>
            <ul>
              <li>Delete user account from VibeCheck</li>
              <li>Erase all user posts and replies</li>
            </ul>
            {/* delete button */}
            <form onSubmit={handleDelete}>
              <div className="form-group mt-3">  
                <button type="submit" className="custom-btn pf-dlt-btn">Delete</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default UserAccount;