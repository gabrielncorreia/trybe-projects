import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import artwork from '../services/artwork';
import Loading from '../components/Loading';
import { t } from '../i18n';

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
        <h2>{ t('search.results', { artist }) }</h2>
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
          <label htmlFor="search-artist" className="visually-hidden">{ t('search.label') }</label>
          <input
            type="search"
            name="searchInput"
            id="search-artist"
            value={ searchInput }
            onChange={ this.searchChangeHandler }
            placeholder={ t('search.placeholder') }
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            className="button-primary"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            { t('search.submit') }
          </button>
        </form>

        { loading && <Loading /> }
        { !loading && notFound && (
          <p className="empty">{ t('search.notFound', { artist }) }</p>
        ) }
        { !loading && albums.length > 0 && this.renderAlbums() }
        { !loading && !notFound && albums.length === 0 && (
          <p className="empty muted">{ t('search.hint') }</p>
        ) }
      </div>
    );
  }
}
