import { useLocation } from "react-router-dom"

import { message } from "antd";
import { useEffect } from "react";

import "./HomePage.scss"

const HomePage = () => {

  useEffect(()=>{
    message.success("Rzzzy saytiga hush kelibsiz !")
  } , [])

  const location = useLocation()

  const {pathname : page} = location
    
  return (
    <section id="home">
      <div className="home">
      </div>
      <div className="three-pages">
        <div className="container">
            {
              page === "/" ? <div className="home-page" >
                <h1>Home</h1>
              </div> : <></>
            }
            {
              page === "/login" ? <div className="login-page" >
                <h1>Login</h1>
              </div> : <></>
            }{
              page === "/register" ? <div className="register-page" >
                <h1>Register</h1>
              </div> : <></>
            }
        </div>
      </div>
    </section>
  )
}

export default HomePage