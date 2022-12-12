import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Fade from '@mui/material/Fade';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import * as sessionAction from "../../store/session";


// import "./ProfileButton.css";

// export default function FadeMenu({user}) {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = React.useState(null)
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const logoutBttn = (e) => {
//     e.preventDefault()
//     handleClose()
//     dispatch(sessionAction.logout)
//     history.push("/")
//   };

//   const makeASpot = (e) => {
//     e.preventDefault();
//     handleClose()
//     history.push("/spots/create")
//   }

//   return (
//     <div>
//       <Button
//         id="fade-button"
//         className="profile-button"
//         aria-controls={open ? 'fade-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         Dashboard
//       </Button>
//       <Menu
//         id="fade-menu"
//         MenuListProps={{
//           'aria-labelledby': 'fade-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Fade}
//       >
//         <MenuItem className="item-1" onClick={makeASpot}>Create A Spot</MenuItem>
//         <MenuItem className="item-2" onClick={logoutBttn}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );

// };



function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

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
    <NavLink
          to="/user/spots"
          activeClassName="Nav-Link-Working">
          My Spots
      </NavLink>
      <button className="user-profile" onClick={openMenu}>
        Profile
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
