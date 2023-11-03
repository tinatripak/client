import React, { useEffect, useState, useCallback } from "react";
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
  const [cookies] = useCookies([]);
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
    [inputValue]
  );

  const handleError = useCallback(
    (err) =>
      toast.error(err, {
        position: "bottom-left",
      }),
    []
  );

  const handleSuccess = useCallback(
    (msg) =>
      toast.success(msg, {
        position: "bottom-left",
      }),
    []
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { data } = await loginUser(inputValue, cookies);
        if (data) {
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
    [inputValue, navigate, handleSuccess, handleError]
  );

  return (
    <div className={classes.login}>
      <Header />
      <div className={classes.login__block}>
        <div className={classes.login__block__img}>
          <img src={cameraImage} alt="Camera" />
        </div>
        <div className={classes.login__block__text}>
          <p className={classes.login__block__text__welcome}>
            Welcome Back dear admin :&#41;
          </p>
          <p className={classes.login__block__text__problems}>
            This login is for administrators only. If you are an admin and do
            not have access, please email tinatripak2002@gmail.com
          </p>
          <form
            onSubmit={handleSubmit}
            className={classes.login__block__text__form}
          >
            <div className={classes.login__block__text__form__email}>
              <TfiEmail size={35} className={classes.icon} />
              <div>
                <label>
                  Email address
                  <br />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className={classes.login__block__text__form__email_input}
                    onChange={handleOnChange}
                  />
                </label>
              </div>
            </div>
            <div className={classes.login__block__text__form__password}>
              <BiSolidLock size={50} className={classes.icon} />
              <div>
                <label>
                  Password
                  <br />
                  <input
                    type="password"
                    name="password"
                    value={password}
                    className={classes.login__block__text__form__password_input}
                    onChange={handleOnChange}
                  />
                </label>
              </div>
            </div>
            <div className={classes.login__block__text__form__button}>
              <button
                type="submit"
                className={classes.login__block__text__form__button__login}
              >
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
