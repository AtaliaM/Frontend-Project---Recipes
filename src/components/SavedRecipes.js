import React from 'react';
import myLocalStorage from '../localStorage';
import { Link } from 'react-router-dom';


class SavedRecipes extends React.Component {

    state = {savedRecipes: []}

    gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(5, 200px)",
        gridTemplateRows: "repeat(5, 200px)",
    }

    componentDidMount() {
        const recipes = myLocalStorage.get("recipes") || [];
        this.setState({savedRecipes : recipes});
    }

    removeFromSavedRecipes = (id) => {
        console.log(id);
        console.log(this.state.savedRecipes);
        let tempRecipes = this.state.savedRecipes;
        console.log(tempRecipes);
        let indexToRemove;
        for (let i=0; i<tempRecipes.length;i++) {
            if(tempRecipes[i].idMeal === id) {
                indexToRemove = i;
                break;
            }
        }
        tempRecipes.splice(indexToRemove,1);
        console.log(indexToRemove);
        myLocalStorage.remove("recipes");

        myLocalStorage.save("recipes", ...tempRecipes);
        this.setState({savedRecipes: tempRecipes});
    }


    render () {
        if (this.state.savedRecipes.length !== 0) {
            return (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={this.gridStyle}>
                        {this.state.savedRecipes.map((singleData) => {
                            {/* console.log(singleData); */ }
                            return (
                                <div key={singleData.idMeal} style={{ width: "170px" }}>
                                    <Link to={{ pathname: `/savedrecipes/${singleData.idMeal}`, obj: singleData }}>
                                        <div>
                                            <h5 style={{ width: "fit-content" }}>{singleData.strMeal}</h5>
                                            <img src={singleData.strMealThumb} alt={singleData.strMeal} style={{ width: "150px", height: "150px" }}></img>
                                        </div>
                                    </Link>
                                    <button onClick={()=> this.removeFromSavedRecipes(singleData.idMeal)}>Remove from saved recipes</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>You didn't save any recipes yet</div>
            )
        }

    }


}

export default SavedRecipes;