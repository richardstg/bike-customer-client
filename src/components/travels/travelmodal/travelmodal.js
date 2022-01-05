import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const TravelModal = (props) => {
  const { travel, setShowModal, showModal } = props;

  return (
    <Modal
      isOpen={showModal}
      toggle={() => setShowModal((state) => !state)}
      centered={true}
    >
      <ModalHeader>Reseinformation</ModalHeader>
      <ModalBody>
        <table className="table">
          <tbody>
            <tr>
              <th scope="col">Cykel-id</th>
              <td>{travel.bike_id}</td>
            </tr>
            <tr>
              <th scope="col">Starttid</th>
              <td>
                {new Date(travel.start_time).toLocaleString("sv-SE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </td>
            </tr>
            <tr>
              <th scope="col">Sluttid</th>
              <td>
                {new Date(travel.stop_time).toLocaleString("sv-SE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </td>
            </tr>
            <tr>
              <th scope="col">Startkoordinater</th>
              <td>
                {travel.start_coordinates.lat}, {travel.start_coordinates.long}
              </td>
            </tr>
            <tr>
              <th scope="col">Slutkoordinater</th>
              <td>
                {travel.stop_coordinates.lat}, {travel.stop_coordinates.long}
              </td>
            </tr>
            <tr>
              <th scope="col">Genomsnittlig hastighet</th>
              <td>{travel.average_speed} km/h</td>
            </tr>
            <tr>
              <th scope="col">Distans</th>
              <td>{travel.distance} km</td>
            </tr>
            <tr>
              <th scope="col">Kostnad</th>
              <td>{travel.price} SEK</td>
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
  );
};

export default TravelModal;
