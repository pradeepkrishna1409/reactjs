import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark justify-content-center align-items-start">
    <button class="navbar-toggler mr-auto" type="button" data-toggle="collapse" data-target="#navbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand">
    <img src="/hub.png" height="28"  />
    </a>
    <Link class="navbar-brand" href="/" >  Headcount Management System </Link>
    <div className="collapse navbar-collapse">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/">
        Add & Assign Project
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/visualization">
        View Visualizations
        </NavLink>
      </li>
    </ul>
  </div>
</nav>
  );
};

export default Navbar;