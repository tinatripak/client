import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEditCircleLine } from "react-icons/ri";
import {
  deleteTypeOfPhotography,
  getAllTypesOfPhotography,
} from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import classes from "./TypesOfPhotography.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoAddCircle } from "react-icons/io5";

const TypesOfPhotography = () => {
  const [arrayOfTypes, setArrayOfTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTypesOfPhotography();
  }, []);

  const getTypesOfPhotography = () => {
    getAllTypesOfPhotography()
      .then((data) => {
        setArrayOfTypes(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteTypeOfPhotography = (id) => {
    deleteTypeOfPhotography(id)
      .then(() => {
        setArrayOfTypes((prevList) => prevList.filter((x) => x._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting admin:", error);
      });
  };

  const handleCreate = () => {
    navigate("/adminDashboard/types/create");
  };

  return (
    <div className={classes.types}>
      <div className={classes.types__add}>
        <p>Add a type of photography</p>
        <IoAddCircle
          className={classes.types__add__icon}
          color="#292929"
          size={35}
          onClick={handleCreate}
        />
      </div>
      <div className={classes.types__cards}>
        {arrayOfTypes?.length > 0 ? (
          arrayOfTypes.map((el, index) => (
            <div className={classes.types__cards__card} key={index}>
              <LazyLoadImage
                src={el?.mainPhoto}
                className={classes.types__cards__card__photo}
                effect="blur"
              />
              <div className={classes.types__cards__card__titleWithActions}>
                <p>{el?.typeOfPhotography}</p>
                <div
                  className={
                    classes.types__cards__card__titleWithActions__actions
                  }
                >
                  <Link to={`/adminDashboard/types/edit/${el?._id}`}>
                    <RiEditCircleLine
                      size={22}
                      className={
                        classes.types__cards__card__titleWithActions__actions__icon
                      }
                    />
                  </Link>
                  <MdDelete
                    size={22}
                    onClick={() => handleDeleteTypeOfPhotography(el?._id)}
                    className={
                      classes.types__cards__card__titleWithActions__actions__icon
                    }
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.types__notFound}>
            <div className={classes.types__notFound__photo}>
              <LazyLoadImage
                src="http://res.cloudinary.com/dcxuxc5uw/image/upload/v1696457741/ue0nzgv7y4j7mlcw0qml.png"
                effect="blur"
              />
            </div>
            <h3>No records has been added yet.</h3>
            <h4>Add a new record by clicking the button on top center side.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypesOfPhotography;
