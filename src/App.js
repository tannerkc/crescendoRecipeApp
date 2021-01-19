import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Header from './components/Header';
import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';

function App() {

  return (
      <div className="app">

        <Router>
          <Header />

          <Switch>

              <Route path="/recipe/:recipeId" component={Recipe} />

              <Route path="/admin/recipe/:recipeId" render={(props) => (
                  <Recipe {...props} admin={true} />
                )} />

              <Route path="/admin" component={Admin} />

              <Route path="/">
                <RecipeList />
              </Route>

          </Switch>

          </Router>
          

      </div>
  );

}

export default App;
