import axios from '../axios';
import React, { useEffect, useState } from 'react';
import './css/Admin.css'
import RecipeCard from './RecipeCard';

function Admin(props) {

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
        <div className="adminColumn">
            <div className="adminButtons">
                <button>specials</button>
                <button>add recipe</button>
            </div>
            {
                    recipes.map((recipe)=>(
                        <RecipeCard 
                            admin
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

export default Admin
