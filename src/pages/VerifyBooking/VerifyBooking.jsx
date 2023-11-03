import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyBooking } from "../../services/BookingService";
import { Header, Footer, ConditionalRender } from "../../components";
import classes from "./VerifyBooking.module.scss";

const VerifyBooking = () => {
  const { uniqueString } = useParams();
  const [data, setData] = useState({});
  const [isLoadedData, setIsLoadedData] = useState(false);

  useEffect(() => {
    fetchVerifiedBookingData();
  }, []);

  const fetchVerifiedBookingData = () => {
    verifyBooking(uniqueString).then((data) => {
      setData(data?.data);
      setIsLoadedData(true);
    });
  };

  return (
    <ConditionalRender
      conditions={[isLoadedData]}
      content={
        <div className={classes.verification}>
          <Header />
          <div className={classes.firework}></div>
          <div className={classes.firework}></div>
          <div className={classes.firework}></div>
          {data?.isValid && (
            <p className={classes.textIfCompleted}>
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
