import React, { useEffect, useState, useRef } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import classes from "./TypesOfShooting.module.scss";
import { getAllTypesOfPhotography } from "../../../api";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";

const TypesOfShooting = () => {
  const [typesOfPhotography, setTypesOfPhotography] = useState([]);
  useEffect(() => {
    getAllTypesOfPhotography()
      .then((data) => {
        setTypesOfPhotography(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [loading, setLoading] = useState(true);
  const counter = useRef(0);
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= typesOfPhotography.length) {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: loading ? "block" : "none" }}>
        <Spinner />
      </div>
      <div style={{ display: loading ? "none" : "block" }}>
        <div>
          <Header />
          <div className={classes.types}>
            {typesOfPhotography.map((el, index) => (
              <div key={index}>
                <Link to={`/type/${el?.typeOfPhotography}`}>
                  <div className={classes.types__element}>
                    <article>
                      <img
                        src={el?.mainPhoto}
                        alt="background"
                        className={classes.types__element__img}
                        onLoad={imageLoaded}
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
      </div>
    </>
  );
};

export default TypesOfShooting;
