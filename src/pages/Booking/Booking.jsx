import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from "./Booking.module.scss";
import { LiaTelegram } from "react-icons/lia";
import { FaViber } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { getPhotographerInfo } from "../../api";

import { DtPicker } from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/style.css";

const Contact = () => {
  const [bio, setBio] = useState([]);
  useEffect(() => {
    getPhotographerInfo()
      .then((data) => {
        setBio(data?.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const [date, setDate] = useState(null);
  useEffect(() => {
    console.log(date);
  }, [date]);
  
  const handleSubmit = () => {

  }
  return (
    <div className={classes.booking}>
      <Header />
      <div className={classes.booking__content}>
        <p>Ksenia Tripak</p>
        <p>
          If you want to contact with me {bio?.phoneNumber} or you can find me
          in the Telegram/Viber/WhatsApp:
        </p>
        <ul>
          <li>
            <a href="viber://chat?number=+380953518578">
              <FaViber className={classes.booking__content__icons__viber} />{" "}
            </a>
          </li>
          <li>
            <a href="https://t.me/kseniatripak">
              <LiaTelegram
                className={classes.booking__content__icons__telegram}
              />
            </a>
          </li>
          <li>
            <a href="">
              <BsWhatsapp
                className={classes.booking__content__icons__whatsapp}
              />
            </a>
          </li>
        </ul>
        <p>Also you can fill out the form bellow:</p>
      </div>
      <div className={classes.booking__contactForm}>
      <form onSubmit={handleSubmit} method="POST">
          <div className={classes.booking__contactForm__commonBlock}>
            <div>
              <DtPicker
              onChange={setDate}
              withTime
              showTimeInput
              minDate={new Date()}
              placeholder="Choose a photoshoot's date"
              clockLabel="Choose time"
              isRequired
            />
            </div>
            <div className={classes.booking__contactForm__commonBlock__formGroup__input}>
              <label htmlFor="name">Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.name)} />
            </div>
            <div className={classes.booking__contactForm__commonBlock__formGroup__input}>
              <label htmlFor="email">Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.name)} />
            </div>
          </div>
          <div className={classes.booking__contactForm__commonBlock__formGroup__textarea}>
            <label htmlFor="message">Your message:</label><br/>
            <textarea value={message} onChange={(e) => setMessage(e.target.name)} />
          </div>
          <button className={classes.booking__contactForm__commonBlock__formGroup__button}type="submit">Send</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
