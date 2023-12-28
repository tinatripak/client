import React, { useState, useCallback } from "react";
import classes from "./ConactForm.module.scss";
import { createQuestion } from "../../services/QuestionService";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData],
  );

  const handleSubmit = () => {
    createQuestion(formData.name, formData.email, formData.message);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className={classes.contactForm}>
      <form onSubmit={handleSubmit}>
        <div className={classes.nameInput}>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.emailInput}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.messageTextarea}>
          <label htmlFor="message">Type your message here:</label>
          <br />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>

        <button className={classes.sendButton} type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
