import React, {useEffect, useState} from 'react'
import "./Home.css"

const Home = () => {
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserName(data.name)
      setShow(true);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <div>
      <section className="home-page">
      <div className="container">
        
        <div className="content">
          <h1 className="main-heading" style={{fontSize: "30px", color: "red"}}>Welcome</h1>
          <h1 style={{fontWeight: "bold", margin: "20px 0px", fontSize: "40px"}}>{userName}</h1>
          <p style={{fontSize: "25px", fontWeight: "200", color: "green"}}>
            {show ? "Happy to see you back" : "I'm a MERN Developer"}
            
          </p>
        </div>
      </div>
      </section>
    </div>
  )
}

export default Home