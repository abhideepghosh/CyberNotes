import React, { useEffect } from "react";
import "./Login.scss";

const Login = () => {
  const resize = () => {
    const formImage = document.querySelector(".form__image");
    formImage.style.height = document.body.scrollHeight + "px";
  };
  window.addEventListener("resize", resize);

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
            <input type="text" className="editor-field__input " />
          </div>
          <span className="editor-field__bottom"></span>
          <div className="editor-field__noise"></div>
        </div>
        <div className="editor-field editor-field__textbox">
          <div className="editor-field__label-container">
            <label className="editor-field__label">Password</label>
          </div>
          <div className="editor-field__container">
            <input type="password" className="editor-field__input" />
          </div>
          <span className="editor-field__bottom "></span>
          <div className="editor-field__noise"></div>
        </div>
        <div className="btn btn--primary">
          <div className="btn__container">Login</div>
          <div className="btn__bottom"></div>
          <div className="btn__noise"></div>
        </div>
      </form>
      <div>
        <h1 class="cyberpunk1 glitched">H1 title glitched</h1>
        <h2 class="cyberpunk2 glitched">H2 title glitched</h2>
        <h3 class="cyberpunk3 glitched">H3 title glitched</h3>
        <h4 class="cyberpunk4 glitched">H4 title glitched</h4>
        <hr />
      </div>
    </main>
  );
};

export default Login;
