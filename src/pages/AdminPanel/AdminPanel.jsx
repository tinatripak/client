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
import Calendar from './Calendar/Calendar';
import Bio from './Bio/Bio';
import Photography from './Photography/Photography';
import TypesOfPhotography from './TypesOfPhotography/TypesOfPhotography';
import General from './General/General';
import EditHome from './Home/EditHome/EditHome';
import EditBio from './Bio/EditBio/EditBio';
import { CreateAnAdmin, EditAdmin } from './Admins';

import jwtDecode from 'jwt-decode';
import { getAdminById } from '../../api';
import { useUserContext } from '../../components/UserContext';
import CreateTypeOfPhotography from './TypesOfPhotography/CreateTypeOfPhotography/CreateTypeOfPhotography';
import EditTypeOfPhotography from './TypesOfPhotography/EditTypeOfPhotography/EditTypeOfPhotography';
import CreateCalendar from './Calendar/CreateCalendar/CreateCalendar';
import EditCalendar from './Calendar/EditCalendar/EditCalendar';
import UpdatePhotography from './Photography/UpdatePhotography/UpdatePhotography';
import CreatePhotography from './Photography/CreatePhotography/CreatePhotography';


const AdminPanel = () => {
    const navigate = useNavigate();
    const {userData} = useUserContext();
    const [cookies, removeCookie] = useCookies([]);
    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };
    const [admin, setAdmin] = useState([])

    const decoded = jwtDecode(cookies.token);

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
    
    const removeUndefinedCookies = () => {
        for (const cookieName in cookies) {
            if (cookies.hasOwnProperty(cookieName) && cookies[cookieName] === undefined) {
                removeCookie(cookieName);
            }
        }
    };

    useEffect(() => {
        removeUndefinedCookies();
        getAdmin();
    }, []);

    const getAdmin = () =>{
        getAdminById(decoded.id)
        .then((data) => {
            setAdmin(data?.data)
        })
        .catch((error) => {
            console.error(error);
        });
    }


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
                        <img src={admin?.photo || userData?.photo} alt="User photo" />
                            <p>{admin?.username || userData?.username}</p>
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
                            <Route path="/general" element={<General />} />

                            <Route path="/home" element={<Home />} />
                            <Route path="/home/edit/:id" element={<EditHome />} />

                            <Route path="/bio" element={<Bio />} />
                            <Route path="/bio/edit/:id" element={<EditBio />} />

                            <Route path="/photography" element={<Photography />} />
                            <Route path="/photography/edit/:id" element={<UpdatePhotography />} />
                            <Route path="/photography/create" element={<CreatePhotography />} />

                            <Route path="/types" element={<TypesOfPhotography />} />
                            <Route path="/types/edit/:id" element={<EditTypeOfPhotography />} />
                            <Route path="/types/create" element={<CreateTypeOfPhotography />} />

                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/calendar/edit/:id" element={<EditCalendar />} />
                            <Route path="/calendar/create" element={<CreateCalendar />} />

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