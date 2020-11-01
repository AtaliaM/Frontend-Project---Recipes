import React from 'react';
import { Link } from 'react-router-dom';
// import SearchDataForResults from './SearchDataForResults';
import './Header.css';


class Header extends React.Component {

    render() {
        return (
            <>
                <div className="header-container">
                    <button><Link to="/">Home</Link></button>
                    <button><Link to="/recipes">Search Recipes</Link></button>
                    <button><Link to= "/mealsbycategory">Meals By Category</Link></button>
                    <button><Link to="/savedrecipes">Saved Recipes</Link></button>
                    <button><Link to="/shoppinglist">Shopping List</Link></button>
                </div>
                {/* <SearchDataForResults /> */}
            </>

        )
    }
}

export default Header;