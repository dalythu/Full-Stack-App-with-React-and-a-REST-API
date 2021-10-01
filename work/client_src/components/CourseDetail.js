
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Provides access to URL parameters

// Formats the course data in markdown format to correctly display on the page
import ReactMarkdown from 'react-markdown';


export default function CourseDetail (props) {
    const {id} = useParams();
    const [courseDetails, setCourseDetails] = useState([]);
    const [owner, setOwner] = useState([])
    const {context} = props;
    const {authenticatedUser, authenticatedPassword} = context;
    const [currentUserId, setCurrentUserId] = useState("");
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("");

    // On render, fetches the specific course's details from the API and stores data in state.
    useEffect(() => {
        context.data.getCourseDetails(id)
        .then(courseData => {
            if(courseData) {
                setCourseDetails(courseData);
                setOwner(courseData.user);
            } else {
                props.history.push('/notfound');
            }
         })
         .catch(err => {
             console.log(err);
             props.history.push('/error');
         })

        if(authenticatedUser !== null){
            setCurrentUserId(authenticatedUser.id);
            setEmailAddress(authenticatedUser.emailAddress);
            setPassword(authenticatedPassword);
        }

    }, [authenticatedPassword, authenticatedUser, context.data, id, props.history]);

    // Performs deletion of the course and takes the user back to the home page.
    function deleteHandler() {
        context.data.deleteCourse(id, emailAddress, password)
        .then(errors => {
                context.data.getCourses();
                props.history.push('/');
            })
        .catch(err => {
            console.log(err);
            props.history.push('/error');
        })
    }

        return(
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                    {(owner.id === currentUserId) ?
                    <React.Fragment>
                        <Link className="button" to={`/courses/${id}/update/`}>Update Course</Link>
                        <button className="button" onClick={(e) => {e.preventDefault(); deleteHandler()}}>Delete Course</button>
                    </React.Fragment>
                    : null }
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
                <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courseDetails.title}</h4>
                            <p>By {owner.firstName} {owner.lastName}</p>
                            <p><ReactMarkdown>{courseDetails.description}</ReactMarkdown></p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseDetails.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                            <ReactMarkdown>{courseDetails.materialsNeeded}</ReactMarkdown>
                            </ul>
                        </div>
                    </div>
                </form>
                </div>
            </main>
        );
}