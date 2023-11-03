import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHomePhotoById, updateHomePhotoById } from "../../../../services/HomeService";
import { UploadWidget } from "../../../../components";
import classes from "./EditHome.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { adminDashboardLink, homeLink } from "../../../../constants";

const EditHome = () => {
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    photo: "",
    titleOfPhoto: "",
  });

  const [error, updateError] = useState();

  const updatePhotoAndText = () => {
    updateHomePhotoById(id, formValues.photo);
  };

  const getOldPhotoAndText = useCallback(() => {
    getHomePhotoById(id).then((data) => {
      setFormValues({
        photo: data?.data?.photo,
        titleOfPhoto: data?.data?.titleOfPhoto,
      });
    });
  }, [id]);

  useEffect(() => {
    getOldPhotoAndText();
  }, [getOldPhotoAndText]);

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      photo: result?.info?.secure_url || prevValues.photo,
    }));
  }

  return (
    <div className={classes.edit_home}>
      <div className={classes.edit_home__backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${homeLink}`}>
          {" "}
          <IoChevronBackCircleSharp size={30} />{" "}
        </Link>
        <h3>Updating the photo</h3>
      </div>
      <form onSubmit={updatePhotoAndText}>
        <div className={classes.edit_home__title}>
          <label htmlFor="title">Title of the photo</label>
          <br />
          <p>{formValues.titleOfPhoto}</p>
        </div>
        <div className={classes.edit_home__photo}>
          <br />
          <h4>The photo</h4>
          {error && <p>{error}</p>}
          {formValues.photo && (
            <>
              <img src={formValues.photo} alt="New" />
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
