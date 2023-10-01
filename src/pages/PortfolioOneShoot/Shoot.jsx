import React from 'react'
import classes from "./Shoot.module.scss";


const Shoot = ({name, text}) => {
  return (
    <div className={classes.shoot}>
      <p className={classes.shoot__h1}>{name}'s photoshoot</p>
      <p className={classes.shoot__h3}>{text}</p>
      <div className={classes.shoot__photos}>
        <figure className={classes.shoot__photos__item1}>
          <img src="https://drive.google.com/uc?export=view&id=184blxyv48ODVm324jPrIk1wc_5hq9lcC" alt="Gallery image 1" className={classes.shoot__photos__img}/>
        </figure>
        <figure className={classes.shoot__photos__item2}>
          <img src="https://drive.google.com/uc?export=view&id=1zOixOh8WYi5ypp7yTNKtAJL4QlGZ2Gyw" alt="Gallery image 2" className={classes.shoot__photos__img}/>
        </figure>
        <figure className={classes.shoot__photos__item3}>
          <img src="https://drive.google.com/uc?export=view&id=1NB5SzA-4eFGJlyKK5UwVC_LIhOwo3ryb" alt="Gallery image 3" className={classes.shoot__photos__img}/>
        </figure>
        <figure className={classes.shoot__photos__item4}>
          <img src="https://drive.google.com/uc?export=view&id=1KqqbzAvI8jShEz8iBoApQeq465O3QffZ" alt="Gallery image 4" className={classes.shoot__photos__img}/>
        </figure>
        <figure className={classes.shoot__photos__item5}>
          <img src="https://drive.google.com/uc?export=view&id=19iV9uJUGk-9D_V3L6w6U0Dq11-_MW6aF" alt="Gallery image 5" className={classes.shoot__photos__img}/>
        </figure>
        <figure className={classes.shoot__photos__item6}>
          <img src="https://drive.google.com/uc?export=view&id=1umsJTFFpo1CDU4tf0vSpKipcznXBfGDT" alt="Gallery image 6" className={classes.shoot__photos__img}/>
        </figure>
      </div>
    </div>
  )
}

export default Shoot
