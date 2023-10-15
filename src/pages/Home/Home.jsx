import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ContactForm from "../../components/ContactForm/ContactForm";
import classes from "./Home.module.scss";
import { getHomePhotos } from "../../api";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const [arrayOfPhotos, setArrayOfPhotos] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    getHomePhotos()
      .then((data) => {
        setArrayOfPhotos(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let backgroundLoaded = false;
    let imagesLoaded = 0;

    const checkLoadingStatus = () => {
      if (backgroundLoaded && imagesLoaded >= arrayOfPhotos.slice(1).length) {
        setImagesLoading(false);
      }
    };

    if (arrayOfPhotos[0]?.photo) {
      const backgroundImage = new Image();
      backgroundImage.src = arrayOfPhotos[0]?.photo;
      backgroundImage.onload = () => {
        backgroundLoaded = true;
        checkLoadingStatus();
      };
      backgroundImage.onerror = () => {
        backgroundLoaded = true;
        checkLoadingStatus();
      };
    }

    arrayOfPhotos.slice(1).forEach((el) => {
      if (el?.photo) {
        const image = new Image();
        image.src = el.photo;
        image.onload = () => {
          imagesLoaded += 1;
          checkLoadingStatus();
        };
        image.onerror = () => {
          imagesLoaded += 1;
          checkLoadingStatus();
        };
      }
    });
  }, [arrayOfPhotos]);

  return (
    <div>
      <div style={{ display: imagesLoading ? "block" : "none" }}>
      <Spinner />
      </div>
      <div style={{ display: imagesLoading ? "none" : "block" }}>
        <Header />
        <div
          className={classes.home__main__image}
          style={{ backgroundImage: `url('${arrayOfPhotos[0]?.photo}')` }}
        >
          <p>Photography Is My Life</p>
        </div>
        <div className={classes.home__main__text}>
          I'm a Ukrainian photographer.
          <br />
          Photography is my passion and my life
        </div>
        <div className={classes.home__photos}>
          {arrayOfPhotos.slice(1).map((el, index) => (
            <figure
              className={classes[`home__photos__item${index + 1}`]}
              key={index}
            >
              <img
                src={el?.photo}
                alt="gallery image"
                className={classes.home__photos__img}
              />
            </figure>
          ))}
        </div>
        <div className={classes.home__photoOfPhotographer}></div>
        <div className={classes.home__contactForm}>
          <p className={classes.home__contactForm__title}>
            If you have any questions, ask them here:
          </p>
          <ContactForm />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
