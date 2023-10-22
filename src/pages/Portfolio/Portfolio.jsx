import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from "./Portfolio.module.scss";
import { getAllTypesOfPhotography, getPhotoshoots } from "../../api";
import { Link } from "react-router-dom";
import ConditionalRender from "../../components/ConditionalRender/ConditionalRender";

const Portfolio = () => {
  const [photoshoots, setPhotoshoots] = useState([]);
  const [types, setTypes] = useState([]);
  
  const [isLoadedPhotoshoots, setIsLoadedPhotoshoots] = useState(false);
  const [isLoadedTypes, setIsLoadedTypes] = useState(false);

  useEffect(() => {
    getPhotoshoots()
      .then((data) => {
        setPhotoshoots(data?.data);
        setIsLoadedPhotoshoots(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getAllTypesOfPhotography()
      .then((data) => {
        setTypes(data?.data);
        setIsLoadedTypes(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getTypeNameById = (id) => {
    const type = types.find((type) => type._id === id);
    return type ? type.typeOfPhotography : "";
  };

  return (
    <ConditionalRender
      conditions={[isLoadedPhotoshoots, isLoadedTypes]}
      content={
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
      }
    />
  );
};

export default Portfolio;
