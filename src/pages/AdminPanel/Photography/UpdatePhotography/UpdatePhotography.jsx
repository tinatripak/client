import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ConditionalRender, UploadWidget } from "../../../../components";
import classes from "./UpdatePhotography.module.scss";
import { IoAddCircle, IoChevronBackCircleSharp } from "react-icons/io5";
import {
  getPhotoshootById,
  updatePhotoshootById,
} from "../../../../services/PhotoshootService";
import { getAllTypesOfPhotography } from "../../../../services/PhototypeService";
import { RxCross2 } from "react-icons/rx";
import {
  adminDashboardLink,
  darkColor,
  photographyLink,
} from "../../../../constants";

const UpdatePhotography = () => {
  const { id } = useParams();

  const [newValues, setNewValues] = useState({
    mainPhoto: "",
    name: "",
    photoTypeId: "",
    arrayOfPhotos: [],
  });

  const [oldValues, setOldValues] = useState({
    mainPhoto: "",
    name: "",
    photoTypeId: "",
    arrayOfPhotos: [],
  });

  const [error1, updateError1] = useState();
  const [error2, updateError2] = useState();
  const [allPhotoTypesName, setAllPhotoTypesName] = useState([]);
  const [isLoadedPhotography, setIsLoadedPhotography] = useState(false);

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

  useEffect(() => {
    getOldPhotoshoot();
  }, []);

  useEffect(() => {
    setNewValues({ arrayOfPhotos: oldValues.arrayOfPhotos });
  }, [oldValues]);

  const updateType = () => {
    const { mainPhoto, name, photoTypeId, arrayOfPhotos } = newValues;

    const updatedMainPhoto = mainPhoto || oldValues.mainPhoto;
    const updatedName = name || oldValues.name;
    const updatedPhotoTypeId = photoTypeId || oldValues.photoTypeId;
    const updatedArrayOfPhotos = arrayOfPhotos;

    updatePhotoshootById(
      id,
      updatedName,
      updatedPhotoTypeId,
      updatedMainPhoto,
      updatedArrayOfPhotos
    );
  };

  const getOldPhotoshoot = () => {
    getPhotoshootById(id).then((data) => {
      setOldValues({
        mainPhoto: data?.data?.mainPhoto,
        name: data?.data?.name,
        photoTypeId: data?.data?.photoTypeId,
        arrayOfPhotos: data?.data?.arrayOfPhotos,
      });
      setIsLoadedPhotography(true);
    });
  };

  const handleMainPhotoUpload = useCallback((error, result, widget) => {
    if (error) {
      updateError1(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    setNewValues((prevValues) => ({
      ...prevValues,
      mainPhoto: result?.info?.url,
    }));
  }, []);

  const handleArrayOfPhotosUpload = useCallback((error, result, widget) => {
    if (error) {
      updateError2(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    addPhoto(result?.info?.url);
  }, []);

  const addPhoto = useCallback(
    (newPhoto) => {
      setNewValues((prevValues) => ({
        ...prevValues,
        arrayOfPhotos: [...prevValues.arrayOfPhotos, newPhoto],
      }));
    },
    [newValues]
  );

  const deletePhoto = useCallback(
    (photoToDelete) => {
      setNewValues((prevValues) => ({
        ...prevValues,
        arrayOfPhotos: prevValues.arrayOfPhotos.filter(
          (photo) => photo !== photoToDelete
        ),
      }));
    },
    [newValues]
  );

  return (
    <ConditionalRender
      conditions={[isLoadedPhotography]}
      content={
        <div className={classes.updatePhotography}>
          <div className={classes.backButtonWithTitle}>
            <Link to={`${adminDashboardLink}${photographyLink}`}>
              {" "}
              <IoChevronBackCircleSharp size={30} />{" "}
            </Link>
            <h3>Update a photography '{oldValues.name}'</h3>
          </div>
          <form onSubmit={updateType}>
            <div className={classes.name}>
              <label htmlFor="type">Name</label>
              <br />
              <input
                type="text"
                name="name"
                placeholder="Enter the name"
                defaultValue={oldValues.name}
                onChange={(e) =>
                  setNewValues((prevValues) => ({
                    ...prevValues,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            <div className={classes.photoType}>
              <label htmlFor="title">Type of photoshoot</label>
              <br />

              <select
                value={newValues.photoTypeId}
                onChange={(e) =>
                  setNewValues((prevValues) => ({
                    ...prevValues,
                    photoTypeId: e.target.value,
                  }))
                }
              >
                <option value={oldValues.photoTypeId}>
                  {
                    allPhotoTypesName.find(
                      (type) => type.id === oldValues.photoTypeId
                    )?.name
                  }
                </option>

                {allPhotoTypesName.map(
                  (type) =>
                    type.id !== oldValues.photoTypeId && (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    )
                )}
              </select>
            </div>

            <div className={classes.mainPhoto}>
              <br />
              <h4>The main photo of photography</h4>
              {error1 && <p>{error1}</p>}
              {oldValues.mainPhoto !== "" && !newValues.mainPhoto && (
                <>
                  <img src={oldValues.mainPhoto} alt="Main" />
                </>
              )}
              {newValues.mainPhoto && (
                <>
                  <img src={newValues.mainPhoto} alt="Main" />
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
              {error2 && <p>{error2}</p>}
              {newValues.arrayOfPhotos.length > 0 && (
                <div className={classes.show}>
                  {newValues.arrayOfPhotos.map((photo, index) => (
                    <div key={index} className={classes.block}>
                      <div className={classes.delete}>
                        <RxCross2
                          color="gray"
                          size={30}
                          onClick={() => deletePhoto(photo)}
                        />{" "}
                        <br />
                      </div>
                      <div>
                        <img src={photo} alt={`Gallery item-${index}`} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className={classes.photo}>
                <UploadWidget onUpload={handleArrayOfPhotosUpload}>
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
      }
    />
  );
};

export default UpdatePhotography;
