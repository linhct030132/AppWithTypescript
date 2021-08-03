import React, { Suspense, useState } from "react";
import { Switch, Route, BrowserRouter as Router, Redirect, NavLink } from 'react-router-dom';
import './App.css'
import NotFound from './components/NotFound/index'
import ShoppingList from "./components/Shopping-list";
import RecipeInfo from "./components/RecipeInfo";
import AddEditPage from "./components/AddEditRecipe";
import EditIngredient from './components/EditIngredient'
import { GlobalProvider } from './context/GlobalState'

const Recipes = React.lazy(() => import('./components/Recipes'))

const App: React.FC = () => {

  const [ingredients, setIngredients] = useState(
    [
      { ingredientName: 'Noodle', count: 1 },
      { ingredientName: 'Beef', count: 1 },
    ]
  )

  const callbackFunction = (childData: any) => {
    setIngredients(childData);
  }

  return (
    <GlobalProvider>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router>
          <nav className="d-flex justify-content-between">
            <ul className="nav nav-tabs">
              <NavLink className="navbar-brand" to="/">
                RECIPE BOOK
              </NavLink>
              <li className="nav-item">
                <NavLink className="nav-link" to="/recipes">
                  Recipes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shopping-list">
                  Shopping List
                </NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Redirect exact from="/" to="/recipes" />
            <Route path="/recipes">
              <Recipes ingredients={ingredients} parentCallback={callbackFunction} />
            </Route>
            {/* <Route path="/shopping-list/edit/:name">
              <EditIngredient ingredients={ingredients} parentCallback={callbackFunction} />
            </Route> */}
            <Route path="/shopping-list">
              <ShoppingList ingredients={ingredients} parentCallback={callbackFunction} />
            </Route>
            <Route path='/recipes/:name'>
              <RecipeInfo />
            </Route>
            <Route path="/form/:newRecipe/:id" component={AddEditPage} />
            <Route path="/form/:newRecipe/" component={AddEditPage} />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </GlobalProvider>

  );
}

export default App;
