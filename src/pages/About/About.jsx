import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from "./About.module.scss";
import { getAllTypesOfPhotography, getPhotographerInfo } from "../../api";

const About = () => {
  const [bio, setBio] = useState([]);
  useEffect(() => {
    getPhotographerInfo()
      .then((data) => {
        setBio(data?.data[0]);
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

  return (
    <div className={classes.about}>
      <Header />
      <div className={classes.about__content}>
        <div className={classes.about__content__p}>
          <p>{bio?.bio}</p>
        </div>
        <img src={bio?.photo} alt="photographer" />
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
  );
};

export default About;
