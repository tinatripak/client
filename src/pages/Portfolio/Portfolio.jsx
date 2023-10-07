import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import PortfolioElement from './PortfolioElement'
import classes from "./Portfolio.module.scss";
import { getAllTypesOfPhotography, getPhotoshoots, getTypeOfPhotographyById } from '../../api';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [photoshoots, setPhotoshoots] = useState([]);
  useEffect(() => {
    getPhotoshoots()
      .then((data) => {
        setPhotoshoots(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [types, setTypes] = useState([]);

  useEffect(() => {
    getAllTypesOfPhotography()
      .then((data) => {
        setTypes(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getTypeNameById = (id) => {
    const type = types.find((type) => type._id === id);
    return type ? type.typeOfPhotography : '';
  };

  return (
    <div>
      <Header/>
      <div className={classes.portfolio}>
        {photoshoots.map((el, index) => (
          <div key={index} >
            <Link to={`/portfolio/${el?.name}`}>
              <PortfolioElement name={el?.name} text={getTypeNameById(el?.photoTypeId)} image={el?.mainPhoto}/>
            </Link>
          </div>
          ))}
      </div>
      <Footer/>
    </div>
  )
}

export default Portfolio
