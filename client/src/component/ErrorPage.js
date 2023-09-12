import React from "react";
import Giphy from "../images/giphy.gif";
import { NavLink } from "react-router-dom";
import "./ErrorPage.css"

const ErrorPage = () => {
  return (
    <>
    <section className="error-page">
      <div className="container">
        <div className="gif">
          <img src={Giphy} alt="gif_ing" />
        </div>
        <div className="content">
          <h1 className="main-heading">This page is gone.</h1>
          <p>
            ...maybe the page you're looking for is not found or never existed.
          </p>
          <NavLink to="/" target="blank">
            <button classNameName="btn btn-primary">
              Back to home <i className="far fa-hand-point-right"></i>
            </button>
          </NavLink>
        </div>
      </div>
      </section>
    </>
  );
};

export default ErrorPage;
