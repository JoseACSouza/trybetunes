import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/loading';

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
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            value={ inputName }
            onChange={ this.inputChange }
            name="inputName"
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ handleButton }
            onClick={ this.onClickSend }
          >
            Entrar
          </button>
        </form>
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
