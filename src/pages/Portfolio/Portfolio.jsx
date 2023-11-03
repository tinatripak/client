import React, { useEffect, useState } from "react";
import { Header, Footer, ConditionalRender } from "../../components";
import classes from "./Portfolio.module.scss";
import { getAllTypesOfPhotography } from "../../services/PhototypeService";
import { getPhotoshoots } from "../../services/PhotoshootService";
import { Link } from "react-router-dom";
import { portfolioLink } from "../../constants";

const Portfolio = () => {
  const [photoshoots, setPhotoshoots] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoadedPhotoshoots, setIsLoadedPhotoshoots] = useState(false);
  const [isLoadedTypes, setIsLoadedTypes] = useState(false);

  useEffect(() => {
    fetchPhotoshootsoData();
    fetchTypesData();
  }, []);

  const fetchPhotoshootsoData = () => {
    getPhotoshoots().then((data) => {
      setPhotoshoots(data?.data);
      setIsLoadedPhotoshoots(true);
    });
  };

  const fetchTypesData = () => {
    getAllTypesOfPhotography().then((data) => {
      setTypes(data?.data);
      setIsLoadedTypes(true);
    });
  };

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
                <Link to={`${portfolioLink}/${el?.name}`}>
                  <div className={classes.portfolio__element}>
                    <div className={classes.portfolio__element__div}>
                      <img
                        src={el?.mainPhoto}
                        className={classes.portfolio__element__div__img}
                        alt="portfolio"
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
