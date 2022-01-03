import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import ClipLoader from "react-spinners/ClipLoader";

const Auth = (props) => {
  const { login } = props;
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

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
      setLoading(false);
      login(data.userId, data.userEmail, data.token);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };
  const responseGoogleError = (response) => {
    setError(true);
  };

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
      {loading && (
        <ClipLoader
          color={"#fffff"}
          loading={loading}
          // css={override}
          size={20}
        />
      )}
      {error && (
        <p className="text-danger">
          Inloggning misslyckades. Försök igen senare.
        </p>
      )}
    </div>
  );
};

export default Auth;
