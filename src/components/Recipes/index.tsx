import React, { useContext, useState } from 'react'
import { NavLink, Route, useHistory, useRouteMatch } from 'react-router-dom'
import RecipeInfo from '../RecipeInfo';
import data from '../../data'
import { GlobalContext } from '../../context/GlobalState';

const Recipe = ({ ingredients, parentCallback }: any) => {


    let { path, url } = useRouteMatch();
    const history = useHistory()

    const { recipes } = useContext(GlobalContext)

    const [active, setActtive] = useState('');
    const [name, setName] = useState('')
    const [id, setId] = useState<number>()

    const handleRecipeClick = (name: string) => {
        history.push(`${path}/${name}`);
        setActtive(name)
    }


    return (
        <div className='container p-4' >
            <div className="row flex-column">
                <div className='col-md-5'>
                    <NavLink
                        className="btn btn-primary"
                        to={`/form/newRecipe`}
                    >New Recipe</NavLink>
                </div>
                <div className="text-center mb-3">
                    <h2>Please select a Recipe!</h2>
                </div>
            </div>
            <div className="row">
                <div className='col-md-5'>
                    {recipes.map((recipe: any, index: number) => {
                        return (
                            <div className={active === recipe.name ? "recipe mb-2 p-2 border rounded active" : "recipe mb-2 p-2 border rounded"} key={index}>
                                <div
                                    className='d-flex justify-content-between align-items-center'
                                    onClick={() => { handleRecipeClick(recipe.name); setName(recipe.name); setId(recipe.id) }}
                                >
                                    <div className='left'>
                                        <h3>{recipe.name}</h3>
                                        <p>{recipe.description}</p>
                                    </div>
                                    <div>
                                        <img src={recipe.imageUrl} height="80" width='80' alt="" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Route path='/recipes/:name' render={() => <RecipeInfo name={name} ingredients={ingredients} parentCallback={parentCallback} />} />
            </div>
        </div>
    )
}

export default Recipe
