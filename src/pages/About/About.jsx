import React, { useEffect, useState } from "react";
import { Header, Footer, ConditionalRender } from "../../components";
import classes from "./About.module.scss";
import { getPhotographers } from "../../services/BioService";
import { getAllTypesOfPhotography } from "../../services/PhototypeService";

const About = () => {
  const [bio, setBio] = useState([]);
  const [typesOfPhotography, setTypesOfPhotography] = useState([]);
  const [isLoadedBio, setIsLoadedBio] = useState(false);
  const [isLoadedTypes, setIsLoadedTypes] = useState(false);

  const fetchBioData = () => {
    getPhotographers().then((data) => {
      if (data?.data.length === 1) {
        setBio(data?.data[0]);
        setIsLoadedBio(true);
      }
    });
  };

  const fetchTypesOfPhotography = () => {
    getAllTypesOfPhotography().then((data) => {
      setTypesOfPhotography(data?.data);
      setIsLoadedTypes(true);
    });
  };

  useEffect(() => {
    fetchBioData();
    fetchTypesOfPhotography();
  }, []);

  return (
    <ConditionalRender
      conditions={[isLoadedBio, isLoadedTypes]}
      content={
        <div className={classes.about}>
          <Header />
          <div className={classes.content}>
            <div className={classes.bio}>
              <p>{bio?.bio}</p>
            </div>
            <img src={bio?.photo} alt="photographer" />
          </div>
          <div className={classes.photoshoots}>
            <p>Photoshoots are available in Romania and Ukraine:</p>
            <ul>
              {typesOfPhotography.map((el, index) => (
                <li key={index}>{el?.typeOfPhotography}</li>
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      }
    />
  );
};

export default About;
