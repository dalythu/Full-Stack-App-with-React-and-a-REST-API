import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;


    return (
      <div className="form--centered">
          <h2>Sign Up</h2>
          <Form
            cancel={this.cancel} //These are props.
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => ( //Elements is a "render prop"
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name" />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name" />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={this.change}
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
    );
  }

  // Helper Functions for this Component

  // Form input change handler
  // Sets the state value of each input's corresponding state component to the value inputted
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // Submit button handler
  // Creates user on sign up and returns them to the home page.
  // Will return errors from the API as well as one client-side validation
  // If Password and Confirm Password fields do not match.
  submit = () => {
    const {context} = this.props;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

     context.data.createUser(user)
     .then(errors => {
       if(password !== confirmPassword){
          errors.push("Both passwords must match.") // No need to set state here, just need to push it into the errors array.
         }
       if(errors.length) {
         this.setState({errors});
       } else {
         context.actions.signIn(emailAddress, password)
         this.props.history.push('/')
     }
   })
    .catch(err => {
     console.log(err);
     this.props.history.push('/error');
   });
  }

  // Cancel button handler - returns the user to the home page.
  cancel = () => {
    this.props.history.push('/');
  }
}