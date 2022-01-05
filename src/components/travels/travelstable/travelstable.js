import React from "react";

const TravelsTable = (props) => {
  const { travels, setTravel, setShowModal } = props;

  return (
    <div class="card bg-light border-light shadow-sm mb-3">
      <div class="card-body">
        <h5 class="card-title font-signature color-signature">Resehistorik</h5>
        {travels && travels.length > 0 && (
          <div className="table-wrapper">
            <table
              className="table table-hover"
              style={{ fontSize: "0.95rem" }}
            >
              <thead className="">
                <tr className="">
                  <th scope="col" className="border-0 color-signature">
                    Starttid
                  </th>
                  <th scope="col" className="border-0 color-signature">
                    Sluttid
                  </th>
                  <th scope="col" className="border-0 color-signature"></th>
                </tr>
              </thead>
              <tbody>
                {travels.map((travel) => (
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
                      <button
                        className="button-3"
                        onClick={() => {
                          setTravel(travel);
                          setShowModal(true);
                        }}
                      >
                        Visa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {travels && travels.length === 0 && <p>Resehistoriken är tom.</p>}
      </div>
    </div>
  );
};

export default TravelsTable;
