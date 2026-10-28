import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import artwork from '../services/artwork';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { t } from '../i18n';

export default class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      loading: true,
      album: {},
      favoriteIds: [],
    };
  }

  componentDidMount() {
    this.fetchSongs();
    this.fetchFavoriteSong();
  }

  fetchSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const [album, ...songs] = await getMusics(id);

    this.setState({ album, songs, loading: false });
  }

  fetchFavoriteSong = async () => {
    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      favoriteIds: favoriteSongs.map((song) => song.trackId),
    });
  }

  render() {
    const { songs, loading, album, favoriteIds } = this.state;
    return (
      <div data-testid="page-album" className="page">
        { loading ? <Loading /> : (
          <>
            <header className="album-hero">
              <img src={ artwork(album.artworkUrl100, 600) } alt="" />
              <div>
                <p className="muted small">{ t('album.label') }</p>
                <h1 data-testid="album-name">{ album.collectionCensoredName }</h1>
                <p data-testid="artist-name" className="album-artist">{ album.artistName }</p>
                <p className="muted">
                  { t('album.meta', {
                    year: new Date(album.releaseDate).getFullYear(),
                    count: songs.length,
                  }) }
                </p>
              </div>
            </header>
            <ol className="track-list">
              { songs.map((song, index) => (
                <MusicCard
                  key={ song.trackId }
                  song={ song }
                  index={ index + 1 }
                  isFavorite={ favoriteIds.includes(song.trackId) }
                />
              )) }
            </ol>
          </>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};
