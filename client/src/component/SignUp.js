import React, { useState } from "react";
// import formImg from "../images/form-img.webp";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useNavigate } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
  const defaultData = {
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: ""
  };
  const [user, setUser] = useState(defaultData);
  const navigate = useNavigate();

  const handleInputs = (e)=> {
    const { name, value } = e.target;
    setUser({...user, [name]: value})
    // setUser(()=> {
    //     return {
    //         ...user,
    //         [name]: value
    //     }
    // })
    // console.log(user)
    
  }

  const postData = async(e)=> {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name, email, phone, work, password, cpassword
        })
    })
    const data = await res.json();

    if(res.status === 422 || !data){
       window.alert("invalid registration");
       console.log("invalid registration")
    }else{
        window.alert("Regsitration Successfully");
        console.log("Regsitration Successfully");
    }

    navigate("/login");

  }
  return (
    <>
      <section className="signup-form">
        <div className="container">
          <div className="forms">
            <div className="form signup">
              <span className="title">Registration</span>
              <form method="POST">
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    onChange={handleInputs}
                    value={user.name}
                    required
                  />
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    onChange={handleInputs}
                    value={user.email}
                    required
                  />
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Enter your phone"
                    id="phone"
                    name="phone"
                    onChange={handleInputs}
                    value={user.phone}
                    required
                  />
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Enter your profession"
                    id="work"
                    name="work"
                    onChange={handleInputs}
                    value={user.work}
                    required
                  />
                  <i className="fa-solid fa-briefcase"></i>
                </div>

                <div className="input-field">
                  <input
                    type="password"
                    className="password"
                    placeholder="Create a password"
                    id="password"
                    name="password"
                    onChange={handleInputs}
                    value={user.password}
                    required
                  />
                  <i className="fa-solid fa-key"></i>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    className="password"
                    placeholder="Confirm a password"
                    id="cpassword"
                    name="cpassword"
                    value={user.cpassword}
                    onChange={handleInputs}
                    required
                  />
                  <i className="fa-solid fa-key"></i>
                  <i className="uil uil-eye-slash showHidePw"></i>
                </div>

                <div className="input-field button">
                  <input type="button" value="Signup" onClick={postData}/>
                </div>
              </form>
              <div className="login-signup">
                <span className="text">
                  Already a member?
                  <NavLink to="/login" className="text login-link">
                    Login Now
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
