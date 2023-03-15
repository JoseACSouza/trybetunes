import React from 'react';
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
      </header>
    );
  }
}

export default Header;
