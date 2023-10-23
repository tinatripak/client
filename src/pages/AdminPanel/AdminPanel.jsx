import React, { useEffect, useState } from 'react';
import {BsMoonStarsFill} from 'react-icons/bs';
import {BsBell} from 'react-icons/bs';
import {LiaToggleOffSolid, LiaToggleOnSolid} from 'react-icons/lia';
import {FiSun} from 'react-icons/fi';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import classes from "./AdminPanel.module.scss";

import Home from './Home/Home';
import Admins from './Admins/Admins';
import Bookings from './Bookings/Bookings';
import Bio from './Bio/Bio';
import Photography from './Photography/Photography';
import TypesOfPhotography from './TypesOfPhotography/TypesOfPhotography';
import General from './General/General';
import EditHome from './Home/EditHome/EditHome';
import EditBio from './Bio/EditBio/EditBio';
import { CreateAnAdmin, EditAdmin } from './Admins';

import jwtDecode from 'jwt-decode';
import {getAdminById} from '../../services/AdminService'
import CreateTypeOfPhotography from './TypesOfPhotography/CreateTypeOfPhotography/CreateTypeOfPhotography';
import EditTypeOfPhotography from './TypesOfPhotography/EditTypeOfPhotography/EditTypeOfPhotography';
import CreateBooking from './Bookings/CreateBooking/CreateBooking';
import EditBooking from './Bookings/EditBooking/EditBooking';
import UpdatePhotography from './Photography/UpdatePhotography/UpdatePhotography';
import CreatePhotography from './Photography/CreatePhotography/CreatePhotography';
import Questions from './Questions/Questions';
import AnswerQuestion from './Questions/AnswerQuestion/AnswerQuestion';
import { adminDashboardLink, adminLink, adminsLink, answerLink, bioLink, bookingLink, bookingsLink, createLink, editLink, generalLink, homeLink, photographyLink, questionsLink, typeLink, typesLink } from '../../constants';


const AdminPanel = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    
    const [admin, setAdmin] = useState([])
    const [isArrowDown, setIsArrowDown] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSwitchOff, setIsSwitchOff] = useState(true);

    const decoded = jwtDecode(cookies.token);

    const toggleArrow = () => {
        setIsArrowDown(!isArrowDown);
        setIsMenuOpen(!isMenuOpen);
    };

    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };

    const toggleSwitch = () => {
        setIsSwitchOff(!isSwitchOff);
    };
    
    const removeUndefinedCookies = () => {
        for (const cookieName in cookies) {
            if (cookies.hasOwnProperty(cookieName) && cookies[cookieName] === undefined) {
                removeCookie(cookieName);
            }
        }
    };

    const getAdmin = () =>{
        getAdminById(decoded.id)
        .then((data) => {
            setAdmin(data?.data)
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        removeUndefinedCookies();
        getAdmin();
    }, []);

    return (
        <div className={classes.panel}>
            <div className={classes.panel__menu}>
                <div>
                    <Link to={`${adminDashboardLink}${generalLink}`}>
                        <div className={classes.panel__menu__logo}>
                            <img src="/logo-camera.png" alt="Logo"/>
                            <p>KSIGALLERY</p>
                        </div>
                    </Link>
                    <div className={classes.panel__menu__navLinks}>
                        <div className={classes.panel__menu__navLinks__link}>
                            <NavLink
                                to={`${adminDashboardLink}${homeLink}`}
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
                                to={`${adminDashboardLink}${bioLink}`}
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
                                to={`${adminDashboardLink}${photographyLink}`}
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
                                to={`${adminDashboardLink}${typesLink}`}
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
                                to={`${adminDashboardLink}${bookingsLink}`}
                                style={({ isActive }) => {
                                    return {
                                      textDecoration: isActive ? "underline" : "",
                                    };
                                }}
                            >
                                Bookings
                            </NavLink>
                        </div>
                        <div className={classes.panel__menu__navLinks__link}>
                            <NavLink
                                to={`${adminDashboardLink}${adminsLink}`}
                                style={({ isActive }) => {
                                    return {
                                      textDecoration: isActive ? "underline" : "",
                                    };
                                }}
                            >
                                Admins
                            </NavLink>
                        </div>
                        <div className={classes.panel__menu__navLinks__link}>
                            <NavLink
                                to={`${adminDashboardLink}${questionsLink}`}
                                style={({ isActive }) => {
                                    return {
                                      textDecoration: isActive ? "underline" : "",
                                    };
                                }}
                            >
                                Questions
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
                        <img src={admin?.photo} alt="User photo" />
                            <p>{admin?.username}</p>
                            <div className={classes.panel__main__settings__user__menu}>
                            {isArrowDown ? (
                                    <IoIosArrowDown onClick={toggleArrow} />
                                ) : (
                                    <div className={classes.panel__main__settings__user__menu__dropdown}>
                                        <span><IoIosArrowUp onClick={toggleArrow} /></span>
                                        
                                        {isMenuOpen && (
                                            <div className={classes.panel__main__settings__user__menu__dropdown__logout}>
                                                <p onClick={Logout}>Logout</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                    </div>
                </div>
                
                <div className={classes.panel__main__block}>
                        <Routes>
                            <Route path={`${generalLink}`} element={<General />} />

                            <Route path={`${homeLink}`} element={<Home />} />
                            <Route path={`${homeLink}${editLink}/:id`} element={<EditHome />} />

                            <Route path={`${bioLink}`} element={<Bio />} />
                            <Route path={`${bioLink}${editLink}/:id`} element={<EditBio />} />

                            <Route path={`${photographyLink}`} element={<Photography />} />
                            <Route path={`${photographyLink}${editLink}/:id`} element={<UpdatePhotography />} />
                            <Route path={`${adminLink}${createLink}`} element={<CreatePhotography />} />

                            <Route path={`${typesLink}`} element={<TypesOfPhotography />} />
                            <Route path={`${typeLink}${editLink}/:id`} element={<EditTypeOfPhotography />} />
                            <Route path={`${typeLink}${createLink}`} element={<CreateTypeOfPhotography />} />

                            <Route path={`${bookingsLink}`} element={<Bookings />} />
                            <Route path={`${bookingLink}${editLink}/:id`} element={<EditBooking />} />
                            <Route path={`${bookingLink}${createLink}`} element={<CreateBooking />} />

                            <Route path={`${adminsLink}`} element={<Admins />} />
                            <Route path={`${adminLink}${editLink}/:id`} element={<CreateAnAdmin />} />
                            <Route path={`${adminLink}${editLink}/:id`} element={<EditAdmin />} />

                            <Route path={`${questionsLink}`} element={<Questions />} />
                            <Route path={`${questionsLink}${answerLink}/:id`} element={<AnswerQuestion />} />
                        </Routes>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel