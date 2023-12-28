import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./CreateAnAdmin.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { createAdmin } from "../../../../services/AdminService";
import { UploadWidget } from "../../../../components";
import { adminDashboardLink, adminsLink } from "../../../../constants";

const CreateAnAdmin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
  });
  const [error, updateError] = useState();

  const addAdmin = () => {
    createAdmin(
      formData.username,
      formData.email,
      formData.password,
      formData.photo,
    );
    navigate(`${adminDashboardLink}${adminsLink}`);
  };

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    setFormData({ ...formData, photo: result?.info?.url });
  }

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData],
  );

  return (
    <div className={classes.createAdmin}>
      <div className={classes.backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${adminsLink}`}>
          {" "}
          <IoChevronBackCircleSharp size={30} />{" "}
        </Link>
        <h3>Create admin</h3>
      </div>
      <form onSubmit={addAdmin}>
        <div className={classes.username}>
          <label htmlFor="title">Full name</label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="Enter your full name"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.email}>
          <label htmlFor="title">Email</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.password}>
          <label htmlFor="title">Password</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.photo}>
          <br />
          <h4>The photo of the new admin</h4>
          {error && <p>{error}</p>}
          {formData.photo && (
            <>
              <img src={formData.photo} alt="Admin" />
            </>
          )}
          <div className={classes.photo}>
            <UploadWidget onUpload={handleOnUpload}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <button onClick={handleOnClick} className={classes.upload}>
                    Upload
                  </button>
                );
              }}
            </UploadWidget>
          </div>
        </div>

        <button className={classes.button}>Save</button>
      </form>
    </div>
  );
};

export default CreateAnAdmin;
