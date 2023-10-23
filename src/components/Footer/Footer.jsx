import React from "react";
import { NavLink } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import classes from "./Footer.module.scss";
import FontAwesome from 'react-fontawesome'
import {aboutLink, bookingLink, instagramURL, portfolioLink, typesLink} from '../../constants.js'

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.footer__icons}>
        <NavLink
          to={instagramURL}
        >
          <BsInstagram size={27} />
        </NavLink>

        <NavLink
          to={instagramURL}
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
              <NavLink to={aboutLink}>About</NavLink>
            </li>
            <li><span>|</span></li>
            <li>
              <NavLink to={portfolioLink}>Portfolio</NavLink>
            </li>
            <li><span>|</span></li>
            <li>
              <NavLink to={typesLink}>Price</NavLink>
            </li>
            <li><span>|</span></li>
            <li>
              <NavLink to={bookingLink}>Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={classes.footer__copyrigth}>Copyrigth &copy; 2023 Ksenia Tripak</div>
    </div>
  );
};

export default Footer;
