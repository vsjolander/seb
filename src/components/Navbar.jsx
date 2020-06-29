import React from "react";


import {
  Link,
  useLocation
} from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <span className="navbar-brand" href="#">
      </span>
      <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className={`nav-item ${location.pathname === '/' && 'active'}`}>
          <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
        </li>
        <li className={`nav-item ${location.pathname === '/table' && 'active'}`}>
          <Link className="nav-link" to="/table">Table</Link>
        </li>
      </ul>
      </div>
    </nav>
  )
};

export default Navbar;
