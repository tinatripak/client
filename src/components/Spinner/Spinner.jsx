import React from "react";
import classes from "./Spinner.module.scss";


const Spinner = () => {
  return (
    <div className={classes.spinner}>
      <div className={classes.spinner__loader}></div>
    </div>
  );
};

export default Spinner;
