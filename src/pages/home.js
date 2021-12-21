import React, { useState, useEffect } from "react";
import City from "../components/city/city";
import Payment from "../components/payment/payment";
import Travels from "../components/travels/travels";

const Home = (props) => {
  const uId = "619f6ee3d0b6c914a2b58514";

  const [user, setUser] = useState();
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/${uId}`,
          {
            method: "GET",
            // headers: {
            //   Authorization: "Bearer " + token,
            // },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }

        setUser(data.user);
      } catch (error) {
        setUserError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {user && (
        <>
          <Travels userId={user._id} />
          <Payment user={user} setUser={setUser} />
          <City userId={user._id} currentCity={user.city} />
        </>
      )}
    </>
  );
};

export default Home;
