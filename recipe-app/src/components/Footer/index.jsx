import { t } from '../../i18n';
import React from 'react';
import { NavLink } from 'react-router-dom';
import DrinkIcon from '../../images/drinkIcon.svg';
import ExploreIcon from '../../images/exploreIcon.svg';
import MealIcon from '../../images/mealIcon.svg';

const startsWith = (prefix) => (match, { pathname }) => pathname.startsWith(prefix);

function Footer() {
  return (
    <footer data-testid="footer" className="tabbar">
      <nav aria-label={ t('nav.sections') }>
        <NavLink to="/comidas" isActive={ startsWith('/comidas') }>
          <img src={ MealIcon } alt="" data-testid="food-bottom-btn" />
          { t('nav.meals') }
        </NavLink>
        <NavLink to="/bebidas" isActive={ startsWith('/bebidas') }>
          <img src={ DrinkIcon } alt="" data-testid="drinks-bottom-btn" />
          { t('nav.drinks') }
        </NavLink>
        <NavLink to="/explorar" isActive={ startsWith('/explorar') }>
          <img src={ ExploreIcon } alt="" data-testid="explore-bottom-btn" />
          { t('nav.explore') }
        </NavLink>
      </nav>
    </footer>
  );
}

export default Footer;
