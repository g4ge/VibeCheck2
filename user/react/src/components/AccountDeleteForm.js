import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteUser } from "data/UserRepository";
import { useUserContext } from "libs/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { validateMaxLength } from "utils/FormValidation";
import "App.css";

function AccountDeleteForm() {
  const history = useHistory();
  const { authUser } = useUserContext();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleValidation = () => {
    if (!validateMaxLength(password, 60)) {
      setError("Password length cannot be greater than 60");
      return false;
    }
    
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // stop deleting user if form input is invalid
    if (!handleValidation())
      return;

    const res = await deleteUser(authUser.id, password);

    if (res === null)
      history.push("/"); // back to landing page
    else
      setError(res.error)  
  }

  return (
    <div>
      <hr className="mt-4"/>
      <h5 className="form-title mt-4">| Delete This Account</h5>

      <div className="mt-3">
        <form onSubmit={handleSubmit}>
          {/* delete account description */}
          <div className="mt-4 mb-4">
            <span>Deleting your account is an irreversible process, this will:</span>
            <ul>
              <li>Delete your account from VibeCheck</li>
              <li>Erase all your posts and replies</li>
            </ul>
          </div>

          {/* password error */}
          {error && 
            <div className="form-group mb-3 form-msg form-error" style={{width: "270px"}}>
              <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth /> {error}
            </div>
          }

          {/* password field */}
          <div className="form-group mb-3">
            <input
              type="password"
              className="input-body"
              placeholder="enter current password"
              spellCheck={false}
              required={true}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* delete account button */}
          <div className="form-group mt-4">  
            <button type="submit" className="custom-btn pf-dlt-btn">Delete account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountDeleteForm;