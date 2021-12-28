import React, { useState, useEffect } from "react";
import City from "../components/city/city";
import Payment from "../components/payment/payment";
import Travels from "../components/travels/travels";

const Home = (props) => {
  const [user, setUser] = useState();
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/${props.userId}`,
          {
            method: "GET",
            // headers: {
            //   Authorization: "Bearer " + props.token,
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
    props.userId && fetchData();
  }, [props.userId]);

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
