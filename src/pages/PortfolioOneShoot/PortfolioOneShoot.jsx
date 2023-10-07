import React, { useEffect, useState } from "react";
import Shoot from "./Shoot";
import { useParams } from "react-router-dom";
import classes from "./Shoot.module.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { getPhotoshootByName } from "../../api";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const PortfolioOneShoot = () => {
  const { name } = useParams();

  const [photoshoot, setPhotoshoot] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getPhotoshootByName(name)
      .then((data) => {
        setPhotoshoot(data?.data?.arrayOfPhotos);
        console.log(data?.data?.arrayOfPhotos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    setImages(
      photoshoot.map((url, index) => ({
        original: url,
      }))
    );
  }, [photoshoot]);

  return (
    <div>
      <Header />
      <div className={classes.shoot}>
        <p className={classes.shoot__h1}>{name}'s photoshoot</p>
        <div className={classes.shoot__images}>
          <ImageGallery
            items={images}
            showPlayButton={true}
            showFullscreenButton={true}
            slideInterval={1000}
            slideOnThumbnailOver={true}
            showIndex={true}
            onPlay={() => {
              alert("slideshow is now playing!");
            }}
          />
          ;
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioOneShoot;
