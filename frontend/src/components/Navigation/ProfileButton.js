import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';

import "./ProfileButton.css"


function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const linkStyle = {
  textDecoration: "none",
  color: "grey",

};

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div className="links-navigation">
      <NavLink to="/user/reviews" style={linkStyle} activeClassName="Nav-Link-Working"> My Reviews </NavLink>
      <NavLink exact to="/user/spots" style={linkStyle} activeClassName="Nav-Link-Working"> My Spots </NavLink>
      {/* <NavLink exact to="/about" style={linkStyle} activeClassName="Nav-Link-Working"> About Me </NavLink> */}
    </div>
    <div className="dropdown">
      <button className="user-profile" onClick={openMenu}>
        <div className="dropdown-content">
        <i className="fa-solid fa-bars" />
        <i className="fas fa-user-circle" />
        </div>
      </button>
    </div>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="username-drop">{user.username}</li>
          <li className="email-drop">{user.email}</li>
          <li>
            <button className="profile-logout" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
