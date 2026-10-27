import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';
import searchFoodImg from '../../images/icons/search_food.png';
import searchDrinkImg from '../../images/icons/search_drink.png';

function Explore() {
  return (
    <Page title="Explorar">
      <div className="tile-grid">
        <Link to="/explorar/comidas" className="tile theme-meal" data-testid="explore-food">
          <img src={ searchFoodImg } alt="" />
          <span className="tile-title">Comidas</span>
          <span className="muted small">Por ingrediente, cozinha ou uma surpresa</span>
        </Link>
        <Link to="/explorar/bebidas" className="tile theme-cocktail" data-testid="explore-drinks">
          <img src={ searchDrinkImg } alt="" />
          <span className="tile-title">Bebidas</span>
          <span className="muted small">Por ingrediente ou uma surpresa</span>
        </Link>
      </div>
    </Page>
  );
}

export default Explore;
