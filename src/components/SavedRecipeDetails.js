import React from 'react';
import { Link } from 'react-router-dom';
import themealdb from '../apis/themealdb';

const imageStyle = {
    width: "380px",
    height: "400px",
    border: "3px solid black",
    borderRadius: "25px",
}


class SavedRecipeDetails extends React.Component {

    state = { currentRecipe: {}, ingredients: [], videoSrc: "", }

    componentDidMount() {
        this.fetchRecipe();
        console.log(this.props.match.params.id);

    }

    fetchRecipe = async () => {
        
            const recipeId = this.props.match.params.id;
            const response = await themealdb.get(`/lookup.php?i=${recipeId}`);
            this.setState({ currentRecipe: response.data.meals[0] })
            console.log(this.state.currentRecipe);

            this.fetchIngredients();
            this.fetchVideoSrc();
    }

    fetchVideoSrc = () => {
        const youtube = `https://www.youtube.com/embed/`;
        const videoId = this.state.currentRecipe.strYoutube.slice(32,);
        const videoSrc = youtube + videoId;
        this.setState({ videoSrc: videoSrc });
    }

    fetchIngredients = () => {
        let i = 1;
        const ingredients = []
        const measures = []
        const ingredientsWithMeasures = []

        const temp = Object.entries(this.state.currentRecipe);

        for (let i = 0; i < temp.length; i++) {
            if (temp[i][0].includes("Ingredient") && temp[i][1] !== "" && temp[i][1] !== null) {
                ingredients.push(temp[i][1]);
            }
            if (temp[i][0].includes("Measure") && temp[i][1] !== "" && temp[i][1] !== null) {
                measures.push(temp[i][1]);
            }
        }

        for (let i = 0; i < ingredients.length; i++) {
            const tempstr = `${measures[i]}` + " " + `${ingredients[i]}`;
            ingredientsWithMeasures.push(tempstr);
        }
        // console.log(ingredientsWithMeasures);
        this.setState({ ingredients: ingredientsWithMeasures });
    }

    displayIngredients = () => {
        if (this.state.ingredients.length !== 0) {
            return (
                this.state.ingredients.map((ingrdient) => {
                    return (<p key={ingrdient} style={{margin: "15px"}}>{ingrdient}
                    <span class="glyphicon glyphicon-plus-sign" style={{marginLeft:"10px"}}></span></p>)
                })
            )
        }
    }


    render() {
        if (this.state.currentRecipe !== {})
            return (
                <div style={{ display: "inline-block", width: "75vw", border: "1px solid black", margin: "10px", padding: "5px" }}>
                    <h1>{this.state.currentRecipe.strMeal}</h1>
                    <img style={imageStyle} src={this.state.currentRecipe.strMealThumb} alt={this.state.currentRecipe.strMeal}></img>
                    <h3 style={{ margin: "10px" }}>Category: {this.state.currentRecipe.strCategory}</h3>
                    <h3 style={{ margin: "10px" }}>kitchen: {this.state.currentRecipe.strArea}</h3>
                    <h3>-Ingredients-</h3>
                    <h5>Click <span class="glyphicon glyphicon-plus-sign" style={{margin:"0, 5px"}}></span> to add ingredient to shopping list</h5>
                    {this.displayIngredients()}
                    <h3>-Instructions-</h3>
                    <h5 style={{ width: "55vw", margin: "auto", lineHeight: "27px" }}>{this.state.currentRecipe.strInstructions}</h5>
                    <h3>-YouTube-</h3>
                    <div>
                        <div className="ui embed">
                            <iframe title="video player" src={this.state.videoSrc} />
                        </div>
                    </div>
                    <Link style={{ fontSize: "18px" }} to={`/savedrecipes`}>Back to saved recipes</Link>
                </div>
            );
    }
}
export default SavedRecipeDetails;