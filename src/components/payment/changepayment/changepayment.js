import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ClipLoader from "react-spinners/ClipLoader";

const ChangePayment = (props) => {
  const [paymentMethod, setPaymentMethod] = useState(
    props.currentMethod === "unknown" ? "refill" : props.currentMethod
  );
  const [cardNumber, setCardNumber] = useState(
    props.cardNumber === "unknown" ? "" : props.cardNumber
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitChanges = async (event) => {
    event.preventDefault();
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
            { propName: "payment_method", value: paymentMethod },
            { propName: "card_information", value: cardNumber },
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
      <ModalHeader className="font-signature color-signature">
        {props.title}
      </ModalHeader>
      <form onSubmit={submitChanges} data-testid="change-payment-form">
        <ModalBody>
          <div className="mb-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="radioRefill"
                data-testid="radio-refill"
                value="refill"
                checked={
                  paymentMethod === "refill" || paymentMethod === "unknown"
                }
                onChange={(event) => setPaymentMethod(event.target.value)}
              />
              <label className="form-check-label" htmlFor="radioRefill">
                Påfyllning
              </label>
            </div>
            <div className="form-check">
              <input
                required={true}
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="radioMonthly"
                data-testid="radio-monthly"
                value="monthly"
                checked={paymentMethod === "monthly"}
                onChange={(event) => setPaymentMethod(event.target.value)}
              />
              <label className="form-check-label" htmlFor="radioMonthly">
                Månadsvis
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Kortnummer (13-19 siffror):
            </label>
            <input
              required={true}
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              autoComplete="cc-number"
              maxLength="19"
              placeholder="xxxx xxxx xxxx xxxx"
              className="form-control"
              id="cardNumber"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
            />
          </div>
          {success && <p className="text-success mt-2">Info uppdaterad.</p>}
          {error && (
            <p className="text-danger mt-2">
              Info kunde inte uppdateras. Försök senare igen.
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <button className="button-3">
            Spara{" "}
            {loading && (
              <ClipLoader color={"#fffff"} loading={loading} size={20} />
            )}
          </button>{" "}
          <button
            className="button-4"
            onClick={() => {
              props.toggle();
              setError(null);
              setSuccess(false);
            }}
            data-testid="close-payment-modal"
          >
            Stäng
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default ChangePayment;
