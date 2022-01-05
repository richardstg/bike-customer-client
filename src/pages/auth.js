import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

const Auth = (props) => {
  const { login } = props;
  const [error, setError] = useState();

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
      login(data.userId, data.userEmail, data.token);
    } catch (err) {
      setError(err.message);
    }
  };
  const responseGoogleError = (response) => {
    setError(response.message);
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Logga in"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleError}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
      {error && <p className="text-danger mt-2">{error}</p>}
    </>
  );
};

export default Auth;
