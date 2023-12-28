import React, { useEffect, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FaPinterest, FaInstagram } from "react-icons/fa";

import classes from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  const location = useLocation();

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
    if (size.width > 1105) {
      setMenuOpen(false);
    }
  }, [size.width]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/" className={classes.header__content__logo}>
          KSIGALLERY
        </Link>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen ? classes.isMenu : classes.withoutMenu
          }`}
        >
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => {
                  menuToggleHandler();
                  if (location.pathname === "/") {
                    setMenuOpen(false);
                  }
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => {
                  menuToggleHandler();
                  if (location.pathname === "/about") {
                    setMenuOpen(false);
                  }
                }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                onClick={() => {
                  menuToggleHandler();
                  if (location.pathname === "/portfolio") {
                    setMenuOpen(false);
                  }
                }}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/types"
                onClick={() => {
                  menuToggleHandler();
                  if (location.pathname === "/types") {
                    setMenuOpen(false);
                  }
                }}
              >
                Price
              </Link>
            </li>
            <li>
              <Link
                to="/booking"
                onClick={() => {
                  menuToggleHandler();
                  if (location.pathname === "/booking") {
                    setMenuOpen(false);
                  }
                }}
              >
                Booking
              </Link>
            </li>
            <li>
              <Link
                to="/contactUs"
                onClick={() => {
                  menuToggleHandler();
                  if (location.pathname === "/contactUs") {
                    setMenuOpen(false);
                  }
                }}
              >
                Contact us
              </Link>
            </li>
          </ul>
          <div className={classes.header__content__social}>
            <Link
              to="https://www.pinterest.com/ksisex/"
              onClick={menuToggleHandler}
            >
              <FaPinterest size={30} />
            </Link>

            <Link
              to="https://www.instagram.com/ksigallery?igsh=MTBwYTYweTEwY3h4NQ=="
              onClick={menuToggleHandler}
            >
              <FaInstagram size={30} />
            </Link>
          </div>
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose
              onClick={menuToggleHandler}
              className={classes.header__content__toggle__close}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
