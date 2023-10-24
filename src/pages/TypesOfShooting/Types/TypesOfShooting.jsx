import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import classes from "./TypesOfShooting.module.scss";
import { getAllTypesOfPhotography } from '../../../services/PhototypeService';
import { Link } from "react-router-dom";
import ConditionalRender from "../../../components/ConditionalRender/ConditionalRender";
import { typeLink } from "../../../constants";

const TypesOfShooting = () => {
  const [typesOfPhotography, setTypesOfPhotography] = useState([]);
  const [isLoadedTypes, setIsLoadedTypes] = useState(false);

  useEffect(() => {
    fetchTypesOfPhotographyData();
  }, []);

  const fetchTypesOfPhotographyData = () => {
    getAllTypesOfPhotography()
      .then((data) => {
        setTypesOfPhotography(data?.data);
        setIsLoadedTypes(true);
      })
  };

  return (
    <ConditionalRender
      conditions={[isLoadedTypes]}
      content={
        <div>
          <Header />
          <div className={classes.types}>
            {typesOfPhotography.map((el, index) => (
              <div key={index}>
                <Link to={`${typeLink}/${el?.typeOfPhotography}`}>
                  <div className={classes.types__element}>
                    <article>
                      <img
                        src={el?.mainPhoto}
                        alt="background"
                        className={classes.types__element__img}
                      />
                      <h1 className={classes.types__element__h1}>
                        {el?.typeOfPhotography}
                      </h1>
                    </article>
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

export default TypesOfShooting;
