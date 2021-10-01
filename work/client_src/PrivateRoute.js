import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

/*
/ Returns a higher order Route component that will redirect the user
/ to the Sign-in page if they are not logged in. In this app, protects
/ the Create and Update course routes.
*/

function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
            <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
};

export default PrivateRoute;