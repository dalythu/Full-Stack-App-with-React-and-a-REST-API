import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Renders course cards on the home page via GET request to the API.
export default class Courses extends Component {

    state = {
        courseData: [],
        authenticatedUser: []
      };

    // On mount, uses the Data helper functions provided by Context to perform GET request to API.
    // Stores the resulting information in state, as well as info about authenticated user.
    componentDidMount() {
        this.props.context.data.getCourses()
        .then(courseData => this.setState({courseData}))
        .catch(err => {
            console.log(err);
            this.props.history.push('/error');
        });

        this.setState({authenticatedUser: this.props.context.authenticatedUser})
    }

    render() {
        const {courseData} = this.state;

    return(
        <main>
                <div className="wrap main--grid">
                {courseData.map((course, i) => ( // Add key prop to course to fix console warning
                <Link className="course--module course--link" to={`/courses/${course.id}`} key={i}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
                ))}
                <Link className="course--module course--add--module" to="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        </main>
    );
    }
}