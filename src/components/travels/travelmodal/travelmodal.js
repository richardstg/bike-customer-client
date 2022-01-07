import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

const TravelModal = (props) => {
  const { travel, setShowModal, showModal } = props;

  return (
    <Modal
      isOpen={showModal}
      toggle={() => setShowModal((state) => !state)}
      centered={true}
    >
      <ModalHeader className="font-signature color-signature">
        Reseinformation
      </ModalHeader>
      <ModalBody>
        <div className="table-wrapper">
          <table className="table" style={{ fontSize: "0.9rem" }}>
            <tbody>
              <tr>
                <th scope="col" className="font-signature color-signature">
                  Cykel-id
                </th>
                <td>{travel.bike_id}</td>
              </tr>
              <tr>
                <th scope="col" className="font-signature color-signature">
                  Starttid
                </th>
                <td>
                  {new Date(travel.start_time).toLocaleString("sv-SE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
              <tr>
                <th scope="col" className="font-signature color-signature">
                  Sluttid
                </th>
                <td>
                  {new Date(travel.stop_time).toLocaleString("sv-SE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
              <tr>
                <th scope="col" className="font-signature color-signature">
                  Startkoordinater
                </th>
                <td>
                  {travel.start_coordinates.lat},{" "}
                  {travel.start_coordinates.long}
                </td>
              </tr>
              <tr>
                <th scope="col" className="font-signature color-signature">
                  Slutkoordinater
                </th>
                <td>
                  {travel.stop_coordinates.lat}, {travel.stop_coordinates.long}
                </td>
              </tr>
              <tr>
                <th scope="col" className="font-signature color-signature">
                  Genomsnittlig hastighet
                </th>
                <td>{parseInt(travel.average_speed)} km/h</td>
              </tr>
              <tr>
                <th scope="col" className="font-signature color-signature">
                  Distans
                </th>
                <td>{travel.distance} m</td>
              </tr>
              <tr>
                <th scope="col" className="font-signature color-signature">
                  Kostnad
                </th>
                <td>{travel.price} SEK</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="button-3 full-width"
          onClick={() => setShowModal(false)}
        >
          Stäng
        </button>
      </ModalFooter>
    </Modal>
  );
};

TravelModal.propTypes = {
  travel: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default TravelModal;
