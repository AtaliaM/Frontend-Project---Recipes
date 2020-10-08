import React from 'react';
import './App.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import recipeDetails from './components/RecipeDetails';
import SearchDataForResults from './components/SearchDataForResults';
import SavedRecipes from './components/SavedRecipes';
import savedRecipeDetails from './components/SavedRecipeDetails';
import ShoppingList from './components/ShoppingList';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Homepage} />
            <Route path="/recipes" exact component={SearchDataForResults} />
            <Route path="/recipes/:id" component={recipeDetails} />
            <Route path="/savedrecipes" exact component={SavedRecipes}/>
            <Route path="/savedrecipes/:id" component={savedRecipeDetails}/> 
            <Route path="/shoppinglist" component={ShoppingList}/>
            {/* <SearchDataForResults /> */}
          </div>
        </BrowserRouter>
      </div>
    );

  }
}

export default App;
