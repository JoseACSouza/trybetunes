import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const didGetUser = await getUser();
    this.setState({
      userName: didGetUser.name,
    });
  };

  render() {
    const { userName } = this.state;
    if (userName.length === 0) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">
          { userName }
        </h1>
        <Link to="/search" data-testid="link-to-search">
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Profile
        </Link>
      </header>
    );
  }
}

export default Header;
