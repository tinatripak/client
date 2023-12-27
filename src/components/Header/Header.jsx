import React, { useEffect, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FaPinterest, FaInstagram } from "react-icons/fa";

import classes from "./Header.module.scss";
import { Link } from "react-router-dom";

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
    if (size.width > 1105) {
      setMenuOpen(false);
    }
  }, [size.width]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
    console.log(menuOpen)
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
              <Link to="/" onClick={menuToggleHandler}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={menuToggleHandler}>
                About
              </Link>
            </li>
            <li>
              <Link to="/portfolio" onClick={menuToggleHandler}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/types" onClick={menuToggleHandler}>
                Price
              </Link>
            </li>
            <li>
              <Link to="/booking" onClick={menuToggleHandler}>
                Booking
              </Link>
            </li>
            <li>
              <Link to="/contactUs" onClick={menuToggleHandler}>
                Contact us
              </Link>
            </li>
          </ul>
          <div className={classes.header__content__social}>
          <Link to="https://www.pinterest.com/ksisex/" onClick={menuToggleHandler}><FaPinterest size={30}/></Link>
            
          <Link to="https://www.instagram.com/ksigallery?igsh=MTBwYTYweTEwY3h4NQ==" onClick={menuToggleHandler}><FaInstagram size={30}/></Link>
          </div>
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler}/>
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} className={classes.header__content__toggle__close}/>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
