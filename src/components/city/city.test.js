import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import City from "./city";

afterEach(cleanup);

it("tests that the component title is rendered", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/"],
  });
  // Test first render and componentDidMount
  render(<City />);
  expect(await screen.findByText(/Stad/i)).toBeInTheDocument();
});

it("tests that the save button is rendered", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/"],
  });
  // Test first render and componentDidMount
  render(<City />);
  expect(await screen.findByText(/Spara/i)).toBeInTheDocument();
});

// it("tests that the component title is rendered", async () => {
//   const history = createMemoryHistory({
//     initialEntries: ["/"],
//   });
//   // Test first render and componentDidMount
//   render(
//     <Router history={history}>
//       <Route path={"/"} component={Home} />
//     </Router>
//   );
//   expect(await screen.findByText(/First text/i)).toBeInTheDocument();
// });

// it("tests that user is redirected to update page when text link is clicked", async () => {
//   const history = createMemoryHistory({
//     initialEntries: ["/"],
//   });
//   // Test first render and componentDidMount
//   render(
//     <Router history={history}>
//       <Route path={"/"} component={Home} />
//     </Router>
//   );

//   const firstTextLink = await screen.findByText(/First text/i);

//   fireEvent.click(firstTextLink);

//   expect(await screen.findByText(/Update Text/i)).toBeInTheDocument();
// });
