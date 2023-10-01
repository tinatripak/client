import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import PriceElement from './PriceElement'
import classes from "./Price.module.scss";

const Price = () => {
  return (
    <div>
      <Header/>
        <div className={classes.price}>
          <PriceElement text="Portrait photography" image="https://drive.google.com/uc?export=view&id=1NqITDV0TFZ2-wnRSBTDqCkO_P8A2J717"/>
          <PriceElement text="Wedding photography" image="https://drive.google.com/uc?export=view&id=1yNGYfRgTzk6-r0hKHU9K9Nj66_G457zU"/>
          <PriceElement text="Vacation photography" image="https://drive.google.com/uc?export=view&id=1rZekpjuZYwEs5VQC5gF2D27MDq6h7nYR"/>
          <PriceElement text="Branding photography" image="https://drive.google.com/uc?export=view&id=1TXbRMuHPOGZNOmoU6GJ9-QilD8CS-lif"/>
          <PriceElement text="Fashion" image="https://drive.google.com/uc?export=view&id=1bpT8nE0Fk5MUT8gLj1MqPaK1y9Zpii7O"/>
          <PriceElement text="Architectural interior" image="https://drive.google.com/uc?export=view&id=1R-lQL0-MGBAJEj4Cr4Vj3-wd9l9oNWqq"/>
        </div>
      <Footer/>
    </div>
  )
}

export default Price
