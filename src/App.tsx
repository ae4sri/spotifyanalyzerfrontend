import React from 'react';
import { SearchPage } from './components/SearchPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SongPage } from './components/SongPage'
import { ArtistPage } from './components/ArtistPage';
function App() {

  return (
    <>
    <Router>
      <Switch>
        <Route path="/:artist/:song">
          <SongPage />
        </Route>
        <Route path="/:artist">
          <ArtistPage />
        </Route>
        <Route path="/">
          <SearchPage />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
