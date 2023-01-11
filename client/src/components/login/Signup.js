import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const resize = () => {
    const formImage = document.querySelector(".form__image");
    formImage.style.height = document.body.scrollHeight + "px";
  };
  window.addEventListener("resize", resize);

  const nameInput = (e) => {
    setName(e.target.value);
  };
  const passwordInput = (e) => {
    setPassword(e.target.value);
  };
  const emailInput = (e) => {
    setEmail(e.target.value);
  };
  const confirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
  };

  const register = async () => {
    console.log(name, email, password, confirmPassword);

    try {
      if (password === confirmPassword) {
        console.log("Password Matched! Validations: True");
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        };
        const response = await fetch(
          "http://localhost:5000/v1/users/signup",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
        if (data.status === "success") navigate("/");
        else console.log("Incorrect Details");
      } else {
        console.log("Password Did Not Match With The Confirm Password Input");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    resize();
  }, []);

  return (
    <main className="login_container">
      <form className="form" action="" method="get">
        <div className="form__image"></div>
        <div className="editor-field editor-field__textbox">
          <div className="editor-field__label-container">
            <label className="editor-field__label">Name</label>
          </div>

          <div className="editor-field__container">
            <input
              id="username"
              type="text"
              value={name}
              className="editor-field__input "
              onChange={nameInput}
            />
          </div>
          <span className="editor-field__bottom"></span>
          <div className="editor-field__noise"></div>
        </div>
        <div className="editor-field editor-field__textbox">
          <div className="editor-field__label-container">
            <label className="editor-field__label">Email</label>
          </div>

          <div className="editor-field__container">
            <input
              id="username"
              type="text"
              value={email}
              className="editor-field__input "
              onChange={emailInput}
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
        <div className="editor-field editor-field__textbox">
          <div className="editor-field__label-container">
            <label className="editor-field__label">Confirm Password</label>
          </div>
          <div className="editor-field__container">
            <input
              id="password"
              type="password"
              value={confirmPassword}
              className="editor-field__input"
              onChange={confirmPasswordInput}
            />
          </div>
          <span className="editor-field__bottom "></span>
          <div className="editor-field__noise"></div>
        </div>
        <div className="btn btn--primary" onClick={register}>
          <div className="btn__container">Register</div>
          <div className="btn__bottom"></div>
          <div className="btn__noise"></div>
        </div>
        <div>
          Already part of the community!{" "}
          <Link to="/">
            <em>Login</em>
          </Link>
        </div>
      </form>
      {/* <div>
        <h1 className="cyberpunk1 glitched">Login</h1>
        <h2 className="cyberpunk2 glitched">Login</h2>
        <h3 className="cyberpunk3 glitched">Login</h3>
        <h4 className="cyberpunk4 glitched">Login</h4>
        <hr /> 
      </div>*/}
    </main>
  );
};

export default Login;
