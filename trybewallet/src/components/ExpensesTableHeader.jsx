import React, { Component } from 'react';

export default class ExpensesTableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Pagamento</th>
          <th className="num">Valor</th>
          <th>Moeda</th>
          <th className="num">Câmbio</th>
          <th className="num">Em reais</th>
          <th><span className="visually-hidden">Ações</span></th>
        </tr>
      </thead>
    );
  }
}
