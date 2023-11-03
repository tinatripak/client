import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEditCircleLine } from "react-icons/ri";
import {
  deleteTypeOfPhotographyById,
  getAllTypesOfPhotography,
} from "../../../services/PhototypeService";
import { Link, useNavigate } from "react-router-dom";
import classes from "./TypesOfPhotography.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoAddCircle } from "react-icons/io5";
import { NotFound } from "../../../components";
import {
  adminDashboardLink,
  createLink,
  darkColor,
  editLink,
  typeLink,
} from "../../../constants";

const TypesOfPhotography = () => {
  const [arrayOfTypes, setArrayOfTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTypesOfPhotography();
  }, []);

  const getTypesOfPhotography = () => {
    getAllTypesOfPhotography().then((data) => {
      setArrayOfTypes(data?.data);
    });
  };

  const handleDeleteTypeOfPhotography = (id) => {
    deleteTypeOfPhotographyById(id).then(() => {
      setArrayOfTypes((prevList) => prevList.filter((x) => x._id !== id));
    });
  };

  const handleCreate = () => {
    navigate(`${adminDashboardLink}${typeLink}${createLink}`);
  };

  return (
    <div className={classes.types}>
      <div className={classes.add}>
        <p>Add a type of photography</p>
        <IoAddCircle
          className={classes.icon}
          color={darkColor}
          size={35}
          onClick={handleCreate}
        />
      </div>
      <div className={classes.cards}>
        {arrayOfTypes?.length > 0 ? (
          arrayOfTypes.map((el, index) => (
            <div className={classes.card} key={index}>
              <LazyLoadImage
                src={el?.mainPhoto}
                className={classes.photo}
                effect="blur"
              />
              <div className={classes.titleWithActions}>
                <p>{el?.typeOfPhotography}</p>
                <div
                  className={
                    classes.actions
                  }
                >
                  <Link
                    to={`${adminDashboardLink}${typeLink}${editLink}/${el?._id}`}
                  >
                    <RiEditCircleLine
                      size={22}
                      className={
                        classes.icon
                      }
                    />
                  </Link>
                  <MdDelete
                    size={22}
                    onClick={() => handleDeleteTypeOfPhotography(el?._id)}
                    className={
                      classes.icon
                    }
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default TypesOfPhotography;
