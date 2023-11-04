import { NavLink } from "react-router-dom"

import "./Layout.scss"

const Header = () => {
  return (
    <header id="users-header">
      <nav>
        <div className="container">
          <div className="user-header">
            <div className="user-header-logo">
              <NavLink to="/"><h2>#Rzzzy</h2></NavLink>
            </div>
            <div className="user-header-links">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header