import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ContactForm from "../../components/ContactForm/ContactForm";
import classes from "./Contact.module.scss";
import { LiaTelegram } from "react-icons/lia";
import { FaViber } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

const Contact = () => {
  return (
    <div>
      <div className={classes.contact__image}>
        <Header />
      </div>
      <div className={classes.contact__content}>
        <p>Ksenia Tripak</p>
        <p>
          If you want to contact with me, you can find me  in the Telegram/Viber/WhatsApp: +380953518578
        </p>
        <ul>
          <li>
            <a href=""><FaViber className={classes.contact__content__icons__viber}/> </a>
          </li>
          <li>
            <a href="https://t.me/kseniatripak"><LiaTelegram className={classes.contact__content__icons__telegram}/></a>
          </li>
          <li>
            <a href=""><BsWhatsapp className={classes.contact__content__icons__whatsapp}/></a>
          </li>
        </ul>
        <p>Also you can fill out the form bellow:</p>
      </div>
      <div className={classes.contact__contactForm}>
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
