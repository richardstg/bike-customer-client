import React from "react";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import Travels from "./travels";

afterEach(cleanup);

it("tests that the title is rendered", async () => {
  render(<Travels userId="619f6ee3d0b6c914a2b58514" />);
  expect(await screen.findByText(/Resehistorik/i)).toBeInTheDocument();
});
