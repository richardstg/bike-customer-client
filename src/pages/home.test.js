import React from "react";

import { render, cleanup, screen } from "@testing-library/react";

import Home from "./home";

afterEach(cleanup);

it("tests that nothing is rendered when user is not set", async () => {
  render(<Home />);
  expect(await screen.queryByText(/Resehistorik/i)).not.toBeInTheDocument();
});
