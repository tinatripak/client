import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./DropdownMenu.css";
import { logoutUser } from "../../services/LoginService";
import Cookies from 'js-cookie';

const DropdownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token']);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const Logout = () => {
    removeCookie('token');
    navigate("/login");
  };

  return (
    <div ref={menuRef}>
      <div
        className={`menu-trigger ${isMenuOpen ? "active" : "inactive"}`}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <IoIosArrowDown />
      </div>

      <div className={`dropdown-menu ${isMenuOpen ? "active" : "inactive"}`}>
        <ul>
          <li className="dropdownItem" onClick={Logout}>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
