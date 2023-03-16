import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userInfo: {
        name: '',
        email: '',
        description: '',
        image: '',
      },
      handleButton: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      userInfo: {
        [name]: value,
      },
    }, () => {
      const { userInfo } = this.state;
      userInfo[name] = value;
      this.setState({
        userInfo,
      }, this.handleButton);
    });
  };

  onSaveButtonClick = async () => {
    const { name, email, description, image } = this.state;
    const updatedUser = {
      name,
      email,
      image,
      description,
    };
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    await updateUser(updatedUser);
    this.setState({
      isLoading: false,
    }, history.push('/profile'));
  };

  handleButton = () => {
    const { name, email, description, image } = this.state;
    const verifyLength = [name, email, description, image]
      .every((item) => item.length > 0);
    const verifyEmail = email.includes('@');
    if (verifyEmail && verifyLength) {
      this.setState({
        handleButton: true,
      });
    }
  };

  getUserInfo = async () => {
    const userInfo = await getUser();
    const { name, email, description, image } = userInfo;
    this.setState({
      isLoading: false,
      name,
      email,
      description,
      image,
    });
  };

  render() {
    const { isLoading, handleButton, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading /> : (
          <form>
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ this.onInputChange }
                data-testid="edit-input-name"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={ email }
                onChange={ this.onInputChange }
                data-testid="edit-input-email"
              />
            </label>
            <label>
              Descrição
              <textarea
                data-testid="edit-input-description"
                name="description"
                value={ description }
                onChange={ this.onInputChange }
              />
            </label>
            <label>
              Url da imagem
              <input
                type="text"
                name="image"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              name="isSaveButtonDisabled"
              disabled={ !handleButton }
              onClick={ this.onSaveButtonClick }
            >
              Salvar
            </button>
          </form>
        ) }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
