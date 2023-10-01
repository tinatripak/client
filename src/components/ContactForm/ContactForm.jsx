import React from "react";
import classes from "./ConactForm.module.scss";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    }
  }
  render() {
    return(
      
      <div className={classes.contactForm}>
        <form onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className={classes.contactForm__commonBlock}>
            <div className={classes.contactForm__commonBlock__formGroup__input}>
              <label htmlFor="name">Name:</label>
              <input type="text" value={this.state.name} onChange={this.onNameChange.bind(this)} />
            </div>
            <div className={classes.contactForm__commonBlock__formGroup__input}>
              <label htmlFor="email">Email:</label>
              <input type="email" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
            </div>
          </div>
          <div className={classes.contactForm__commonBlock__formGroup__textarea}>
            <label htmlFor="message">Your message:</label><br/>
            <textarea value={this.state.message} onChange={this.onMessageChange.bind(this)} />
          </div>
          <button className={classes.contactForm__commonBlock__formGroup__button}type="submit">Send</button>
        </form>
      </div>
    );
  }
  onNameChange(event) {
    this.setState({name: event.target.value})
  }
  onEmailChange(event) {
    this.setState({email: event.target.value})
  }
  onMessageChange(event) {
    this.setState({message: event.target.value})
  }
  handleSubmit(event) {
  }
}
export default ContactForm;