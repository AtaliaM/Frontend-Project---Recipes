import React from 'react';
import myLocalStorage from '../localStorage';
import './ShoppingList.css';

class ShoppingList extends React.Component {

    state = { ingredients: [], currValueToUpdate: "", currValueToSave: "", prevValue: "", isOpen: "true", }

    componentDidMount() {
        const ingredients = myLocalStorage.get("ingredients") || [];
        console.log(ingredients);

        this.setState({ ingredients: [...ingredients] });
    }

    renderIngredients = () => {
        let i = -1;
        return (
            this.state.ingredients.map((ingredient) => {
                i++;
                return (
                    <div key={i} className="ingredient">{ingredient}
                        <i className="fas fa-trash-alt" onClick={() => this.deleteIngredient(ingredient)}></i>
                        <i className="fas fa-pencil-alt" isopen={this.state.isOpen} onClick={() => this.displayUpdateIngredientInput(ingredient, i)}></i>
                        <div id={i} style={{ display: "none" }}>
                            <input className="update-input" type="text" value={this.state.currValueToUpdate} onChange={this.onInputChange} />
                            <button onClick={() => this.updateIngredient(i)} className="update-btn">update</button>
                        </div>
                    </div>
                )


            })

        )
    }

    // createIngridientsObjectList = () => {
    //     let temp = [...this.state.ingredients];
    //     const ingridientsWithIds = [];
    //     for (let i=0; i<temp.length; i++) {
    //         const obj = {
    //             name: temp[i],
    //             id: i
    //         }
    //         ingridientsWithIds.push(obj);
    //     }
    //     console.log(temp);
    //     this.setState({ingridientsWithIds: [...ingridientsWithIds]});
    // }

    displayUpdateIngredientInput = (ingredient, id) => {
        console.log(id);
        const input = document.getElementById(id);
        input.style.display = "flex";
        this.setState({ prevValue: ingredient });
    }

    onInputChange = (event) => {
        this.setState({ currValueToUpdate: event.target.value });
    }

    onInputChange2 = (event) => {
        this.setState({ currValueToSave: event.target.value });
    }

    updateIngredient = (id) => {
        let tempIngrediants = [...this.state.ingredients];
        const prevValue = this.state.prevValue;
        console.log(prevValue);
        //deleting the ingredient at that place in the array, and inserting the new updating ingredient instead
        for (let i = 0; i < tempIngrediants.length; i++) {
            if (tempIngrediants[i] === prevValue && this.state.currValueToUpdate !== "") {
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
            const input = document.getElementById(id);
            input.style.display = "none";
        }
    }

    deleteIngredient = (ingredient) => {
        let tempIngrediants = [...this.state.ingredients];
        console.log(ingredient);
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

    addNewIngredient = () => {
        let tempIngrediants = [...this.state.ingredients] || [];
        let newIngredient = this.state.currValueToSave;

        myLocalStorage.save("ingredients", newIngredient);
        myLocalStorage.get("ingredients");
        tempIngrediants.push(newIngredient);
        this.setState({ ingredients: [...tempIngrediants] });

    }

    render() {
        if (this.state.ingredients.length !== 0) {
            return (
                <div className="list-container">
                    <h2>-My shopping list-</h2>
                    <div className="list">
                        {this.renderIngredients()}
                    </div>
                    <input type="text" value={this.state.currValueToSave} onChange={this.onInputChange2} style={{ width: "290px", height: "30px", marginTop: "3px" }} />
                    <button onClick={this.addNewIngredient} style={{ marginBottom: "40px", marginTop: "5px" }}>Add ingredient</button>
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
                    <input type="text" value={this.state.currValueToSave} onChange={this.onInputChange2} style={{ width: "290px", height: "30px", marginTop: "3px" }} />
                    <button onClick={this.addNewIngredient} style={{ marginBottom: "40px", marginTop: "5px" }}>Add ingredient</button>
                </div>
            )
        }
    }
}

export default ShoppingList;