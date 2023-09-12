import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import myPic from "../images/myPic.jpg"
import userPic from "../images/userPic.png"

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data)

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <section className="about">
      <div className="container">
        
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">User Profile</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-xs-12 col-md-3 col-lg-3">
                <img
                  src={ userData.name === "Narender kohli" ? myPic : userPic }
                  className="img-responsive img-rounded"
                  alt=""
                />
              </div>
              <div className="col-xs-12 col-md-5 col-lg-5">
                <h3>{userData.name}</h3>
                <h4>{userData.work}</h4>
                <div className="table-responsive">
                  <table className="table table-responsive table-user-information">
                    <tbody>
                      <tr>
                        <td>
                          <strong>
                            <span className="fa-solid fa-id-card"></span>
                          </strong>
                        </td>
                        <td className="text-primary">ID</td>
                        <td className="text-primary">{userData._id}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="fa-solid fa-file-signature"></span>
                          </strong>
                        </td>
                        <td className="text-primary">Name</td>
                        <td className="text-primary">{userData.name}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>
                            <span className="fa-solid fa-envelope"></span>
                          </strong>
                        </td>
                        <td className="text-primary">Email</td>
                        <td className="text-primary">{userData.email}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="fa-solid fa-phone"></span>
                          </strong>
                        </td>
                        <td className="text-primary">Phone</td>
                        <td className="text-primary">{userData.phone}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="fa-solid fa-briefcase"></span>
                          </strong>
                        </td>
                        <td className="text-primary">Profession</td>
                        <td className="text-primary">{userData.work}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-footer">
            <h5 className="pull-left">&copy; MERN Project</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
