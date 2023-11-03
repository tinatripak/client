import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { UploadWidget } from "../../../../components";
import classes from "./EditBio.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import {
  getPhotographerById,
  updatePhotographerById,
} from "../../../../services/BioService";
import { adminDashboardLink, bioLink } from "../../../../constants";

const EditBio = () => {
  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    photo: "",
    bio: "",
    phoneNumber: "",
  });

  const [error, updateError] = useState();

  const updateBio = () => {
    updatePhotographerById(id, formValues.bio, formValues.phoneNumber, formValues.photo);
  };

  const getOldBio = useCallback(() => {
    getPhotographerById(id).then((data) => {
      const oldValues = {
        bio: data?.data?.bio,
        photo: data?.data?.photo,
        phoneNumber: data?.data?.phoneNumber,
      };
      setFormValues((prevValues) => ({ ...prevValues, ...oldValues }));
    });
  }, [id]);

  useEffect(() => {
    getOldBio();
  }, [getOldBio]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
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
    setFormValues((prevValues) => ({
      ...prevValues,
      photo: result?.info?.secure_url,
    }));
  }

  return (
    <div className={classes.editInfo}>
      <div className={classes.editInfo__backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${bioLink}`}>
          {" "}
          <IoChevronBackCircleSharp size={30} />{" "}
        </Link>
        <h3>Updating the bio</h3>
      </div>
      <form onSubmit={updateBio}>
        <div className={classes.editInfo__bio}>
          <label htmlFor="bio">Bio</label>
          <br />
          <textarea
            name="bio"
            value={formValues.bio}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.editInfo__phoneNumber}>
          <label htmlFor="phoneNumber">Phone number</label>
          <br />
          <input
            type="tel"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.editInfo__photo}>
          <br />
          <h4>The photo of Ksenia Tripak</h4>
          {error && <p>{error}</p>}
          {formValues.photo && (
            <img src={formValues.photo} alt="Photo" />
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
                    className={classes.editInfo__photo__upload}
                  >
                    Upload
                  </button>
                );
              }}
            </UploadWidget>
          </div>
        </div>
        <button className={classes.editInfo__button}>Save</button>
      </form>
    </div>
  );
};

export default EditBio;
