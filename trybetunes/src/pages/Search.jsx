import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import artwork from '../services/artwork';
import Loading from '../components/Loading';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      artist: '',
      isButtonDisabled: true,
      albums: [],
      notFound: false,
      loading: false,
    };
  }

  searchChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    }, () => {
      const { searchInput } = this.state;
      const minValue = 2;

      this.setState({ isButtonDisabled: searchInput.trim().length < minValue });
    });
  }

  onButtonClick = async (event) => {
    event.preventDefault();
    const { searchInput, isButtonDisabled } = this.state;
    if (isButtonDisabled) return;

    this.setState({
      artist: searchInput,
      searchInput: '',
      isButtonDisabled: true,
      loading: true,
    });

    const fetchAlbums = await searchAlbumsAPI(searchInput);

    this.setState({
      albums: fetchAlbums,
      loading: false,
      notFound: fetchAlbums.length === 0,
    });
  }

  renderAlbums = () => {
    const { artist, albums } = this.state;

    return (
      <section className="results">
        <h2>{`Álbuns de ${artist}`}</h2>
        <div className="album-grid">
          {albums.map(({ artistName,
            artworkUrl100,
            collectionName,
            releaseDate,
            collectionId,
          }) => (
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
              key={ collectionId }
              className="album-card"
            >
              <img src={ artwork(artworkUrl100) } alt="" loading="lazy" />
              <p className="album-title">{ collectionName }</p>
              <p className="muted">
                { `${artistName}, ${new Date(releaseDate).getFullYear()}` }
              </p>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  render() {
    const { searchInput, isButtonDisabled, albums, loading, notFound, artist } = this.state;
    return (
      <div data-testid="page-search" className="page">
        <form className="search" onSubmit={ this.onButtonClick }>
          <label htmlFor="search-artist" className="visually-hidden">Artista ou banda</label>
          <input
            type="search"
            name="searchInput"
            id="search-artist"
            value={ searchInput }
            onChange={ this.searchChangeHandler }
            placeholder="Busque um artista ou banda"
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            className="button-primary"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Buscar
          </button>
        </form>

        { loading && <Loading /> }
        { !loading && notFound && (
          <p className="empty">{ `Nenhum álbum encontrado para "${artist}".` }</p>
        ) }
        { !loading && albums.length > 0 && this.renderAlbums() }
        { !loading && !notFound && albums.length === 0 && (
          <p className="empty muted">Digite o nome de um artista para ver os álbuns dele.</p>
        ) }
      </div>
    );
  }
}
