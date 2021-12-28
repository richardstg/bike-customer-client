import React from "react";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import TravelsTable from "../travelstable/travelstable";

afterEach(cleanup);

const travels = [
  { _id: "123", start_time: "2011-02-03", stop_time: "2011-02-04" },
];

it("tests that the table titles are rendered", async () => {
  render(<TravelsTable travels={travels} />);
  expect(await screen.findByText(/Starttid/i)).toBeInTheDocument();
  expect(await screen.findByText(/Sluttid/i)).toBeInTheDocument();
});

it("tests that the times are rendered", async () => {
  render(<TravelsTable travels={travels} />);
  expect(
    await screen.findByText(/torsdag 3 februari 2011/i)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/fredag 4 februari 2011/i)
  ).toBeInTheDocument();
});

it("tests that the show button is rendered", async () => {
  render(<TravelsTable travels={travels} />);
  expect(await screen.queryByText(/Visa/i)).toBeInTheDocument();
});
