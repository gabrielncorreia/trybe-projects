import React from 'react';
import PropTypes from 'prop-types';
import { t } from '../i18n';

class Card extends React.Component {
  render() {
    const {
      cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage, cardRare,
    } = this.props;
    return (
      <div className="mtg-card">
        <div className="mtg-card-inner">
          <div className="mtg-card-face">
            <p className="mtg-name" data-testid="name-card">{ cardName || t('card.untitled') }</p>
            <p className="mtg-mana" data-testid="attr3-card">{ cardAttr3 }</p>
            <div className="mtg-art">
              { cardImage
                ? <img src={ cardImage } alt="" data-testid="image-card" />
                : <span className="mtg-art-hint">{ t('card.imageHint') }</span> }
            </div>
            <p className="mtg-type" data-testid="rare-card">
              { t(`rarity.${cardRare}`) }
              <span className={ `mtg-gem mtg-gem-${cardRare.replace(' ', '-')}` } aria-hidden="true" />
            </p>
            <p className="mtg-text" data-testid="description-card">{ cardDescription }</p>
            <p className="mtg-pt">
              <span data-testid="attr1-card">{ cardAttr1 }</span>
              /
              <span data-testid="attr2-card">{ cardAttr2 }</span>
            </p>
          </div>
          <div className="mtg-card-back" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
};

export default Card;
