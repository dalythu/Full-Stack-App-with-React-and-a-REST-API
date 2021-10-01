import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function UpdateCourse (props) {
    const {id} = useParams();
    const [courseDetails, setCourseDetails] = useState([]);
    const [user, setUser] = useState([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    const {context} = props;
    const {authenticatedUser, authenticatedPassword} = context;
    const [userId] = useState(authenticatedUser.id);
    const [emailAddress] = useState(authenticatedUser.emailAddress);
    const [password] = useState(authenticatedPassword);

    // When component mounts, fetches the specific data on this course from the API and stores data in state.
    useEffect(() => {
      context.data.getCourseDetails(id)
      .then(courseData => {
        if(!courseData){ // If no course data available, redirect to not found
          props.history.push('/notfound')
        } else if(courseData.user.id !== userId) {  // If user is not owner, redirect to forbidden
          props.history.push('/forbidden');
        } else {
          setCourseDetails(courseData);
          setUser(courseData.user);
          setTitle(courseData.title);
          setDescription(courseData.description);
          setEstimatedTime(courseData.estimatedTime);
          setMaterialsNeeded(courseData.materialsNeeded);
        }
      })
      .catch(err => {
        console.log(err);
        props.history.push('/error');
      })

    }, [context.data, id, props.history, userId]);

  // Handles course update process. Bundles the data from the form and performs
    // a PUT request to the API. If successful, redirects user back to that course's detail page.
    async function submit() {
        const {context} = props;

        const course = {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          userId
        };

        await context.data.updateCourse(courseDetails.id, course, emailAddress, password)

        .then(errors => {
          if(errors.length) {
            setErrors(errors);
          } else {
            props.history.push(`/courses/${courseDetails.id}`)
          }
        })
        .catch( err => {
          console.log(err);
          props.history.push('/error');
        });
    }

    // Cancel button handler - returns the user to the details page of the course they were viewing.
    function cancel() {
        props.history.push(`/courses/${courseDetails.id}`);
    }

    // Helper component that returns a list of formatted validation errors returned by the server, if there are any.
    function ErrorsDisplay() {
      let errorsDisplay = null;

      if (errors.length) {
        errorsDisplay = (
          <div className="validation--errors">
            <h2>Validation error(s)</h2>
            <div>
              <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
              </ul>
            </div>
          </div>
        );
      }

      return errorsDisplay;
    }

    // To-Do: Re-create this component using Form child element.
    return(
        <div className="wrap">
            <h2>Update Course</h2>
            <ErrorsDisplay />
            <form onSubmit={(e) => {e.preventDefault(); submit()}}>
                <div className="main--flex">

                    <div>
                        <label for="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(e) => {setTitle(e.target.value);}}/>
                        <p>By {user.firstName} {user.lastName}</p>

                        <label for="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" defaultValue={description} onInput={(e) => {setDescription(e.target.value);}}></textarea>
                    </div>

                    <div>
                        <label for="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e) => {setEstimatedTime(e.target.value);}}/>
                        <label for="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={materialsNeeded} onInput={(e) => {setMaterialsNeeded(e.target.value);}}></textarea>
                    </div>

                </div>

                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onClick={cancel}>Cancel</button>
            </form>
        </div>
  )

}

export default UpdateCourse;