import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Toolbar from "./components/toolbar/toolbar";
import Home from "./pages/home";
import Auth from "./pages/auth";
import { useAuth } from "./hooks/authhook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  const authorizedRoutes = (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <Home userId={userId} token={token} />}
      />
      <Redirect to="/" />
    </Switch>
  );

  const unauthorizedRoutes = (
    <Switch>
      <Route path="/" exact render={(props) => <Auth login={login} />} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App container pb-5">
      <Router>
        <Toolbar logout={logout} isAuthenticated={!!token} />
        {token ? authorizedRoutes : unauthorizedRoutes}
      </Router>
    </div>
  );
};

export default App;
