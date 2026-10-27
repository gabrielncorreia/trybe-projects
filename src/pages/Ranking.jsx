import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rank from '../components/Rank';

class Ranking extends Component {
  render() {
    const ranking = (JSON.parse(localStorage.getItem('ranking')) || [])
      .sort((a, b) => b.score - a.score);
    return (
      <main className="stage result">
        <section className="panel ranking-panel">
          <h1 data-testid="ranking-title">Ranking</h1>
          { ranking.length === 0 ? (
            <p className="muted">Nenhuma partida ainda. Jogue uma para aparecer aqui.</p>
          ) : (
            <ol className="ranking">
              { ranking.map((player, index) => (
                <Rank
                  key={ `${player.name}-${index}` }
                  name={ player.name }
                  email={ player.gravatarEmail }
                  score={ Number(player.score) }
                  index={ index }
                />
              )) }
            </ol>
          ) }
          <Link to="/" className="button-primary" data-testid="btn-go-home">Jogar</Link>
        </section>
      </main>
    );
  }
}

export default Ranking;
