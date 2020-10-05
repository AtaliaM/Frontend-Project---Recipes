import React from 'react';
import { Link } from 'react-router-dom';
import SearchDataForResults from './SearchDataForResults';
//here Ill have searchDataforresults, 

const Homepage = () => {
    return (
        <>
            <h1>Plan your meals</h1>
            <button style={{width:"500px"}}><Link to="/recipes">Search for recipes</Link></button>
        </>

    )
}

export default Homepage;