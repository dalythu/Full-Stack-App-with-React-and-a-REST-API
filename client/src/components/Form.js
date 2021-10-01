import React from 'react';

// Form component that is used in Sign In and Sign Up.
function Form(props) {
    const {
        cancel,
        errors,
        submit,
        submitButtonText,
        elements,
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    // Utilizes render prop for form elements.
    return (
        <React.Fragment>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
            {elements()}
            <button className="button" type="submit">{submitButtonText}</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </React.Fragment>
    );
}

// Secondary component that shows validation errors on submit.
function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
      errorsDisplay = (
        <div className="validation--errors">
          <h2 className="">Validation error(s)</h2>
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

export default Form;