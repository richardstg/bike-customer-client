import React from "react";
import { createMemoryHistory } from "history";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import Refill from "./refill";

afterEach(cleanup);

it("tests that the title is rendered", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/"],
  });
  // Test first render and componentDidMount
  render(<ChangePayment title="Mock Title" isOpen={true} />);
  expect(await screen.findByText(/Mock Title/i)).toBeInTheDocument();
});

// it("tests that the curent payment method 'monthly' is checked", async () => {
//   const history = createMemoryHistory({
//     initialEntries: ["/"],
//   });
//   // Test first render and componentDidMount
//   render(
//     <ChangePayment currentMethod="monthly" title="Mock Title" isOpen={true} />
//   );
//   const element = screen.getByTestId("radio-monthly");

//   expect(element.checked === true);
// });

// it("tests that the curent payment method 'refill' is checked", async () => {
//   const history = createMemoryHistory({
//     initialEntries: ["/"],
//   });
//   // Test first render and componentDidMount
//   render(
//     <ChangePayment currentMethod="refill" title="Mock Title" isOpen={true} />
//   );
//   const element = screen.getByTestId("radio-refill");

//   expect(element.checked === true);
// });

// it("tests that the curent payment method 'refill' is checked if payment method is unknown", async () => {
//   const history = createMemoryHistory({
//     initialEntries: ["/"],
//   });
//   // Test first render and componentDidMount
//   render(
//     <ChangePayment currentMethod="unknown" title="Mock Title" isOpen={true} />
//   );
//   const element = screen.getByTestId("radio-refill");

//   expect(element.checked === true);
// });

// it("tests that the modal is closed", async () => {
//   const history = createMemoryHistory({
//     initialEntries: ["/"],
//   });
//   // Test first render and componentDidMount
//   render(<ChangePayment title="Mock Title" isOpen={false} />);
//   const form = screen.queryByTestId("change-payment-form");
//   expect(form).toBeNull();
// });
