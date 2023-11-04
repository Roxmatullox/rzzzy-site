

import { message } from "antd";
import { useEffect } from "react";


const HomePage = () => {

  useEffect(()=>{
    message.success("Rzzzy saytiga hush kelibsiz !")
  } , [])

  return (
    <section id="home">
      <div className="home">
        <div className="container">

        </div>
      </div>
    </section>
  )
}

export default HomePage