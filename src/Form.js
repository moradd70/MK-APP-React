import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import logo from './mk_logo.png';
import axios from 'axios';
import $ from 'jquery';
export default class Form extends React.Component {
  state = {
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailError: "",
    message: "",
    messageError: ""
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      messageError: ""
    };
    if (this.state.firstName.length < 3) {
      isError = true;
      errors.firstNameError = "First Name is required";
    }
    if (this.state.lastName.length < 3) {
      isError = true;
      errors.lastNameError = "Last Name required";
    }
    if (this.state.email.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Requires valid email";
    }
    if (this.state.message.length < 5) {
      isError = true;
      errors.messageError = "Your message bust be at least 5 characters ";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  
  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    const err = this.validate();
    if (!err) {
      // clear form
      this.setState({
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        email: "",
        emailError: "",
        message: "",
        messageError: ""
      });
      this.props.onChange({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
      });
    }
  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, email,  message } = this.state;
    const API_URL = 'https://n1dgone2fb.execute-api.us-east-1.amazonaws.com/beta';
    await axios.post(
      API_URL,
      { key1: `${firstName}, ${lastName}, ${email}, ${message}` }
    );
      $.ajax({
        ContentType: 'application/json',
        data: JSON.stringify(firstName, lastName, email, message),
        dataType: 'json',
        type: 'POST',
        url: API_URL,
      })
      .done(() => this.handleSuccess())
      .fial(() => this.handleError());
      event.preventDefault(); 
  }

//render the form 
  render() {
    return (
      <div>
        <img src={logo} alt="My logo" height="50" weight="50"/>
        <h1> MKD Contact Form</h1>
       <form className="form">
        <TextField
          id="firtName"
          name="firstName"
          hintText="First Name"
          floatingLabelText="First Name"
          value={this.state.firstName}
          onChange={e => this.handleChange}
          errorText={this.state.firstNameError}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="Last Name"
          name="lastName"
          hintText="Last Name"
          floatingLabelText="Last Name"
          value={this.state.lastName}
          onChange={e => this.handleChange}
          errorText={this.state.lastNameError}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="email"
          name="email"
          hintText="Email"
          floatingLabelText="Email"
          value={this.state.email}
          onChange={e => this.handleChange}
          errorText={this.state.emailError}
          floatingLabelFixed
        />
        <br />
        <TextField
          id="message"
          name="message"
          hintText="message"
          floatingLabelText="message"
          value={this.state.message}
          onChange={e => this.handleChange}
          errorText={this.state.messageError}
          type="message"
          floatingLabelFixed
        />
        <br />
        <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary />
      </form>
      </div>
    );
    
  }
}
