import React from "react";
import { Header, Footer, ContactForm } from "../../components";
import classes from "./ContactUs.module.scss";
import { instagramURL } from "../../constants";

const ContactsUs = () => {
  return (
    <div>
      <Header />
      <div className={classes.contacts}>
        <div className={classes.contacts__info}>
          <div className={classes.contacts__info__talk}>
            <h1>Let's talk</h1>
            <p>
              Do you have any questions about photography or want to
              collaborate? Leave a message here and we'll be sure to get back to
              you
            </p>
          </div>
          <div className={classes.contacts__info__email}>
            <h4>EMAIL</h4>
            <p>kseniatripak@gmail.com</p>
          </div>
          <div className={classes.contacts__info__out}>
            <h4>CHECK US OUT</h4>
            <a href={instagramURL}>Instagram</a>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactsUs;
