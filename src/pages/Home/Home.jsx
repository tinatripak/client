import React, { useEffect, useState } from "react";
import { Header, Footer, ConditionalRender } from "../../components";
import classes from "./Home.module.scss";
import { getAllHomePhotos } from "../../services/HomeService";
import ReactImageGallery from "react-image-gallery";

const Home = () => {
  const [arrayOfPhotos, setArrayOfPhotos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = () => {
    getAllHomePhotos().then((data) => {
      let arr = []
      for(let i=0;i<data?.data?.length;i++){
        const newPhotos = data?.data[i].photo || [];
        arr.push(newPhotos)
      }
      setArrayOfPhotos(arr);
      setIsLoaded(true);
    });
  };

  const backgroundImageStyle = {
    backgroundImage: `url('${arrayOfPhotos[0]}')`,
  };

  const images = arrayOfPhotos.slice(1).map((originalUrl) => ({
    original: originalUrl,
  }));
  

  return (
    <ConditionalRender
      conditions={[isLoaded]}
      content={
        <div className={classes.home}>
          <Header />
          <div className={classes.main}>
            <div
              className={classes.image}
              style={backgroundImageStyle}
            >
              <p>Photography Is My Life</p>
            </div>
            <div className={classes.text}>
              I'm a Ukrainian photographer.
              <br />
              Photography is my passion and my life
            </div>
          </div>
          <div className={classes.photos}>
            {arrayOfPhotos.slice(1).map((el, index) => (
              <figure
                className={classes[`item${index + 1}`]}
                key={index}
              >
                <img
                  src={el}
                  alt="gallery item"
                  className={classes.img}
                />
              </figure>
            ))}
          </div>
          <div className={classes.carousel_photos}>
            <ReactImageGallery items={images} />;
          </div>
          <Footer />
        </div>
      }
    />
  );
};

export default Home;
