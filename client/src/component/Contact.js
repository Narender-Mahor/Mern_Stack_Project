import React from "react";
import "./Contact.css"
import { useEffect, useState } from "react";

const Contact = () => {

  const contactDefaultData = {
    name: "",
    email: "",
    message: ""
  }

  const [userData, setUserData] = useState(contactDefaultData);

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({...userData, name: data.name, email: data.email})

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userContact();
  }, []);

  // storing form data in state

  const handleInput = (e)=> {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value})
  }

  //send data to beckend

  const contactForm = async(e)=> {
    e.preventDefault();

    const {name, email, message} = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, message
      })
    });

    const data = await res.json();

    if(!data){
      console.log("message not sent");
    }else{
      alert("Message sent successfully");
      setUserData({...userData, message: ""});
    }

  }

  return (
    <section className="contact-us">
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <h2>Contact Us</h2>
          <form>
            <div className="formbold-mb-5">
              <label htmlFor="name" className="formbold-form-label">
                
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={userData.name}
                onChange={handleInput}
                className="formbold-form-input"
              />
            </div>

            <div className="formbold-mb-5">
              <label htmlFor="email" className="formbold-form-label">
                
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={userData.email}
                onChange={handleInput}
                className="formbold-form-input"
              />
            </div>

            <div className="formbold-mb-5">
              <label htmlFor="message" className="formbold-form-label">
                
                Message
              </label>
              <textarea
                rows="3"
                name="message"
                id="message"
                value={userData.message}
                onChange={handleInput}
                className="formbold-form-input"
              ></textarea>
            </div>

            <div>
              <button className="formbold-btn" onClick={contactForm}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <style></style>
    </section>
  );
};

export default Contact;
