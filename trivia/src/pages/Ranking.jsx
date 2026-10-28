import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rank from '../components/Rank';
import { t } from '../i18n';

class Ranking extends Component {
  render() {
    const ranking = (JSON.parse(localStorage.getItem('ranking')) || [])
      .sort((a, b) => b.score - a.score);
    return (
      <main className="stage result">
        <section className="panel ranking-panel">
          <h1 data-testid="ranking-title">{ t('ranking.title') }</h1>
          { ranking.length === 0 ? (
            <p className="muted">{ t('ranking.empty') }</p>
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
          <Link to="/" className="button-primary" data-testid="btn-go-home">{ t('ranking.play') }</Link>
        </section>
      </main>
    );
  }
}

export default Ranking;
