import {RiEditCircleLine} from 'react-icons/ri';
import React, { useEffect, useState } from 'react'
import classes from "./Bio.module.scss";
import { getPhotographers } from '../../../services/BioService'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { adminDashboardLink, bioLink, editLink } from '../../../constants';


const Bio = () => {
  const [bioInfo, setBioInfo] = useState({});

    useEffect(() => {
      fetchBioData();
    },[]);

    const fetchBioData = () => {
      getPhotographers()
        .then((data) => {
          setBioInfo(data?.data[0]);
        })
        .catch((error) => {
            console.error(error);
        });
    }

  return (
    <div className={classes.bio}>
      <div className={classes.bio__photo}>
        <LazyLoadImage src={bioInfo.photo}
          effect="blur"
        />
        <div className={classes.bio__photo__edit}>
          <p>Photographer</p>
          <span className={classes.bio__photo__edit__icon}>
            <Link to={`${adminDashboardLink}${bioLink}${editLink}/${bioInfo?._id}`}>
              <RiEditCircleLine size={22} />
            </Link>
          </span>
        </div>
      </div>
      <div className={classes.bio__article}>
        <div className={classes.bio__article__edit}>
          <p>Bio about photographer</p>
        </div>
        <div>
          {bioInfo.bio}
        </div>
      </div>
      <div className={classes.bio__phoneNumber}>
        <div className={classes.bio__phoneNumber__edit}>
          <p>Phone number</p>
        </div>
        <div>
          {bioInfo.phoneNumber}
        </div>
      </div>
    </div>
  )
}

export default Bio