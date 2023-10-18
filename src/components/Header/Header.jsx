import React, { useEffect, useState } from "react";

import { BiMenuAltRight, BiLogInCircle } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./Header.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import FontAwesome from 'react-fontawesome'


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 880 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };
  const location = useLocation();

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <NavLink to="/" className={classes.header__content__logo}
         style={{ color: location.pathname === "/booking" ? "white" : "black" }}>
          KSIGALLERY
        </NavLink>
        
        <div
          className={`${classes.header__content__div} ${
            menuOpen && size.width < 880 ? classes.isMenu : ""
          }`}
        >
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  onClick={menuToggleHandler}
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.inactive
                  }
                  style={{ color: location.pathname === "/booking" ? "white" : "black" }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={menuToggleHandler}
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.inactive
                  }
                  style={{ color: location.pathname === "/booking" ? "white" : "black" }}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/portfolio"
                  onClick={menuToggleHandler}
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.inactive
                  }
                  style={{ color: location.pathname === "/booking" ? "white" : "black" }}
                >
                  Portfolio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/types"
                  onClick={menuToggleHandler}
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.inactive
                  }
                  style={{ color: location.pathname === "/booking" ? "white" : "black" }}
                >
                  Price
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/booking"
                  onClick={menuToggleHandler}
                  className={({ isActive }) =>
                    isActive ? classes.active : classes.inactive
                  }
                  style={{ color: location.pathname === "/booking" ? "white" : "black" }}
                >
                  Booking
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={classes.header__content__social}>
          <NavLink
            to="https://www.instagram.com/ksigallery/"
            style={{ color: location.pathname === "/booking" ? "white" : "black" }}
          >
            <BsInstagram size={27} />
          </NavLink>

          <NavLink
            to="https://www.pinterest.com/ksisex/"
            style={{ color: location.pathname === "/booking" ? "white" : "black" }}
          >
            <FontAwesome
              name="pinterest"
              size="2x"
            />
          </NavLink>

          <NavLink
            to="/login"
            style={{ color: location.pathname === "/booking" ? "white" : "black" }}
          >
            <BiLogInCircle size={33} />
          </NavLink>
        </div>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler}  style={{ color: location.pathname === "/booking" ? "white" : "black" }}/>
          ) : (
            <AiOutlineClose
              className={classes.header__content__toggle__closeButton}
              onClick={menuToggleHandler}
              style={{ color: location.pathname === "/booking" ? "white" : "black" }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
