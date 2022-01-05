import React, { useState } from "react";
import ChangePayment from "./changepayment/changepayment";
import Refill from "./refill/refill";

const Payment = (props) => {
  const [changePayment, setChangePayment] = useState(false);
  const [refill, setRefill] = useState(false);

  const { user, setUser } = props;

  return (
    <>
      <div class="card bg-light border-light shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Betalningsmetod</h5>
          {/* <h5 className="mt-3 mb-3 card-title">Betalningsmetod</h5> */}
          {user.payment_method !== "unknown" ? (
            <>
              <p className="mb-1">
                Nuvarande:{" "}
                {user.payment_method === "monthly" ? "Månadsvis" : "Påfyllning"}
              </p>
              {user.payment_method === "refill" && (
                <div>
                  <p>Saldo: {user.balance} SEK</p>
                  <a
                    data-testid="refill-link"
                    href="!#"
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
                href="!#"
                onClick={(event) => {
                  event.preventDefault();
                  setChangePayment(true);
                }}
              >
                Ändra betalningsmetod
              </a>

              <ChangePayment
                title={"Betalningsmetod"}
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
                userId={user._id}
                currentBalance={user.balance}
                setUser={setUser}
              />
            </>
          ) : (
            <>
              <p>Ingen nuvarande betalningsmetod.</p>
              <a
                data-testid="add-method-link"
                href="!#"
                onClick={(event) => {
                  event.preventDefault();
                  setChangePayment(true);
                }}
              >
                Lägg till betalningsmetod
              </a>
            </>
          )}
        </div>
      </div>

      <ChangePayment
        title={"Betalningsmetod"}
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
