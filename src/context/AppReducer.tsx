export default (state: any, action: any) => {

    switch (action.type) {
        case 'REMOVE_RECIPE':
            return {
                recipes: state.recipes.filter((recipe: any) => recipe.id !== action.payload)
            }
        case 'ADD_RECIPE':
            return {
                recipes: [action.payload, ...state.recipes]
            }
        case 'EDIT_RECIPE':
            const updatedRecipe = action.payload

            const updateRecipe = state.recipes.map((recipe: any) => {
                if (recipe.id === updatedRecipe.id) {
                    return updatedRecipe;
                }
                return recipe
            })
            return {
                recipes: updateRecipe
            }
        default:
            return state
    }
}