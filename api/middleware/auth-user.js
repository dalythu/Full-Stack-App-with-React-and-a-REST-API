'use strict';

const auth = require('basic-auth'); // require node's basic auth module
const bcrypt = require('bcryptjs');
const {
  User
} = require('../models');

// Middleware to authenticate the request using Basic Authentication.
exports.authenticateUser = async (req, res, next) => {
  let message; // store the message to display

  // Parses the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  // Attempt to retrieve the user from the data store
  // by their emailAddress (i.e. the user's "key"
  // from the Authorization header).
  if (credentials) {
    const user = await User.findOne({
      where: {
        emailAddress: credentials.name
      }
    });

    // If a user was successfully retrieved from the data store...
    // Use the bcrypt npm package to compare the user's password
    // (from the Authorization header) to the user's password
    // that was retrieved from the data store.
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);

      // If the passwords match...
      // Store the retrieved user object on the request object
      // so any middleware functions that follow this middleware function
      // will have access to the user's information.
      if (authenticated) { //if the passwords match
        console.log(`Authentication successful for email address: ${user.emailAddress}`);

        // Store the user on the Request object.
        req.currentUser = user; // adding a property called currentUser to the request object and setting it as the authenticated user

      } else {
        message = `Authentication failure for email address: ${user.emailAddress}`;
      }
    } else {
      message = `User not found for email address: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }
  // If user authentication failed...
  // Return a response with a 401 Unauthorized HTTP status code.
  if (message) {
    console.warn(message);
    res.status(401).json({
      message: 'Access Denied '
    });
    // Or if user authentication succeeded...
    // Call the next() method.
  } else {
    next();
  }
};