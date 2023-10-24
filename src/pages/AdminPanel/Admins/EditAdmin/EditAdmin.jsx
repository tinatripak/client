import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./EditAdmin.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { getAdminById, updateAdminById } from '../../../../services/AdminService'

import UploadWidget from "../../../../components/UploadWidget/UploadWidget";
import { adminDashboardLink, adminsLink } from "../../../../constants";

const EditAdmin = () => {
  const { id } = useParams();

  const [newUsername, setNewUsername] = useState("");
  const [oldUsername, setOldUsername] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [oldEmail, setOldEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [photo, setPhoto] = useState("");
  const [oldPhoto, setOldPhoto] = useState("");

  const [error, updateError] = useState();


  useEffect(() => {
    getOldAdmin();
  }, []);

  const updateAdmin = () => {
    const updatedUsername = newUsername !== "" ? newUsername : oldUsername;
    const updatedEmail = newEmail !== "" ? newEmail : oldEmail;
    const updatedPassword = newPassword !== "" ? newPassword : oldPassword;
    const updatedPhoto = photo !== "" ? photo : oldPhoto;


    updateAdminById(id, updatedUsername, updatedEmail, updatedPassword, updatedPhoto)
  };

  const getOldAdmin = () => {
    getAdminById(id)
      .then((data) => {
        setOldEmail(data?.data?.email);
        setOldUsername(data?.data?.username);
        setOldPassword(data?.data?.password);
        setOldPhoto(data?.data?.photo);
      })
  };

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    setPhoto(result?.info?.url || result);
  }

  return (
    <div className={classes.editAdmin}>
      <div className={classes.editAdmin__backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${adminsLink}`}>
          {" "}
          <IoChevronBackCircleSharp size={30} />{" "}
        </Link>
        <h3>Updating the admin {oldUsername}</h3>
      </div>
      <form onSubmit={updateAdmin}>
        <div className={classes.editAdmin__username}>
          <label htmlFor="title">Full name</label>
          <br />
          <input type="text" name="username" placeholder="Enter your full name" defaultValue={oldUsername} onChange={e=>setNewUsername(e.target.value)}/>
        </div>

        <div className={classes.editAdmin__email}>
          <label htmlFor="title">Email</label>
          <br />
          <input type="email" name="email" placeholder="Enter your email" defaultValue={oldEmail} onChange={e=>setNewEmail(e.target.value)}/>
        </div>

        <div className={classes.editAdmin__password}>
          <label htmlFor="title">Password</label>
          <br />
          <input type="password" name="password" placeholder="Enter your password" defaultValue={oldPassword} onChange={e=>setNewPassword(e.target.value)}/>
        </div>

        <div className={classes.editAdmin__photo}>
          <br />
          <h4>The photo of the admin</h4>
          {error && <p>{error}</p>}
          {oldPhoto !=='' && !photo && (
            <>
              <img src={oldPhoto} />
            </>
          )}
          {photo && (
            <>
              <img src={photo} />
            </>
          )}
          <div>
            <UploadWidget onUpload={handleOnUpload}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <button
                    onClick={handleOnClick}
                    className={classes.editAdmin__photo__upload}
                  >
                    Upload
                  </button>
                );
              }}
            </UploadWidget>
          </div>
        </div>

        <button className={classes.editAdmin__button}>Save</button>
      </form>
    </div>
  );
};

export default EditAdmin;
