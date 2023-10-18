import React, { useEffect, useState } from "react";
import classes from "./ConactForm.module.scss";
import { createQuestion } from "../../api";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    createQuestion(name, email, message)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={classes.contactForm}>
      <form onSubmit={handleSubmit}>
        <div className={classes.contactForm__commonBlock}>
          <div className={classes.contactForm__commonBlock__nameInput}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={classes.contactForm__commonBlock__emailInput}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.contactForm__messageTextarea}>
          <label htmlFor="message">Your message:</label>
          <br />
          <textarea
            defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        <button className={classes.contactForm__sendButton} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
