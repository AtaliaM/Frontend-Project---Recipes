///filter.php?c=Seafood
import React from 'react';
import { Link } from 'react-router-dom';
import MapResults from './MapResults';
import themealdb from '../apis/themealdb';
import "./MealsByCategories.css";

class MealsByCategory extends React.Component {

    state = { categories: [], chosenCategoryData: [] }

    componentDidMount() {
        this.fetchAllCategories();
    }

    fetchAllCategories = async () => {
        const response = await themealdb.get("/categories.php");
        console.log(response.data.categories);
        this.setState({ categories: response.data.categories });
    }

    displayCategories = () => {
        if (this.state.categories.length !== 0) {
            return (
                this.state.categories.map((category) => {
                    return (
                        <div className="category-container" key={category.idCategory}>
                            <Link to={{ pathname: `/mealsbycategory/${category.strCategory}`, obj: category }}>
                                <div>
                                    <h4>{category.strCategory}</h4>
                                    <img src={category.strCategoryThumb} alt={category.strCategory}></img>
                                </div>
                            </Link>
                        </div>
                    )
                })
            )
        }
    }


    render() {
        if (this.state.chosenCategoryData.length !== 0) {
            return (
                <div className="categories-container">
                    {this.displayCategories()}
                    <MapResults data={this.state.recipes} />
                </div>
            )
        }
        else {
            return (
                <div className="categories-container">
                    {this.displayCategories()}
                </div>
            )
        }
    }

}

export default MealsByCategory;
