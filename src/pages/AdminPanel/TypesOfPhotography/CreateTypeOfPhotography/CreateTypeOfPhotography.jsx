import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./CreateTypeOfPhotography.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import UploadWidget from "../../../../components/UploadWidget/UploadWidget";
import { createTypeOfPhotography } from '../../../../services/PhototypeService'
import { adminDashboardLink, typesLink } from "../../../../constants";

const CreateTypeOfPhotography = () => {
  const navigate = useNavigate();
  const [typeOfPhotography, setTypeOfPhotography] = useState("");
  const [mainPhoto, setMainPhoto] = useState("");

  const [shootingDuration, setShootingDuration] = useState("");

  const [text, setText] = useState("");
  const [error, updateError] = useState();

  const createType = () => {
    console.log(typeOfPhotography, shootingDuration, mainPhoto, text)
    createTypeOfPhotography(typeOfPhotography, shootingDuration, mainPhoto, text)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    
    navigate(`${adminDashboardLink}${typesLink}`);
  };

  function handleOnUpload(error, result, widget) {
    console.log("handleOnUpload function is called");

    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    console.log(result?.info?.url)
    setMainPhoto(result?.info?.url);
  }

  return (
    <div className={classes.createType}>
      <div className={classes.createType__backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${typesLink}`}>
          {" "}
          <IoChevronBackCircleSharp size={30} />{" "}
        </Link>
        <h3>Create type of photography</h3>
      </div>
      <form onSubmit={createType}>
        <div className={classes.createType__typeOfPhotography}>
          <label htmlFor="type">Type of photography</label>
          <br />
          <input type="text" name="type" placeholder="Enter the type" value={typeOfPhotography} onChange={e=>setTypeOfPhotography(e.target.value)}/>
        </div>

        <div className={classes.createType__shootingDuration}>
          <label htmlFor="type">Duration of shooting</label>
          <br />
          <input type="text" name="duration" placeholder="Enter the duration" value={shootingDuration} onChange={e=>setShootingDuration(e.target.value)}/>
        </div>

        <div className={classes.createType__text}>
          <label htmlFor="title">Text</label>
          <br />
          <textarea type="text" name="text" placeholder="Enter the text" value={text} onChange={e=>setText(e.target.value)}/>
        </div>

        <div className={classes.createType__mainPhoto}>
          <br />
          <h4>The photo of new type of photography</h4>
          {error && <p>{error}</p>}
          {mainPhoto && (
            <>
              <img src={mainPhoto} />
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
                    className={classes.createType__photo__upload}
                  >
                    Upload
                  </button>
                );
              }}
            </UploadWidget>
          </div>
        </div>
        <button className={classes.createType__button}>Save</button>
      </form>
    </div>
  );
};

export default CreateTypeOfPhotography;
