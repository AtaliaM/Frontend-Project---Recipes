import React from 'react';
import { Link } from 'react-router-dom';
import themealdb from '../apis/themealdb';
import myLocalStorage from '../localStorage';
import './GetRandomMeal.css';

const imageStyle = {
    width: "380px",
    height: "400px",
    border: "3px solid black",
    borderRadius: "25px",
}


class GetRandomMeal extends React.Component {

    state = { currentRecipe: {}, ingredientsMeasured: [], ingredients : [], videoSrc: "", buttonDisable: false, buttonText: "Save Recipe" }

    componentDidMount() {
        this.fetchRecipe();
    }

    fetchRecipe = async () => {
            const response = await themealdb.get(`/random.php`);
            this.setState({ currentRecipe: response.data.meals[0] });
            console.log(response);

            this.fetchIngredients();
            this.fetchVideoSrc();
            this.checkIfRecipeInLocalStorage();

        
    }

    fetchVideoSrc = () => {
        const youtube = `https://www.youtube.com/embed/`;
        const videoId = this.state.currentRecipe.strYoutube.slice(32,);
        const videoSrc = youtube + videoId;
        this.setState({ videoSrc: videoSrc });
    }

    fetchIngredients = () => {
        
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
            const tempstr = measures[i] + " " + ingredients[i];
            ingredientsWithMeasures.push(tempstr);
        }
        this.setState({ ingredientsMeasured: ingredientsWithMeasures, ingredients : ingredients });
    }

    displayIngredients = () => {
        if (this.state.ingredientsMeasured.length !== 0) {
            return (
                this.state.ingredientsMeasured.map((ingredient) => {

                    return (<p key={ingredient} style={{margin: "15px"}}>{ingredient}
                    <span onClick={()=>this.addIngredientToStorage(ingredient)} style={{marginLeft: "5px",cursor:"pointer"}}><i className="fas fa-plus-circle"></i></span></p>)
                })
            )
        }
    }

    addIngredientToStorage = (ingredientName) =>{

        console.log(ingredientName);
        myLocalStorage.save("ingredients", ingredientName);

        

    }

    checkIfRecipeInLocalStorage = () => {
        const savedRecipes = myLocalStorage.get("recipes") || [];
        console.log(savedRecipes);
        // if (savedRecipes[0] !== null) {
            for (let i = 0; i < savedRecipes.length; i++) {
                if (savedRecipes[i].idMeal === this.state.currentRecipe.idMeal) {
                    this.setState({ buttonDisable: true, buttonText: "Recipe Saved" });
                    break;
                }
            }
        // }
    }

    saveToLocalStorage = () => {

        myLocalStorage.save("recipes", this.state.currentRecipe);

        this.setState({ buttonDisable: true, buttonText: "Recipe Saved" });
    }



    render() {
        if (this.state.currentRecipe !== {})
            return (
                <div className="recipe-container" >
                    <h1>{this.state.currentRecipe.strMeal}</h1>
                    <img style={imageStyle} src={this.state.currentRecipe.strMealThumb} alt={this.state.currentRecipe.strMeal}></img>
                    <h3 style={{ margin: "10px" }}>Category: {this.state.currentRecipe.strCategory}</h3>
                    <h3 style={{ margin: "10px" }}>kitchen: {this.state.currentRecipe.strArea}</h3>
                    <h3>-Ingredients-</h3>
                    <h5>Click<span><i className="fas fa-plus-circle" style={{marginRight: "3px"}}></i></span>  to add ingredient to shopping list</h5>
                    {this.displayIngredients()}
                    <h3>-Instructions-</h3>
                    <h5 style={{ width: "55vw", margin: "auto", lineHeight: "27px" }}>{this.state.currentRecipe.strInstructions}</h5>
                    <button className="save-btn" disabled={this.state.buttonDisable} onClick={this.saveToLocalStorage}>{this.state.buttonText}</button>
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
export default GetRandomMeal;