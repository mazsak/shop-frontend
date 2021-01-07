import React from 'react';
import NavBar from './NavBar';

Error = () => {
    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <p>Error: Page does not exist!</p>
        </div>
    );
}

export default Error;