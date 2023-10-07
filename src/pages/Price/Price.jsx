import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import PriceElement from './PriceElement'
import classes from "./Price.module.scss";
import { getAllTypesOfPhotography } from '../../api';
import { Link, useParams } from 'react-router-dom';

const Price = () => {
  const [typesOfPhotography, setTypesOfPhotography] = useState([]);
  useEffect(() => {
    getAllTypesOfPhotography()
      .then((data) => {
        setTypesOfPhotography(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Header/>
        <div className={classes.price}>
        {typesOfPhotography.map((el, index) => (
          <div key={index} >
            <Link to={`/price/${el?.typeOfPhotography}`}>
              <PriceElement text={el?.typeOfPhotography} image={el?.mainPhoto}/>
            </Link>
          </div>
          ))}
        </div>
      <Footer/>
    </div>
  )
}

export default Price
