import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom';

// Executes the signOut function from Context and redirects user to the home page.
function UserSignOut (props) {
    const {context} = props;

    useEffect(() => context.actions.signOut());
    return(
        <Redirect to='/' />
    )
}

export default UserSignOut;