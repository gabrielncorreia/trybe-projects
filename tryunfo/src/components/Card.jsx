import React from 'react';
import PropTypes from 'prop-types';
import CardFront from './CardFront';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flipped: false,
    }
  }

  render() {
    return (
      <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <CardFront {...this.props} />
        </div>
        <div class="flip-card-back">
        </div>
      </div>
    </div> 
    );
  }
}

Card.propTypes = {
  ccardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
};

Card.defaultProps = {
  cardName: '',
  cardDescription: '',
  cardAttr1: 0,
  cardAttr2: 0,
  cardAttr3: 0,
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
};

export default Card;
