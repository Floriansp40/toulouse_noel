import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            La page home
            {process.env.REACT_APP_API_URL}
            <p>
                <Link to="admin">Admin</Link>
            </p>
        </div>
    );
};

export default Home;