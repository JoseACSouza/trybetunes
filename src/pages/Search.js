import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      resultText: '',
      message: 'Resultado de álbuns de: ',
      resultSearch: [],
      error: false,
      handleButton: true,
      isLoading: false,
      handleClick: false,
    };
  }

  searchAlbums = async () => {
    const { inputSearch } = this.state;
    this.setState({
      isLoading: true,
      resultText: inputSearch,
    });
    try {
      const resultSearch = await searchAlbumsAPI(inputSearch);
      if (resultSearch.length === 0) {
        this.setState({
          inputSearch: '',
          isLoading: false,
          error: true,
          handleClick: true,
        });
      } this.setState({
        isLoading: false,
        resultSearch,
        inputSearch: '',
        handleClick: true,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: true,
        handleClick: true,
        inputSearch: '',
      });
    }
  };

  verifyLength = () => {
    const { inputSearch } = this.state;
    const minLength = 2;
    this.setState({
      handleButton: inputSearch.length < minLength,
    });
  };

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.verifyLength);
  };

  render() {
    const {
      inputSearch, handleButton, isLoading,
      error, resultSearch, handleClick, message, resultText,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading ? <Loading /> : (
            <form>
              <input
                type="text"
                data-testid="search-artist-input"
                value={ inputSearch }
                onChange={ this.inputChange }
                name="inputSearch"
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ handleButton }
                onClick={ this.searchAlbums }
              >
                Pesquisar
              </button>
            </form>
          )
        }
        {
          handleClick && (
            <h2>
              { message + resultText }
            </h2>
          )
        }
        {
          error ? <p>Nenhum álbum foi encontrado</p> : resultSearch.map((album) => {
            const { collectionId, artistName, artworkUrl100, collectionName } = album;
            return (
              <Link
                to={ `/album/${collectionId}` }
                key={ collectionId }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <img
                  src={ artworkUrl100 }
                  alt={ collectionName }
                />
                <h1>{collectionName}</h1>
                <p>{artistName}</p>
              </Link>
            );
          })
        }
      </div>
    );
  }
}

export default Search;
