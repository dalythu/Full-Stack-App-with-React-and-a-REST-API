import React from 'react';

// Catch-all component that displays any time a user navigates to a non-existent URL.
export default function NotFound() {
    return(
        <div className="wrap">
                <h2>Not Found</h2>
                <p>Sorry! We couldn't find the page you're looking for.</p>
        </div>
    )
}