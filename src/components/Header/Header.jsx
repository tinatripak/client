import React, { useEffect, useState } from "react";

import { BiMenuAltRight, BiLogInCircle } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./Header.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { sizeWidth, emptyLink, loginLink, aboutLink, portfolioLink, typesLink, bookingLink, contactUsLink, instagramURL, pinterestURL } from "../../constants";

const Header = () => {
  const location = useLocation();
  const textColor = location.pathname === bookingLink ? "white" : "black"

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: null,
    height: null,
  });

  useEffect(() => {
    resizeMenu();
  }, []);

  useEffect(() => {
    checkMenuSize();
  }, [size.width, isMenuOpen]);

  const checkMenuSize = () => {
    if (size.width > sizeWidth && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }
  const resizeMenu = () => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }

  const menuToggleHandler = () => {
    setIsMenuOpen((status) => !status);
  };

  const createNavLink = (to, text) => (
    <li>
      <NavLink
        to={to}
        onClick={menuToggleHandler}
        className={({ isActive }) =>
          isActive ? classes.active : classes.inactive
        }
        style={{ color: textColor }}
      >
        {text}
      </NavLink>
    </li>
  );

  const createLinkIcons = (to, text) => {
    <NavLink
      to={to}
      style={{ color: textColor }}
    >
      {text}
    </NavLink>;
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <NavLink
          to="/"
          className={classes.header__content__logo}
          style={{
            color: textColor,
          }}
        >
          KSIGALLERY
        </NavLink>

        <div
          className={`${classes.header__content__div} ${
            isMenuOpen && size.width < sizeWidth ? classes.isMenu : ""
          }`}
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
          {createLinkIcons(loginLink, <BiLogInCircle size={33} />)}
        </div>
        <div className={classes.header__content__toggle}>
          {!isMenuOpen ? (
            <BiMenuAltRight
              onClick={menuToggleHandler}
              style={{
                color: textColor,
              }}
            />
          ) : (
            <AiOutlineClose
              className={classes.header__content__toggle__closeButton}
              onClick={menuToggleHandler}
              style={{
                color: textColor,
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
