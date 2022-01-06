import React from "react";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import Travels from "./travels";

afterEach(cleanup);

it("tests that travels cannot be fetched and error message is displayed", async () => {
  render(<Travels userId="619f6ee3d0b6c914a2b58514" />);
  expect(
    await screen.findByText(/Resor kunde inte hämtas. Försök igen senare./i)
  ).toBeInTheDocument();
});
