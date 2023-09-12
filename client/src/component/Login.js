import React, { useContext } from "react";
// import Logo from "../images/narender.png";\
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../App";
import "./Login.css";


const Login = () => {
  const {state, dispatch} = useContext(UserContext)

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async(e)=> {
    e.preventDefault();

   const res = await fetch("/signin", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      email, password
    })
    
   })
   const data = res.json();
   if(res.status === 400 || !data){
    window.alert("invalid credentials")
   }else{
    dispatch({type: "USER", payload: true})
    window.alert("login successfull");
    navigate("/")
   }
   
  }
  return (
    <>
      <section className="login-form">
        <div className="container">
          <div className="card">
            <h2>Login Form</h2>
            <form method="POST">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />

              <button type="submit" onClick={loginUser}>Login</button>
            </form>
            <div className="switch">
              Don't have an account?{" "}
              <NavLink to="/signup">Register here</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
