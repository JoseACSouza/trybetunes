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
      } else {
        this.setState({
          isLoading: false,
          resultSearch,
          inputSearch: '',
          error: false,
          handleClick: true,
        });
      }
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
      <div data-testid="page-search flex flex-colum">
        <div>
          <Header route="search" />
        </div>
        <div>
          {
            isLoading ? <Loading /> : (
              <form className="flex w-full justify-center items-center my-8">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium
                  text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative w-2/4">
                  <div
                    className="absolute
                    inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <svg className="w-4 h-4 text-slate-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-black border
                    border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                    focus:border-blue-500"
                    placeholder="Search"
                    data-testid="search-artist-input"
                    value={ inputSearch }
                    onChange={ this.inputChange }
                    name="inputSearch"
                  />
                  <button
                    className="text-white absolute end-2.5 bottom-2.5
                    bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ handleButton }
                    onClick={ this.searchAlbums }
                  >
                    Search
                  </button>
                </div>
              </form>
            )
          }
        </div>
        <div>
          {
            handleClick && (
              <h2 className="m-4">
                { message + resultText }
              </h2>
            )
          }
          {
            error ? <p>Nenhum álbum foi encontrado</p> : (
              <div className="m-8 flex flex-wrap">
                {
                  resultSearch.map((album) => {
                    const { collectionId,
                      artistName,
                      artworkUrl100,
                      collectionName } = album;
                    return (
                      <div
                        key={ collectionId }
                        className="m-2 border-2 flex items-center
                        justify-center grow-0 shrink-0 w-40 max-h-46 rounded-lg p-1
                        drop-shadow-lg"
                      >
                        <Link
                          to={ `/album/${collectionId}` }
                          data-testid={ `link-to-album-${collectionId}` }
                        >
                          <img
                            src={ artworkUrl100 }
                            alt={ collectionName }
                            className="w-40 h-2/3 self-baseline"
                          />
                          <h1 className="text-sm">{collectionName}</h1>
                          <p className="text-xs">{artistName}</p>
                        </Link>
                      </div>
                    );
                  })
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Search;
