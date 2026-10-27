import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

const initialState = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'common',
  cardTrunfo: false,
  isSaveButtonDisabled: true,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState, // Para copiar os valores do objeto initialState usando o spread operator.
      cards: [],
      hasTrunfo: false,
      nameFilter: '',
      rarityFilter: 'todas',
      superTrunfoFilter: false,
      filterDisabled: false,
    };
  }

  filterChangeHandler = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
  }

  changeHandler = (event) => {
    const { name, type } = event.target;
    let { value } = event.target;

    if (type === 'checkbox') {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }

    this.setState(
      {
        [name]: value,
      },
      this.cardValidation,
    );
  }

  validateInputs = () => {
    const { cardName, cardDescription, cardImage, cardRare } = this.state;

    if (
      cardName === ''
      || cardDescription === ''
      || cardImage === ''
      || cardRare === ''
    ) {
      return false; // Se alguma condição ali for verdadeira, vai retornar false
    }

    return true;
  }

  validateAttributes = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const attr1 = Number(cardAttr1);
    const attr2 = Number(cardAttr2);
    const attr3 = Number(cardAttr3);
    const maxSumAllowed = 210;
    const maxValue = 90;
    const minValue = 0;
    const sumAllAttributes = (attr1 + attr2 + attr3) > maxSumAllowed;

    if (
      sumAllAttributes
      || attr1 < minValue
      || attr1 > maxValue
      || attr2 < minValue
      || attr2 > maxValue
      || attr3 < minValue
      || attr3 > maxValue
    ) {
      return false; // Se alguma condição ali for verdadeira, vai retornar false
    }

    return true;
  }

  cardValidation = () => {
    const inputs = this.validateInputs();
    const attributes = this.validateAttributes();
    const isAllValid = inputs && attributes; // Se algo estiver vazio, os dois irão retornar false. A negação de false é true, logo o botão vai ficar com o disable ativado. Caso os dois retornem true, significando que não há nada vazio, a negação de true é false, logo o botão vai ficar habilitado.

    this.setState({ isSaveButtonDisabled: !isAllValid });
  }

  saveButton = (event) => {
    event.preventDefault();
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare,
      cardTrunfo, hasTrunfo } = this.state;

    const card = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    };

    this.setState((prevState) => ({
      cards: prevState.cards.concat(card),
    }), () => {
      if (cardTrunfo) {
        this.setState({
          ...initialState,
          hasTrunfo: true,
        });
      } else {
        this.setState({
          ...initialState,
        });
      }
    });
  }

  removeCard = (cardToRemove, isTrunfo) => {
    const { cards } = this.state;
    const updatedCardList = cards.filter(({ cardName }) => cardName !== cardToRemove);

    this.setState((prevState) => ({
      cards: updatedCardList,
      hasTrunfo: isTrunfo ? false : prevState.hasTrunfo,
    }));
  }

  render() {
    const { cards, filterDisabled } = this.state;
    return (
      <div className="main-container">
        <h1>Magic: The Gathering</h1>
        {/* Formulário: */}
        <div className="form-div">
          <div className="card-div">
            <Form
              { ...this.state }
              onInputChange={ this.changeHandler }
              onSaveButtonClick={ this.saveButton }
            />
          </div>

          <aside className="aside-container">
            <div className="preview-app-div">
              <Card { ...this.state } />
            </div>
          </aside>
        </div>
        {/* Deck: */}
        <div className="deck-div">
          <h3>Your Deck</h3>

          <div className="filters-div">
            <h5>Search Filters</h5>
            <div>
              <input
                type="text"
                name="nameFilter"
                disabled={ filterDisabled }
                placeholder="Card Name"
                data-testid="name-filter"
                onChange={ this.filterChangeHandler }
              />
            </div>
            <div>
              <select
                data-testid="rare-filter"
                name="rarityFilter"
                selected={true}
                disabled={ filterDisabled }
                onChange={ this.filterChangeHandler }
              >
              <option value="todas">All</option>
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="mythic rare">Mythic Rare</option>
              </select>
            </div>
          </div>

          <div className="deck-cards">
            {cards.filter((card) => {
              const { nameFilter, rarityFilter, superTrunfoFilter } = this.state;
              if (nameFilter !== '') {
                return card.cardName.includes(nameFilter);
              }
              if (rarityFilter !== 'todas') {
                return card.cardRare === rarityFilter;
              }
              if (superTrunfoFilter) {
                return card.cardTrunfo === true;
              }
              return true;
            }).map((card) => (
              <div key={ card.cardName } className="decks-card">
                <Card { ...card } />
                <button
                  type="button"
                  onClick={ () => this.removeCard(card.cardName, card.cardTrunfo) }
                  data-testid="delete-button"
                  className="delete-button"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
