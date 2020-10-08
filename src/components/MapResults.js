import React from 'react';
import { Link } from 'react-router-dom';


const MapResults = (props) => {

    const data = props.data;
    // console.log(data.meals);

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(5, 200px)",
        gridTemplateRows: "repeat(5, 200px)",
    }


    return (
        <div style={{display:"flex", justifyContent: "center"}}>
            <div style={gridStyle}>
                {data.meals.map((singleData) => {
                    return (
                        <div key={singleData.idMeal} style={{ width: "170px" }}>
                            <Link to={{pathname: `/recipes/${singleData.idMeal}`, obj: singleData}}>
                                <div>
                                    <h5 style={{ width: "fit-content", margin:"0 auto" }}>{singleData.strMeal}</h5>
                                    <img src={singleData.strMealThumb} alt={singleData.strMeal} style={{ width: "150px", height: "150px", marginTop:"10px" }}></img>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MapResults;