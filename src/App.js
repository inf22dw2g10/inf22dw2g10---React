import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import GameDetails from './components/GameDetails';
import GameList from './components/GameList';
import GithubLogin from './components/GitHubLogin';
import AuthCallbackPage from './components/AuthCallBackPage';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/gamedetails" component={GameDetails} />
        <Route path="/gamelist" component={GameList} />
        <Route path="/github" component={GithubLogin} />
        <Route path="/callback" component={AuthCallbackPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
