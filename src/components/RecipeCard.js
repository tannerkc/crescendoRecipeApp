import React from 'react';
import { Link } from 'react-router-dom'
import './css/RecipeCard.css';

function RecipeCard(props) {


    return (

            <Link className="card" to={"/recipe/"+props.id}>
                <div className="info">
                    <h2 className="card_title">{props.title}</h2>
                    <p className="card_excerpt">{props.description}</p>
                    {props.admin&&(
                        <div className="adminTasks">
                            <Link className="link" to={"admin/recipe/"+props.id}>Edit</Link>
                        </div>
                    )}
                </div>

                <div className="extraInfo">
                    <img src={"http://localhost:3001/"+props.img} alt="food" width={100} height={80} />
                    <p className="cooktime">Cook Time: <br /> {props.cookTime}min</p>
                </div>
            </Link>

    )
}

export default RecipeCard;
