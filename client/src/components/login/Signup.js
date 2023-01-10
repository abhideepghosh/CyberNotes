import React, { useState, useEffect } from "react";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        <div className="btn btn--primary">
          <div className="btn__container">Signup</div>
          <div className="btn__bottom"></div>
          <div className="btn__noise"></div>
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
