import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import NavBar from "./component/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./component/ErrorPage";
import Logout from "./component/Logout";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer/UseReducer";


  // context api

  export const UserContext = createContext();

  const Routing = () => {
      return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      )
  };

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{state, dispatch}}>
          <NavBar />
          <Routing />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
