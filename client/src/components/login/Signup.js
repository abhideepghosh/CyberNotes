import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import {
  nameSchema,
  emailSchema,
  passwordSchema,
} from "../../schemas/UserSchema";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validName, setValidName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validUniqueEmail, setValidUniqueEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);

  const navigate = useNavigate();

  const resize = () => {
    const formImage = document.querySelector(".form__image");
    formImage.style.height = document.body.scrollHeight + "px";
  };
  window.addEventListener("resize", resize);
  const signupEnter = (e) =>{
    if(e.key === "Enter"){
      register();
    }
  }
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
    const isValidName = await nameSchema.isValid({ name: name });
    setValidName(isValidName);
    const isValidEmail = await emailSchema.isValid({ email: email });
    setValidEmail(isValidEmail);
    const isValidPassword = await passwordSchema.isValid({
      password: password,
    });
    setValidPassword(isValidPassword);
    setValidConfirmPassword(password === confirmPassword);
    setValidUniqueEmail(true);
    try {
      const isValidAll = isValidName && isValidEmail && isValidPassword && (password === confirmPassword);
      if (isValidAll) {
        setTimeout(() => {
          navigate("/loader2");
        }, 500);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        };
        const response = await fetch(
          "https://cybernotes-backend.onrender.com/v1/users/signup",
          requestOptions
        );
        const data = await response.json();
        if (data.status === "success") navigate("/");
        else {
          setValidUniqueEmail(false);
          navigate("/Signup");
        }
      } else {
        console.log("Invalid data");
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
      <form className="form" action="" method="post">
        <div className="form__image"></div>
        <h1 className="cyberpunk2">
          <em>Register</em>
        </h1>
        <div id="light">
          <div id="lineh1"></div>
          <div id="lineh2"></div>
        </div>
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
          {validName ? (
            ""
          ) : (
            <div className="error">
              <p>
                <em className="errorem">
                  Name Length should be greater than 3 letters
                </em>
              </p>
            </div>
          )}
        </div>
        <div className="editor-field editor-field__textbox">
          <div className="editor-field__label-container">
            <label className="editor-field__label">Email</label>
          </div>

          <div className="editor-field__container">
            <input
              id="email"
              type="text"
              value={email}
              className="editor-field__input "
              onChange={emailInput}
            />
          </div>
          <span className="editor-field__bottom"></span>
          <div className="editor-field__noise"></div>
          {validEmail ? (
            ""
          ) : (
            <div className="error">
              <p>
                <em className="errorem">Invaild Email</em>
              </p>
            </div>
          )}
          {validUniqueEmail ? (
            ""
          ) : (
            <div className="error">
              <p>
                <em className="errorem">Email Already Exist</em>
              </p>
            </div>
          )}
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
          {validPassword ? (
            ""
          ) : (
            <div className="error">
              <p>
                <em className="errorem">Password Required</em>
              </p>
            </div>
          )}
        </div>
        <div className="editor-field editor-field__textbox">
          <div className="editor-field__label-container">
            <label className="editor-field__label">Confirm Password</label>
          </div>
          <div className="editor-field__container">
            <input
              id="confirmpassword"
              type="password"
              value={confirmPassword}
              className="editor-field__input"
              onChange={confirmPasswordInput}
              onKeyPress={signupEnter}
            />
          </div>
          <span className="editor-field__bottom "></span>
          <div className="editor-field__noise"></div>
          {validConfirmPassword ? (
            ""
          ) : (
            <div className="error">
              <p>
                <em className="errorem">Password Doesnt match</em>
              </p>
            </div>
          )}
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
    
    </main>
  );
};

export default Signup;
