import React from "react";
import classes from "./NotFound.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <div className={classes.notFound__photo}>
        <LazyLoadImage
          src="http://res.cloudinary.com/dcxuxc5uw/image/upload/v1696457741/ue0nzgv7y4j7mlcw0qml.png"
          effect="blur"
        />
      </div>
      <h3>No records has been added yet.</h3>
      <h4>Add a new record by clicking the button on top center side.</h4>
    </div>
  );
};

export default NotFound;
