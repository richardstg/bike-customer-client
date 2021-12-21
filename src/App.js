import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import Toolbar from "./components/toolbar/toolbar";
import Home from "./pages/home";
import Auth from "./pages/auth";
// import { AuthContext } from "./context/authcontext";

const App = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
    // const authenticate = () => {
    //   fetch("http://localhost:1337/auth/login/success", {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Credentials": true,
    //     },
    //   })
    //     .then((response) => {
    //       if (response.status === 200) return response.json();
    //       throw new Error("authentication has been failed!");
    //     })
    //     .then((resObject) => {
    //       // console.log(resObject);
    //       setToken(resObject.token);
    //       setUser(resObject.user);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
    // authenticate();
  }, []);

  console.log(user);
  console.log(token);

  const authorizedRoutes = (
    <Switch>
      <Route exact path="/" render={(props) => <Home />} />
      <Redirect to="/" />
    </Switch>
  );

  const unauthorizedRoutes = (
    <Switch>
      <Route
        path="/"
        exact
        render={(props) => (
          <Auth
            // loginWithPopup={loginWithPopup}
            // logout={logout}
            user={user}
            // isAuthenticated={isAuthenticated}
          />
        )}
      />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App container pb-5">
      {/* <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          userEmail: userEmail,
          login: login,
          logout: logout,
        }}
      > */}
      <Router>
        <Toolbar />
        {/* {authorizedRoutes} */}
        {token ? authorizedRoutes : unauthorizedRoutes}
      </Router>
      {/* </AuthContext.Provider> */}
    </div>
  );
};

export default App;
