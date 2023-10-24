import React, { useState } from "react";
import classes from "./ConactForm.module.scss";
import {createQuestion} from '../../services/QuestionService'

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    createQuestion(name, email, message);
      
    setMessage('');
    setName('');
    setEmail('');
  };

  return (
    <div className={classes.contactForm}>
      <form onSubmit={handleSubmit}>
          <div className={classes.contactForm__nameInput}>
            <label htmlFor="name">Name:</label>
            <br />
            <input
              type="text"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={classes.contactForm__emailInput}>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

        <div className={classes.contactForm__messageTextarea}>
          <label htmlFor="message">Type your message here:</label>
          <br />
          <textarea
            defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        <button className={classes.contactForm__sendButton} type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
