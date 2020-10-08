import React from 'react';
import myLocalStorage from '../localStorage';
import './ShoppingList.css';

class ShoppingList extends React.Component {

    state = { ingredients: [], currValueToUpdate:"", prevValue: "" }

    componentDidMount() {
        const ingredients = myLocalStorage.get("ingredients") || [];
        this.setState({ ingredients: [...ingredients] });
    }

    renderIngredients = () => {
        return (
            this.state.ingredients.map((ingredient) => {
                return (
                    <div className="ingredient">{ingredient}
                        <i class="fas fa-trash-alt" onClick={() => this.deleteIngredient(ingredient)}></i>
                        <i class="fas fa-pencil-alt" onClick={() => this.displayUpdateIngredientInput(ingredient)}></i>
                        <div id={ingredient} style={{display:"none"}}>
                            <input className="update-input" type="text" value={this.state.currValueToUpdate} onChange={this.onInputChange}/>
                            <button onClick={this.updateIngredient} className="update-btn">update</button>
                        </div>
                    </div>
                )
            })
        )
    }

    displayUpdateIngredientInput = (ingredient) => {
        const input = document.getElementById(`${ingredient}`);
        input.style.display = "flex";
        this.setState({prevValue: ingredient});
    }

    onInputChange = (event) => {
        this.setState({ currValueToUpdate: event.target.value });
    }

    updateIngredient = () => {
        let tempIngrediants = [...this.state.ingredients];
        console.log(this.state.prevValue);
        const prevValue = this.state.prevValue;
        //deleting the ingredient at that place in the array, and inserting the new updating ingredient instead
        for (let i = 0; i < tempIngrediants.length; i++) {
            if (tempIngrediants[i] === prevValue) {
                console.log("in");
                tempIngrediants.splice(i, 1, this.state.currValueToUpdate);
                break;
            }
        }

        console.log(tempIngrediants);
        myLocalStorage.remove("ingredients");

        if (tempIngrediants.length === 0) {
            tempIngrediants = [];
            this.setState({ ingredients: [] });
        }
        else {
            for (let i = 0; i < tempIngrediants.length; i++) {
                myLocalStorage.save("ingredients", tempIngrediants[i]);
            }
            myLocalStorage.get("ingredients");
            this.setState({ ingredients: [...tempIngrediants] });
            const input = document.getElementById(`${prevValue}`);
            input.style.display = "none";
        }

    }

    deleteIngredient = (ingredient) => {
        let tempIngrediants = [...this.state.ingredients];

        for (let i = 0; i < tempIngrediants.length; i++) {
            if (tempIngrediants[i] === ingredient) {
                tempIngrediants.splice(i, 1);
                break;
            }
        }
        myLocalStorage.remove("ingredients");

        if (tempIngrediants.length === 0) {
            tempIngrediants = [];
            this.setState({ ingredients: [] });
        }
        else {
            for (let i = 0; i < tempIngrediants.length; i++) {
                myLocalStorage.save("ingredients", tempIngrediants[i]);
            }
            myLocalStorage.get("ingredients");
            this.setState({ ingredients: [...tempIngrediants] });
        }
    }

    render() {
        if (this.state.ingredients.length !== 0) {
            return (
                <div className="list-container">
                    <h2>-My shopping list-</h2>
                    <div className="list">
                        {this.renderIngredients()}
                    </div>
                </div>
            )
        }
        else {
            console.log("else");
            return (
                <div className="list-container">
                    <h2>-My shopping list-</h2>
                    <div className="list">
                    </div>
                </div>
            )
        }
    }
}

export default ShoppingList;