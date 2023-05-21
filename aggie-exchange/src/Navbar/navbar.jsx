import React, { useState } from "react";
import "../css/navBar.css"
import "../css/searchBar.css"
import { Link } from "react-router-dom";

const Navbar = () => {
  const sessionObject = JSON.parse(sessionStorage.getItem("sessionObject"));
  console.log("SESSIONOBJECT:", sessionObject);

  let username = "";
  if (sessionObject != null) {
    username = sessionObject.userInfo.username;
    console.log("USERNAME: ", username);
  }

  return (
    <>
    <nav
      className="nav"
    >
      <a href="/" className="site-title"><h4 style={{margin:'15px'}}>AggieArchive</h4></a>
    </nav>
    {!sessionObject ? (
      <div style={styles.loginButtons}>
        <Link className="loginbutton" to="/login">Login</Link>
      </div>
    ) : (
      <div style={styles.loginButtons}>
        <Link style={{textDecoration:'none'}} to="/profile"><div className='signupbutton'>Profile</div></Link>
      </div>
    )}
    </>
  );
}

export default Navbar;

const styles ={
  loginButtons:{
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    right: 20,
    top: 15,
    zIndex: 2,  
  },
}