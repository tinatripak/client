import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./PortfolioOneShoot.module.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { getPhotoshootByName } from '../../services/PhotoshootService'

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ConditionalRender from "../../components/ConditionalRender/ConditionalRender";

const PortfolioOneShoot = () => {
  const { name } = useParams();

  const [photoshoot, setPhotoshoot] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoadedPhotoshoots, setIsLoadedPhotoshoots] = useState(false);

  useEffect(() => {
    fetchPhotoshootData();
  }, []);

  const fetchPhotoshootData = () => {
    getPhotoshootByName(name)
      .then((data) => {
        setPhotoshoot(data?.data?.arrayOfPhotos);
        setIsLoadedPhotoshoots(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addImagesToGallery = () => {
    setImages(
      photoshoot.map((url, index) => ({
        id: index,
        original: url,
      }))
    );
  }

  useEffect(() => {
    addImagesToGallery();
  }, [photoshoot]);

  return (
    <ConditionalRender
      conditions={[isLoadedPhotoshoots]}
      content={
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
      }
    />
  );
};

export default PortfolioOneShoot;
