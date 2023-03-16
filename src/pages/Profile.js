import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userInfo: {},
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userInfo = await getUser();
    this.setState({
      isLoading: false,
      userInfo,
    });
  };

  render() {
    const { userInfo, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : (
          <>
            <p>{userInfo.name}</p>
            <p>{userInfo.email}</p>
            <p>{userInfo.description}</p>
            <img src={ userInfo.image } alt="avatar" data-testid="profile-image" />

            <Link to="/profile/edit">
              Editar perfil
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
