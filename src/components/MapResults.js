import React from 'react';
import { Link } from 'react-router-dom';
import myLocalStorage from '../localStorage';


const MapResults = (props) => {

    const data = props.data;
    // console.log(data.meals);

   const h5Style = {
        width: "fit-content", 
        margin:"0 auto", 
        fontSize:"18px", 
        color:"#492F18", 
        fontWeight: "bold", 
        backgroundColor: "white" ,
    }

    let buttonInfo = {
        buttonDisable: false,
        buttonText: "Save Recipe",
    }
    
    let buttonStyle = {
        width: "100px",
        margin: "10px auto",
        cursor: "pointer",
    }

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(5, 200px)",
        gridTemplateRows: "repeat(5, 260px)",
    }

    const saveToLocalStorage = (meal) => {
        let recipeSaved;

        const savedRecipes = myLocalStorage.get("recipes") || [];

        for (let i = 0; i < savedRecipes.length; i++) {
            if (savedRecipes[i].idMeal === meal.idMeal) {

                recipeSaved = true;
                break;
            }
        }

        if (!recipeSaved) {
            myLocalStorage.save("recipes", meal);

        }
    }


    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={gridStyle}>
                {data.meals.map((singleData) => {
                    return (
                        <div key={singleData.idMeal} style={{ width: "170px" }}>
                            <Link to={{ pathname: `/recipes/${singleData.idMeal}`, obj: singleData }}>
                                <div>
                                    <h5 style={h5Style}>{singleData.strMeal}</h5>
                                    <img src={singleData.strMealThumb} alt={singleData.strMeal} style={{ width: "150px", height: "150px", marginTop: "10px", border: "2px solid black" }}></img>
                                </div>
                            </Link>
                            <button style={buttonStyle} disabled={buttonInfo.buttonDisable} onClick={() => saveToLocalStorage(singleData)}>{buttonInfo.buttonText}</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MapResults;