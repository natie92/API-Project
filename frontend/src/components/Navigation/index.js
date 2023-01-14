import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import './NavBar.css';
import logo from "./airpnp.png";

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="login-link" to="/login">Log In</NavLink>
        <NavLink className="sign-up-link" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="NavBar">
      <NavLink className="home-button" exact to="/">
         <img
          id="airbnb-img"
          src={logo}
          alt="airbnb logo"
        />
      </NavLink>
      <div className='search-bar'>
        <form>
          <input type="text" placeholder="Search..."/>
          <i class="fa-solid fa-magnifying-glass"></i>
        </form>
      </div>
      <ul>
        <li>
          <NavLink className="home-nav" exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>

  );
}

export default Navigation;
