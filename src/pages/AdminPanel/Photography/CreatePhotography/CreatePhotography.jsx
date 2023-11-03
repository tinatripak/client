import React, { useEffect, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./CreatePhotography.module.scss";
import { IoAddCircle, IoChevronBackCircleSharp } from "react-icons/io5";
import { UploadWidget } from "../../../../components";
import { createPhotoshoot } from "../../../../services/PhotoshootService";
import { getAllTypesOfPhotography } from "../../../../services/PhototypeService";
import { RxCross2 } from "react-icons/rx";
import {
  adminDashboardLink,
  darkColor,
  photographyLink,
} from "../../../../constants";

const CreatePhotography = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    photoTypeId: "",
    mainPhoto: "",
    arrayOfPhotos: [],
  });
  const [allPhotoTypesName, setAllPhotoTypesName] = useState([]);
  const [errors, setErrors] = useState({ mainPhoto: "", arrayOfPhotos: "" });

  useEffect(() => {
    getAllPhotoTypesName();
  }, []);

  const getAllPhotoTypesName = () => {
    getAllTypesOfPhotography().then((data) => {
      setAllPhotoTypesName(() =>
        data?.data?.map((item) => ({
          id: item._id,
          name: item.typeOfPhotography,
        }))
      );
    });
  };

  const createOnePhotoshoot = () => {
    createPhotoshoot(formData);
    navigate(`${adminDashboardLink}${photographyLink}`);
  };

  const handleMainPhotoUpload = useCallback((error, result, widget) => {
    if (error) {
      setErrors({ ...errors, mainPhoto: error });
      widget.close({ quiet: true });
    } else {
      setErrors({ ...errors, mainPhoto: "" });
      setFormData({ ...formData, mainPhoto: result?.info?.url });
    }
  }, [formData, errors]);

  // const handleAllPhotosUpload = useCallback((error, result, widget) => {
  //   if (error) {
  //     setErrors({ ...errors, arrayOfPhotos: error });
  //     widget.close({ quiet: true });
  //   } else {
  //     setErrors({ ...errors, arrayOfPhotos: "" });
  //     addPhoto(result?.info?.url);
  //   }
  // }, [formData, errors]);

  const handleAllPhotosUpload = useCallback((error, result, widget) => {
    if (error) {
      setErrors({ ...errors, arrayOfPhotos: error });
      widget.close({ quiet: true });
    } else {
      setErrors({ ...errors, arrayOfPhotos: "" });
  
      result?.info?.files.forEach((file) => {
        addPhoto(file.uploadInfo.url);
      });
    }
  }, [formData, errors]);

  const addPhoto = (newPhoto) => {
    setFormData({
      ...formData,
      arrayOfPhotos: [...formData.arrayOfPhotos, newPhoto],
    });
  };

  const deletePhoto = (photoToDelete) => {
    setFormData({
      ...formData,
      arrayOfPhotos: formData.arrayOfPhotos.filter(
        (photo) => photo !== photoToDelete
      ),
    });
  };

  return (
    <div className={classes.createPhotography}>
      <div className={classes.backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${photographyLink}`}>
          <IoChevronBackCircleSharp size={30} />
        </Link>
        <h3>Create a photography</h3>
      </div>
      <form onSubmit={createOnePhotoshoot}>
        <div className={classes.name}>
          <label htmlFor="type">Name</label>
          <br />
          <input
            type="text"
            name="name"
            placeholder="Enter the name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>

        <div className={classes.photoType}>
          <label htmlFor="title">Type of photoshoot</label>
          <br />
          <select
            value={formData.photoTypeId}
            onChange={(e) =>
              setFormData({ ...formData, photoTypeId: e.target.value })
            }
          >
            <option
              value=""
              disabled
              className={classes.defaultOption}
            >
              Choose a name
            </option>
            {allPhotoTypesName.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.mainPhoto}>
          <br />
          <h4>The main photo of photography</h4>
          {errors.mainPhoto && <p>{errors.mainPhoto}</p>}
          {formData.mainPhoto && (
            <>
              <img src={formData.mainPhoto} alt="Main" />
            </>
          )}
          <div className={classes.photo}>
            {
              <UploadWidget onUpload={handleMainPhotoUpload}>
                {({ open }) => {
                  function handleOnClickMain(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button
                      onClick={handleOnClickMain}
                      className={classes.uploadmain}
                    >
                      Upload
                    </button>
                  );
                }}
              </UploadWidget>
            }
          </div>
        </div>

        <div className={classes.allPhotos}>
          <br />
          <h4>All photos from the photo shoot</h4>
          {errors.arrayOfPhotos && <p>{errors.arrayOfPhotos}</p>}
          {formData.arrayOfPhotos.length > 0 && (
            <div className={classes.show}>
              {formData.arrayOfPhotos.map((photo, index) => (
                <div
                  key={index}
                  className={classes.block}
                >
                  <div
                    className={
                      classes.delete
                    }
                  >
                    <RxCross2
                      color="white"
                      size={30}
                      onClick={() => deletePhoto(photo)}
                    />{" "}
                    <br />
                  </div>
                  <div>
                    <img src={photo} alt={`gallery item-${index}`} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={classes.photo}>
            <UploadWidget onUpload={handleAllPhotosUpload}>
              {({ open }) => {
                function handleOnClickArray(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <IoAddCircle
                    onClick={handleOnClickArray}
                    className={classes.uploadall}
                    color={darkColor}
                    size={45}
                  />
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

export default CreatePhotography;
