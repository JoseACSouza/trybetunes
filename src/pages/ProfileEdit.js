/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import defaultUser from '../images/user.png';
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
        image: defaultUser,
      },
      handleButton: false,
      name: '',
      email: '',
      description: '',
      image: defaultUser,
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
      userInfo: updatedUser,
    }, history.push('/profile', this.state));
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
        <Header route="profile" />
        { isLoading ? <Loading /> : (
          <div className="flex justify-center my-6">
            <div className="w-1/4 flex-col self-center">
              <div className="flex items-center justify-center mb-4">
                <form className="flex-col">
                  <div className="flex justify-between">
                    <img
                      src={ image }
                      alt="avatar"
                      className="rounded-full w-20 h-20"
                      data-testid="profile-image"
                    />
                    <label className="text-lg font-bold text-gray-800 ml-4">
                      Image Url
                      <input
                        type="text"
                        name="image"
                        data-testid="edit-input-image"
                        value={ image }
                        onChange={ this.onInputChange }
                        className="w-56 bg-slate-300 text-sm font-normal"
                      />
                    </label>
                  </div>
                  <label className="text-lg font-bold text-gray-800">
                    Name
                    <input
                      type="text"
                      name="name"
                      value={ name }
                      onChange={ this.onInputChange }
                      data-testid="edit-input-name"
                      className="w-full p-1 rounded bg-slate-300 text-sm font-normal"
                    />
                  </label>
                  <label className="text-lg font-bold text-gray-800">
                    Email
                    <input
                      type="email"
                      name="email"
                      value={ email }
                      onChange={ this.onInputChange }
                      placeholder="exemple@exemple.com"
                      data-testid="edit-input-email"
                      className="w-full p-1 rounded bg-slate-300 text-sm font-normal"
                    />
                  </label>
                  <label className="text-lg font-bold text-gray-800">
                    Description
                    <textarea
                      data-testid="edit-input-description"
                      name="description"
                      value={ description }
                      onChange={ this.onInputChange }
                      className="w-full p-1 rounded bg-slate-300 text-sm font-normal"
                    />
                  </label>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      data-testid="edit-button-save"
                      name="isSaveButtonDisabled"
                      disabled={ !handleButton }
                      onClick={ this.onSaveButtonClick }
                      className="w-fit px-4 py-1 rounded bg-blue-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
