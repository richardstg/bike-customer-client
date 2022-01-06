import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from "prop-types";

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
            headers: { "x-access-token": props.token },
          },
          body: JSON.stringify([
            {
              propName: "balance",
              value: parseInt(amount) + props.currentBalance,
            },
          ]),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      props.setUser(data.updatedUser);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        props.toggle();
        setSuccess(false);
      }, 1000);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} centered={true}>
      <form data-testid="refill-form" onSubmit={submitRefill}>
        <ModalHeader>Fyll på konto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="refillAmount">Ange belopp (SEK):</label>
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
          {success && <p className="text-success mt-2 mb-0">Saldo påfyllt.</p>}
          {error && (
            <p className="text-danger mt-2">
              Ett fel uppstod. Försök igen senare.
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="mt-2 mb-2">
            Fyll på{" "}
            {loading && (
              <ClipLoader color={"#fffff"} loading={loading} size={20} />
            )}
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              props.toggle();
              setError(null);
              setSuccess(false);
            }}
            data-testid="refill-close"
            className="mt-2 mb-2"
          >
            Stäng
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

Refill.propTypes = {
  userId: PropTypes.string,
  token: PropTypes.string,
  currentBalance: PropTypes.number,
  isOpen: PropTypes.bool,
  setUser: PropTypes.func,
  toggle: PropTypes.func,
};

export default Refill;
