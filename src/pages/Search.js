import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      handleButton: true,
    };
  }

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
    const { inputSearch, handleButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ inputSearch }
            onChange={ this.inputChange }
            name="inputSearch"
          />
          <button
            data-testid="search-artist-button"
            disabled={ handleButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
