import React from 'react';
import './App.css';

function NotFound() {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for doesn't exist or has been moved.</p>
            <a href="/" className="back-home-button">Back to Home</a>
        </div>
    );
}

export default NotFound;