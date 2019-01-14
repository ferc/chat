# Fernando Carril

### Personal Data

**Name:** Fernando Carril

**Email:** facarril@gmail.com

**LinkedIn:** [https://www.linkedin.com/in/fcarril/](https://www.linkedin.com/in/fcarril/)

## App

**Demo:** [https://chat-f9w34rrfr.now.sh](https://chat-f9w34rrfr.now.sh)

Chat was built with React, Redux, Redux Thunk and some mocks for JavaScript and Material-UI for CSS.

A lot of reusable components and easy to change

Unit tests and integration tests with Jest and Enzyme.

Light app, file sizes after gzip:
* JS: 114.03 KB
* CSS: 955 B

### Latency

In order to simulate a real environment and to be able to appreciate the changes in the UI, there are some latency in the requests, to change the latency value edit the `latency` constant in the `src/chat/mocks/utils.js` file (currently in 1 second)

### Development

Node.js installed (> 8.x LTS) required.

1. Install the project dependencies: `npm install`
2. Start the development server: `npm start`

### Build

Node.js installed (> 8.x LTS) required.

1. Install the project dependencies: `npm install`
2. Build the app: `npm run build`
3. Run the build (or you can deploy the build): `serve -s build`

### Deploy to Now

Node.js installed (> 8.x LTS) required.

1. Install Now `npm i -g now`
2. Run `now`

More information: [https://zeit.co/examples/create-react-app](https://zeit.co/examples/create-react-app)

## Out of Scope

* More unit testing / integration testing with Cypress
* Server-Side instead of a mock socket in the client
* i18n support with react-intl
* Better error handling on fetching the messages
* React Router (no needed for the exercise scope)
* List of contacts
