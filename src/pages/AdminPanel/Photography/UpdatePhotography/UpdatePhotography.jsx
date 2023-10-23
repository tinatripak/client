import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UploadWidget from "../../../../components/UploadWidget/UploadWidget";
import classes from "./UpdatePhotography.module.scss";
import { IoAddCircle, IoChevronBackCircleSharp } from "react-icons/io5";
import { getPhotoshootById, updatePhotoshootById } from '../../../../services/PhotoshootService'
import { getAllTypesOfPhotography } from '../../../../services/PhototypeService'


import { RxCross2 } from "react-icons/rx";
import { adminDashboardLink, darkColor, photographyLink } from "../../../../constants";

const UpdatePhotography = () => {
  const { id } = useParams();

  const [newMainPhoto, setNewMainPhoto] = useState("");
  const [oldMainPhoto, setOldMainPhoto] = useState("");

  const [newName, setNewName] = useState("");
  const [oldName, setOldName] = useState("");

  const [allPhotoTypesName, setAllPhotoTypesName] = useState([]);

  const [newPhotoTypeId, setNewPhotoTypeId] = useState("");
  const [oldPhotoTypeId, setOldPhotoTypeId] = useState("");

  const [newArrayOfPhotos, setNewArrayOfPhotos] = useState([]);

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
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getOldPhotoshoot();
  }, []);

  const updateType = () => {
    const updatedMainPhoto = newMainPhoto !== "" ? newMainPhoto : oldMainPhoto;
    const updatedName = newName !== "" ? newName : oldName;
    const updatedPhotoTypeId =
      newPhotoTypeId !== "" ? newPhotoTypeId : oldPhotoTypeId;
    const updatedArrayOfPhotos = newArrayOfPhotos;

    updatePhotoshootById(
      id,
      updatedName,
      updatedPhotoTypeId,
      updatedMainPhoto,
      updatedArrayOfPhotos
    )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getOldPhotoshoot = () => {
    getPhotoshootById(id)
      .then((data) => {
        setOldName(data?.data?.name);
        setOldPhotoTypeId(data?.data?.photoTypeId);
        setOldMainPhoto(data?.data?.mainPhoto);
        setNewArrayOfPhotos(data?.data?.arrayOfPhotos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError1(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    setNewMainPhoto(result?.info?.url);
  }

  function handleOnUploadArrayOfPhoto(error, result, widget) {
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
    const updatedArray = [...newArrayOfPhotos];
    updatedArray.push(newPhoto);

    setNewArrayOfPhotos(updatedArray);
  };

  const deletePhoto = (photoToDelete) => {
    const updatedArray = newArrayOfPhotos.filter(
      (photo) => photo !== photoToDelete
    );
    setNewArrayOfPhotos(updatedArray);
  };

  return (
    <div className={classes.updatePhotography}>
      <div className={classes.updatePhotography__backButtonWithTitle}>
        <Link to={`${adminDashboardLink}${photographyLink}`}>
          {" "}
          <IoChevronBackCircleSharp size={30} />{" "}
        </Link>
        <h3>Update a photography '{oldName}'</h3>
      </div>
      <form onSubmit={updateType}>
        <div className={classes.updatePhotography__name}>
          <label htmlFor="type">Name</label>
          <br />
          <input
            type="text"
            name="name"
            placeholder="Enter the name"
            defaultValue={oldName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div className={classes.updatePhotography__photoType}>
          <label htmlFor="title">Type of photoshoot</label>
          <br />

          <select
            value={newPhotoTypeId}
            onChange={(e) => setNewPhotoTypeId(e.target.value)}
          >
            <option value={oldPhotoTypeId}>
              {
                allPhotoTypesName.find((type) => type.id === oldPhotoTypeId)
                  ?.name
              }
            </option>

            {allPhotoTypesName.map(
              (type) =>
                type.id !== oldPhotoTypeId && (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                )
            )}
          </select>
        </div>

        <div className={classes.updatePhotography__mainPhoto}>
          <br />
          <h4>The main photo of photography</h4>
          {error1 && <p>{error1}</p>}
          {oldMainPhoto !== "" && !newMainPhoto && (
            <>
              <img src={oldMainPhoto} />
            </>
          )}
          {newMainPhoto && (
            <>
              <img src={newMainPhoto} />
            </>
          )}
          <div>
            {
              <UploadWidget onUpload={handleOnUpload}>
                {({ open }) => {
                  function handleOnClickMain(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button
                      onClick={handleOnClickMain}
                      className={classes.updatePhotography__photo__uploadmain}
                    >
                      Upload
                    </button>
                  );
                }}
              </UploadWidget>
            }
          </div>
        </div>

        <div className={classes.updatePhotography__allPhotos}>
          <br />
          <h4>All photos from the photo shoot</h4>
          {error2 && <p>{error2}</p>}
          {newArrayOfPhotos.length > 0 && (
            <div className={classes.updatePhotography__allPhotos__show}>
              {newArrayOfPhotos.map((photo, index) => (
                <div
                  key={index}
                  className={classes.updatePhotography__allPhotos__show__block}
                >
                  <div
                    className={
                      classes.updatePhotography__allPhotos__show__block__delete
                    }
                  >
                    <RxCross2
                      color="gray"
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
            <UploadWidget onUpload={handleOnUploadArrayOfPhoto}>
              {({ open }) => {
                function handleOnClickArray(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <IoAddCircle
                    onClick={handleOnClickArray}
                    className={classes.updatePhotography__photo__uploadall}
                    color={darkColor}
                    size={45}
                  />
                );
              }}
            </UploadWidget>
          </div>
        </div>

        <button className={classes.updatePhotography__button}>Save</button>
      </form>
    </div>
  );
};

export default UpdatePhotography;
