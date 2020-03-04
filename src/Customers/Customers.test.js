import React from 'react';
import ReactDOM from 'react-dom';
import Customers from './Customers';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Customers component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Router>
        <Customers />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
