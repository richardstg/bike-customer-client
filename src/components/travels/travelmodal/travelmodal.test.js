import React from "react";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import TravelModal from "../travelmodal/travelmodal";

afterEach(cleanup);

const travel = {
  _id: "123",
  start_time: "2011-02-03",
  stop_time: "2011-02-04",
  bike_id: "21341234",
  start_coordinates: { lat: "22222", long: "4444" },
  stop_coordinates: { lat: "8888", long: "9999" },
  average_speed: "6666662",
  distance: "7777777777",
  price: "455",
};

it("tests that the title is rendered", async () => {
  render(<TravelModal travel={travel} showModal={true} />);
  expect(await screen.findByText(/Reseinformation/i)).toBeInTheDocument();
});

it("tests that the table titles is rendered", async () => {
  render(<TravelModal travel={travel} showModal={true} />);
  expect(await screen.findByText(/Cykel-id/i)).toBeInTheDocument();
  expect(await screen.findByText(/Starttid/i)).toBeInTheDocument();
  expect(await screen.findByText(/Sluttid/i)).toBeInTheDocument();
  expect(
    await screen.findByText(/Genomsnittlig hastighet/i)
  ).toBeInTheDocument();
  expect(await screen.findByText(/Distans/i)).toBeInTheDocument();
  expect(await screen.findByText(/Startkoordinater/i)).toBeInTheDocument();
  expect(await screen.findByText(/Slutkoordinater/i)).toBeInTheDocument();
});

it("tests that the travel data is rendered", async () => {
  render(<TravelModal travel={travel} showModal={true} />);
  expect(await screen.findByText(/21341234/i)).toBeInTheDocument();
  expect(await screen.findByText(/3 feb. 2011 /i)).toBeInTheDocument();
  expect(await screen.findByText(/4 feb. 2011 /i)).toBeInTheDocument();
  expect(await screen.findByText(/6666662/i)).toBeInTheDocument();
  expect(await screen.findByText(/7777777777/i)).toBeInTheDocument();
  expect(await screen.findByText(/455/i)).toBeInTheDocument();
  expect(await screen.findByText(/22222/i)).toBeInTheDocument();
  expect(await screen.findByText(/8888/i)).toBeInTheDocument();
});
