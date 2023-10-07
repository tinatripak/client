import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UploadWidget from "../../../../components/UploadWidget/UploadWidget";
import classes from "./EditTypeOfPhotography.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import {
  getTypeOfPhotographyById,
  updateTypeOfPhotography,
} from "../../../../api";

const EditTypeOfPhotography = () => {
  const { id } = useParams();

  const [newPhoto, setNewPhoto] = useState("");
  const [oldPhoto, setOldPhoto] = useState("");

  const [newText, setNewText] = useState("");
  const [oldText, setOldText] = useState("");

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
    console.log(id, updatedText, updatedTypeOfPhotography, updatedPhoto);

    updateTypeOfPhotography(
      id, updatedTypeOfPhotography, updatedPhoto, updatedText
    )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getOldType = () => {
    getTypeOfPhotographyById(id)
      .then((data) => {
        console.log(data)
        setOldText(data?.data?.text);
        setOldPhoto(data?.data?.mainPhoto);
        setOldTypeOfPhotography(data?.data?.typeOfPhotography);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
        <Link to={"/adminDashboard/types"}>
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
            placeholder="Enter your type"
            defaultValue={oldTypeOfPhotography}
            onChange={(e) => setNewTypeOfPhotography(e.target.value)}
          />
        </div>

        <div className={classes.editType__text}>
          <label htmlFor="title">Text</label>
          <br />
          <textarea
            type="text"
            name="text"
            placeholder="Enter your text"
            defaultValue={oldText}
            onChange={(e) => setNewText(e.target.value)}
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
