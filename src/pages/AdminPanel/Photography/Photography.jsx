import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEditCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Photography.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoAddCircle } from "react-icons/io5";
import { deletePhotoshootById, getPhotoshoots } from '../../../services/PhotoshootService'
import { getAllTypesOfPhotography } from '../../../services/PhototypeService'


import NotFound from "../../../components/NotFound/NotFound";
import { adminDashboardLink, createLink, darkColor, editLink, photographyLink } from "../../../constants";

const Photography = () => {
  const [arrayOfPhotographs, setArrayOfPhotographs] = useState([]);
  const [arrayOfTypes, setArrayOfTypes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllPhotography();
    getAllTypes();
  }, []);

  const getAllPhotography = () => {
    getPhotoshoots()
      .then((data) => {
        setArrayOfPhotographs(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAllTypes = () => {
    getAllTypesOfPhotography()
      .then((data) => {
        setArrayOfTypes(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeletePhotoshoot = (id) => {
    deletePhotoshootById(id)
      .then(() => {
        setArrayOfPhotographs((prevList) =>
          prevList.filter((x) => x._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting photoshoot:", error);
      });
  };

  const handleCreate = () => {
    navigate(`${adminDashboardLink}${photographyLink}${createLink}`);
  };

  const arrayOfPhotographyWithTypesName = arrayOfPhotographs.map((el) => {
    const type = arrayOfTypes.find((type) => type._id === el.photoTypeId);
    return {
      ...el,
      typeOfPhotography: type ? type.typeOfPhotography : el.photoTypeId,
    };
  });

  return (
    <div className={classes.photography}>
      <div className={classes.photography__add}>
        <p>Add a photo shoot</p>
        <IoAddCircle
          className={classes.photography__add__icon}
          color={darkColor}
          size={35}
          onClick={handleCreate}
        />
      </div>
      <div className={classes.photography__cards}>
        {arrayOfPhotographyWithTypesName?.length > 0 ? (
          arrayOfPhotographyWithTypesName.map((el, index) => (
            <div className={classes.photography__cards__card} key={index}>
              <LazyLoadImage
                src={el?.mainPhoto}
                className={classes.photography__cards__card__photo}
                effect="blur"
              />
              <div
                className={classes.photography__cards__card__nameWithActions}
              >
                <p
                  className={
                    classes.photography__cards__card__nameWithActions__name
                  }
                >
                  {el?.name}
                </p>
                <div
                  className={
                    classes.photography__cards__card__nameithActionss__actions
                  }
                >
                  <Link to={`${adminDashboardLink}${photographyLink}${editLink}/${el?._id}`}>
                    <RiEditCircleLine
                      size={22}
                      className={
                        classes.photography__cards__card__nameWithActions__actions__icon
                      }
                    />
                  </Link>
                  <MdDelete
                    size={22}
                    onClick={() => handleDeletePhotoshoot(el?._id)}
                    className={
                      classes.photography__cards__card__nameWithActions__actions__icon
                    }
                  />
                </div>
              </div>
              <p className={classes.photography__cards__card__type}>
                {el?.typeOfPhotography}
              </p>
            </div>
          ))
        ) : (
          <NotFound/>
        )}
      </div>
    </div>
  );
};

export default Photography;
