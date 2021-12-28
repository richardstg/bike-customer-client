import React, { useState, useContext, useEffect } from "react";
import TravelModal from "./travelmodal/travelmodal";
import TravelsTable from "./travelstable/travelstable";

const Travels = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [travel, setTravel] = useState();
  const [travels, setTravels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { userId } = props;

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
            // Authorization: "Bearer " + context.token,
          },
          // body: JSON.stringify({ name, content, code: codeMode }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setTravels(data.trips);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTravels();
  }, []);

  return (
    <>
      <h4 className="mt-3 mb-3">Resehistorik</h4>
      {travels && travels.length > 0 && (
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
    </>
  );
};

export default Travels;
