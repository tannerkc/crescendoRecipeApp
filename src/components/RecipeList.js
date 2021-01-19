import React, { useEffect, useState } from 'react';
import axios from '../axios';
import RecipeCard from './RecipeCard';
import './css/RecipeList.css'


function RecipeList() {
    
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchData(){
        const rec = await axios.get('/recipes');
        const spec = await axios.get('/specials');

        setRecipes(rec.data);

        let specs = []

        spec.data.map((special)=>(
            specs.push(special.ingredientId)
        ))

        console.log(rec.data);
        console.log(spec.data);
    }

    fetchData();
}, [])


    return (
    
        <div className="container">
            <div className="column">
                {
                    recipes.map((recipe)=>(
                        <RecipeCard 
                            key={recipe.uuid}
                            id={recipe.uuid}
                            title={recipe.title}
                            description={recipe.description}
                            cookTime={recipe.cookTime}
                            img={recipe.images.small}
                         />
                    ))
                }
                
            </div>
        </div>
        
    )
}

export default RecipeList;
