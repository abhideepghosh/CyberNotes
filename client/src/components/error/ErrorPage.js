import React from "react";
import "./ErrorPage.scss";

const ErrorPage = () => {
  return (
    <section className="error-body">
      <video
        preload="auto"
        className="background"
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/396624/err.mp4"
        autoplay
        muted
        loop
      ></video>
      <div className="message">
        <h1 t="404">404</h1>
        <div className="bottom">
          <p>You have lost your way</p>
          <a href="/">return home</a>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
