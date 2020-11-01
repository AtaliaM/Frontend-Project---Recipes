import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
    return (
        <>
            <h1 style={{marginBottom:"20px"}}>Plan your meals</h1>
            <div className="btn-container">
                <button><Link to="/recipes">Search for recipes</Link></button>
                <button><Link to="/random">Get a random recipe</Link></button>
            </div>
        </>

    )
}

export default Homepage;