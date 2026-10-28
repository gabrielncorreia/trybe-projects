import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import Deck from './components/Deck';
import ProjectBar from './components/ProjectBar';
import { isValidCard } from './rules';
import { t } from './i18n';
import './App.css';

const initialCard = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'common',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.nextId = 1;
    this.state = { ...initialCard, cards: [] };
  }

  changeHandler = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  saveButton = (event) => {
    event.preventDefault();
    const card = Object.keys(initialCard)
      .reduce((saved, key) => ({ ...saved, [key]: this.state[key] }), { id: this.nextId });
    if (!isValidCard(card)) return;
    this.nextId += 1;
    this.setState((prev) => ({ ...initialCard, cards: [...prev.cards, card] }));
  }

  removeCard = (id) => {
    this.setState((prev) => ({ cards: prev.cards.filter((card) => card.id !== id) }));
  }

  render() {
    const { cards, ...draft } = this.state;
    return (
      <div className="app">
        <header className="app-header">
          <h1>{ t('header.title') }</h1>
          <p>{ t('header.intro') }</p>
        </header>

        <div className="builder">
          <Form
            { ...draft }
            isSaveButtonDisabled={ !isValidCard(draft) }
            onInputChange={ this.changeHandler }
            onSaveButtonClick={ this.saveButton }
          />
          <div className="preview">
            <Card { ...draft } />
          </div>
        </div>

        <Deck cards={ cards } onRemove={ this.removeCard } />
        <ProjectBar />
      </div>
    );
  }
}

export default App;
