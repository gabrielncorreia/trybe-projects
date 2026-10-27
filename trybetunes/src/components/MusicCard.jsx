import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

const duration = (ms) => {
  if (!ms) return '';
  const seconds = Math.round(ms / 1000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

export default class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: props.isFavorite,
      saving: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { isFavorite } = this.props;
    // Favorites load after the tracks on the album page.
    if (prevProps.isFavorite !== isFavorite) this.setState({ favorite: isFavorite });
  }

  toggleFavorite = async () => {
    const { song, onRemove } = this.props;
    const { favorite } = this.state;
    this.setState({ favorite: !favorite, saving: true });
    if (favorite) await removeSong(song);
    else await addSong(song);
    this.setState({ saving: false }, () => {
      if (favorite && onRemove) onRemove(song);
    });
  };

  render() {
    const { song: { trackName, previewUrl, trackId, trackTimeMillis, artistName }, index } = this.props;
    const { favorite, saving } = this.state;
    return (
      <li className="track">
        <span className="track-index">{ index }</span>
        <div className="track-info">
          <p className="track-name">{ trackName }</p>
          <p className="muted">{ [artistName, duration(trackTimeMillis)].filter(Boolean).join(', ') }</p>
        </div>
        <audio data-testid="audio-component" src={ previewUrl } controls preload="none">
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label className="fav" htmlFor={ `checkbox-music-${trackId}` }>
          <input
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favorite }
            disabled={ saving }
            onChange={ this.toggleFavorite }
          />
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.5 3 5 6.5 5c2 0 3.6 1.1 4.5 2.6.9-1.5 2.5-2.6 4.5-2.6C19 5 21.1 8.5 21.6 11.8 19.5 16.4 12 21 12 21z" />
          </svg>
          <span className="visually-hidden">
            { favorite ? `Remover ${trackName} das favoritas` : `Favoritar ${trackName}` }
          </span>
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackTimeMillis: PropTypes.number,
    artistName: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool,
  onRemove: PropTypes.func,
};

MusicCard.defaultProps = {
  isFavorite: false,
  onRemove: null,
};
