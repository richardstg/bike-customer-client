import React, { useState, useContext, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
// import { AuthContext } from "../../context/authcontext";

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
      <table className="table table-striped">
        <thead>
          <tr>
            {/* <th scope="col">Stad</th> */}
            <th scope="col">Starttid</th>
            <th scope="col">Sluttid</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {travels &&
            travels.length > 0 &&
            travels.map((travel) => (
              <tr>
                {/* <td>{travel.city}</td> */}
                <td class="align-middle">
                  {new Date(travel.start_time).toLocaleString("sv-SE", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </td>
                <td class="align-middle">
                  {new Date(travel.stop_time).toLocaleString("sv-SE", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </td>
                <td class="align-middle">
                  <Button
                    color="secondary"
                    onClick={() => {
                      setTravel(travel);
                      setShowModal(true);
                    }}
                  >
                    Visa
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {travel && (
        <Modal
          isOpen={showModal}
          toggle={() => setShowModal((state) => !state)}
          centered="true"
        >
          <ModalHeader>Reseinformation</ModalHeader>
          <ModalBody>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th scope="col">Cykel-id</th>
                  <td scope="col">{travel.bike_id}</td>
                </tr>
                {/* <tr>
                  <th scope="col">Stad</th>
                  <td scope="col">{travel.city}</td>
                </tr> */}
                <tr>
                  <th scope="col">Starttid</th>
                  <td scope="col">
                    {new Date(travel.start_time).toLocaleString("sv-SE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
                <tr>
                  <th scope="col">Sluttid</th>
                  <td scope="col">
                    {new Date(travel.stop_time).toLocaleString("sv-SE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
                <tr>
                  <th scope="col">Startkoordinater</th>
                  <td scope="col">
                    {travel.start_coordinates.lat},{" "}
                    {travel.start_coordinates.long}
                  </td>
                </tr>
                <tr>
                  <th scope="col">Slutkoordinater</th>
                  <td scope="col">
                    {travel.stop_coordinates.lat},{" "}
                    {travel.stop_coordinates.long}
                  </td>
                </tr>
                <tr>
                  <th scope="col">Genomsnittlig hastighet</th>
                  <td scope="col">{travel.average_speed} km/h</td>
                </tr>
                <tr>
                  <th scope="col">Distans</th>
                  <td scope="col">{travel.distance} km</td>
                </tr>
                <tr>
                  <th scope="col">Kostnad</th>
                  <td scope="col">{travel.price} SEK</td>
                </tr>
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setShowModal(false)}>
              Stäng
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default Travels;
