import React from "react";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import Payment from "./payment";

afterEach(cleanup);

it("tests that the title is rendered", async () => {
  render(
    <Payment
      user={{
        _id: "123",
        payment_method: "refill",
        balance: 0,
        card_information: "1234555555555",
      }}
    />
  );
  expect(
    await screen.queryAllByText(/Betalningsmetod/i)[0]
  ).toBeInTheDocument();
});

it("tests that the payment method monthly can be set", async () => {
  render(
    <Payment
      user={{
        _id: "123",
        payment_method: "monthly",
        balance: 0,
        card_information: "1234555555555",
      }}
    />
  );
  expect(await screen.findByText(/Månadsvis/i)).toBeInTheDocument();
});

it("tests that the payment method refill can be set", async () => {
  render(
    <Payment
      user={{
        _id: "123",
        payment_method: "refill",
        balance: 0,
        card_information: "1234555555555",
      }}
    />
  );
  expect(await screen.findByText(/Påfyllning/i)).toBeInTheDocument();
});

it("tests that unknown payment method is properly handled", async () => {
  render(
    <Payment
      user={{
        _id: "123",
        payment_method: "unknown",
        balance: 0,
        card_information: "1234555555555",
      }}
    />
  );
  expect(
    await screen.findByText(/Ingen nuvarande betalningsmetod./i)
  ).toBeInTheDocument();
});

it("tests that the balance shows", async () => {
  render(
    <Payment
      user={{
        _id: "123",
        payment_method: "refill",
        balance: 100,
        card_information: "1234555555555",
      }}
    />
  );
  expect(await screen.findByText(/100/i)).toBeInTheDocument();
});

it("tests that the refill modal opens", async () => {
  render(
    <Payment
      user={{
        _id: "123",
        payment_method: "refill",
        balance: 100,
        card_information: "1234555555555",
      }}
    />
  );

  const link = screen.getByTestId("refill-link");

  fireEvent.click(link);
  expect(await screen.findByText(/Fyll på konto/i)).toBeInTheDocument();
});

it("tests that the change payment method modal opens", async () => {
  render(
    <Payment
      user={{
        _id: "123",
        payment_method: "refill",
        balance: 100,
        card_information: "1234555555555",
      }}
    />
  );

  const link = screen.getByTestId("change-method-link");

  fireEvent.click(link);
  expect(
    await screen.queryAllByText(/Uppdatera betalningsmetod/i)[0]
  ).toBeInTheDocument();
});

it("tests that the change payment method modal opens", async () => {
  render(
    <Payment
      user={{
        _id: "123",
        payment_method: "unknown",
        balance: 0,
        card_information: "",
      }}
    />
  );

  const link = screen.getByTestId("add-method-link");

  fireEvent.click(link);
  expect(
    await screen.queryAllByText(/Lägg till betalningsmetod/i)[0]
  ).toBeInTheDocument();
});

// it("tests that the input field does not accept letters", async () => {
//   render(<Refill isOpen={true} />);

//   const input = screen.getByTestId("refill-input");

//   expect(input.value).toBe(""); // empty before
//   fireEvent.change(input, { target: { value: "Good Day" } });
//   expect(input.value).toBe("");
// });
