import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
// import { AuthContext } from "../../context/authcontext";
import ChangePayment from "./changepayment/changepayment";
import Refill from "./refill/refill";

const Payment = (props) => {
  const [changePayment, setChangePayment] = useState(false);
  const [refill, setRefill] = useState(false);

  const { user, setUser } = props;

  return (
    <>
      <h4 className="mt-3 mb-3">Betalningsmetod</h4>
      {user.payment_method !== "unknown" ? (
        <>
          <p>
            Nuvarande:{" "}
            {user.payment_method === "monthly" ? "Månadsvis" : "Påfyllning"}
          </p>
          {user.payment_method === "refill" && (
            <div>
              <p>Saldo: {user.balance} SEK</p>
              <a
                data-testid="refill-link"
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setRefill(true);
                }}
              >
                Fyll på saldo
              </a>
            </div>
          )}
          <a
            data-testid="change-method-link"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setChangePayment(true);
            }}
          >
            Ändra betalningsmetod
          </a>

          <ChangePayment
            title={"Ändra betalningsmetod"}
            isOpen={changePayment}
            currentMethod={user.payment_method}
            balance={user.balance}
            cardNumber={user.card_information}
            toggle={() => setChangePayment(false)}
            setUser={setUser}
          />
          <Refill
            balance={user.balance}
            isOpen={refill}
            toggle={() => setRefill(false)}
            setUser={setUser}
          />
        </>
      ) : (
        <>
          <p>Ingen nuvarande betalningsmetod.</p>
          <a
            data-testid="add-method-link"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setChangePayment(true);
            }}
          >
            Lägg till betalningsmetod
          </a>
        </>
      )}
      <ChangePayment
        title={"Lägg till betalningsmetod"}
        isOpen={changePayment}
        userId={user._id}
        currentMethod={user.payment_method}
        balance={user.balance}
        cardNumber={user.card_information}
        toggle={() => setChangePayment(false)}
        setUser={setUser}
      />
    </>
  );
};

export default Payment;
