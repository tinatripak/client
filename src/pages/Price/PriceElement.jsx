import React from 'react'
import classes from "./PriceElement.module.scss";

const PriceElement = ({text, image}) => {
  return (
    <div className={classes.element}>
      <article>
        <img src={image} alt="background" className={classes.element__img}/>
        <h1 className={classes.element__h1}>{text}</h1>
      </article>
    </div>
  )
}

export default PriceElement
