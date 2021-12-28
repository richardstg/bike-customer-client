import React from "react";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import Refill from "./refill";

afterEach(cleanup);

it("tests that the modal is opened", async () => {
  render(<Refill isOpen={true} />);

  const form = screen.queryByTestId("refill-form");

  expect(form).toBeInTheDocument();
});

it("tests that the title is rendered", async () => {
  render(<Refill isOpen={true} />);
  expect(await screen.findByText(/Fyll på konto/i)).toBeInTheDocument();
});

it("tests that the input field changes when numbers are entered", async () => {
  render(<Refill isOpen={true} />);

  const input = screen.getByTestId("refill-input");

  expect(input.value).toBe(""); // empty before
  fireEvent.change(input, { target: { value: 123 } });
  expect(input.value).toBe("123");
});

it("tests that the input field does not accept letters", async () => {
  render(<Refill isOpen={true} />);

  const input = screen.getByTestId("refill-input");

  expect(input.value).toBe(""); // empty before
  fireEvent.change(input, { target: { value: "Good Day" } });
  expect(input.value).toBe("");
});
