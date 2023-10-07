import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from "./PriceById.module.scss";
import { getTypeOfPhotographyByName } from "../../api";

const PriceById = () => {
  const { name } = useParams();
  const [typeOfPhotography, setTypeOfPhotography] = useState([]);
  useEffect(() => {
    getTypeOfPhotographyByName(name)
      .then((data) => {
        setTypeOfPhotography(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className={classes.type}>
        <p className={classes.type__name}>{name}</p>
        <div className={classes.type__grid}>
          <p className={classes.type__grid__text}>
            {typeOfPhotography?.text?.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < typeOfPhotography.text.split("\n").length - 1 && (
                  <br />
                )}
              </React.Fragment>
            ))}
          </p>
          <img
            src={typeOfPhotography?.mainPhoto}
            className={classes.type__grid__photo}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PriceById;
