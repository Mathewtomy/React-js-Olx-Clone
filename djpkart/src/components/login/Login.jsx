// import {Button} from '@material-ui/core';
// import TextField from "@material-ui/core/";
// import Dialog from "@material-ui/core/";
// import div from "@material-ui/core/";
// import div from "@material-ui/core/";
// import div from "@material-ui/core/";
import { useEffect, useState } from "react";
import "./Login.css";

function Login(props) {
  const userDataFromStorage =
    JSON.parse(localStorage.getItem("userData")) || {};
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(userDataFromStorage);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const { signIn } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prevInputData) => ({ ...prevInputData, [name]: value }));
  }

  function collectUserData(event) {
    event.preventDefault();
    if (userData.userEmail === "") {
      setEmailError(true);
    }

    if (userData.userName === "") {
      setNameError(true);
    }

    if (userData.userPassword === "") {
      setPasswordError(true);
    }
    signIn();
    handleClose();
  }

  // console.log(userData);

  return (
    <div className="login-user">
      <div
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form autoComplete="off" onSubmit={collectUserData}>
          <div id="form-dialog-title">Login</div>
          <div>
            <div
              margin="dense"
              id="userName"
              required={true}
              variant="outlined"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              label="User Name"
              type="text"
              fullWidth
              error={nameError}
            />
            <div
              margin="dense"
              id="userEmail"
              required={true}
              variant="outlined"
              name="userEmail"
              value={userData.userEmail}
              onChange={handleChange}
              label="Email Address"
              type="email"
              fullWidth
              error={emailError}
            />
            <div
              required={true}
              margin="dense"
              id="userPassword"
              name="userPassword"
              value={userData.userPassword}
              variant="outlined"
              onChange={handleChange}
              label="Password"
              type="password"
              fullWidth
              error={passwordError}
            />
          </div>
          <div>
            <input type="button" onClick={handleClose} color="primary">
              Cancel
            </input>
            <input type="submit" color="primary">
              Login
            </input>
          </div>
        </form>
      </div>
      <p onClick={handleClickOpen}>Login</p>
    </div>
  );
}

export default Login;
