import React, { useState } from "react";
import "../css/navBar.css"
import { Link } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Navbar = () => {
  const sessionObject = JSON.parse(sessionStorage.getItem("sessionObject"));
  console.log("SESSIONOBJECT:", sessionObject);

  let username = "";
  if (sessionObject != null) {
    username = sessionObject.userInfo.username;
    console.log("USERNAME: ", username);
  }

  return (
    <nav
      className="nav"
    >
      <a href="/" className="site-title">AggieArchive</a>
      <ul>
        <li>
          <Link className="home-button" to="/">Home</Link>
        </li>
        {!sessionObject ? (
          <li>
            <Link className="login-button" to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <Link className="profile-button" to="/profile">
              <AccountBoxIcon/>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
