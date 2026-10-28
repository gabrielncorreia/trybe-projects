import React from 'react';
import PropTypes from 'prop-types';
import { t } from '../i18n';
import {
  MAX_TOTAL, MAX_VALUE, RARITIES, attributeTotal, attributesInRange, hasRequiredText,
} from '../rules';

const ATTRIBUTES = [
  { name: 'cardAttr1', label: 'form.power', testId: 'attr1-input' },
  { name: 'cardAttr2', label: 'form.toughness', testId: 'attr2-input' },
  { name: 'cardAttr3', label: 'form.mana', testId: 'attr3-input' },
];

class Form extends React.Component {
  budgetMessage() {
    if (!attributesInRange(this.props)) return { text: t('form.outOfRange'), over: true };
    const total = attributeTotal(this.props);
    if (total > MAX_TOTAL) {
      return { text: t('form.pointsOver', { points: total - MAX_TOTAL }), over: true };
    }
    return { text: t('form.pointsLeft', { points: MAX_TOTAL - total }), over: false };
  }

  render() {
    const {
      cardName, cardDescription, cardImage, cardRare,
      isSaveButtonDisabled, onInputChange, onSaveButtonClick,
    } = this.props;
    const budget = this.budgetMessage();

    return (
      <form className="card-form" onSubmit={ onSaveButtonClick }>
        <fieldset>
          <legend>{ t('form.legend') }</legend>

          <label className="field">
            <span>{ t('form.name') }</span>
            <input
              type="text"
              name="cardName"
              data-testid="name-input"
              maxLength={ 40 }
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>

          <label className="field">
            <span>{ t('form.description') }</span>
            <textarea
              name="cardDescription"
              data-testid="description-input"
              rows={ 4 }
              maxLength={ 280 }
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>

          <div className="field-row">
            { ATTRIBUTES.map(({ name, label, testId }) => (
              <label className="field" key={ name }>
                <span>{ t(label) }</span>
                <input
                  type="number"
                  name={ name }
                  data-testid={ testId }
                  min={ 0 }
                  max={ MAX_VALUE }
                  inputMode="numeric"
                  aria-describedby="attribute-budget"
                  value={ this.props[name] }
                  onChange={ onInputChange }
                />
              </label>
            )) }
          </div>
          <p
            id="attribute-budget"
            className={ `budget${budget.over ? ' budget-over' : ''}` }
            aria-live="polite"
          >
            <strong>{ budget.text }</strong>
            { ' ' }
            { t('form.limits') }
          </p>

          <label className="field">
            <span>{ t('form.image') }</span>
            <input
              type="url"
              name="cardImage"
              data-testid="image-input"
              placeholder={ t('form.imagePlaceholder') }
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>

          <label className="field">
            <span>{ t('form.rarity') }</span>
            <select
              name="cardRare"
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            >
              { RARITIES.map((rarity) => (
                <option key={ rarity } value={ rarity }>{ t(`rarity.${rarity}`) }</option>
              )) }
            </select>
          </label>

          <div className="form-footer">
            <button
              type="submit"
              className="save-btn"
              data-testid="save-button"
              disabled={ isSaveButtonDisabled }
            >
              { t('form.save') }
            </button>
            { !hasRequiredText(this.props) && <p className="form-hint">{ t('form.missing') }</p> }
          </div>
        </fieldset>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
