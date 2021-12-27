import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Button } from "reactstrap";

const Auth = (props) => {
  const { login } = props;
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();

  const responseGoogleSuccess = async (response) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: "Bearer " + context.token,
        },
        body: JSON.stringify({ tokenId: response.tokenId }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      setSuccess(true);
      setLoading(false);
      login(data.userId, data.userEmail, data.token);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const responseGoogleError = (response) => {
    // console.log(response);
    setError(response.message);
  };

  // const login = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BACKEND_URL}/auth/google`,
  //       {
  //         method: "GET",
  //         // mode: "no-cors", // no-cors, *cors, same-origin

  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           // Authorization: "Bearer " + context.token,
  //         },
  //         // body: JSON.stringify({}),
  //       }
  //     );
  //     console.log(response);
  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data.message);
  //     }
  //     console.log(data);
  //     setSuccess(true);
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err.message);
  //     setLoading(false);
  //   }
  // };

  // const loginWithGoogle = () => {
  //   // ev.preventDefault();
  //   window.open("http://localhost:1337/auth/google", "_self");
  // };

  // const logoutWithGoogle = () => {
  //   // ev.preventDefault();
  //   window.open("http://localhost:1337/auth/logout", "_self");
  // };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Logga in"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleError}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
      {/* <Button onClick={loginWithGoogle}>Logga in</Button>
      <Button onClick={logoutWithGoogle}>Logga ut</Button> */}
    </div>
  );
};

export default Auth;
