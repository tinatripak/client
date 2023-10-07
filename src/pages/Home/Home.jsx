import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ContactForm from "../../components/ContactForm/ContactForm";
import classes from "./Home.module.scss";
import { getHomePhotos } from '../../api';


const Home = () => {
  const [arrayOfPhotos, setArrayOfPhotos] = useState([]);
  useEffect(() => {
    getHomePhotos()
    .then((data) => {
      setArrayOfPhotos(data?.data);
    })
    .catch((error) => {
      console.error(error);
    });
    },[]);

  return (
    <div>
      <Header/>
      <div className={classes.home__main__image} style={{backgroundImage: `url('${arrayOfPhotos[0]?.photo}')`}}>
        <p>Photography Is My Life</p>
      </div>
      
      <div className={classes.home__main__text}>
        I'm an Ukranian photographer.<br/>Photography is my passion and my life
      </div>

      <div className={classes.home__photos}>
        {arrayOfPhotos.slice(1).map((el, index) => (
          <figure className={classes[`home__photos__item${index + 1}`]} key={index}>
            <img src={el?.photo} alt="gallery image" className={classes.home__photos__img} />
          </figure>
        ))}
      </div>
      <div className={classes.home__photoOfPhotographer}>

      </div>
      <div className={classes.home__contactForm}>
        <img src="https://res.cloudinary.com/dcxuxc5uw/image/upload/v1695952279/ptgpjkmmnofmmqcyiycj.jpg" alt="photographer"/>
        <ContactForm />
      </div>
      <Footer/>
    </div>
  )
}

export default Home
