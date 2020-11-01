import React from 'react';
// import { Link } from 'react-router-dom';
import MapResults from './MapResults';
import themealdb from '../apis/themealdb';

class MealCategory extends React.Component {

    state = { chosenCategoryData: [] }

    componentDidMount() {
        if (this.props.location.obj) {
            const data = this.props.location.obj;
            console.log(data);
            this.getRecipes(data.strCategory);
        }
    }

    getRecipes = async (categoryName) => { //fetch recipes from clicked category and send to MapResults
        const response = await themealdb.get(`/filter.php?c=${categoryName}`);
        console.log(response.data);
        this.setState({chosenCategoryData:response.data});
    }


    render() {
        if(this.state.chosenCategoryData.length!==0) {
            return (
                <div>
                    <MapResults data={this.state.chosenCategoryData}/>
                </div>
            )
        }
        else {
            return (
                <div>Nothing to see here</div>
            )
        }
    }


}

export default MealCategory;