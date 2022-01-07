[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/richardstg/bike-customer-client/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/richardstg/bike-customer-client/?branch=main)
[![Build Status](https://scrutinizer-ci.com/g/richardstg/bike-customer-client/badges/build.png?b=main)](https://scrutinizer-ci.com/g/richardstg/bike-customer-client/build-status/main)
[![Build Status](https://app.travis-ci.com/richardstg/bike-customer-client.svg?branch=main)](https://app.travis-ci.com/richardstg/bike-customer-client)

# E-Scooter Customer Interface

This application is part of a larger development project in the course "pattern" at BTH.

React was used to build the application, and it is part of a complete full-stack scooter sharing application. The system consists of a [server](https://github.com/wadholm/pattern-backend) built with express.js (and MongoDB) and three front-end applications. The application is one of these three, and it functions as the customer's web interface. It allows users to log in with Google OAuth to review their travel history and update payment information and city.

## Installation

To run the app on your local system, you need the following:

This server running on http://localhost:1337.

Your system needs git, npm, node.js.

To install:

Clone the repo with git clone https://github.com/xlsson/pattern-admin

Run npm install to install the app and its dependencies.

Create a .env file in the root folder, with the following content:

REACT_APP_BACKEND_URL=http://localhost:1337/v1

REACT_APP_GOOGLE_CLIENT_ID=needs to be created!

REACT_APP_GOOGLE_CLIENT_SECRET=needs to be created!

ESLINT_NO_DEV_ERRORS=true

PORT=3002

Start the app in your browser by running npm start.
Point your browser to http://localhost:3002

## Available views

A view displaying the user's travel history, current payment information (and functionality to update) and a select form for the user's city.

## Available tasks

Click on a specific trip to see more information in a modal.

Update the current payment information by entering a card number and choosing between the payment methods "monthly" and "refill", as well as refilling the balance.

Change the city that will be used as default in the [customer app](https://github.com/richardstg/bike-customer-app).
