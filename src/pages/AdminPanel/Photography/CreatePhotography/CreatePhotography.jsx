import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./CreatePhotography.module.scss";
import { IoAddCircle, IoChevronBackCircleSharp } from "react-icons/io5";
import UploadWidget from "../../../../components/UploadWidget/UploadWidget";
import { createPhotoshoot } from '../../../../services/PhotoshootService'
import { getAllTypesOfPhotography } from '../../../../services/PhototypeService'

import { RxCross2 } from "react-icons/rx";
import { adminDashboardLink, darkColor, photographyLink } from "../../../../constants";


const CreatePhotography = () => {
  const navigate = useNavigate();
  const [allPhotoTypesName, setAllPhotoTypesName] = useState([]);
  const [photoTypeId, setPhotoTypeId] = useState("");

  const [mainPhoto, setMainPhoto] = useState("");
  const [arrayOfPhotos, setArrayOfPhotos] = useState([]);
  const [name, setName] = useState("");
  const [error1, updateError1] = useState();
  const [error2, updateError2] = useState();

  useEffect(() => {
    getAllPhotoTypesName();
  }, [allPhotoTypesName]);

  const getAllPhotoTypesName = () => {
    getAllTypesOfPhotography()
      .then((data) => {
        setAllPhotoTypesName(() =>
          data?.data?.map((item) => ({
            id: item._id,
            name: item.typeOfPhotography,
          }))
        );
      })
  };

  const createOnePhotoshoot = () => {
    console.log(name, photoTypeId, mainPhoto, arrayOfPhotos);
    createPhotoshoot(name, photoTypeId, mainPhoto, arrayOfPhotos)

    navigate(`${adminDashboardLink}${photographyLink}`);
  };

  function handleOnUploadForMainPhoto(error, result, widget) {
    if (error) {
      updateError1(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    setMainPhoto(result?.info?.url);
  }

  function handleOnUploadForAllPhotos(error, result, widget) {
    if (error) {
      updateError2(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    addPhoto(result?.info?.url);
  }

  const addPhoto = (newPhoto) => {
    const updatedArray = [...arrayOfPhotos];
    updatedArray.push(newPhoto);

    setArrayOfPhotos(updatedArray);
  };

  const deletePhoto = (photoToDelete) => {
    const updatedArray = arrayOfPhotos.filter(
      (photo) => photo !== photoToDelete
    );
    setArrayOfPhotos(updatedArray);
  };
  return (
    <div className={classes.createPhotography}>
      <div className={classes.createPhotography__backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${photographyLink}`}>
          {" "}
          <IoChevronBackCircleSharp size={30} />{" "}
        </Link>
        <h3>Create a photography</h3>
      </div>
      <form onSubmit={createOnePhotoshoot}>
        <div className={classes.createPhotography__name}>
          <label htmlFor="type">Name</label>
          <br />
          <input
            type="text"
            name="name"
            placeholder="Enter the name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={classes.createPhotography__photoType}>
          <label htmlFor="title">Type of photoshoot</label>
          <br />

          <select
            value={photoTypeId}
            onChange={(e) => setPhotoTypeId(e.target.value)}
          >
            <option value="" disabled
            className={classes.createPhotography__photoType__defaultOption}>
              Choose a name
            </option>
            {allPhotoTypesName.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.createPhotography__mainPhoto}>
          <br />
          <h4>The main photo of photography</h4>
          {error1 && <p>{error1}</p>}
          {mainPhoto && (
            <>
              <img src={mainPhoto} />
            </>
          )}
          <div>
            {
              <UploadWidget onUpload={handleOnUploadForMainPhoto}>
                {({ open }) => {
                  function handleOnClickMain(e) {
                    console.log("here one");

                    e.preventDefault();
                    open();
                  }
                  return (
                    <button
                      onClick={handleOnClickMain}
                      className={classes.createPhotography__photo__uploadmain}
                    >
                      Upload
                    </button>
                  );
                }}
              </UploadWidget>
            }
          </div>
        </div>

        <div className={classes.createPhotography__allPhotos}>
          <br />
          <h4>All photos from the photo shoot</h4>
          {error2 && <p>{error2}</p>}
          {arrayOfPhotos.length > 0 && (
            <div className={classes.createPhotography__allPhotos__show}>
              {arrayOfPhotos.map((photo, index) => (
                <div
                  key={index}
                  className={classes.createPhotography__allPhotos__show__block}
                >
                  <div
                    className={
                      classes.createPhotography__allPhotos__show__block__delete
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
                    <img src={photo} alt={`Photo ${index}`} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <UploadWidget onUpload={handleOnUploadForAllPhotos}>
              {({ open }) => {
                function handleOnClickArray(e) {
                  console.log("here two");
                  e.preventDefault();
                  open();
                }
                return (
                  <IoAddCircle
                    onClick={handleOnClickArray}
                    className={classes.createPhotography__photo__uploadall}
                    color={darkColor}
                    size={45}
                  />
                );
              }}
            </UploadWidget>
          </div>
        </div>

        <button className={classes.createPhotography__button}>Save</button>
      </form>
    </div>
  );
};

export default CreatePhotography;
