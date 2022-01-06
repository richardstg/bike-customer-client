import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
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
            headers: { "x-access-token": props.token },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setUser(data.user);
      } catch (error) {
        setUserError(true);
      }
    };
    props.userId && fetchData();
  }, [props.userId]);

  return (
    <>
      {user && (
        <>
          <Travels userId={user._id} token={props.token} />
          <Row>
            <Col lg={6} xs={12}>
              <City
                userId={user._id}
                currentCity={user.city}
                token={props.token}
              />
            </Col>
            <Col lg={6} xs={12}>
              <Payment user={user} setUser={setUser} token={props.token} />
            </Col>
          </Row>
        </>
      )}
      {userError && (
        <p className="text-danger">Ett fel uppstod. Försök igen senare.</p>
      )}
    </>
  );
};

export default Home;
