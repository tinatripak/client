import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import classes from "./PortfolioOneShoot.module.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { getPhotoshootByName } from "../../api";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Spinner from "../../components/Spinner/Spinner";

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

  const [loading, setLoading] = useState(true);
  const counter = useRef(0);
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= images.length) {
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
                onImageLoad={imageLoaded}
              />
              ;
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PortfolioOneShoot;
