import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyBooking } from "../../api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from "./VerifyBooking.module.scss";
import ConditionalRender from "../../components/ConditionalRender/ConditionalRender";

const VerifyBooking = () => {
  const { uniqueString } = useParams();
  const [data, setData] = useState({});
  const [isLoadedData, setIsLoadedData] = useState(false);

  useEffect(() => {
    verifyBooking(uniqueString)
      .then((data) => {
        setData(data?.data);
        setIsLoadedData(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ConditionalRender
      conditions={[isLoadedData]}
      content={
        <div className={classes.verification}>
          <Header />
          <div className={classes.verification__firework}></div>
          <div className={classes.verification__firework}></div>
          <div className={classes.verification__firework}></div>
          {data?.isValid && (
            <p className={classes.verification__textIfCompleted}>
              Thank you for confirming your reservation. Booking made by{" "}
              {data?.name} with email {data?.email} on {data?.date} at{" "}
              {data?.startTime} confirmed
            </p>
          )}
          <Footer />
        </div>
      }
    />
  );
};

export default VerifyBooking;
