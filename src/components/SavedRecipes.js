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
        this.setState({savedRecipes : [...recipes]});
    }

    removeFromSavedRecipes = (id) => {
        let tempRecipes = [...this.state.savedRecipes];
        // let tempRecipes = myLocalStorage.get("recipes");
        // console.log(tempRecipes);
        let indexToRemove;
        for (let i=0; i<tempRecipes.length;i++) {
            if(tempRecipes[i].idMeal === id) {
                indexToRemove = i;
                tempRecipes.splice(indexToRemove,1);
                break;
            }
        }
        // console.log(tempRecipes, tempRecipes.length);
        myLocalStorage.remove("recipes");

        //doing this logic so I won't have array with 'null' on local storage//
        if (tempRecipes.length === 0) {
            tempRecipes = [];
            this.setState({savedRecipes : []});
        }
        else {
            console.log("in elseee");
            for (let i =0; i<tempRecipes.length; i++) {
                myLocalStorage.save("recipes", tempRecipes[i]);
            }
            let t = myLocalStorage.get("recipes");
            console.log(t);
            this.setState({savedRecipes: [...tempRecipes]});
        }

    }


    render () {
        if (this.state.savedRecipes.length !== 0) {
            return (
                <>
                <h1 style={{fontFamily: "Pacifico, cursive"}}>Saved Recipes</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={this.gridStyle}>
                        {this.state.savedRecipes.map((singleData) => {
                            return (
                                <div key={singleData.idMeal} style={{ width: "170px" }}>
                                    <Link to={{ pathname: `/savedrecipes/${singleData.idMeal}`, obj: singleData }}>
                                        <div>
                                            <h5 style={{ width: "fit-content", margin:"0 auto" }}>{singleData.strMeal}</h5>
                                            <img src={singleData.strMealThumb} alt={singleData.strMeal} style={{ width: "150px", height: "150px", margin:"10px" }}></img>
                                        </div>
                                    </Link>
                                    <button onClick={()=> this.removeFromSavedRecipes(singleData.idMeal)} style={{cursor:"pointer", width: "160px", height:"50px"}}>Remove from saved recipes</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                </>
            );
        }
        else {
            return (
                <div style={{fontFamily: "Pacifico, cursive", fontSize:"40px", marginTop: "30px"}}>Save your recipes here! <span role="img" aria-label="xxxxx">😋</span></div>
            )
        }

    }


}

export default SavedRecipes;