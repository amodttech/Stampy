import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink className="nav-link" to="/create">
          New Stamp
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
