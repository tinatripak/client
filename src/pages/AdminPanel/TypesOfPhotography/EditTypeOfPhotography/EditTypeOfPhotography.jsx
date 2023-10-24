import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import UploadWidget from "../../../../components/UploadWidget/UploadWidget";
import classes from "./EditTypeOfPhotography.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import {
  getTypeOfPhotographyById,
  updateTypeOfPhotographyById,
} from '../../../../services/PhototypeService';
import { adminDashboardLink, typesLink } from "../../../../constants";

const EditTypeOfPhotography = () => {
  const { id } = useParams();

  const [newPhoto, setNewPhoto] = useState("");
  const [oldPhoto, setOldPhoto] = useState("");

  const [newText, setNewText] = useState("");
  const [oldText, setOldText] = useState("");

  const [newShootingDuration, setNewShootingDuration] = useState("");
  const [oldShootingDuration, setOldShootingDuration] = useState("");

  const [newTypeOfPhotography, setNewTypeOfPhotography] = useState("");
  const [oldTypeOfPhotography, setOldTypeOfPhotography] = useState("");

  const [error, updateError] = useState();

  useEffect(() => {
    getOldType();
  }, []);

  const updateType = () => {
    const updatedPhoto = newPhoto !== "" ? newPhoto : oldPhoto;
    const updatedText = newText !== "" ? newText : oldText;
    const updatedTypeOfPhotography =
      newTypeOfPhotography !== "" ? newTypeOfPhotography : oldTypeOfPhotography;
    const updatedShootingDuration =
      newShootingDuration !== "" ? newShootingDuration : oldShootingDuration;

    updateTypeOfPhotographyById(
      id,
      updatedTypeOfPhotography,
      updatedShootingDuration,
      updatedPhoto,
      updatedText
    );
  };

  const getOldType = () => {
    getTypeOfPhotographyById(id).then((data) => {
      setOldText(data?.data?.text);
      setOldShootingDuration(data?.data?.shootingDuration);
      setOldPhoto(data?.data?.mainPhoto);
      setOldTypeOfPhotography(data?.data?.typeOfPhotography);
    });
  };

  const handleTypeOfPhotographyChange = useCallback((e) => {
    setNewTypeOfPhotography(e.target.value);
  }, []);

  const handleShootingDurationChange = useCallback((e) => {
    setNewShootingDuration(e.target.value);
  }, []);

  const handleTextChange = useCallback((e) => {
    setNewText(e.target.value);
  }, []);

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    setNewPhoto(result?.info?.url);
  }

  return (
    <div className={classes.editType}>
      <div className={classes.editType__backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${typesLink}`}>
          {" "}
          <IoChevronBackCircleSharp size={30} />{" "}
        </Link>
        <h3>Updating the type of photography</h3>
      </div>
      <form onSubmit={updateType}>
        <div className={classes.editType__typeOfPhotography}>
          <label htmlFor="type">Type of photography</label>
          <br />
          <input
            type="text"
            name="type"
            placeholder="Enter the type"
            defaultValue={oldTypeOfPhotography}
            onChange={handleTypeOfPhotographyChange} 
          />
        </div>

        <div className={classes.editType__typeOfPhotography}>
          <label htmlFor="type">Duration of shooting</label>
          <br />
          <input
            type="text"
            name="duration"
            placeholder="Enter the duration"
            defaultValue={oldShootingDuration}
            onChange={handleShootingDurationChange} 
          />
        </div>

        <div className={classes.editType__text}>
          <label htmlFor="title">Text</label>
          <br />
          <textarea
            type="text"
            name="text"
            placeholder="Enter the text"
            defaultValue={oldText}
            onChange={handleTextChange} 
          />
        </div>
        <div className={classes.editType__photo}>
          <br />
          <h4>The photo of updated type of photography</h4>
          {error && <p>{error}</p>}
          {oldPhoto && !newPhoto && (
            <>
              <img src={oldPhoto} />
            </>
          )}
          {newPhoto && (
            <>
              <img src={newPhoto} />
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
                    className={classes.editType__photo__upload}
                  >
                    Upload
                  </button>
                );
              }}
            </UploadWidget>
          </div>
        </div>
        <button className={classes.editType__button}>Save</button>
      </form>
    </div>
  );
};

export default EditTypeOfPhotography;
