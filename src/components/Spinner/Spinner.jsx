import React from "react";
import classes from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={classes.spinnerBody}>
      <div className={classes.spinner}>
        <svg
          className={classes.rotatingText}
          viewBox="0 0 200 200"
          width="300"
          height="300"
        >
          <defs>
            <path
              id="circle"
              d="M 100, 100
                  m -75, 0
                  a 75, 75 0 1, 0 150, 0
                  a 75, 75 0 1, 0 -150, 0
                "
            ></path>
          </defs>
          <text width="400">
            <textPath
              alignmentBaseline="top"
              xlinkHref="#circle"
              className={classes.text}
            >
              ·KSIGALLERY·KSIGALLERY·KSIGALLERY·KSIGALLERY·
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Spinner;
