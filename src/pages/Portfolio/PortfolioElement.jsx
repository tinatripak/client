import React from 'react'
import classes from "./PortfolioElement.module.scss";

const PortfolioElement = ({name, text, image}) => {
  return (
    <div className={classes.element}>
        <div className={classes.element__div}>
            <img src={image} className={classes.element__div__img} alt="photo"/>
            <p className={classes.element__div__name}>{name}</p>
            <p className={classes.element__div__text}>{text}</p>
        </div>
    </div>
  )
}

export default PortfolioElement
