import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./EditAdmin.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import {
  getAdminById,
  updateAdminById,
} from "../../../../services/AdminService";
import { ConditionalRender, UploadWidget } from "../../../../components";
import { adminDashboardLink, adminsLink } from "../../../../constants";

const EditAdmin = () => {
  const { id } = useParams();

  const [oldValues, setOldValues] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
  });

  const [newValues, setNewValues] = useState({
    username: "",
    email: "",
    password: "",
    photo: "",
  });
  const [isLoadedAdmin, setIsLoadedAdmin] = useState(false);

  const [error, updateError] = useState();

  const updateAdmin = () => {
    const updatedValues = {
      username: newValues.username || oldValues.username,
      email: newValues.email || oldValues.email,
      password: newValues.password || oldValues.password,
      photo: newValues.photo || oldValues.photo,
    };

    updateAdminById(
      id,
      updatedValues.username,
      updatedValues.email,
      updatedValues.password,
      updatedValues.photo
    );
  };

  const getOldAdmin = useCallback(() => {
    getAdminById(id).then((data) => {
      setOldValues({
        username: data?.data?.username || "",
        email: data?.data?.email || "",
        password: data?.data?.password || "",
        photo: data?.data?.photo || "",
      });
      setIsLoadedAdmin(true);
    });
  }, [id]);

  useEffect(() => {
    getOldAdmin();
  }, [getOldAdmin]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    setNewValues((prevValues) => ({
      ...prevValues,
      photo: result?.info?.url || result,
    }));
  }

  const { username, email, password, photo } = newValues;
  const {
    username: oldUsername,
    email: oldEmail,
    password: oldPassword,
    photo: oldPhoto,
  } = oldValues;

  return (
    <ConditionalRender
      conditions={[isLoadedAdmin]}
      content={
        <div className={classes.editAdmin}>
          <div className={classes.backButtonWithTitle}>
            <Link to={`${adminDashboardLink}${adminsLink}`}>
              {" "}
              <IoChevronBackCircleSharp size={30} />{" "}
            </Link>
            <h3>Updating the admin {oldUsername}</h3>
          </div>
          <form onSubmit={updateAdmin}>
            <div className={classes.username}>
              <label htmlFor="title">Full name</label>
              <br />
              <input
                type="text"
                name="username"
                placeholder="Enter your full name"
                defaultValue={oldUsername}
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
                defaultValue={oldEmail}
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
                defaultValue={oldPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.photo}>
              <br />
              <h4>The photo of the admin</h4>
              {error && <p>{error}</p>}
              {oldPhoto !== "" && !photo && (
                <>
                  <img src={oldPhoto} alt="Old Admin" />
                </>
              )}
              {photo && (
                <>
                  <img src={photo} alt="New Admin" />
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
                      <button
                        onClick={handleOnClick}
                        className={classes.upload}
                      >
                        Upload
                      </button>
                    );
                  }}
                </UploadWidget>
              </div>
            </div>

            <button type="submit" className={classes.button}>
              Save
            </button>
          </form>
        </div>
      }
    />
  );
};

export default EditAdmin;
