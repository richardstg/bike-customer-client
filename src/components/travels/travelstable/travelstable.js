import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const TravelsTable = (props) => {
  const { travels, setTravel, setShowModal } = props;

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Starttid</th>
            <th scope="col">Sluttid</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {travels &&
            travels.length > 0 &&
            travels.map((travel) => (
              <tr key={travel._id}>
                <td className="align-middle">
                  {new Date(travel.start_time).toLocaleString("sv-SE", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </td>
                <td className="align-middle">
                  {new Date(travel.stop_time).toLocaleString("sv-SE", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </td>
                <td className="align-middle">
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
    </>
  );
};

export default TravelsTable;
