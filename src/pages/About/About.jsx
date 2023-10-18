import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from "./About.module.scss";
import { getAllTypesOfPhotography, getPhotographers } from "../../api";
import Spinner from "../../components/Spinner/Spinner";


const About = () => {
  const [bio, setBio] = useState([]);
  useEffect(() => {
    getPhotographers()
      .then((data) => {
        if(data?.data.length === 1){
          setBio(data?.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
  const imageLoaded = () => {
    setLoading(false);
  };

  return (
    <>
      <div style={{ display: loading ? "block" : "none" }}>
        <Spinner/>
      </div>
      <div style={{ display: loading ? "none" : "block" }}>
        <div className={classes.about}>
          <Header />
          <div className={classes.about__content}>
            <div className={classes.about__content__p}>
              <p>{bio?.bio}</p>
            </div>
            <img src={bio?.photo} alt="photographer" onLoad={imageLoaded} />
          </div>
          <div className={classes.about__photoshoots}>
            <p>Photoshoots are available in Romania and Ukraine:</p>
            <ul>
              {typesOfPhotography.map((el, index) => (
                <li>{el?.typeOfPhotography}</li>
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
