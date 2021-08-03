import { Formik, Form, FastField } from 'formik'
import React, { useContext, useState } from 'react'
import InputField from '../../customFiled/custom-fields/InputField';

interface ingredient {
    ingredientName: string,
    count: string,
}

const ShoppingList = ({ ingredients, parentCallback }: any) => {

    const [isActived, setIsActive] = useState(false)
    const [name, setName] = useState('')
    const [updateIngre, setUpdateIngre] = useState<ingredient>({
        ingredientName: '',
        count: '',
    })

    ingredients = ingredients.flat()

    const handleDelete = () => {
        const deleteIngredient = ingredients.filter((x: any) => x.ingredientName !== name);
        parentCallback([...deleteIngredient])
    }

    const handleEdit = (ingredient: any) => {
        const updateIngredient = ingredients.map((item: any, i: number) => {
            if (item.ingredientName === name) {
                return ingredient
            }
            return item
        })
        parentCallback(updateIngredient);
    }


    const onClickTable = (values: ingredient, name: string) => {
        setIsActive(true);
        setUpdateIngre(values)
        setName(name)
    }

    let initialValues = {
        ingredientName: updateIngre.ingredientName,
        count: updateIngre.count,
    }

    return (
        <Formik
            initialValues={
                initialValues
            }

            onSubmit={
                (values, { resetForm }) => {
                    const index = ingredients.findIndex((x: any) => x.ingredientName === values.ingredientName)
                    if (index === -1) {
                        parentCallback([values, ...ingredients])
                    } else {
                        const ingredientUpdate = {
                            ...ingredients[index],
                            count: values.count + ingredients[index].count
                        }
                        ingredients[index] = ingredientUpdate
                        parentCallback([...ingredients])
                    }
                    resetForm()
                }
            }
        >
            {({ errors, touched, values, resetForm }) => {
                return (
                    <div className="container">
                        <div className="row">
                            <Form className="col-md-8 ">
                                <div className="d-flex">
                                    <FastField
                                        name={`ingredientName`}
                                        component={InputField}
                                        type='text'
                                        className='form-group w-50'

                                        label='Name:'
                                    />
                                    <FastField
                                        name="count"
                                        type='number'
                                        component={InputField}
                                        min='1'
                                        className='form-group w-25 px-5'

                                        label='Amount:'
                                    />
                                </div>

                                <div className="form-group">
                                    {isActived ?
                                        <div>
                                            <button type="button" className='btn btn-success' onClick={() => handleEdit(values)} >Update</button>
                                            <button type="button" className='btn btn-danger' onClick={() => { handleDelete(); resetForm() }} >Delete</button>
                                            <button type='button' className="btn btn-info" onClick={() => { setIsActive(false); resetForm() }} >Cancel</button>
                                        </div> :
                                        <div>
                                            {!values.ingredientName || !values.count ?
                                                <div>
                                                    <button type="submit" className='btn btn-success' disabled >Add</button>
                                                    <button type='button' className="btn btn-info" disabled>Clear</button>
                                                </div> :
                                                <div>
                                                    <button type="submit" className='btn btn-success'>Add</button>
                                                    <button type='button' className="btn btn-info" onClick={() => { setIsActive(false); resetForm() }} >Clear</button>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            </Form>
                        </div>
                        <table className="table table-hover">
                            <tbody>
                                {
                                    ingredients.map((ingredient: any, index: number) => {
                                        return (
                                            <tr key={index} onClick={(e) => {
                                                onClickTable(ingredient, ingredient.ingredientName)
                                            }}>
                                                <td className={ingredient.ingredientName}>{ingredient.ingredientName} ({ingredient.count})</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }}
        </Formik>

    )
}

export default ShoppingList
