const Product = require('./components/Product');
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <Product name="Dunder Mifflin" producer="PaperCo" color="white" weight={210} />,
  document.getElementById('main')
);

require('./test/index-test.js'); // Leave this in!
