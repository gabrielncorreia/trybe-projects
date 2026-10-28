import React, { Component } from 'react';
import propTypes from 'prop-types';
import { t } from '../i18n';

// Values stay in Portuguese: they are what the store keeps. Only the labels change.
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

export default class Tags extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="tag">
        { t('form.tag') }
        <select
          id="tag"
          data-testid="tag-input"
          name="tag"
          defaultValue={ TAGS[0] }
          onChange={ handleChange }
        >
          { TAGS.map((tag) => (
            <option key={ tag } value={ tag }>{ t(`tags.${tag}`) }</option>
          )) }
        </select>
      </label>
    );
  }
}

Tags.propTypes = {
  handleChange: propTypes.func.isRequired,
};
