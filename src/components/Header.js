/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import smallTT from '../images/smallTrybeTunes.png';
import userIcon from '../images/userSmallIcon.png';

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
    // eslint-disable-next-line react/prop-types
    const { route } = this.props;
    const selectedRoute = 'bg-selected-nav-green text-white';
    const unselectedRoute = 'bg-slate-200';
    if (userName.length === 0) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <div className="py-2 bg-trybe-green flex justify-between px-4 items-center">
          <img
            alt="trybe tunes"
            src={ smallTT }
          />
          <div className="bg-white border p-1 rounded-full flex">
            <img
              alt="user icon"
              src={ userIcon }
              className="w-6 mx-1"
            />
            <h1 data-testid="header-user-name" className="mx-1">
              { userName }
            </h1>
          </div>
        </div>
        <nav
          className="flex justify-around border-y-2 border-grey-300 items-center h-16"
        >
          <Link
            to="/search"
            data-testid="link-to-search"
            className={ `border-x-2 border-white
            w-full h-full flex justify-center items-center
            hover:bg-nav-green hover:text-white font-black text-xl
            text-nav-green
            ${route === 'search' ? selectedRoute : unselectedRoute}` }
          >
            Search
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className={ `border-x-2 border-white
            w-full h-full flex justify-center items-center
            hover:bg-nav-green hover:text-white font-black text-xl
            text-nav-green
            ${route === 'favorites' ? selectedRoute : unselectedRoute}` }
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-favorites"
            className={ `border-x-2 border-white
            w-full h-full flex justify-center items-center
            hover:bg-nav-green hover:text-white font-black text-xl
            text-nav-green
            ${route === 'profile' ? selectedRoute : unselectedRoute}` }
          >
            Profile
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
