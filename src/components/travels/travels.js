import React, { useState, useEffect } from "react";
import TravelModal from "./travelmodal/travelmodal";
import TravelsTable from "./travelstable/travelstable";
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from "prop-types";

const Travels = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [travel, setTravel] = useState();
  const [travels, setTravels] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { userId, token } = props;

  useEffect(() => {
    const getTravels = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/trips/user/${userId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setTravels(data.trips);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    getTravels();
  }, [userId]);

  return (
    <>
      {travels && (
        <TravelsTable
          travels={travels}
          setTravel={setTravel}
          setShowModal={setShowModal}
        />
      )}
      {travel && (
        <TravelModal
          travel={travel}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {error && (
        <p className="text-danger">
          Resor kunde inte hämtas. Försök igen senare.
        </p>
      )}
      {loading && <ClipLoader color={"#298E46"} loading={loading} size={40} />}
    </>
  );
};

Travels.propTypes = {
  userId: PropTypes.string,
  token: PropTypes.string,
};

export default Travels;
