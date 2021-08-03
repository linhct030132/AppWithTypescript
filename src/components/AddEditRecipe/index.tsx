import React, { useContext } from 'react'
import { useParams } from 'react-router';
import { GlobalContext } from '../../context/GlobalState';
import FormRecipe from '../FormRecipe'

interface Params {
    id: string;
}

const AddEditPage = () => {

    const { recipes } = useContext(GlobalContext);
    const { id } = useParams<Params>();
    const isAddPage = !id
const param = useParams()
    console.log(param);
    

    const updateRecipe = recipes.find(x => x.id === +id)

    const initialValues = isAddPage ? {
        id: Math.random(),
        name: '',
        imageUrl: '',
        description: '',
        ingredient: [
            {
                ingredientName: '',
                count: 1,
            },
        ]
    } :
        updateRecipe;
    return (
        <div>
            <FormRecipe initialValues={initialValues} />
        </div>
    )
}

export default AddEditPage
