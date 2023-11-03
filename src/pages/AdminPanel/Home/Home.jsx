import React, { useEffect, useState } from "react";
import { RiEditCircleLine } from "react-icons/ri";
import classes from "./Home.module.scss";
import { Link } from "react-router-dom";
import { getAllHomePhotos } from "../../../services/HomeService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { adminDashboardLink, editLink, homeLink } from "../../../constants";

const Home = () => {
  const [arrayOfPhotos, setArrayOfPhotos] = useState([]);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = () => {
    getAllHomePhotos().then((data) => {
      setArrayOfPhotos(data?.data);
    });
  };

  return (
    <div className={classes.home}>
      <div className={classes.home__gridPhotos}>
        {arrayOfPhotos.map((el, index) => (
          <div className={classes.home__gridPhotos__photoBlock} key={index}>
            <div className={classes.home__update}>
              <Link
                to={`${adminDashboardLink}${homeLink}${editLink}/${el?._id}`}
              >
                <RiEditCircleLine color="white" size={22} />
              </Link>
            </div>
            <div>
              <LazyLoadImage
                src={el?.photo}
                className={classes.home__update__photo}
                effect="blur"
              />
              <p>{el?.titleOfPhoto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
