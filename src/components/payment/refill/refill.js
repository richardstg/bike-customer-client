import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Refill = (props) => {
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitRefill = async (event) => {
    event.preventDefault();
    if (!amount || amount === 0) {
      return;
    }
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${props.userId}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: "Bearer " + context.token,
          },
          body: JSON.stringify([{ propName: "balance", value: amount }]),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      props.setUser(data.updatedUser);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} centered={true}>
      <ModalHeader>Fyll på konto</ModalHeader>
      <ModalBody>
        <form data-testid="refill-form">
          <div className="form-group">
            <label htmlFor="refillAmount">Ange belopp:</label>
            <input
              type="number"
              className="form-control"
              id="refillAmount"
              data-testid="refill-input"
              placeholder="Skriv in summa..."
              onChange={(event) => setAmount(event.target.value)}
              required
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={submitRefill}>
          Fyll på
        </Button>{" "}
        <Button
          color="secondary"
          onClick={props.toggle}
          data-testid="refill-close"
        >
          Avbryt
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Refill;
