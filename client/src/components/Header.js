import React from 'react';
import {Link} from 'react-router-dom';

// Header component conditionally renders Sign In/Sign Up, or greets the Authenticated user and shows Sign Out.
// Authentication status is maintained in global scope via context.
class Header extends React.Component {
    render() {
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        return(
            <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    {authUser ?
                        <ul className="header--signedin">
                            <li>Hello, {authUser.firstName} {authUser.lastName}</li>
                            <li><Link to='/signout'>Sign Out</Link></li>
                        </ul>
                    :
                        <ul className="header--signedout">
                            <li><Link to='/signup'>Sign Up</Link></li>
                            <li><Link to='signin'>Sign In</Link></li>
                        </ul>
                    }
                </nav>
            </div>
            </header>
        )
    }
}

export default Header;