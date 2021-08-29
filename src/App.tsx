import React from 'react';
import { SearchPage } from './components/SearchPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SongPage } from './components/SongPage'
import { ArtistPage } from './components/ArtistPage';
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <Switch>
        <Route path="/:artist/:song">
          <Link to="/" style={{paddingRight: "10px"}}>Back to Search</Link>
          <SongPage />
        </Route>
        <Route path="/:artist">
          <Link to="/" style={{paddingRight: "10px"}} >Back to Search</Link>
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
