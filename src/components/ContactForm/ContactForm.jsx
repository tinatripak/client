import React, { useState, useCallback } from "react";
import classes from "./ConactForm.module.scss";
import { createQuestion } from "../../services/QuestionService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormInputValidation } from "react-form-input-validation";

const ContactForm = () => {
  const [fields, errors, form] = useFormInputValidation({
    name: "",
    email: "",
    question: "",
  }, {
    name: "required",
    email: "required|email",
    question: "required|min:5",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await form.validate(e);
    if (isValid) {
      try {
        const response = await createQuestion(
          fields.name,
          fields.email,
          fields.question
        );

        if (response.success) {
          toast.success("Your question was sent to the photographer!");
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } else {
          toast.error("Failed to create the question. Please try again.")
        }
      } catch (error) {
        console.log(error)
        toast.error("An error occurred. Please try again.")
      }
    }else{
      toast.error("Your fields are not valid. Try again.")
    }
  };


  return (
    <div className={classes.contactForm}>
      <form noValidate
    autoComplete="off" onSubmit={handleSubmit}>
        <div className={classes.nameInput}>
          <label htmlFor="name">Name:</label>
          <br />
          <label className={classes.error}>
            {errors.name
              ? errors.name
              : ""}
          </label>
          <br />
          <input
            type="text"
            name="name"
            onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent}
            value={fields.name}
          />
        </div>

        <div className={classes.emailInput}>
          <label htmlFor="email">Email:</label>
          <br />
          <label className={classes.error}>
            {errors.email
              ? errors.email
              : ""}
          </label>
          <br />
          <input
            type="email"
            name="email"
            onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent}
            value={fields.email}
          />
        </div>

        <div className={classes.messageTextarea}>
          <label htmlFor="question">Type your question here:</label>
          <br />
          <label className={classes.error}>
            {errors.question
              ? errors.question
              : ""}
          </label>
          <br />
          <textarea
            name="question"
            onBlur={form.handleBlurEvent}
            onChange={form.handleChangeEvent}
            value={fields.question}
          />
        </div>

        <button className={classes.sendButton} type="submit">
          SUBMIT
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;

