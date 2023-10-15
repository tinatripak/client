import React from "react";
import Spinner from "../../components/Spinner/Spinner";

const Shotting = ({ text, image, price, list }) => {
  const [loading, setLoading] = useState(true);
  const imageLoaded = () => {
    setLoading(false);
  };
  return (
    <>
      <div style={{ display: loading ? "block" : "none" }}>
        <Spinner />
      </div>
      <div style={{ display: loading ? "none" : "block" }}>
        <div className={classes.shooting}>
          <h1 className={classes.shooting__h1}>{text}</h1>
          <div>
            <div>
              <p>{price}</p>
              <p>When you buy a photo shoot, you get:</p>
              <p>{list}</p>
            </div>
            <img
              src={image}
              alt="background"
              className={classes.shooting__img}
              onLoad={imageLoaded}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shotting;
