import { Fragment } from "react"
import Header from "./Header"
import { Outlet } from "react-router-dom"

const UsersLayout = () => {
  return (
    <Fragment>
      <Header/>
      <Outlet/>
    </Fragment>
  )
}

export default UsersLayout