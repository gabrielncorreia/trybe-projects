import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Tags extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="tag">
        Categoria
        <select
          id="tag"
          data-testid="tag-input"
          name="tag"
          onChange={ handleChange }
        >
          <option selected>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }
}

Tags.propTypes = {
  handleChange: propTypes.func.isRequired,
};
