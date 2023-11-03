import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header, Footer, ConditionalRender } from "../../../components";
import classes from "./TypeOfShooting.module.scss";
import { getTypeOfPhotographyByTypeName } from "../../../services/PhototypeService";

const TypeOfShooting = () => {
  const { name } = useParams();
  const [typeOfPhotography, setTypeOfPhotography] = useState([]);
  const [isLoadedType, setIsLoadedType] = useState(false);

  useEffect(() => {
    fetchTypeOfPhotographyData();
  }, []);

  const fetchTypeOfPhotographyData = () => {
    getTypeOfPhotographyByTypeName(name).then((data) => {
      setTypeOfPhotography(data?.data);
      setIsLoadedType(true);
    });
  };

  return (
    <ConditionalRender
      conditions={[isLoadedType]}
      content={
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
                alt="Type"
              />
            </div>
          </div>
          <Footer />
        </div>
      }
    />
  );
};

export default TypeOfShooting;
