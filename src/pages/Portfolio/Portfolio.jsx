import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from "./Portfolio.module.scss";
import {
  getAllTypesOfPhotography,
  getPhotoshoots,
} from "../../api";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const Portfolio = () => {
  const [photoshoots, setPhotoshoots] = useState([]);
  useEffect(() => {
    getPhotoshoots()
      .then((data) => {
        setPhotoshoots(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [types, setTypes] = useState([]);

  useEffect(() => {
    getAllTypesOfPhotography()
      .then((data) => {
        setTypes(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getTypeNameById = (id) => {
    const type = types.find((type) => type._id === id);
    return type ? type.typeOfPhotography : "";
  };

  const [loading, setLoading] = useState(true);
  const counter = useRef(0);
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= photoshoots.length) {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: loading ? "block" : "none" }}>
        <Spinner/>
      </div>
      <div style={{ display: loading ? "none" : "block" }}>
        <div>
          <Header />
          <div className={classes.portfolio}>
            {photoshoots.map((el, index) => (
              <div key={index}>
                <Link to={`/portfolio/${el?.name}`}>
                  <div className={classes.portfolio__element}>
                    <div className={classes.portfolio__element__div}>
                      <img
                        src={el?.mainPhoto}
                        className={classes.portfolio__element__div__img}
                        alt="photo"
                        onLoad={imageLoaded}
                      />
                      <p className={classes.portfolio__element__div__name}>
                        {el?.name}
                      </p>
                      <p className={classes.portfolio__element__div__text}>
                        {getTypeNameById(el?.photoTypeId)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Portfolio;
