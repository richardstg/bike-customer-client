import React from "react";
import { Button } from "reactstrap";

const TravelsTable = (props) => {
  const { travels, setTravel, setShowModal } = props;

  return (
    <div class="card bg-light border-light shadow-sm mb-3">
      {/* <h5 class="card-header">Resehistorik</h5> */}
      <div class="card-body">
        <h5 class="card-title">Resehistorik</h5>
        <div className="table-wrapper">
          <table className="table table-hover">
            <thead className="">
              <tr className="">
                <th scope="col" className="border-0">
                  Starttid
                </th>
                <th scope="col" className="border-0">
                  Sluttid
                </th>
                <th scope="col" className="border-0"></th>
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
        </div>
      </div>
    </div>
  );
};

export default TravelsTable;
