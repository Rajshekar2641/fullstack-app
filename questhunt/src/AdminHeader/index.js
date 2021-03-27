import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../logo.png";


const Header = () => {

  return (
        <>
            <header className='adminheader site-header' id="site-header">
              <nav className="navbar navbar-expand-md">
                <div className="container">
                <a class="navbar-brand" href="/">
                <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
               </a>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                      <NavLink
                          className="nav-link"
                          to="/"
                      >
                      Quest Hunt
                      </NavLink>
                      </li>
                      <li className="nav-item">
                      <NavLink
                          className="nav-link"
                          to="/locations"
                      >
                      Locations
                      </NavLink>
                      </li>
                      <li className="nav-item">
                      <NavLink
                          className="nav-link"
                          to="/addlocation"
                      >
                      Add Location
                      </NavLink>
                      </li>
                      </ul>
                  </div>   
                </div>
              </nav>
            </header>
            
        </>
  )
}
export default Header;