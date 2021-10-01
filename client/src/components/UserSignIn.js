import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }


    render() {
        const {
            emailAddress,
            password,
            errors
        } = this.state;


    return(
        <div className="form--centered">
            <h2>Sign In</h2>
            <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Sign In"
                elements={() => (
                    <React.Fragment>
                        <input
                            id="emailAddress"
                            name="emailAddress"
                            type="text"
                            value={emailAddress}
                            onChange={this.change}
                            placeholder="Email Address"
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.change}
                            placeholder="Password"
                        />
                    </React.Fragment>
                )}
            />
            <p>
                Don't have a user account? <Link to="/signup">Click Here</Link> to sign up!
            </p>
        </div>
    )
}

  // Helper functions for this component

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


    // Submit button handler.
    // If necessary, uses the from property of props.location.state to return the user to
    // the page they were attempting to access before they were redirected.
    // Throws an error if authentication fails.
    submit = () => {
      const {context} = this.props;
      const {from} = this.props.location.state || { from: {pathname: '/'}};
      const {emailAddress, password} = this.state;
      context.actions.signIn(emailAddress, password)
        .then( user => {
          if(user === null) {
            this.setState(() => {
              return { errors: ['Sign-in was unsuccessful']};
            });
          } else {
            this.props.history.push(from);
          }
        })
        .catch( err => {
          console.log(err);
          this.props.history.push('/error');
        })
    }

    // Cancel button handler - returns user to the home page
    cancel = () => {
      this.props.history.push('/');
    }

}