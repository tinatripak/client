import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyBooking } from "../../api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from "./VerifyBooking.module.scss";

const VerifyBooking = () => {
  const { uniqueString } = useParams();
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    verifyBooking(uniqueString)
      .then((data) => {
        setIsValid(data?.data?.isValid);
        setData(data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={classes.verification}>
      <Header />
      <div className={classes.verification__firework}></div>
      <div className={classes.verification__firework}></div>
      <div className={classes.verification__firework}></div>
      {isValid && (
        <p className={classes.verification__textIfCompleted}>
          Thank you for confirming your reservation. Booking made by{" "}
          {data?.name} with email {data?.email} on {data?.date} at{" "}
          {data?.startTime} confirmed
        </p>
      )}
      <Footer />
    </div>
  );
};

export default VerifyBooking;
