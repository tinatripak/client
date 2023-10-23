import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UploadWidget from "../../../../components/UploadWidget/UploadWidget";
import classes from "./EditBio.module.scss";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { getPhotographerById, updatePhotographerById } from '../../../../services/BioService'
import { adminDashboardLink, bioLink } from "../../../../constants";

const EditBio = () => {
  const { id } = useParams();

  const [newPhoto, setNewPhoto] = useState("");
  const [oldPhoto, setOldPhoto] = useState("");

  const [newBio, setNewBio] = useState("");
  const [oldBio, setOldBio] = useState("");

  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [oldPhoneNumber, setOldPhoneNumber] = useState("");

  const [error, updateError] = useState();

  useEffect(() => {
    getOldBio();
  }, []);

  const updateBio = () => {
    const updatedPhoto = newPhoto !== "" ? newPhoto : oldPhoto;
    const updatedBio = newBio !== "" ? newBio : oldBio;
    const updatedPhoneNumber = newPhoneNumber !== "" ? newPhoneNumber : oldPhoneNumber;
    console.log(id, updatedBio, updatedPhoneNumber, updatedPhoto)

    updatePhotographerById(id, updatedBio, updatedPhoneNumber, updatedPhoto)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getOldBio = () => {
    getPhotographerById(id)
      .then((data) => {
        console.log(data)
        setOldBio(data?.data?.bio);
        setOldPhoto(data?.data?.photo);
        setOldPhoneNumber(data?.data?.phoneNumber);
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
          <label htmlFor="title">Bio</label>
          <br />
          <textarea name="bio" defaultValue={oldBio} onChange={e=>setNewBio(e.target.value)}/>
        </div>

        <div className={classes.editInfo__phoneNumber}>
          <label htmlFor="title">Phone number</label>
          <br />
          <input type="tel" name="phone" defaultValue={oldPhoneNumber} onChange={e=>setNewPhoneNumber(e.target.value)}/>
        </div>

        <div className={classes.editInfo__photo}>
          <br />
          <h4>The photo of Ksenia Tripak</h4>
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
