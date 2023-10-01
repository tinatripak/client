import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import PortfolioElement from './PortfolioElement'
import classes from "./Portfolio.module.scss";

const Portfolio = () => {
  return (
    <div>
      <Header/>
      <div className={classes.portfolio}>
        <PortfolioElement name="Kristina" text="Portrait photography" image="https://drive.google.com/uc?export=view&id=1-K8Nco0ZlAIG4S3w6DSa9fu86w_41dzY"/>
        <PortfolioElement name="Katya" text="Wedding photography" image="https://drive.google.com/uc?export=view&id=1P1TEf-zKRcdOK12pEZSggDL2tae774Dh"/>
        <PortfolioElement name="Olga" text="Vacation photography" image="https://drive.google.com/uc?export=view&id=1jktkMWzfjyvUITP7yaUne9S0enU76gaR"/>

        <PortfolioElement name="Oleksandra" text="Portrait photography" image="https://drive.google.com/uc?export=view&id=1AThCp_aejFQrskf_WVprpyEOFzTGX_uE"/>
        <PortfolioElement name="Oleksandra" text="Wedding photography" image="https://drive.google.com/uc?export=view&id=1OXqcY5pP0iXXYzhcdDeQCAMWdnLwZJGJ"/>
        <PortfolioElement name="Women's course" text="Vacation photography" image="https://drive.google.com/uc?export=view&id=1XH5lGO-HfqqQobjFWH34OiBh2X9aG0z8"/>

        <PortfolioElement name="Kristina" text="Portrait photography" image="https://drive.google.com/uc?export=view&id=1VhSb4moyHp-BDQaV4mzJ_540Ay6apVP-"/>
        <PortfolioElement name="Veronika" text="Wedding photography" image="https://drive.google.com/uc?export=view&id=18vxjnz7kYHW3fTY4EQy8lSpQBELxGzV4"/>
        <PortfolioElement name="Kristina" text="Vacation photography" image="https://drive.google.com/uc?export=view&id=1Gp-unI_ZJ-oBE3r9mUTnYi1VltllOUFT"/>

        <PortfolioElement name="Oleksandra" text="Portrait photography" image="https://drive.google.com/uc?export=view&id=1EFdI7mLo7ljgidf_MdZGV22MNggI6RPG"/>
        <PortfolioElement name="Kristina" text="Wedding photography" image="https://drive.google.com/uc?export=view&id=16g8nJRs-ncT4YUwTs6uVef4drnVR-BpO"/>
        <PortfolioElement name="Kristina" text="Vacation photography" image="https://drive.google.com/uc?export=view&id=1XLnvuF5m0JaYL6hbgR-ceTpxqVDKOAwn"/>
      </div>
      <Footer/>
    </div>
  )
}

export default Portfolio
