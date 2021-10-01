// Will provide access to Data functions to all the different components in the app
// Will include Sign Up, Sign In, and Sign Out actions of its own

import React, { Component } from 'react';
import Data from './Data';

import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {

    state = {
        // Persists user authentication using cookies
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        authenticatedPassword: Cookies.getJSON('authenticatedPassword') || null
    };

    constructor(){
        super();
        this.data = new Data();
    }

    render() {
        const {authenticatedUser, authenticatedPassword} = this.state;
        const value = {
            authenticatedUser,
            authenticatedPassword,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            }
        };

        return(
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    /*
        Below are Context's helper methods for signIn and signOut
    */


    // Sign In function
    // Sets global authenticated user state and cookies.
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                    authenticatedPassword: password
                };
            });
            // Configures cookies so that user authentication credentials will persist
            // across user's sessions in the app or browser windows.
            Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
            Cookies.set('authenticatedPassword', JSON.stringify(password), {expires: 1});

        }
        return user;
    }

    // Sign Out function
    // Resets global authenticated user state and cookies.
    signOut = () => {
        this.setState(() => {
            return {
                authenticatedUser: null,
            };
        });
        // Deletes authenticated user's cookies.
        Cookies.remove('authenticatedUser');
        Cookies.remove('authenticatedPassword');
    }
}

/*
    Context also needs to export two additional components:
    The Consumer component, and the withContext higher order component
    That will wrap and enhance the components that need to subscribe
    to Context in a Consumer so they have access to Context's
    state and actions.
*/

export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}