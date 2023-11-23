import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEditCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Photography.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoAddCircle } from "react-icons/io5";
import {
  deletePhotoshootById,
  getPhotoshoots,
} from "../../../services/PhotoshootService";
import { getAllTypesOfPhotography } from "../../../services/PhototypeService";
import { ConditionalRender, NotFound } from "../../../components";
import {
  adminDashboardLink,
  createLink,
  darkColor,
  editLink,
  photographyLink,
} from "../../../constants";

const Photography = () => {
  const [arrayOfPhotographs, setArrayOfPhotographs] = useState([]);
  const [arrayOfTypes, setArrayOfTypes] = useState([]);

  const navigate = useNavigate();
  const [isLoadedPhotography, setIsLoadedPhotography] = useState(false);

  useEffect(() => {
    getAllPhotography();
    getAllTypes();
  }, []);

  const getAllPhotography = () => {
    getPhotoshoots().then((data) => {
      setArrayOfPhotographs(data?.data);
      setIsLoadedPhotography(true);
    });
  };

  const getAllTypes = () => {
    getAllTypesOfPhotography().then((data) => {
      setArrayOfTypes(data?.data);
    });
  };

  const handleDeletePhotoshoot = (id) => {
    deletePhotoshootById(id).then(() => {
      setArrayOfPhotographs((prevList) => prevList.filter((x) => x._id !== id));
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
    <ConditionalRender
      conditions={[isLoadedPhotography]}
      content={
        <div className={classes.photography}>
          <div className={classes.add}>
            <p>Add a photo shoot</p>
            <IoAddCircle
              className={classes.icon}
              color={darkColor}
              size={35}
              onClick={handleCreate}
            />
          </div>
          <div className={classes.cards}>
            {arrayOfPhotographyWithTypesName?.length > 0 ? (
              arrayOfPhotographyWithTypesName.map((el, index) => (
                <div className={classes.card} key={index}>
                  <LazyLoadImage
                    src={el?.mainPhoto}
                    className={classes.photo}
                    effect="blur"
                  />
                  <div className={classes.nameWithActions}>
                    <p className={classes.name}>{el?.name}</p>
                    <div className={classes.actions}>
                      <Link
                        to={`${adminDashboardLink}${photographyLink}${editLink}/${el?._id}`}
                      >
                        <RiEditCircleLine size={22} className={classes.icon} />
                      </Link>
                      <MdDelete
                        size={22}
                        onClick={() => handleDeletePhotoshoot(el?._id)}
                        className={classes.icon}
                      />
                    </div>
                  </div>
                  <p className={classes.type}>{el?.typeOfPhotography}</p>
                </div>
              ))
            ) : (
              <NotFound />
            )}
          </div>
        </div>
      }
    />
  );
};

export default Photography;
