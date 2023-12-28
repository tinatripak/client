import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ConditionalRender, UploadWidget } from "../../../../components";
import classes from "./EditTypeOfPhotography.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import {
  getTypeOfPhotographyById,
  updateTypeOfPhotographyById,
} from "../../../../services/PhototypeService";
import { adminDashboardLink, typesLink } from "../../../../constants";

const EditTypeOfPhotography = () => {
  const { id } = useParams();

  const [oldValues, setOldValues] = useState({
    typeOfPhotography: "",
    shootingDuration: "",
    text: "",
    photo: "",
  });

  const [newValues, setNewValues] = useState({
    typeOfPhotography: "",
    shootingDuration: "",
    text: "",
    photo: "",
  });

  const [error, updateError] = useState();
  const [isLoadedPhotography, setIsLoadedPhotography] = useState(false);

  useEffect(() => {
    getOldType();
  }, []);

  const updateType = () => {
    const updatedType = { ...newValues };
    for (const key in updatedType) {
      if (updatedType[key] === "") {
        updatedType[key] = oldValues[key];
      }
    }

    updateTypeOfPhotographyById(
      id,
      updatedType.typeOfPhotography,
      updatedType.shootingDuration,
      updatedType.photo,
      updatedType.text,
    );
  };

  const getOldType = () => {
    getTypeOfPhotographyById(id).then((data) => {
      const oldData = data?.data || {};
      setOldValues({
        typeOfPhotography: oldData.typeOfPhotography,
        shootingDuration: oldData.shootingDuration,
        text: oldData.text,
        photo: oldData.mainPhoto,
      });
      setIsLoadedPhotography(true);
    });
  };

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

  return (
    <ConditionalRender
      conditions={[isLoadedPhotography]}
      content={
        <div className={classes.editType}>
          <div className={classes.backButtonWithTitle}>
            <Link to={`${adminDashboardLink}${typesLink}`}>
              {" "}
              <IoChevronBackCircleSharp size={30} />{" "}
            </Link>
            <h3>Updating the type of photography</h3>
          </div>
          <form onSubmit={updateType}>
            <div className={classes.typeOfPhotography}>
              <label htmlFor="typeOfPhotography">Type of photography</label>
              <br />
              <input
                type="text"
                name="typeOfPhotography"
                placeholder="Enter the type"
                defaultValue={oldValues.typeOfPhotography}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.typeOfPhotography}>
              <label htmlFor="shootingDuration">Duration of shooting</label>
              <br />
              <input
                type="text"
                name="shootingDuration"
                placeholder="Enter the duration"
                defaultValue={oldValues.shootingDuration}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.text}>
              <label htmlFor="text">Text</label>
              <br />
              <textarea
                name="text"
                placeholder="Enter the text"
                defaultValue={oldValues.text}
                onChange={handleInputChange}
              />
            </div>
            <div className={classes.photo}>
              <br />
              <h4>The photo of updated type of photography</h4>
              {error && <p>{error}</p>}
              {oldValues.photo && !newValues.photo && (
                <>
                  <img src={oldValues.photo} alt="Old" />
                </>
              )}
              {newValues.photo && (
                <>
                  <img src={newValues.photo} alt="New" />
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
            <button className={classes.button}>Save</button>
          </form>
        </div>
      }
    />
  );
};

export default EditTypeOfPhotography;
