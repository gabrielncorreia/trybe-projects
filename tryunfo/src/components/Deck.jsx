import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { RARITIES } from '../rules';
import { t } from '../i18n';

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nameFilter: '', rarityFilter: 'all' };
  }

  filterChangeHandler = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { cards, onRemove } = this.props;
    const { nameFilter, rarityFilter } = this.state;
    const search = nameFilter.trim().toLowerCase();
    const shown = cards.filter((card) => card.cardName.toLowerCase().includes(search)
      && (rarityFilter === 'all' || card.cardRare === rarityFilter));
    const count = cards.length === 1
      ? t('deck.countOne')
      : t('deck.countOther', { count: cards.length });

    return (
      <section className="deck" aria-labelledby="deck-title">
        <div className="deck-header">
          <h2 id="deck-title">
            { t('deck.title') }
            <span className="deck-count">{ count }</span>
          </h2>
          { cards.length > 0 && (
            <div className="deck-filters">
              <input
                type="search"
                name="nameFilter"
                aria-label={ t('deck.search') }
                placeholder={ t('deck.search') }
                data-testid="name-filter"
                value={ nameFilter }
                onChange={ this.filterChangeHandler }
              />
              <select
                name="rarityFilter"
                aria-label={ t('deck.rarity') }
                data-testid="rare-filter"
                value={ rarityFilter }
                onChange={ this.filterChangeHandler }
              >
                <option value="all">{ t('deck.all') }</option>
                { RARITIES.map((rarity) => (
                  <option key={ rarity } value={ rarity }>{ t(`rarity.${rarity}`) }</option>
                )) }
              </select>
            </div>
          ) }
        </div>

        { cards.length === 0 && <p className="deck-empty">{ t('deck.empty') }</p> }
        { cards.length > 0 && shown.length === 0 && (
          <p className="deck-empty">{ t('deck.noMatch') }</p>
        ) }

        <ul className="deck-cards">
          { shown.map((card) => (
            <li key={ card.id } className="deck-card">
              <Card { ...card } />
              <button
                type="button"
                className="delete-button"
                data-testid="delete-button"
                aria-label={ t('deck.removeLabel', { name: card.cardName }) }
                onClick={ () => onRemove(card.id) }
              >
                { t('deck.remove') }
              </button>
            </li>
          )) }
        </ul>
      </section>
    );
  }
}

Deck.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    cardName: PropTypes.string,
    cardRare: PropTypes.string,
  })).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Deck;
