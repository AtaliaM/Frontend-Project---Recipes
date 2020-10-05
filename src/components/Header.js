import React from 'react';
import { Link } from 'react-router-dom';
import SearchDataForResults from './SearchDataForResults';
import './Header.css';


class Header extends React.Component {

    render() {
        return (
            <>
                <div className="header-container">
                    <button><Link to="/">Home</Link></button>
                    <button><Link to="/recipes">Search recipes</Link></button>
                    <button>saved recipes</button>
                </div>
                {/* <SearchDataForResults /> */}
            </>

        )
    }
}

export default Header;