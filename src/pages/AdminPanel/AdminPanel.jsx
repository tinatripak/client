import React, { useState } from 'react';
import {BsMoonStarsFill} from 'react-icons/bs';
import {BsBell} from 'react-icons/bs';
import {LiaToggleOffSolid, LiaToggleOnSolid} from 'react-icons/lia';
import {FiSun} from 'react-icons/fi';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import classes from "./AdminPanel.module.scss";

import Home from './Home/Home';
import Admins from './Admins/Admins';
import Calendar from './Calendar/Calendar';
import Bio from './Bio/Bio';
import Photography from './Photography/Photography';
import TypesOfPhotography from './TypesOfPhotography/TypesOfPhotography';
import General from './General/General';
import EditHome from './Home/EditHome/EditHome';
import EditBio from './Bio/EditBio/EditBio';
import { CreateAnAdmin, EditAdmin } from './Admins';


const AdminPanel = () => {
    
    const { state } = useLocation();
    console.log(state)

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };

    const [isArrowDown, setIsArrowDown] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleArrow = () => {
        setIsArrowDown(!isArrowDown);
        setIsMenuOpen(!isMenuOpen);
    };

    const [isSwitchOff, setIsSwitchOff] = useState(true);

    const toggleSwitch = () => {
        setIsSwitchOff(!isSwitchOff);
    };
    

    return (
        <div className={classes.panel}>
            <div className={classes.panel__menu}>
                <div>
                    <Link to='/adminDashboard/general'>
                        <div className={classes.panel__menu__logo}>
                            <img src="/logo-camera.png" alt="Logo"/>
                            <p>KSIGALLERY</p>
                        </div>
                    </Link>
                    <div className={classes.panel__menu__navLinks}>
                        <div className={classes.panel__menu__navLinks__link}>
                            <NavLink
                                to={"/adminDashboard/home"}
                                style={({ isActive }) => {
                                    return {
                                      textDecoration: isActive ? "underline" : "",
                                    };
                                }}
                            >
                                Home
                            </NavLink>
                        </div>

                        <div className={classes.panel__menu__navLinks__link}>
                            <NavLink
                                to={"/adminDashboard/bio"}
                                style={({ isActive }) => {
                                    return {
                                      textDecoration: isActive ? "underline" : "",
                                    };
                                }}
                            >
                                About photographer
                            </NavLink>
                        </div>
                        
                        <div className={classes.panel__menu__navLinks__link}>
                            <NavLink
                                to={"/adminDashboard/photography"}
                                style={({ isActive }) => {
                                    return {
                                      textDecoration: isActive ? "underline" : "",
                                    };
                                }}
                            >
                                All photography
                            </NavLink>
                        </div>
                        <div className={classes.panel__menu__navLinks__link}>
                            <NavLink
                                to={"/adminDashboard/types"}
                                style={({ isActive }) => {
                                    return {
                                      textDecoration: isActive ? "underline" : "",
                                    };
                                }}
                            >
                                Types of photoshoots
                            </NavLink>
                        </div>
                        <div className={classes.panel__menu__navLinks__link}>
                            <NavLink
                                to={"/adminDashboard/calendar"}
                                style={({ isActive }) => {
                                    return {
                                      textDecoration: isActive ? "underline" : "",
                                    };
                                }}
                            >
                                Calendar with photoshoots
                            </NavLink>
                        </div>
                        <div className={classes.panel__menu__navLinks__link}>
                            <NavLink
                                to={"/adminDashboard/admins"}
                                style={({ isActive }) => {
                                    return {
                                      textDecoration: isActive ? "underline" : "",
                                    };
                                }}
                            >
                                Admins
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className={classes.panel__menu__darkMod}>
                    
                    {isSwitchOff ? (
                            <BsMoonStarsFill size={21} className={classes.panel__menu__darkMod__icons__moon}/>
                        ) : (
                            <FiSun size={29} className={classes.panel__menu__darkMod__icons__sun}/>
                    )}
                    <p>Dark mode</p>

                    {isSwitchOff ? (
                            <LiaToggleOffSolid onClick={toggleSwitch} size={26} className={classes.panel__menu__darkMod__icons__switch}/>
                        ) : (
                            <LiaToggleOnSolid onClick={toggleSwitch} size={26} className={classes.panel__menu__darkMod__icons__switch}/>
                    )}
                </div>
            </div>
            <div className={classes.panel__main}>
                <div className={classes.panel__main__settings}>
                    <BsBell className={classes.panel__main__settings__icon} size={20}/>
                    <div className={classes.panel__main__settings__user}>
                        <img src="https://drive.google.com/uc?export=view&id=184blxyv48ODVm324jPrIk1wc_5hq9lcC" alt="User photo" />
                        <p>user.name</p>
                        {isArrowDown ? (
                            <IoIosArrowDown onClick={toggleArrow} />
                        ) : (
                            <div>
                                <IoIosArrowUp onClick={toggleArrow} />
                                {isMenuOpen && (
                                    <div className={classes.panel__main__settings__user__menu}>
                                        <p onClick={Logout}>Logout</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                
                <div className={classes.panel__main__block}>
                        <Routes>
                            <Route path="/general" element={<General />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/home/edit/:id" element={<EditHome />} />
                            <Route path="/bio" element={<Bio />} />
                            <Route path="/bio/edit/:id" element={<EditBio />} />
                            <Route path="/photography" element={<Photography />} />
                            <Route path="/types" element={<TypesOfPhotography />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/admins" element={<Admins />} />
                            <Route path="/admin/create" element={<CreateAnAdmin />} />
                            <Route path="/admin/edit/:id" element={<EditAdmin />} />

                        </Routes>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel