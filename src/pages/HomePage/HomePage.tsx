import { useEffect , useState } from "react";
import { useLocation } from "react-router-dom"

import { message , Spin } from "antd";

import "./HomePage.scss"

const HomePage = () => {

  const [loading , setLoading] = useState(true)

  window.addEventListener("load", () => {
    setLoading(false)
  });

  useEffect(()=>{
    message.success("Rzzzy saytiga hush kelibsiz !")
  } , [])

  const location = useLocation()

  const {pathname : page} = location
    
  return (
    <Spin spinning={loading} size="large">
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
    </Spin>
  )
}

export default HomePage