import React, { useState, useCallback, useEffect } from "react";
import { Header, Footer } from "../../components";
import classes from "./Login.module.scss";
import { BiSolidLock } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { loginUser } from "../../services/LoginService";
import { adminDashboardLink, cameraImage, generalLink } from "../../constants";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleOnChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputValue({
        ...inputValue,
        [name]: value,
      });
    },
    [inputValue],
  );

  useEffect(() => {
    if (cookies.token === 'undefined' || cookies.token === undefined) {
      removeCookie("token");
    }
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { data, token } = await loginUser(inputValue);

        if (data) {
          setCookie("token", token, {
            maxAge: 7200000,
            sameSite: "None",
            secure: true,
            path: "/",
          });
          await new Promise(resolve => setTimeout(resolve, 1000));
      
          setTimeout(() => {
            navigate(`${adminDashboardLink}${generalLink}`);
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
      });
    },
    [inputValue],
  );

  return (
    <div className={classes.login}>
      <Header />
      <div className={classes.block}>
        <div className={classes.img}>
          <img src={cameraImage} alt="Camera" />
        </div>
        <div className={classes.text}>
          <p className={classes.welcome}>Welcome Back dear admin :&#41;</p>
          <p className={classes.problems}>
            This login is for administrators only. If you are an admin and do
            not have access, please email tinatripak2002@gmail.com
          </p>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.email}>
              <TfiEmail size={35} className={classes.icon} />
              <div>
                <label>
                  Email address
                  <br />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    className={classes.email_input}
                    onChange={handleOnChange}
                  />
                </label>
              </div>
            </div>
            <div className={classes.password}>
              <BiSolidLock size={50} className={classes.icon} />
              <div>
                <label>
                  Password
                  <br />
                  <input
                    type="password"
                    autoComplete="current-password"
                    name="password"
                    value={password}
                    className={classes.password_input}
                    onChange={handleOnChange}
                  />
                </label>
              </div>
            </div>
            <div className={classes.button}>
              <button type="submit" className={classes.login}>
                Login
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
