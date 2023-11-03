import React from "react";
import classes from "./NotFound.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {notFoundImage} from "../../constants.js"


const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <div className={classes.notFound__photo}>
        <LazyLoadImage
          src={notFoundImage}
          effect="blur"
        />
      </div>
      <h3>No records has been added yet.</h3>
      <h4>Add a new record by clicking the button on top center side.</h4>
    </div>
  );
};

export default NotFound;
