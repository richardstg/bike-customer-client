import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // const authenticate = async () => {
    //   try {
    //     const response = await fetch(
    //       `${process.env.REACT_APP_BACKEND_URL}/users/${uId}`,
    //       {
    //         method: "GET",
    //         // headers: {
    //         //   Authorization: "Bearer " + token,
    //         // },
    //       }
    //     );
    //     const data = await response.json();
    //     if (!response.ok) {
    //       throw new Error(data.message);
    //     }
    //     setUser(data.user);
    //   } catch (error) {
    //     setUserError(error.message);
    //   }
    // };
    // authenticate();
    //   const authenticate = () => {
    //     fetch("http://localhost:1337/auth/login/success", {
    //       method: "GET",
    //       credentials: "include",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Credentials": true,
    //       },
    //     })
    //       .then((response) => {
    //         console.log(response);
    //         if (response.status === 200) return response.json();
    //         throw new Error("authentication has been failed!");
    //       })
    //       .then((resObject) => {
    //         console.log(resObject);
    //         setToken(resObject.token);
    //         setUser(resObject.user);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };
    //   authenticate();
  }, []);

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
