import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick
    } = this.props;
    return (
      <form action="">
        <fieldset className="fieldset-div">
          <legend>Dados da Carta</legend>

          <div className="input-container">
            <span>Name</span>
            <input
              type="text"
              name="cardName"
              data-testid="name-input"
              id="name-input"
              value={ cardName }
              onChange={ onInputChange }
            />
          </div>

          <div className="input-container">
            <span>Text Box</span>
            <textarea
              name="cardDescription"
              data-testid="description-input"
              id="description-input"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </div>

          <div className="attr-container">
            <span>Power</span>
            <input
              type="number"
              name="cardAttr1"
              data-testid="attr1-input"
              id="attr1-input"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </div>

          <div className="attr-container">
            <span>Toughness</span>
            <input
              type="number"
              name="cardAttr2"
              data-testid="attr2-input"
              id="attr2-input"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </div>

          <div className="attr-container">
            <span>Mana Cost:</span>
            <input
              type="number"
              name="cardAttr3"
              data-testid="attr3-input"
              id="attr3-input"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </div>

          <div className="image-container">
            <span>Image URL:</span>
            <input
              type="text"
              src=""
              alt=""
              className="image-input"
              data-testid="image-input"
              id="imageSrc"
              name="cardImage"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </div>

          <div className="input-container">
            <span>Rarity:</span>
            <select
              name="cardRare"
              className="select-list"
              data-testid="rare-input"
              id="rarity"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="mythic rare">Mythic Rare</option>
            </select>
          </div>

          {/* { hasTrunfo ? (
            <div className="input-container">
              <span>You already has a Mythic Rare card in your deck!</span>
            </div>
          ) : (
            <div>
              <input
                type="checkbox"
                name="cardTrunfo"
                className="checkbox-mythic-rare"
                data-testid="trunfo-input"
                id="mythic-rare"
                checked={ cardTrunfo }
                onChange={ onInputChange }
              />
              <span>Mythic Rare!</span>
            </div>
          )} */}

          <div className="saveBtn-container">
            <button
              type="submit"
              className="save-btn"
              data-testid="save-button"
              name="save-button"
              disabled={ isSaveButtonDisabled }
              onClick={ onSaveButtonClick }
            >
              Salvar
            </button>
          </div>

        </fieldset>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
};

Form.defaultProps = {
  cardName: '',
  cardDescription: '',
  cardAttr1: 0,
  cardAttr2: 0,
  cardAttr3: 0,
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: false,
  onInputChange: () => {},
  onSaveButtonClick: () => {},
};

export default Form;
