import React from 'react';
// import themealdb from './apis/themealdb';
import axios from 'axios';
import MapResults from './MapResults';
import SearchBar from './SearchBar';
import './SearchDataForResults.css';
// import { Link } from 'react-router-dom';


class SearchDataForResults extends React.Component {

    state = { recipes: [], illigal: false}

    componentDidMount() {
        this.setState({recipes: [], illigal:false});
    }


    fetchRecipes = async (ingredient) => {
        if (ingredient) {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`);

            // console.log(response);
            if (response.data.meals !== null) {
                console.log(response);
                this.setState({ recipes: response.data, illigal: false});
            }
            else {
                console.log("illigal");
                this.setState({recipes: [], illigal: true});
            }
        }
        else {

        }
    }


    sendDataToMap = () => {
        // console.log(this.state.illigal);
        if (this.state.recipes.length !== 0) {
            return (
                <MapResults data={this.state.recipes} />
            )
        }

        if (this.state.illigal) {
            console.log("empty arr");
            return (
                <div>No results found for this term</div>
            )
        }
    }



    render() {
        return (
            <div>
                <SearchBar fetchData={this.fetchRecipes} />
                {this.sendDataToMap()}
            </div>
        )
    }
}

export default SearchDataForResults;