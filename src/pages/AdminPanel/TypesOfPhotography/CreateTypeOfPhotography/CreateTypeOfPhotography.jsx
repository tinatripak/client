import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./CreateTypeOfPhotography.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { UploadWidget } from "../../../../components";
import { createTypeOfPhotography } from "../../../../services/PhototypeService";
import { adminDashboardLink, typesLink } from "../../../../constants";

const CreateTypeOfPhotography = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    typeOfPhotography: "",
    mainPhoto: "",
    shootingDuration: "",
    text: "",
  });

  const [error, updateError] = useState();

  const createType = () => {
    createTypeOfPhotography(
      formData.typeOfPhotography,
      formData.shootingDuration,
      formData.mainPhoto,
      formData.text,
    );
    navigate(`${adminDashboardLink}${typesLink}`);
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
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
    setFormData((prevData) => ({
      ...prevData,
      mainPhoto: result?.info?.url,
    }));
  }

  return (
    <div className={classes.createType}>
      <div className={classes.backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${typesLink}`}>
          {" "}
          <IoChevronBackCircleSharp size={30} />{" "}
        </Link>
        <h3>Create type of photography</h3>
      </div>
      <form onSubmit={createType}>
        <div className={classes.typeOfPhotography}>
          <label htmlFor="type">Type of photography</label>
          <br />
          <input
            type="text"
            name="typeOfPhotography"
            placeholder="Enter the type"
            value={formData.typeOfPhotography}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.shootingDuration}>
          <label htmlFor="duration">Duration of shooting</label>
          <br />
          <input
            type="text"
            name="shootingDuration"
            placeholder="Enter the duration"
            value={formData.shootingDuration}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.text}>
          <label htmlFor="text">Text</label>
          <br />
          <textarea
            name="text"
            placeholder="Enter the text"
            value={formData.text}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.mainPhoto}>
          <br />
          <h4>The photo of new type of photography</h4>
          {error && <p>{error}</p>}
          {formData.mainPhoto && (
            <>
              <img src={formData.mainPhoto} alt="Main" />
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

export default CreateTypeOfPhotography;
