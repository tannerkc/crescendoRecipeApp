import axios from '../axios';
import React, { useEffect, useState } from 'react';
import './css/Recipe.css'

function Recipe(props) {

    const recipeId = props.match.params.recipeId
    console.log(recipeId);

    // inital lists to pull info from     
    const [recipe, setRecipe] = useState([]);
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [directions, setDirections] = useState([]);
    const [specials, setSpecials] = useState([]);
    const [specID, setSpecs] = useState([]);



    useEffect(() => {
        async function fetchData(){
            const rec = await axios.get('/recipes/'+recipeId);
            const spec = await axios.get('/specials');
    
            setRecipe(rec.data);
            setImage(rec.data.images.full);
            setIngredients(rec.data.ingredients);
            setDirections(rec.data.directions);
            setSpecials(spec.data);

            let specs = []

            spec.data.map((special)=>(
                specs.push(special.ingredientId)
            ))
            setSpecs(specs)
    
            console.log(rec.data);
            console.log(spec.data);
        }
    
        fetchData();
    }, [])
    
    // variables to update values in admin view
    const [title, updateTitle] = useState(recipe.title);
    const [description, updateDescription] = useState(recipe.description);
    const [cookTime, updateCookTime] = useState(recipe.cookTime);
    const [prepTime, updatePrepTime] = useState(recipe.prepTime);
    const [servings, updateServings] = useState(recipe.servings);

    console.log(specID)

    const submitHandler = () =>{
        if(props.admin){
            
            fetch("http://localhost:3001/recipes/"+recipeId, 
            {  method: "PATCH",  
            headers: {    "Content-type": "application/json"  },  
            body: JSON.stringify({
                title: title,
                description: description,
                cookTime: cookTime,
                prepTime: prepTime,
                servings: servings,
            })}).then(response => 
                {    
                    console.log(response.status);     
                    return response.json();
                }).then(props.history.push('/admin'));
        }
    }

    

    return (
        props.admin?
        
        <div className="container">
        <div className="recipeContainer">
            {
                recipe&&(
                    <img src={"http://localhost:3001/"+image} alt=""/>
                )
            }

            <div className="recipe">

                <div className="recipeHeader">
                    <input type="text" placeholder={recipe.title} onChange={(e)=>updateTitle(e.target.value)} />
                </div>

                <div className="recipeInfo">
                    <div className="recipeDescription">
                    <input className="inputBig" type="text" placeholder={recipe.description} onChange={(e)=>updateDescription(e.target.value)} />
                    </div>

                    <div className="recipeDetails">
                        <div>
                            Cook Time:<input className="inputSmall" type="text" placeholder={recipe.cookTime} onChange={(e)=>updateCookTime(e.target.value)} />
                        </div>
                        <div>
                            Prep Time: <input className="inputSmall" type="text" placeholder={recipe.prepTime} onChange={(e)=>updatePrepTime(e.target.value)} />
                        </div>
                        <div>
                            Servings: <input className="inputSmall" type="text" placeholder={recipe.servings} onChange={(e)=>updateServings(e.target.value)} />
                        </div>
                    </div>

                    <div className="ingredients">
                        <h3>Ingredients:</h3>
                        <br />
                        <ul>
                            {
                                ingredients.map((ingredient)=>(
                                    <li>
                                        <input type="text" className="inputSmall" placeholder={ingredient.amount} />
                                        <input type="text" className="inputSmall" placeholder={ingredient.measurement} />
                                        <input type="text" className="inputBig" placeholder={ingredient.name} />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="ingredients">
                        <h3>Directions:</h3>
                        <br />
                        <ul>
                            {
                                directions.map((direction, i)=>(
                                    <li>
                                        <h4>Step {i+1}</h4>

                                        <input className="inputBig" placeholder={direction.instructions} />
                                        <br />
                                        optional: <input className="inputSmall" placeholder={direction.optional?("true")
                                                :
                                                ("false")
                                                } />
                                                
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                </div>
                <button className="save" onClick={submitHandler}>Save</button>

            </div>
        </div>
        </div>

        :
        <div className="container">
        <div className="recipeContainer">
            {
                recipe&&(
                    <img src={"http://localhost:3001/"+image} alt=""/>
                )
            }

            <div className="recipe">

                <div className="recipeHeader">
                    <h1>{recipe.title}</h1>
                </div>

                <div className="recipeInfo">
                    <div className="recipeDescription">
                        {recipe.description}
                    </div>

                    <div className="recipeDetails">
                        <div>
                            Cook Time:{recipe.cookTime}
                        </div>
                        <div>
                            Prep Time: {recipe.prepTime}
                        </div>
                        <div>
                            Servings: {recipe.servings}
                        </div>
                    </div>

                    <div className="ingredients">
                        <h3>Ingredients:</h3>
                        <br />
                        <ul>
                            {
                                ingredients.map((ingredient)=>(
                                    <li>
                                        <input className="checkbox" type="checkbox" /> 
                                        <b> {ingredient.amount} {ingredient.measurement}</b> {ingredient.name}
                                        <br />
                                        {specID.includes(ingredient.uuid)&&(
                                            <i className="special">
                                                <p>
                                                <b>{specials.find(x => x.ingredientId === ingredient.uuid).type} </b>
                                                    {specials.find(x => x.ingredientId === ingredient.uuid).title}:  
                                                    {specials.find(x => x.ingredientId === ingredient.uuid).text}
                                                </p>
                                            </i>
                                        )}
                                        </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="ingredients">
                        <h3>Directions:</h3>
                        <br />
                        <ul>
                            {
                                directions.map((direction, i)=>(
                                    <li>
                                        <h4>Step {i+1}</h4>

                                        {direction.instructions} {direction.optional&&(<i>optional</i>)}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                </div>

            </div>
        </div>
        </div>

    )
}

export default Recipe
