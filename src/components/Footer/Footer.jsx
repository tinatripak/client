import React from "react";
import { NavLink } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import classes from "./Footer.module.scss";
import FontAwesome from 'react-fontawesome'

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.footer__icons}>
        <NavLink
          to="https://www.instagram.com/ksigallery/"
        >
          <BsInstagram size={27} />
        </NavLink>

        <NavLink
          to="https://www.pinterest.com/ksisex/"
        >
          <FontAwesome
            name="pinterest"
            size="2x"
          />
        </NavLink>
      </div>
      <div className={classes.footer__content}>
        <nav className={classes.footer__content__nav}>
          <ul>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li><span>|</span></li>
            <li>
              <NavLink to="/portfolio">Portfolio</NavLink>
            </li>
            <li><span>|</span></li>
            <li>
              <NavLink to="/price">Price</NavLink>
            </li>
            <li><span>|</span></li>
            <li>
              <NavLink to="/booking">Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={classes.footer__copyrigth}>Copyrigth &copy; 2023 Ksenia Tripak</div>
    </div>
  );
};

export default Footer;
