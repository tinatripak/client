import React from 'react'

const Shotting = ({text, image, price, list}) => {
  return (
    <div className={classes.shooting}>
        <h1 className={classes.shooting__h1}>{text}</h1>
        <div>
            <div>
                <p>{price}</p>
                <p>When you buy a photo shoot, you get:</p>
                <p>{list}</p>
            </div>
            <img src={image} alt="background" className={classes.shooting__img}/>
        </div>
    </div>
  )
}

export default Shotting
