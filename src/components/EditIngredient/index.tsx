import React, { useContext, useState } from 'react'
import { useParams } from 'react-router';
import ShoppingList from '../Shopping-list'

interface Name {
    name: string,
}

const EditIngredient = ({ ingredients, parentCallback }: any) => {

    const { name } = useParams<Name>()


    const isAddPage = !name

    const updateIngredient = ingredients.find((x: any) => x.ingredientName === name)


    const initialValues = isAddPage ? {
        ingredientName: '',
        count: ''
    } :
        updateIngredient;


    return (
        <div>
            <ShoppingList  ingredients={ingredients} name={name} parentCallback={parentCallback} />
        </div>
    )
}

export default EditIngredient
