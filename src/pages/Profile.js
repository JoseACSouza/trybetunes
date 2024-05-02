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
        <Header route="profile" />
        {isLoading ? <Loading /> : (
          <div className="flex justify-center my-6">
            <div className="w-1/4 flex-col self-center">
              <div className="flex items-center justify-between mb-4">
                <img
                  src={ userInfo.image }
                  alt="avatar"
                  className="rounded-full w-24 h-24"
                  data-testid="profile-image"
                />
                <Link to="/profile/edit">
                  <button
                    type="button"
                    className="py-1.5 px-2 me-2 mb-2 text-sm font-medium border-blue-600
                  border-2 rounded-full text-gray-600"
                  >
                    Edit Profile
                  </button>
                </Link>
              </div>
              <p className="text-lg font-bold text-gray-800">Name</p>
              <p className="mb-4">{userInfo.name}</p>
              <p className="text-lg font-bold text-gray-800">Email</p>
              <p className="mb-4">{userInfo.email}</p>
              <p className="text-lg font-bold text-gray-800">Description</p>
              <p className="mb-4 text-sm">{userInfo.description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
