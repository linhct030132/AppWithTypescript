import React, { useContext } from 'react'
import { Formik, Form, FastField, FieldArray } from 'formik'
import { useHistory, useParams } from 'react-router-dom'
import InputField from '../../customFiled/custom-fields/InputField'
import TextareaField from '../../customFiled/custom-fields/TextareaField'
import ImageUrlField from '../../customFiled/custom-fields/ImageUrlField'
import { GlobalContext } from '../../context/GlobalState';
import * as Yup from 'yup';
interface Recipes {
    id: number,
    name: string,
    imageUrl: string,
    description: string,
    ingredient: [
        {
            ingredientName: string,
            count: number,
        }
    ]
}
interface Params {
    id: string;
}

const FormRecipe = ({ initialValues }: any) => {
    const history = useHistory();

    const { id } = useParams<Params>();

    const { addRecipe, editRecipe } = useContext(GlobalContext);
    const isAddPage = !id


    const FormSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Name Too Short!')
            .max(50, 'Name Too Long!')
            .required('Please enter Name'),
        imageUrl: Yup.string()
            .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Enter correct url!'
            )
            .required('Please enter URL'),
        description: Yup.string().required('Please enter description'),
        ingredientName: Yup.string()
            .min(2, 'Ingredient Name Too Short!')
            .max(50, 'Ingredient Name Too Long!')
            .required('Please enter Ingredient Name'),
        count: Yup.number().integer("Ammout must be integer!").required("Please enter amount"),
    });

    return (
        <Formik
            initialValues={
                initialValues
            }
            validationSchema={FormSchema}
            onSubmit={(
                values: Recipes
            ) => {

                history.push('/')
                if (isAddPage) {
                    addRecipe(values)
                } else {
                    editRecipe(values)
                }
            }}
        >
            {({ errors, touched, values }) => {
                return (
                    <Form>
                        <FieldArray name='ingredient'>
                            {({ insert, remove, push }) => (
                                <div className="container">
                                    <div className="row flex-column">
                                        <div className="flex-grow-1 col-md-7 align-self-sm-end" >
                                            <div className="form-group">
                                                {!values.name || !values.imageUrl || !values.description ?
                                                    <button type="submit" className='btn btn-success' disabled >Save</button> :
                                                    <button type="submit" className='btn btn-success'  >Save</button>}

                                                <button className="btn btn-danger" onClick={() => history.push('/')}>Cancel</button>
                                            </div>
                                            <FastField
                                                name="name"
                                                component={InputField}
                                                type='text'
                                                className2={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}

                                                label='Name:'
                                                placeholder="Eg: Hamberger, BeefSteak, ..."
                                            />
                                            {errors.name && touched.name ? (
                                                <div className='invalid-feedback'>{errors.name}</div>
                                            ) : null}

                                            <FastField
                                                name="imageUrl"
                                                component={ImageUrlField}
                                                label='ImageUrl:'
                                                className2={'form-control' + (errors.imageUrl && touched.imageUrl ? ' is-invalid' : '')}

                                                placeholder="imageUrl"
                                            />
                                            {errors.imageUrl && touched.imageUrl ? (
                                                <div className='invalid-feedback'>{errors.imageUrl}</div>
                                            ) : null}

                                            <FastField
                                                name="description"
                                                component={TextareaField}
                                                className2={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')}

                                                label='Description:'
                                                placeholder="Eg: Hamberger, BeefSteak, ..."
                                            />

                                            {errors.description && touched.description ? (
                                                <div className='invalid-feedback'>{errors.description}</div>
                                            ) : null}
                                            <div>
                                                {values.ingredient.length > 0 &&
                                                    values.ingredient.map((input: any, index: number) => {
                                                        return (
                                                            <div key={index}>
                                                                <div className="form-group d-flex ">

                                                                    <FastField
                                                                        className="w-50"
                                                                        name={`ingredient.${index}.ingredientName`}
                                                                        component={InputField}
                                                                    />

                                                                    <FastField
                                                                        type="number"
                                                                        className="mx-4 w-25"
                                                                        name={`ingredient.${index}.count`} min="1"
                                                                        component={InputField}
                                                                    />

                                                                    <button type="button" className="btn btn-danger" aria-label="Close" onClick={() => remove(index)
                                                                    } >
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>

                                                            </div>
                                                        )

                                                    })
                                                }
                                                <div className="form-group" >
                                                    <button
                                                        type="button"
                                                        className="btn btn-success"
                                                        onClick={() => push({ ingredientName: "", count: 1 })}>Add Ingredient</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                                </div>
                            )}
                        </FieldArray>

                    </Form>
                )
            }}
        </Formik >
    )
}

export default FormRecipe
