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
  expect(screen.findByText(/Fyll på konto/i)).toBeInTheDocument();
});

it("tests that the input field works", async () => {
  render(<Refill isOpen={true} />);

  const input = screen.getByTestId("refill-input");

  expect(element.checked === true);
});

it("tests that the modal is closed", async () => {
  render(<Refill isOpen={false} />);
  const form = screen.queryByTestId("refill-form");
  expect(form).not.toBeInTheDocument();
});
