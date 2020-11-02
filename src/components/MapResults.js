import React from 'react';
import { Link } from 'react-router-dom';
import myLocalStorage from '../localStorage';
import "./MapResults.css";


const MapResults = (props) => {

    const data = props.data;
    console.log(data);
    let longStrMeal;

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
        paddingBottom: "30px"
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
                    if (singleData.strMeal.length > 15) {
                        longStrMeal = singleData.strMeal;
                        singleData.strMeal = singleData.strMeal.slice(0,15)+ "...";
                    }
                    else {
                        longStrMeal = "";
                    }
                    return (
                        <div key={singleData.idMeal} style={{ width: "170px" }}>
                            <Link to={{ pathname: `/recipes/${singleData.idMeal}`, obj: singleData }}>
                                <div>
                                    <h5 className="tooltip" style={h5Style}>{singleData.strMeal}<span className="tooltiptext">{longStrMeal || singleData.strMeal}</span></h5>
                                    <img src={singleData.strMealThumb} alt={singleData.strMeal} style={{ width: "150px", height: "150px", marginTop: "10px", border: "2px solid black" }}></img>
                                </div>
                            </Link>
                            <button className="save-btn" style={buttonStyle} disabled={buttonInfo.buttonDisable} onClick={() => saveToLocalStorage(singleData)}>{buttonInfo.buttonText}</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MapResults;