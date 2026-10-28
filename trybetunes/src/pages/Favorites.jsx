import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { t } from '../i18n';

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const songs = await getFavoriteSongs();
    this.setState({ songs, loading: false });
  }

  removeFromList = (removed) => {
    this.setState(({ songs }) => ({
      songs: songs.filter((song) => song.trackId !== removed.trackId),
    }));
  }

  render() {
    const { songs, loading } = this.state;
    return (
      <div data-testid="page-favorites" className="page">
        <h1 className="page-title">{ t('favorites.title') }</h1>
        { loading && <Loading /> }
        { !loading && songs.length === 0 && (
          <div className="empty">
            <p>{ t('favorites.empty') }</p>
            <p className="muted">
              { t('favorites.hint') }
              {' '}
              <Link to="/search">{ t('favorites.search') }</Link>
            </p>
          </div>
        ) }
        { !loading && songs.length > 0 && (
          <ol className="track-list">
            { songs.map((song, index) => (
              <MusicCard
                key={ song.trackId }
                song={ song }
                index={ index + 1 }
                isFavorite
                onRemove={ this.removeFromList }
              />
            )) }
          </ol>
        ) }
      </div>
    );
  }
}
