import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to={"/"}>Code More</Link>
            </div>
            <ul className="nav navbar-nav">
              <li className="active"><Link to={"/"}>Home</Link></li>
              <li><Link >PLinkge 2</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to={"/signup"}><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
              <li><Link to={"/login"} ><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
            </ul>
          </div>
        </nav>
    </>
  )
}

export default Header