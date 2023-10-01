import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from "./About.module.scss";


const About = () => {
  return (
    <div className={classes.about}>
      <Header />
      <div className={classes.about__content}>
        <div className={classes.about__content__p}>
          <p>
            My name is Ksenia. <br/>I am a Ukrainian photographer living in Brasov,
            Romania. <br/>I have been doing photography for 2 years, blogging for 3
            years.
          </p>
        </div>
        <img src="https://drive.google.com/uc?export=view&id=1PihEaJkuE026w2B5WHUJFCvks_HTtUfK" alt="photographer"/>
      </div>
      <div className={classes.about__photoshoots}>
        <p>
          Photoshoots are available in Romania and Ukraine:
        </p>
        <ul>
          <li>
            Portrait photography
          </li>
          <li>
            Wedding photography
          </li>
          <li>
            Vacation photography
          </li>
          <li>
            Branding photography
          </li>
          <li>
            Fashion
          </li>
          <li>
            Architectural interior
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default About;
