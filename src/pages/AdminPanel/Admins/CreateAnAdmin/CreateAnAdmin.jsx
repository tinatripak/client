import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./CreateAnAdmin.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { createAdmin } from '../../../../services/AdminService'
import UploadWidget from "../../../../components/UploadWidget/UploadWidget";
import { adminDashboardLink, adminsLink } from "../../../../constants";

const CreateAnAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, updateError] = useState();

  const addAdmin = () => {
    createAdmin(username, email, password, photo)
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
    setPhoto(result?.info?.url);
  }

  return (
    <div className={classes.createAdmin}>
      <div className={classes.createAdmin__backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${adminsLink}`}>
          {" "}
          <IoChevronBackCircleSharp size={30} />{" "}
        </Link>
        <h3>Create admin</h3>
      </div>
      <form onSubmit={addAdmin}>
        <div className={classes.createAdmin__username}>
          <label htmlFor="title">Full name</label>
          <br />
          <input type="text" name="username" placeholder="Enter your full name" value={username} onChange={e=>setUsername(e.target.value)}/>
        </div>

        <div className={classes.createAdmin__email}>
          <label htmlFor="title">Email</label>
          <br />
          <input type="email" name="email" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>

        <div className={classes.createAdmin__password}>
          <label htmlFor="title">Password</label>
          <br />
          <input type="password" name="password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>

        <div className={classes.createAdmin__photo}>
          <br />
          <h4>The photo of new admin</h4>
          {error && <p>{error}</p>}
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
                    className={classes.createAdmin__photo__upload}
                  >
                    Upload
                  </button>
                );
              }}
            </UploadWidget>
          </div>
        </div>

        <button className={classes.createAdmin__button}>Save</button>
      </form>
    </div>
  );
};

export default CreateAnAdmin;
