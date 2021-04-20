import React from "react";
import { NavLink, Link } from "react-router-dom";

import { AiOutlineHome } from "react-icons/ai";
import { TiCalendarOutline } from "react-icons/ti";
import { IoWalletOutline } from "react-icons/io5";
import { BiMessage } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";


import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";

import MainSearchBar from "../Search";
import "./NavBar.css";


import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'




const NavBar = () => {
  const localizer = momentLocalizer(moment)
 
  const user = useSelector((state) => state.session.user);

  return (
    <nav className="top-navbar">
      <NavLink
        to="/"
        exact={true}
        className="nav-title-logo"
        activeclassname="active"
      >
        <img
          className="lioness hvr-grow hvr-pulse"
          src={require("../../assets/MasterGig.png")}
        />
        <p className="nav-title navbar-content hvr-grow ">MasterGiG</p>
      </NavLink>
      {user && <MainSearchBar />}
      <div className="navbar-content right-side">
        <NavLink to="/" exact={true} activeclassname="active">
          <AiOutlineHome
            className={
              user
                ? "navbar-icon hvr-shrink"
                : "navbar-icon hvr-shrink logged-out"
            }
            activeclassname="active"
          />
        </NavLink>
        {!user && (
          <>
            <NavLink
              to="/login"
              exact={true}
              activeclassname="active"
              className="navbar-icon logged-out login-button"
            >
              Login
            </NavLink>
            <NavLink
              to="/sign-up"
              exact={true}
              activeclassname="active"
              className="navbar-icon logged-out login-button"
            >
              Sign Up
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink to="/messages/" exact={true} activeclassname="active">
              <BiMessage className="navbar-icon hvr-shrink message-button " />
            </NavLink>
            <NavLink to={`/${user.username}`}>
              <CgProfile className="navbar-icon home-page hvr-shrink profile-button " />
            </NavLink>
            <NavLink to="/wallet" exact={true} activeclassname="active">
              <IoWalletOutline className="navbar-icon hvr-shrink wallet-button " />
            </NavLink>
            <NavLink to="/calender" exact={true} activeclassname="active" components = {<Calendar localizer={localizer} />}  >
              <TiCalendarOutline className="navbar-icon hvr-shrink calendar-button" />
            </NavLink>
            <LogoutButton className="navbar-icon home-page der hvr-grow" />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
