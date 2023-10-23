import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHomePhotoById, updateHomePhotoById } from '../../../../services/HomeService'

import UploadWidget from "../../../../components/UploadWidget/UploadWidget";
import classes from "./EditHome.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { adminDashboardLink, emptyLink } from "../../../../constants";

const EditHome = () => {
  const { id } = useParams();

  const [newPhoto, setNewPhoto] = useState("");

  const [oldPhoto, setOldPhoto] = useState("");
  const [titleOfPhoto, setTitleOfPhoto] = useState("");

  const [error, updateError] = useState();

  useEffect(() => {
    getOldPhotoAndText();
  }, []);

  const updatePhotoAndText = () => {
    const updatedPhoto = newPhoto !== "" ? newPhoto : oldPhoto;

    updateHomePhotoById(id, updatedPhoto)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getOldPhotoAndText = () => {
    getHomePhotoById(id)
      .then((data) => {
        setOldPhoto(data?.data?.photo);
        setTitleOfPhoto(data?.data?.titleOfPhoto);
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
    setNewPhoto(result?.info?.secure_url);
  }

  return (
    <div className={classes.edit_home}>
      <div className={classes.edit_home__backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${emptyLink}`}>
          {" "}
          <IoChevronBackCircleSharp size={30} />{" "}
        </Link>
        <h3>Updating the photo</h3>
      </div>
      <form onSubmit={updatePhotoAndText}>
        <div className={classes.edit_home__title}>
          <label htmlFor="title">Title of the photo</label>
          <br />
          <p>{titleOfPhoto}</p>
        </div>
        <div className={classes.edit_home__photo}>
          <br />
          <h4>The photo</h4>
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
                    className={classes.edit_home__photo__upload}
                  >
                    Upload
                  </button>
                );
              }}
            </UploadWidget>
          </div>
        </div>
        <button className={classes.edit_home__button}>Save</button>
      </form>
    </div>
  );
};

export default EditHome;
