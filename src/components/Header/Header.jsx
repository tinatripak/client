import React from "react";
import { BiLogInCircle } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import classes from "./Header.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { emptyLink, loginLink, aboutLink, portfolioLink, typesLink, bookingLink, contactUsLink, instagramURL, pinterestURL } from "../../constants";

const Header = () => {
  const location = useLocation();
  const textColor = location.pathname === bookingLink ? "white" : "black"

  const textColorStyle = { color: textColor }
  const createNavLink = (to, text) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? classes.active : classes.inactive
        }
        style={ textColorStyle }
      >
        {text}
      </NavLink>
    </li>
  );

  const createLinkIcons = (to, text) => (
    <NavLink
      to={to}
      style={ textColorStyle }
    >
      {text}
    </NavLink>
  );

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <NavLink
          to="/"
          className={classes.header__content__logo}
          style={ textColorStyle }
        >
          KSIGALLERY
        </NavLink>

        <div
          className={classes.header__content__div}
        >
          <nav>
            <ul>
              {createNavLink(emptyLink, "Home")}
              {createNavLink(aboutLink, "About")}
              {createNavLink(portfolioLink, "Portfolio")}
              {createNavLink(typesLink, "Price")}
              {createNavLink(bookingLink, "Booking")}
              {createNavLink(contactUsLink, "Contact Us")}
            </ul>
          </nav>
        </div>
        <div className={classes.header__content__social}>
            {createLinkIcons(
              instagramURL,
              <FontAwesome name="pinterest" size="2x" />
            )}
            {createLinkIcons(
              pinterestURL,
              <BsInstagram size={27} />
            )}
            {createLinkIcons(
              loginLink, 
              <BiLogInCircle size={33} />
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
