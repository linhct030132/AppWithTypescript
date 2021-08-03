import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';


const RecipeInfo = ({ name, parentCallback, ingredients }: any) => {

    const { recipes, removeRecipe } = useContext(GlobalContext)

    const getRecipeByName = (name: string) => {
        return recipes.filter((item: any) => item.name === name)
    }

    const handleToShopping = (ingredient: any) => {
        parentCallback([ingredient, ...ingredients])
    }
    console.log(ingredients);

    return (
        <div className='col-md-7'>
            {
                getRecipeByName(name).map((item: any, index: number) => {
                    return (
                        <div key={index}>
                            <div className="image">
                                <img src={item.imageUrl} width='300' alt="" />
                            </div>
                            <h1>{item.name}</h1>
                            <div className="btn-group" key={index}>
                                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Manage Recipe
                                </button>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/shopping-list" onClick={() => handleToShopping(item.ingredient)} >To Shopping List</NavLink></li>
                                    <li><NavLink className="dropdown-item" to={`/form/${item.name}/${item.id}`} >Edit Recipe</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/" onClick={() => removeRecipe(item.id)}>Delete Recipe</NavLink></li>
                                </ul>
                            </div>
                            <p>{item.description}</p>
                            {
                                item.ingredient.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className="input-group mb-3">
                                            <input type="text" className="form-control" readOnly value={`${item.ingredientName} - ${item.count}`} aria-describedby="basic-addon1"></input>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div >
    )
}

export default RecipeInfo
