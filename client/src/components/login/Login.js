import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import UserContext from "../../context/users/userContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validLogin, setValidLogin] = useState(true);
  const userData = useContext(UserContext);
  const navigate = useNavigate();

  const resize = () => {
    const formImage = document.querySelector(".form__image");
    formImage.style.height = document.body.scrollHeight + "px";
  };
  window.addEventListener("resize", resize);

  const usernameInput = (e) => {
    setUsername(e.target.value);
  };
  const passwordInput = (e) => {
    setPassword(e.target.value);
  };

  const loginDetailsUpdate = (data) => {
    userData.update({ data });
  };

  const login = async () => {
    try {
      setValidLogin(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password: password }),
      };
      const response = await fetch(
        "http://localhost:5000/v1/users/login",
        requestOptions
      );
      const data = await response.json();

      if (data.status === "success") {
        data.token = "Bearer " + data.token;
        loginDetailsUpdate(data);
        navigate("/home");
      } else {
        setValidLogin(false);
        console.log("Invalid Email Or Password");
      }
    } catch (error) {
      console.log("Incorrect Username Or Password!");
    }
  };

  useEffect(() => {
    resize();
  }, []);

  return (
    <main className="login_container">
      <form className="form" action="" method="get">
        <div className="form__image"></div>
        <h1 className="cyberpunk2">
          <em>Login</em>
        </h1>
        <div id="light">
          <div id="lineh1"></div>
          <div id="lineh2"></div>
        </div>
        {validLogin ? (
          ""
        ) : (
          <p className="errorlogin">
            <em className="errorem">Invalid Email or Password</em>
          </p>
        )}
        <div className="editor-field editor-field__textbox">
          <div className="editor-field__label-container">
            <label className="editor-field__label">Email</label>
          </div>

          <div className="editor-field__container">
            <input
              id="username"
              type="text"
              value={username}
              className="editor-field__input "
              onChange={usernameInput}
            />
          </div>
          <span className="editor-field__bottom"></span>
          <div className="editor-field__noise"></div>
        </div>
        <div className="editor-field editor-field__textbox">
          <div className="editor-field__label-container">
            <label className="editor-field__label">Password</label>
          </div>
          <div className="editor-field__container">
            <input
              id="password"
              type="password"
              value={password}
              className="editor-field__input"
              onChange={passwordInput}
            />
          </div>
          <span className="editor-field__bottom "></span>
          <div className="editor-field__noise"></div>
        </div>
        <div className="btn btn--primary" onClick={login}>
          <div className="btn__container">Login</div>
          <div className="btn__bottom"></div>
          <div className="btn__noise"></div>
        </div>
        <div>
          Be a part of the community!{" "}
          <Link to="/Signup">
            <em>Register Now</em>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
