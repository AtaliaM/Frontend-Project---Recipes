import React from 'react';
import { Link } from 'react-router-dom';
import themealdb from '../apis/themealdb';


class RecipeDetails extends React.Component {

    state = {currentRecipe: {}, ingredients : []}

    componentDidMount() {
        this.fetchRecipe();
        this.fetchIngredients();
    }

    fetchRecipe = async() => {
        if (this.props) {
            const recipeId = this.props.match.params.id;
            const response = await themealdb.get(`/lookup.php?i=${recipeId}`);
            this.setState({currentRecipe : response.data.meals[0]})
            console.log(this.state.currentRecipe);
        }
    }

    fetchIngredients = () => {
        let i = 1;
        const ingredients = []
        while (`${this.state.currentRecipe.strIngredient}${i}`) {
            const temp = `${this.state.currentRecipe.strIngredient}${i}` + ` ${this.state.currentRecipe.strMeasure}${i}`;
            ingredients.push(temp);
            i++;
        }
        console.log(ingredients);
        this.setState({ingredients: ingredients});
    }

    render() {
        if (this.state.currentRecipe !== {})
        return (
            <div style={{display: "inline-block", width: "75vw", border: "1px solid black", margin:"10px", padding:"5px"}}>
                <h1>{this.state.currentRecipe.strMeal}</h1>

                <Link to={`/recipes`}>Back to recipes</Link>
            </div>
        );
    }
}
export default RecipeDetails;