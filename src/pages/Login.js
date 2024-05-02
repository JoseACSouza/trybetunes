import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import trybeTunes from '../images/trybeTunes.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      handleButton: true,
      loading: false,
    };
  }

  verifyLength = () => {
    const { inputName } = this.state;
    const minLength = 3;
    this.setState({
      handleButton: inputName.length < minLength,
    });
  };

  inputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.verifyLength);
  };

  onClickSend = async () => {
    const { inputName } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    });
    await createUser({ name: inputName });
    this.setState({
      loading: false,
    }, history.push('/search'));
  };

  render() {
    const { inputName, handleButton, loading } = this.state;
    if (loading) {
      return (<Loading />);
    }
    return (
      <div
        className="flex items-center justify-center w-screen h-screen
        bg-bg-login"
      >
        <div
          data-testid="page-login"
          className="flex flex-col rounded-lg w-96"
        >
          <img
            alt="icon"
            src={ trybeTunes }
            className="w-86"
          />
          <form className="flex flex-col w-full p-4 bg-slate-100 shadow-md">
            <input
              data-testid="login-name-input"
              className="border-gray-300 text-gray-900 text-sm rounded
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2"
              placeholder="Nome"
              value={ inputName }
              onChange={ this.inputChange }
              name="inputName"
            />
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ handleButton }
              className="bg-blue-500
               hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={ this.onClickSend }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
