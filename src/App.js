import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';

class App extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          {/* Quando estiver na rota / renderize: Login */}
          <Route exact path="/" component={ Login } />

          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />

          {/* Se não encontrar nenhuma rota até aqui, renderize: NotFound */}
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default App;
