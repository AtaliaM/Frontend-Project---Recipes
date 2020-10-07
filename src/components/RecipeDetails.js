import React from 'react';
import { Link } from 'react-router-dom';
import themealdb from '../apis/themealdb';
// import ls from 'local-storage';
import myLocalStorage from '../localStorage';

const imageStyle = {
    width: "380px",
    height: "400px",
    border: "3px solid black",
    borderRadius: "25px",
}


class RecipeDetails extends React.Component {

    state = { currentRecipe: {}, ingredients: [], videoSrc: "", buttonDisable: false, buttonText: "Save Recipe" }

    componentDidMount() {
        this.fetchRecipe();
    }

    fetchRecipe = async () => {
        if (this.props) {
            const recipeId = this.props.match.params.id;
            const response = await themealdb.get(`/lookup.php?i=${recipeId}`);
            this.setState({ currentRecipe: response.data.meals[0] })
            console.log(this.state.currentRecipe);

            this.fetchIngredients();
            this.fetchVideoSrc();
            this.checkIfRecipeInLocalStorage();

        }

        //to add an option of fetching recipe from local storage here//
        //We will also be updating local storage whenever we add or delete a recipe.

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
            if (temp[i][0].includes("Ingredient") && temp[i][1] !== "") {
                ingredients.push(temp[i][1]);
            }
            if (temp[i][0].includes("Measure") && temp[i][1] !== "") {
                measures.push(temp[i][1]);
            }
        }

        for (let i = 0; i < ingredients.length; i++) {
            const tempstr = `${measures[i]}` + " " + `${ingredients[i]}`;
            ingredientsWithMeasures.push(tempstr);
        }
        console.log(ingredientsWithMeasures);
        this.setState({ ingredients: ingredientsWithMeasures });
    }

    displayIngredients = () => {
        if (this.state.ingredients.length !== 0) {
            return (
                this.state.ingredients.map((ingrdient) => {
                    return <h4 key={ingrdient} style={{ margin: "15px" }}>{ingrdient}</h4>
                })
            )
        }
    }

    checkIfRecipeInLocalStorage = () => {
        const savedRecipes = myLocalStorage.get("recipes") || [];
        console.log(savedRecipes);
        for (let i=0; i<savedRecipes.length; i++) {
            if (savedRecipes[i].idMeal === this.state.currentRecipe.idMeal) {
                this.setState({buttonDisable:true, buttonText: "Recipe Saved"});
                break;
            }
        }
    }

    saveToLocalStorage = () => {

        // const recipesfromStorage = myLocalStorage.get("recipes");
        // const recipesParsed = JSON.parse(recipesfromStorage) || [];
        // console.log(recipesParsed);
        // const recipesList = [...recipesParsed];
        // recipesList.push(this.state.currentRecipe);

        // myLocalStorage.save("recipes", JSON.stringify(recipesList));
        
        // myLocalStorage.save("recipes", JSON.stringify(this.state.currentRecipe));
        myLocalStorage.save("recipes", this.state.currentRecipe);
        // const ttt = myLocalStorage.get("recipes");
        this.setState({buttonDisable:true, buttonText: "Recipe Saved"});
        // const recipes = myLocalStorage.get("recipes") || [];
        

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
                    {this.displayIngredients()}
                    <h3>-Instructions-</h3>
                    <h5 style={{ width: "55vw", margin: "auto", lineHeight: "27px" }}>{this.state.currentRecipe.strInstructions}</h5>
                    <button disabled={this.state.buttonDisable} onClick={this.saveToLocalStorage} style={{ margin: "20px", width: "250px" }}>{this.state.buttonText}</button>
                    <h3>-YouTube-</h3>
                    <div>
                        <div className="ui embed">
                            <iframe title="video player" src={this.state.videoSrc} />
                        </div>
                    </div>
                    <Link style={{ fontSize: "18px" }} to={`/recipes`}>Back to recipes</Link>
                </div>
            );
    }
}
export default RecipeDetails;