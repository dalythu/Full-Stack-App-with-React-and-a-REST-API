import React from 'react';

// Component that displays if the user tries to access the Update Course page on a course they do not own.
export default function Forbidden() {
    return(
        <div className="wrap">
                <h2>Error</h2>
                <p>Uh-Oh! You can't access this page.</p>
        </div>
    )
}