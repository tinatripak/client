import React, { useEffect, useState } from "react";
import { Header, Footer, ConditionalRender } from "../../components";
import classes from "./Home.module.scss";
import { getAllHomePhotos } from "../../services/HomeService";

const Home = () => {
  const [arrayOfPhotos, setArrayOfPhotos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = () => {
    getAllHomePhotos().then((data) => {
      setArrayOfPhotos(data?.data);
      setIsLoaded(true);
    });
  };

  const backgroundImageStyle = {
    backgroundImage: `url('${arrayOfPhotos[0]?.photo}')`,
  };

  return (
    <ConditionalRender
      conditions={[isLoaded]}
      content={
        <div className={classes.home}>
          <Header />
          <div className={classes.home__main}>
            <div
              className={classes.home__main__image}
              style={backgroundImageStyle}
            >
              <p>Photography Is My Life</p>
            </div>
            <div className={classes.home__main__text}>
              I'm a Ukrainian photographer.
              <br />
              Photography is my passion and my life
            </div>
          </div>
          <div className={classes.home__photos}>
            {arrayOfPhotos.slice(1).map((el, index) => (
              <figure
                className={classes[`home__photos__item${index + 1}`]}
                key={index}
              >
                <img
                  src={el?.photo}
                  alt="gallery item"
                  className={classes.home__photos__img}
                />
              </figure>
            ))}
          </div>
          <Footer />
        </div>
      }
    />
  );
};

export default Home;
